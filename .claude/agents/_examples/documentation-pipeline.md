# Documentation Pipeline Example

**Pattern:** Automated documentation generation from code

**When to use:** After feature completion, during onboarding, for API documentation, when documentation is outdated

**Agents used:** `code-architecture-reviewer` → Documentation generation → API specification → User guide creation

**Output:** Comprehensive documentation suite (architecture docs, API docs, user guides)

---

## Pattern Overview

This pattern chains analysis and generation steps to automatically create multi-layered documentation from source code. It ensures documentation is accurate, comprehensive, and maintained alongside code.

```
┌─────────────────────────────┐
│ Source Code (Feature)       │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Step 1: Architecture Analysis│
│ (code-architecture-reviewer)│
│ • Understand structure      │
│ • Identify patterns         │
│ • Map dependencies          │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Step 2: Architecture Docs   │
│ • System overview           │
│ • Component relationships   │
│ • Data flows                │
│ • Design decisions          │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Step 3: API Documentation   │
│ • Endpoints                 │
│ • Request/response schemas  │
│ • Authentication            │
│ • Examples                  │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Step 4: User Guide          │
│ • How to use feature        │
│ • Common workflows          │
│ • Troubleshooting           │
│ • Screenshots               │
└─────────────────────────────┘
```

---

## Complete Example: Stock Transfer Feature Documentation

### Context

Stock transfer feature has been implemented:
- Backend: GraphQL API (mutation, queries)
- Frontend: React components (modal, form, validation)
- Database: Schema, migrations, indexes
- 12 files, ~800 lines of code

**Goal:** Generate complete documentation suite for developers and users

---

## Step 1: Architecture Analysis

**Agent:** `code-architecture-reviewer`

**Prompt:**
```
Analyze the stock transfer feature architecture.

Files to analyze:
- src/api/graphql/mutations/stock-transfer.ts
- src/api/graphql/queries/stock-transfer.ts
- src/components/StockTransferModal/index.tsx
- src/services/stock-transfer-service.ts
- src/repositories/stock-transfer-repository.ts
- database/migrations/20240624_create_stock_transfers.sql

Focus on:
- Component structure and relationships
- Data flow (user interaction → API → database)
- Design patterns used
- Key architectural decisions
```

**code-architecture-reviewer Output:**

```markdown
## Architecture Analysis: Stock Transfer Feature

### System Overview

The stock transfer feature follows a layered architecture pattern:

```
┌──────────────────────────────────────┐
│ Presentation Layer (React)           │
│ • StockTransferModal                 │
│ • StockTransferForm                  │
│ • StockTransferHistory               │
└─────────────┬────────────────────────┘
              │ GraphQL Mutation/Query
              ▼
┌──────────────────────────────────────┐
│ API Layer (GraphQL)                  │
│ • initiateStockTransfer (mutation)   │
│ • stockTransfers (query)             │
│ • stockTransfer (query)              │
└─────────────┬────────────────────────┘
              │ Service calls
              ▼
┌──────────────────────────────────────┐
│ Business Logic Layer (Services)      │
│ • StockTransferService               │
│   - validateTransfer()               │
│   - executeTransfer()                │
│   - notifyStakeholders()             │
└─────────────┬────────────────────────┘
              │ Repository calls
              ▼
┌──────────────────────────────────────┐
│ Data Access Layer (Repositories)     │
│ • StockTransferRepository            │
│   - create()                         │
│   - findById()                       │
│   - findByLocation()                 │
└─────────────┬────────────────────────┘
              │ SQL queries
              ▼
┌──────────────────────────────────────┐
│ Database (PostgreSQL)                │
│ • stock_transfers table              │
│ • inventory_items table              │
│ • clinic_locations table             │
└──────────────────────────────────────┘
```

### Component Relationships

**StockTransferModal** (Presentation)
- Depends on: StockTransferForm, GraphQL client
- Responsibilities: UI state management, modal open/close, form submission
- Pattern: Container component (handles state, delegates rendering)

**StockTransferService** (Business Logic)
- Depends on: StockTransferRepository, InventoryRepository, NotificationService
- Responsibilities: Validation, business rules, cross-cutting concerns
- Pattern: Service layer (encapsulates business logic)

**StockTransferRepository** (Data Access)
- Depends on: Database connection, SQL query builder
- Responsibilities: CRUD operations, data persistence
- Pattern: Repository pattern (abstracts data access)

### Data Flow

**Initiate Transfer (Happy Path):**

1. User fills form in `StockTransferModal`
2. Form submits GraphQL mutation `initiateStockTransfer`
3. GraphQL resolver calls `StockTransferService.executeTransfer()`
4. Service validates:
   - Source location has sufficient stock
   - Lot number exists
   - User has permission
5. Service calls `StockTransferRepository.create()`
6. Repository inserts into `stock_transfers` table
7. Repository updates inventory quantities (atomic transaction)
8. Service calls `NotificationService.notifyStakeholders()`
9. GraphQL returns success with transfer ID
10. Modal shows success message, closes

**Offline Support:**
- Form saves to IndexedDB if offline
- Background sync retries when reconnected
- Conflict resolution if inventory changed server-side

### Design Patterns

1. **Repository Pattern** (Data Access)
   - Abstracts database operations
   - Testable (can mock repository)
   - Example: `StockTransferRepository.create()`

2. **Service Layer Pattern** (Business Logic)
   - Encapsulates business rules
   - Coordinates between repositories
   - Example: `StockTransferService.executeTransfer()`

3. **Dependency Injection** (Throughout)
   - Services injected via constructor
   - Loosely coupled, testable
   - Example: `StockTransferService(repository, notificationService)`

4. **Optimistic Locking** (Concurrency Control)
   - Version column in `stock_transfers` table
   - Prevents lost updates
   - Example: `UPDATE ... WHERE id = ? AND version = ?`

### Key Architectural Decisions

**Decision 1: GraphQL over REST**
- Rationale: Client can request exactly what it needs (reduce payload)
- Trade-off: More complex API setup, but better mobile performance
- Philippine context: 3G connections benefit from smaller payloads

**Decision 2: Offline-first with IndexedDB**
- Rationale: Rural clinics have unreliable internet (35% of target users)
- Trade-off: Complexity (sync conflicts), but necessary for accessibility
- Implementation: Queue in IndexedDB, background sync API

**Decision 3: Atomic transaction for inventory updates**
- Rationale: Stock levels must always be consistent
- Trade-off: Transaction locks (potential contention), but critical for accuracy
- Implementation: BEGIN TRANSACTION → UPDATE source → UPDATE destination → COMMIT

**Decision 4: Audit trail in separate table**
- Rationale: PhilHealth requires 5-year audit history
- Trade-off: Additional storage, but legal requirement
- Implementation: `stock_transfer_audit` table (immutable, time-series)

### Security Considerations

- **Authorization:** User must have `TRANSFER_STOCK` permission for both locations
- **Validation:** All inputs validated server-side (never trust client)
- **Audit Trail:** Every transfer logged (who, what, when, where, why)
- **PHI Protection:** No patient data in stock transfers (inventory only)

### Performance Considerations

- **Indexes:** Created on `from_location_id`, `to_location_id`, `created_at`
- **Query Optimization:** Eager loading for related data (locations, items)
- **Pagination:** Transfer history paginated (50 per page)
- **Caching:** Location and item lookups cached (Redis, 5 min TTL)

### Testing Strategy

- **Unit Tests:** Service and repository methods (80%+ coverage)
- **Integration Tests:** API endpoints, database transactions
- **E2E Tests:** User workflows (create transfer, view history)
- **Performance Tests:** Concurrent transfers (100 simultaneous, <2s response)
```

**Analysis saved for next steps** ✅

---

## Step 2: Architecture Documentation

**Input:** Architecture analysis from Step 1

**Generated Documentation:**

```markdown
# Stock Transfer Feature - Architecture Documentation

**Version:** 1.0
**Last Updated:** 2024-11-24
**Status:** Production

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Component Details](#component-details)
4. [Data Model](#data-model)
5. [API Contracts](#api-contracts)
6. [Security](#security)
7. [Performance](#performance)
8. [Testing](#testing)
9. [Deployment](#deployment)

---

## 1. Overview

### Purpose

The stock transfer feature enables clinic administrators to transfer inventory items between multiple clinic locations. This addresses the pain point of manual Excel-based tracking, which takes 15-20 minutes per transfer and is error-prone.

### Key Benefits

- **Time Savings:** Reduces transfer time from 15-20 minutes to 3-5 minutes (75% reduction)
- **Accuracy:** Automatic inventory updates eliminate manual reconciliation errors
- **Audit Trail:** Complete PhilHealth-compliant audit history
- **Offline Support:** Works in rural clinics with unreliable internet

### Target Users

- **Primary:** Clinic administrators, pharmacists
- **Secondary:** Clinic owners (view reports), accountants (audit trail)

---

## 2. System Architecture

### Layered Architecture

The feature follows a 4-layer architecture:

```
┌────────────────────────────────────────┐
│ Presentation Layer (React Components) │
├────────────────────────────────────────┤
│ API Layer (GraphQL)                    │
├────────────────────────────────────────┤
│ Business Logic Layer (Services)        │
├────────────────────────────────────────┤
│ Data Access Layer (Repositories)       │
└────────────────────────────────────────┘
```

### Key Components

| Component | Responsibility | Technology |
|-----------|----------------|------------|
| StockTransferModal | User interface for creating transfers | React, TypeScript |
| GraphQL API | API endpoints for transfers | Apollo Server, GraphQL |
| StockTransferService | Business logic and validation | Node.js, TypeScript |
| StockTransferRepository | Database operations | TypeORM, PostgreSQL |

### Data Flow Diagram

```
User Input (Modal Form)
  │
  ├─ Offline? → Save to IndexedDB → Sync when connected
  │
  └─ Online → GraphQL Mutation
              │
              └─ StockTransferService
                  │
                  ├─ Validate stock availability
                  ├─ Validate lot number
                  ├─ Check permissions
                  │
                  └─ StockTransferRepository
                      │
                      └─ Database Transaction
                          │
                          ├─ INSERT into stock_transfers
                          ├─ UPDATE inventory (source)
                          ├─ UPDATE inventory (destination)
                          └─ INSERT into audit_trail
                          │
                          └─ COMMIT
```

---

## 3. Component Details

### StockTransferModal Component

**Location:** `src/components/StockTransferModal/index.tsx`

**Purpose:** User interface for initiating stock transfers

**Props:**
```typescript
interface StockTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (transfer: StockTransfer) => void;
}
```

**State Management:**
- Form state: React Hook Form
- Validation: Yup schema
- Submission: Apollo useMutation

**Accessibility:**
- WCAG 2.2 Level AA compliant
- Keyboard navigation (Tab order, Escape to close)
- Screen reader support (ARIA labels, live regions)

---

### StockTransferService

**Location:** `src/services/stock-transfer-service.ts`

**Purpose:** Business logic for stock transfers

**Methods:**
```typescript
class StockTransferService {
  async executeTransfer(input: StockTransferInput): Promise<StockTransfer>
  async validateTransfer(input: StockTransferInput): Promise<ValidationResult>
  async cancelTransfer(transferId: string): Promise<void>
  async getTransferHistory(locationId: string, limit: number): Promise<StockTransfer[]>
}
```

**Validation Rules:**
1. Source location has sufficient stock (quantity <= available)
2. Lot number exists at source location
3. User has `TRANSFER_STOCK` permission for both locations
4. Source and destination locations are different
5. Item is active (not discontinued)

---

## 4. Data Model

### stock_transfers Table

```sql
CREATE TABLE stock_transfers (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_location_id  UUID NOT NULL REFERENCES clinic_locations(id),
  to_location_id    UUID NOT NULL REFERENCES clinic_locations(id),
  item_id           UUID NOT NULL REFERENCES inventory_items(id),
  quantity          INTEGER NOT NULL CHECK (quantity > 0),
  lot_number        VARCHAR(50) NOT NULL,
  reason            TEXT,
  status            VARCHAR(20) DEFAULT 'pending',
  created_by        UUID NOT NULL REFERENCES users(id),
  created_at        TIMESTAMP DEFAULT NOW(),
  completed_at      TIMESTAMP,
  version           INTEGER DEFAULT 1, -- Optimistic locking

  CONSTRAINT different_locations CHECK (from_location_id != to_location_id)
);

CREATE INDEX idx_transfers_from ON stock_transfers(from_location_id);
CREATE INDEX idx_transfers_to ON stock_transfers(to_location_id);
CREATE INDEX idx_transfers_status ON stock_transfers(status);
CREATE INDEX idx_transfers_created_at ON stock_transfers(created_at DESC);
```

### Relationships

```
stock_transfers
  ├─ belongs to from_location (clinic_locations)
  ├─ belongs to to_location (clinic_locations)
  ├─ belongs to item (inventory_items)
  └─ belongs to created_by (users)
```

---

## 5. API Contracts

See [API Documentation](#step-3-api-documentation) section below.

---

## 6. Security

### Authentication

- JWT token required in Authorization header
- Token validated by Apollo Server middleware
- Example: `Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`

### Authorization

- User must have `TRANSFER_STOCK` permission
- Permission checked for both source and destination locations
- Implemented via `@RequiresPermission` decorator

### Audit Trail

Every transfer logged with:
- Who: `created_by` (user ID + name)
- What: All transfer details (item, quantity, lot, reason)
- When: `created_at`, `completed_at` timestamps
- Where: `from_location_id`, `to_location_id`
- Why: `reason` field (optional)

Audit records are immutable (no DELETE, only status updates).

---

## 7. Performance

### Database Indexes

- `idx_transfers_from`: Query transfers by source location
- `idx_transfers_to`: Query transfers by destination location
- `idx_transfers_created_at`: Recent transfers (DESC order)

### Caching Strategy

- **Location lookups:** Redis cache, 5 min TTL
- **Item lookups:** Redis cache, 5 min TTL
- **Transfer history:** No cache (real-time accuracy required)

### Pagination

- Transfer history paginated: 50 records per page
- Cursor-based pagination (stable results during inserts)

### Performance Targets

| Metric | Target | Actual (Measured) |
|--------|--------|-------------------|
| API response time (p95) | <2s on 3G | 1.8s ✅ |
| Concurrent transfers | 100 simultaneous | 98 successful ✅ |
| Database transaction time | <200ms | 180ms ✅ |

---

## 8. Testing

### Unit Tests

- Service methods: 85% coverage
- Repository methods: 92% coverage
- Component: 78% coverage

### Integration Tests

- API endpoints: 100% coverage (happy path + error cases)
- Database transactions: Tested with concurrent transfers

### E2E Tests

- Create transfer workflow: ✅
- View transfer history: ✅
- Offline transfer + sync: ✅
- Conflict resolution: ✅

---

## 9. Deployment

### Database Migration

```bash
# Run migration to create stock_transfers table
npm run migrate:up 20240624_create_stock_transfers
```

### Environment Variables

```
# Required
DATABASE_URL=postgresql://user:pass@localhost:5432/mycure
REDIS_URL=redis://localhost:6379

# Optional (defaults)
STOCK_TRANSFER_PAGE_SIZE=50
CACHE_TTL_MINUTES=5
```

### Rollout Plan

1. Deploy to staging (June 28)
2. QA testing (June 29-30)
3. Deploy to pilot clinics (July 1-7)
4. Deploy to all clinics (July 8)

---

## Related Documentation

- [API Documentation](#step-3-api-documentation) - API endpoints and schemas
- [User Guide](#step-4-user-guide) - How to use the feature
- [Testing Guide](../testing/stock-transfer-tests.md) - How to run tests
```

**Architecture documentation generated** ✅

---

## Step 3: API Documentation

**Input:** Architecture analysis + Architecture docs

**Generated Documentation:**

```markdown
# Stock Transfer API Documentation

**Version:** 1.0
**Base URL:** `https://api.mycure.md/graphql`
**Authentication:** JWT Bearer token

---

## Table of Contents

1. [Authentication](#authentication)
2. [Mutations](#mutations)
   - [initiateStockTransfer](#initiatestocktransfer)
   - [cancelStockTransfer](#cancelstocktransfer)
3. [Queries](#queries)
   - [stockTransfer](#stocktransfer)
   - [stockTransfers](#stocktransfers)
4. [Types](#types)
5. [Error Handling](#error-handling)
6. [Examples](#examples)

---

## 1. Authentication

All API requests require a valid JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Obtaining a Token:**

```graphql
mutation Login {
  login(email: "admin@clinic.com", password: "password") {
    token
    user {
      id
      name
      email
    }
  }
}
```

---

## 2. Mutations

### initiateStockTransfer

Create a new stock transfer between locations.

**Signature:**

```graphql
mutation InitiateStockTransfer($input: StockTransferInput!) {
  initiateStockTransfer(input: $input) {
    transfer {
      id
      fromLocation { id name }
      toLocation { id name }
      item { id name }
      quantity
      lotNumber
      status
      createdBy { id name }
      createdAt
    }
    errors {
      field
      message
    }
  }
}
```

**Input:**

```graphql
input StockTransferInput {
  fromLocationId: ID!
  toLocationId: ID!
  itemId: ID!
  quantity: Int!
  lotNumber: String!
  reason: String
}
```

**Example Request:**

```graphql
mutation {
  initiateStockTransfer(input: {
    fromLocationId: "loc_123"
    toLocationId: "loc_456"
    itemId: "item_789"
    quantity: 500
    lotNumber: "LOT2024-001"
    reason: "Branch 2 low stock"
  }) {
    transfer {
      id
      quantity
      status
    }
    errors {
      field
      message
    }
  }
}
```

**Example Response (Success):**

```json
{
  "data": {
    "initiateStockTransfer": {
      "transfer": {
        "id": "txf_abc123",
        "quantity": 500,
        "status": "pending"
      },
      "errors": []
    }
  }
}
```

**Example Response (Error - Insufficient Stock):**

```json
{
  "data": {
    "initiateStockTransfer": {
      "transfer": null,
      "errors": [
        {
          "field": "quantity",
          "message": "Unable to complete transfer. Requested quantity (500) exceeds available stock (300)."
        }
      ]
    }
  }
}
```

**Validation Rules:**

| Rule | Error Message |
|------|---------------|
| Insufficient stock | "Requested quantity (X) exceeds available stock (Y)." |
| Invalid lot number | "Please check the lot number and try again." |
| Same location | "Source and destination must be different locations." |
| No permission | "You do not have permission to transfer stock for this location." |

---

### cancelStockTransfer

Cancel a pending stock transfer.

**Signature:**

```graphql
mutation CancelStockTransfer($transferId: ID!) {
  cancelStockTransfer(transferId: $transferId) {
    transfer {
      id
      status
    }
    errors {
      field
      message
    }
  }
}
```

**Example Request:**

```graphql
mutation {
  cancelStockTransfer(transferId: "txf_abc123") {
    transfer {
      id
      status
    }
    errors {
      field
      message
    }
  }
}
```

**Validation:**
- Only `pending` transfers can be cancelled
- User must have permission for transfer's source location

---

## 3. Queries

### stockTransfer

Get a single stock transfer by ID.

**Signature:**

```graphql
query StockTransfer($id: ID!) {
  stockTransfer(id: $id) {
    id
    fromLocation { id name }
    toLocation { id name }
    item { id name sku }
    quantity
    lotNumber
    reason
    status
    createdBy { id name }
    createdAt
    completedAt
  }
}
```

**Example Request:**

```graphql
query {
  stockTransfer(id: "txf_abc123") {
    id
    quantity
    status
    createdAt
  }
}
```

---

### stockTransfers

List stock transfers with pagination and filtering.

**Signature:**

```graphql
query StockTransfers($input: StockTransfersInput!) {
  stockTransfers(input: $input) {
    edges {
      node {
        id
        fromLocation { name }
        toLocation { name }
        item { name }
        quantity
        status
        createdAt
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

**Input:**

```graphql
input StockTransfersInput {
  locationId: ID      # Filter by source or destination location
  status: String      # Filter by status (pending, completed, cancelled)
  first: Int          # Number of records (default: 50, max: 100)
  after: String       # Cursor for pagination
}
```

**Example Request:**

```graphql
query {
  stockTransfers(input: {
    locationId: "loc_123"
    status: "pending"
    first: 20
  }) {
    edges {
      node {
        id
        toLocation { name }
        item { name }
        quantity
        createdAt
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

---

## 4. Types

### StockTransfer

```graphql
type StockTransfer {
  id: ID!
  fromLocation: ClinicLocation!
  toLocation: ClinicLocation!
  item: InventoryItem!
  quantity: Int!
  lotNumber: String!
  reason: String
  status: StockTransferStatus!
  createdBy: User!
  createdAt: DateTime!
  completedAt: DateTime
}
```

### StockTransferStatus

```graphql
enum StockTransferStatus {
  pending       # Transfer created, awaiting processing
  in_transit    # Transfer in progress (physical delivery)
  completed     # Transfer completed, inventory updated
  cancelled     # Transfer cancelled
}
```

---

## 5. Error Handling

### Error Response Format

```json
{
  "errors": [
    {
      "field": "quantity",
      "message": "Requested quantity (500) exceeds available stock (300)."
    }
  ]
}
```

### Common Errors

| Error Code | HTTP Status | Message |
|------------|-------------|---------|
| UNAUTHENTICATED | 401 | "Authentication required. Please provide a valid token." |
| PERMISSION_DENIED | 403 | "You do not have permission to transfer stock." |
| INSUFFICIENT_STOCK | 400 | "Requested quantity exceeds available stock." |
| INVALID_LOT_NUMBER | 400 | "Please check the lot number and try again." |
| NOT_FOUND | 404 | "Stock transfer not found." |

---

## 6. Examples

### Complete Transfer Workflow (cURL)

```bash
# 1. Authenticate
curl -X POST https://api.mycure.md/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { login(email: \"admin@clinic.com\", password: \"password\") { token } }"
  }'

# Response: { "data": { "login": { "token": "eyJhbGc..." } } }

# 2. Create Transfer
curl -X POST https://api.mycure.md/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "query": "mutation($input: StockTransferInput!) { initiateStockTransfer(input: $input) { transfer { id status } } }",
    "variables": {
      "input": {
        "fromLocationId": "loc_123",
        "toLocationId": "loc_456",
        "itemId": "item_789",
        "quantity": 500,
        "lotNumber": "LOT2024-001"
      }
    }
  }'

# 3. Get Transfer Status
curl -X POST https://api.mycure.md/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "query": "query($id: ID!) { stockTransfer(id: $id) { id status completedAt } }",
    "variables": { "id": "txf_abc123" }
  }'
```

---

## Rate Limiting

- **Rate Limit:** 100 requests per minute per user
- **Header:** `X-RateLimit-Remaining: 95`
- **Exceeded:** Returns 429 Too Many Requests

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-11-24 | Initial release |

---

## Support

**Developer Support:**
- Email: dev@mycure.md
- Slack: #api-support
- Documentation: https://docs.mycure.md
```

**API documentation generated** ✅

---

## Step 4: User Guide

**Input:** Architecture docs + API docs + User research

**Generated Documentation:**

```markdown
# Stock Transfer Feature - User Guide

**For:** Clinic Administrators, Pharmacists
**Version:** 1.0
**Last Updated:** November 24, 2024

---

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [How to Transfer Stock](#how-to-transfer-stock)
4. [Viewing Transfer History](#viewing-transfer-history)
5. [Offline Mode](#offline-mode)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## 1. Overview

### What is Stock Transfer?

The Stock Transfer feature allows you to move inventory items from one clinic location to another directly in MYCURE. No more manual Excel tracking!

### Key Benefits

✅ **Faster:** Complete transfers in 3-5 minutes (was 15-20 minutes with Excel)
✅ **Accurate:** Automatic inventory updates eliminate reconciliation errors
✅ **Auditable:** Complete transfer history for DOH/PhilHealth compliance
✅ **Works Offline:** Create transfers even without internet (syncs when connected)

---

## 2. Getting Started

### Requirements

- MYCURE account with "Transfer Stock" permission
- Access to at least 2 clinic locations
- Internet connection (or offline mode for rural clinics)

### Supported Devices

- 💻 **Desktop:** Windows, Mac (Chrome, Firefox, Safari)
- 📱 **Mobile:** iOS (Safari), Android (Chrome)
- ✅ **Offline:** Works without internet (syncs automatically when connected)

---

## 3. How to Transfer Stock

### Step 1: Open Transfer Form

1. Log in to MYCURE
2. Go to **Inventory** → **Transfer Stock**
3. Click **Transfer Stock Between Locations** button

![Transfer Stock Button](screenshots/transfer-button.png)

### Step 2: Fill Transfer Details

**From Location** (Required)
- Select the location where stock currently is
- Example: "Main Clinic"

**To Location** (Required)
- Select the destination location
- Example: "Branch 2 - Quezon City"

**Item** (Required)
- Select the item to transfer
- System shows available stock: "Available: 1,200 units"

**Quantity** (Required)
- Enter how many units to transfer
- Must not exceed available stock
- Example: 500

**Lot Number** (Required)
- Enter the lot number of the item
- Used for traceability and DOH compliance
- Example: LOT2024-001

**Reason** (Optional)
- Why are you transferring?
- Example: "Branch 2 low stock"

![Transfer Form](screenshots/transfer-form.png)

### Step 3: Submit Transfer

1. Review all details
2. Click **Transfer Stock** button
3. Wait for confirmation message
4. ✅ **Success:** "Transfer completed. Inventory updated."

![Success Message](screenshots/success-message.png)

---

## 4. Viewing Transfer History

### View Recent Transfers

1. Go to **Inventory** → **Transfer History**
2. See list of recent transfers (newest first)
3. Click any transfer to see details

![Transfer History](screenshots/transfer-history.png)

### Filter Transfers

**By Location:**
- Select location from dropdown
- Shows transfers to/from that location

**By Date:**
- Select date range
- Example: "Last 30 days"

**By Status:**
- Pending (not yet completed)
- Completed (inventory updated)
- Cancelled (transfer cancelled)

---

## 5. Offline Mode

### How Offline Mode Works

If your internet disconnects:
1. ✅ You can still create transfers
2. Transfer is saved locally on your device
3. 🔄 Auto-syncs when internet reconnects
4. ✅ Confirmation shown when synced

### Offline Indicator

When offline, you'll see:
```
🔴 Offline - Transfers will sync when connected
```

### Manual Sync

To manually sync:
1. Click **Sync Now** button
2. Wait for "Synced" confirmation

---

## 6. Troubleshooting

### Problem: "Requested quantity exceeds available stock"

**Cause:** Not enough stock at source location

**Solution:**
1. Check available stock (shown in form)
2. Reduce quantity
3. OR transfer from different location

---

### Problem: "Please check the lot number and try again"

**Cause:** Lot number doesn't exist or already transferred

**Solution:**
1. Verify lot number on physical item
2. Check Inventory → Lot Numbers to see valid lots
3. Re-enter correct lot number

---

### Problem: Transfer stuck in "Pending" status

**Cause:** Internet disconnected before completion

**Solution:**
1. Check internet connection
2. Click **Sync Now** button
3. If still pending after 5 minutes, contact support

---

### Problem: "You do not have permission to transfer stock"

**Cause:** Your account doesn't have "Transfer Stock" permission

**Solution:**
1. Contact your clinic administrator
2. Request "Transfer Stock" permission
3. Administrator grants permission in Settings → Users

---

## 7. FAQ

### Q: How long does a transfer take?

**A:** 3-5 minutes on average (was 15-20 minutes with manual Excel tracking).

### Q: Can I transfer between more than 2 locations at once?

**A:** No, each transfer is between 2 locations. To transfer to multiple locations, create separate transfers.

### Q: What happens if I make a mistake?

**A:** Contact support within 24 hours. We can cancel pending transfers. Completed transfers require a reverse transfer.

### Q: Does this work in rural areas with poor internet?

**A:** Yes! Offline mode allows you to create transfers without internet. They automatically sync when connected.

### Q: Is this DOH/PhilHealth compliant?

**A:** Yes. All transfers are logged with complete audit trails (who, what, when, where, why) for 5+ years as required.

### Q: Can patients see transfer history?

**A:** No, this is staff-only. Patients cannot view inventory transfers.

### Q: How do I print a transfer receipt?

**A:** Go to Transfer History → Click transfer → Click "Print Receipt" button.

---

## Need Help?

**Support Hours:** Monday-Friday, 8am-6pm (Philippine Time)

**Contact:**
- 📞 Phone: 02-1234-5678
- 📧 Email: support@mycure.md
- 💬 Chat: Click "Help" button in MYCURE (bottom right)

**Training:**
- 🎥 Video Tutorial: https://mycure.md/tutorials/stock-transfer
- 📚 Knowledge Base: https://help.mycure.md
```

**User guide generated** ✅

---

## Complete Documentation Suite Generated

### Output Files

1. **Architecture Documentation** (4,500 words)
   - System overview
   - Component relationships
   - Data flows
   - Design decisions
   - Security, performance, testing

2. **API Documentation** (3,200 words)
   - All endpoints (mutations, queries)
   - Request/response schemas
   - Authentication
   - Error handling
   - Code examples (GraphQL, cURL)

3. **User Guide** (2,800 words)
   - Getting started
   - Step-by-step instructions
   - Screenshots
   - Troubleshooting
   - FAQ

**Total:** ~10,500 words of comprehensive documentation

---

## Key Takeaways

**Why use this pattern?**
- **Accuracy:** Documentation generated from actual code (not manual, never outdated)
- **Comprehensive:** Covers all layers (architecture, API, user guide)
- **Efficient:** 10,500 words generated in <30 minutes (vs days of manual writing)
- **Maintainable:** Regenerate when code changes

**When to use:**
- After feature completion (capture design decisions)
- Before onboarding new developers (explain architecture)
- For API documentation (accurate schemas)
- When documentation is outdated (regenerate from code)

**Time investment vs. payoff:**
- Manual documentation: 3-5 days (10-40 hours)
- Automated pipeline: 30 minutes
- **Time savings: 95%+**

**Limitations:**
- Screenshots must be added manually
- User guide requires editing for tone/style
- Examples need validation
- Code comments improve output quality

**Best practices:**
1. **Start with architecture analysis** - Foundation for all other docs
2. **Generate in layers** - Architecture → API → User guide (each builds on previous)
3. **Edit for clarity** - Generated docs are accurate but may need rewording
4. **Add visuals** - Screenshots, diagrams enhance user guides
5. **Version control** - Commit docs alongside code changes

**Related:**
- [Feature Development Workflow](../../../workflows/feature-development-workflow.md) - When to generate docs
- [Agent Quick Reference](../../../docs/agent-quick-reference.md) - Which agents to use
- [Technical Documenter Agent](../../_content/technical-documenter.md) - Specialized doc agent
