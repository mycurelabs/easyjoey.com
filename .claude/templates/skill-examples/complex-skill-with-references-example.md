---
name: api-design-standards
description: Comprehensive REST API design standards with OpenAPI 3.1 specification, security patterns, and versioning strategies
category: Backend Development
mode: AUTO
author: Backend Team
created: 2025-11-24
last_updated: 2025-11-24
---

# API Design Standards

<purpose>
**What this skill does:**
This skill provides comprehensive REST API design standards following industry best practices, OpenAPI 3.1 specification, RESTful principles, security patterns (OAuth 2.0, JWT), and versioning strategies. It ensures consistent, well-documented, and secure API design across all services.

**When to use this skill:**
- Designing new REST APIs
- Reviewing existing API designs
- Creating OpenAPI specifications
- Implementing authentication/authorization
- Planning API versioning strategies
- Documenting API endpoints

**Target users:**
Backend developers, API architects, and full-stack engineers who design and implement RESTful APIs.
</purpose>

---

## Auto-Activation Triggers

<activation_triggers>
**This skill auto-activates when:**

1. **User mentions keywords:** "API", "REST", "endpoint", "OpenAPI", "Swagger", "authentication", "authorization", "versioning", "API design"
2. **User asks questions like:**
   - "How should I design this API?"
   - "What's the best way to structure REST endpoints?"
   - "How do I version my API?"
   - "What authentication should I use?"
   - "How do I document this API?"
3. **User requests tasks like:**
   - "Create an API for [feature]"
   - "Design REST endpoints for [resource]"
   - "Generate OpenAPI spec"
   - "Implement OAuth 2.0"
   - "Review this API design"
4. **File context detected:**
   - Working in `/api/`, `/routes/`, `/controllers/` directories
   - Editing `openapi.yaml`, `swagger.json` files
   - Creating Express/Fastify/Hono route handlers
</activation_triggers>

---

## REST API Principles

<reference>
### HTTP Methods (RESTful Conventions)

| Method | Purpose | Idempotent? | Safe? | Request Body | Success Response |
|--------|---------|-------------|-------|--------------|------------------|
| GET | Retrieve resource(s) | ✅ Yes | ✅ Yes | ❌ No | 200 OK + data |
| POST | Create new resource | ❌ No | ❌ No | ✅ Yes | 201 Created + Location header |
| PUT | Replace entire resource | ✅ Yes | ❌ No | ✅ Yes | 200 OK or 204 No Content |
| PATCH | Partial update | ❌ No* | ❌ No | ✅ Yes | 200 OK or 204 No Content |
| DELETE | Remove resource | ✅ Yes | ❌ No | ❌ No | 204 No Content or 200 OK |
| HEAD | Get headers only | ✅ Yes | ✅ Yes | ❌ No | 200 OK (no body) |
| OPTIONS | Get allowed methods | ✅ Yes | ✅ Yes | ❌ No | 200 OK + Allow header |

**Note:** PATCH can be idempotent depending on implementation (JSON Patch vs JSON Merge Patch)

---

### URL Structure Best Practices

**Pattern:** `/{version}/{resource}/{id}/{sub-resource}/{sub-id}`

| Pattern | Example | Description |
|---------|---------|-------------|
| **Collection** | `GET /api/v1/users` | Retrieve all users (with pagination) |
| **Specific resource** | `GET /api/v1/users/{id}` | Retrieve single user by ID |
| **Sub-resource** | `GET /api/v1/users/{id}/orders` | Retrieve user's orders |
| **Specific sub-resource** | `GET /api/v1/users/{id}/orders/{orderId}` | Retrieve specific order for user |
| **Actions** | `POST /api/v1/users/{id}/reset-password` | Non-CRUD action (use POST) |
| **Search/filter** | `GET /api/v1/users?role=admin&active=true` | Filter collection with query params |

### ✅ Good URL Examples

```
GET    /api/v1/patients                    # List all patients
POST   /api/v1/patients                    # Create new patient
GET    /api/v1/patients/{id}               # Get patient by ID
PUT    /api/v1/patients/{id}               # Replace patient (full update)
PATCH  /api/v1/patients/{id}               # Update patient (partial)
DELETE /api/v1/patients/{id}               # Delete patient
GET    /api/v1/patients/{id}/appointments  # Get patient's appointments
POST   /api/v1/patients/{id}/appointments  # Create appointment for patient
POST   /api/v1/auth/login                  # Login action
POST   /api/v1/auth/logout                 # Logout action
POST   /api/v1/patients/{id}/activate      # Activate patient account
```

### ❌ Bad URL Examples (Anti-Patterns)

```
❌ GET    /api/v1/getPatients              # Don't use verbs in URLs
   ✅ GET    /api/v1/patients

❌ POST   /api/v1/createPatient            # Method already indicates action
   ✅ POST   /api/v1/patients

❌ GET    /api/v1/patients/delete/{id}     # GET should be safe (read-only)
   ✅ DELETE /api/v1/patients/{id}

❌ POST   /api/v1/patient                  # Use plural nouns
   ✅ POST   /api/v1/patients

❌ GET    /api/v1/patients?id=123          # Use path params for resource IDs
   ✅ GET    /api/v1/patients/123

❌ GET    /api/v1/patientsAndAppointments  # One resource per endpoint
   ✅ GET    /api/v1/patients/{id}?include=appointments
```

---

### HTTP Status Codes (Standard Usage)

**Success Codes (2xx):**

| Code | Name | When to Use | Response Body |
|------|------|-------------|---------------|
| 200 | OK | Successful GET, PUT, PATCH, or DELETE with content | ✅ Yes (data) |
| 201 | Created | Successful POST (resource created) | ✅ Yes (created resource) + Location header |
| 204 | No Content | Successful DELETE or PUT/PATCH with no response body | ❌ No |
| 206 | Partial Content | Successful range request (pagination, streaming) | ✅ Yes (partial data) |

**Client Error Codes (4xx):**

| Code | Name | When to Use | Response Body |
|------|------|-------------|---------------|
| 400 | Bad Request | Malformed request, validation error | ✅ Yes (error details) |
| 401 | Unauthorized | Missing or invalid authentication | ✅ Yes (error message) |
| 403 | Forbidden | Authenticated but not authorized | ✅ Yes (error message) |
| 404 | Not Found | Resource doesn't exist | ✅ Yes (error message) |
| 409 | Conflict | Resource conflict (duplicate email, version mismatch) | ✅ Yes (conflict details) |
| 422 | Unprocessable Entity | Validation error (well-formed but semantically invalid) | ✅ Yes (validation errors) |
| 429 | Too Many Requests | Rate limit exceeded | ✅ Yes (retry-after header) |

**Server Error Codes (5xx):**

| Code | Name | When to Use | Response Body |
|------|------|-------------|---------------|
| 500 | Internal Server Error | Unexpected server error | ✅ Yes (generic error message) |
| 502 | Bad Gateway | Upstream service error | ✅ Yes (error message) |
| 503 | Service Unavailable | Temporary service outage | ✅ Yes (error message + retry-after) |
| 504 | Gateway Timeout | Upstream service timeout | ✅ Yes (error message) |

**Examples:**

```typescript
// ✅ Good: Specific status code for the situation
app.post('/api/v1/users', async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json(user); // 201 Created
  } catch (error) {
    if (error.code === 'DUPLICATE_EMAIL') {
      return res.status(409).json({ error: 'Email already exists' }); // 409 Conflict
    }
    throw error;
  }
});

// ❌ Bad: Generic status codes for everything
app.post('/api/v1/users', async (req, res) => {
  const user = await createUser(req.body);
  return res.status(200).json(user); // Should be 201 Created
});
```

---

### API Versioning Strategies

**Strategy 1: URL Path Versioning (Recommended)**

```
✅ Recommended for most APIs
GET /api/v1/patients
GET /api/v2/patients

Pros:
- Easy to understand
- Easy to route
- Clear version in logs
- Browser-friendly

Cons:
- URL changes on version upgrade
```

**Strategy 2: Header Versioning**

```
✅ Good for complex APIs with many versions
GET /api/patients
Header: Accept: application/vnd.mycure.v2+json

Pros:
- URL stays the same
- Multiple versions in parallel

Cons:
- Harder to debug
- Not browser-friendly
```

**Strategy 3: Query Parameter Versioning**

```
❌ Not recommended (but sometimes necessary for legacy APIs)
GET /api/patients?version=2

Pros:
- Easy to implement

Cons:
- Query params typically for filtering, not versioning
- Can conflict with other query params
```

**Recommended:** Use **URL path versioning** (`/api/v1/`) for simplicity and clarity.

---

### Pagination Standards

**Use cursor-based pagination for large datasets:**

**Request:**
```
GET /api/v1/patients?limit=20&cursor=eyJpZCI6MTIzfQ==
```

**Response:**
```json
{
  "data": [ /* 20 patient records */ ],
  "pagination": {
    "nextCursor": "eyJpZCI6MTQzfQ==",
    "prevCursor": "eyJpZCI6MTAzfQ==",
    "hasMore": true,
    "limit": 20
  }
}
```

**Use offset-based pagination for small datasets (<10,000 records):**

**Request:**
```
GET /api/v1/patients?limit=20&offset=40
```

**Response:**
```json
{
  "data": [ /* 20 patient records */ ],
  "pagination": {
    "limit": 20,
    "offset": 40,
    "total": 1523,
    "totalPages": 77,
    "currentPage": 3
  }
}
```

---

### Error Response Format (Standardized)

**Standard error response structure:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed for one or more fields",
    "details": [
      {
        "field": "email",
        "message": "Email is required",
        "code": "REQUIRED_FIELD"
      },
      {
        "field": "age",
        "message": "Age must be at least 18",
        "code": "MIN_VALUE"
      }
    ],
    "timestamp": "2025-11-24T10:30:00Z",
    "path": "/api/v1/users",
    "requestId": "req_abc123"
  }
}
```

**Field descriptions:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `error.code` | string | ✅ Yes | Machine-readable error code (SCREAMING_SNAKE_CASE) |
| `error.message` | string | ✅ Yes | Human-readable error message |
| `error.details` | array | ❌ No | Array of specific errors (for validation) |
| `error.timestamp` | string | ✅ Yes | ISO 8601 timestamp |
| `error.path` | string | ✅ Yes | API endpoint that errored |
| `error.requestId` | string | ✅ Yes | Unique request ID for debugging |

---

### Authentication & Authorization

**Recommended: JWT Bearer Token (stateless)**

**Pattern:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**JWT Payload (Minimum):**
```json
{
  "sub": "user_123",           // Subject (user ID)
  "iat": 1732449600,           // Issued at (Unix timestamp)
  "exp": 1732453200,           // Expires at (1 hour later)
  "roles": ["admin", "doctor"], // User roles
  "clinicId": "clinic_456"     // Context (if multi-tenant)
}
```

**Security Best Practices:**

| Practice | Recommendation | Rationale |
|----------|----------------|-----------|
| Token expiry | 15 min (access) + 7 days (refresh) | Short-lived access tokens, long-lived refresh |
| Algorithm | RS256 (asymmetric) or HS256 (symmetric) | RS256 for microservices, HS256 for monoliths |
| Secret rotation | Every 90 days | Limits damage from compromised secrets |
| HTTPS only | ✅ Always | Prevents token interception |
| HttpOnly cookies | ✅ For refresh tokens | Prevents XSS attacks |

**Example middleware:**

```typescript
// ✅ Good: Secure JWT validation
import { verifyJWT } from './auth';

export async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      error: {
        code: 'MISSING_TOKEN',
        message: 'Authentication required',
        timestamp: new Date().toISOString(),
        path: req.path,
        requestId: req.id
      }
    });
  }

  try {
    const payload = await verifyJWT(token);
    req.user = payload; // Attach user to request
    next();
  } catch (error) {
    return res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired token',
        timestamp: new Date().toISOString(),
        path: req.path,
        requestId: req.id
      }
    });
  }
}
```

</reference>

---

## OpenAPI 3.1 Specification

<reference>
### Complete OpenAPI Template

```yaml
openapi: 3.1.0
info:
  title: MYCURE Patient API
  version: 1.0.0
  description: |
    RESTful API for managing patient records, appointments, and medical history.

    **Authentication:** Bearer token (JWT)
    **Base URL:** https://api.mycure.ph/v1
  contact:
    name: MYCURE API Support
    email: api-support@mycure.ph
    url: https://docs.mycure.ph
  license:
    name: Proprietary
    url: https://mycure.ph/terms

servers:
  - url: https://api.mycure.ph/v1
    description: Production
  - url: https://staging-api.mycure.ph/v1
    description: Staging
  - url: http://localhost:3000/v1
    description: Local development

tags:
  - name: Patients
    description: Patient management endpoints
  - name: Appointments
    description: Appointment scheduling endpoints
  - name: Authentication
    description: Auth endpoints (login, logout, refresh)

paths:
  /patients:
    get:
      summary: List all patients
      description: Retrieve a paginated list of patients with optional filtering
      tags:
        - Patients
      security:
        - bearerAuth: []
      parameters:
        - name: limit
          in: query
          description: Number of results per page
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
        - name: cursor
          in: query
          description: Cursor for pagination (base64-encoded)
          schema:
            type: string
        - name: search
          in: query
          description: Search by name, email, or patient ID
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Patient'
                  pagination:
                    $ref: '#/components/schemas/CursorPagination'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '500':
          $ref: '#/components/responses/InternalServerError'

    post:
      summary: Create new patient
      description: Create a new patient record
      tags:
        - Patients
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreatePatientRequest'
      responses:
        '201':
          description: Patient created successfully
          headers:
            Location:
              description: URL of the created patient
              schema:
                type: string
                example: /api/v1/patients/pat_abc123
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Patient'
        '400':
          $ref: '#/components/responses/ValidationError'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '409':
          $ref: '#/components/responses/Conflict'

  /patients/{patientId}:
    get:
      summary: Get patient by ID
      tags:
        - Patients
      security:
        - bearerAuth: []
      parameters:
        - $ref: '#/components/parameters/PatientId'
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Patient'
        '404':
          $ref: '#/components/responses/NotFound'

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  parameters:
    PatientId:
      name: patientId
      in: path
      required: true
      description: Unique patient identifier
      schema:
        type: string
        pattern: '^pat_[a-zA-Z0-9]+$'
        example: pat_abc123

  schemas:
    Patient:
      type: object
      required:
        - id
        - firstName
        - lastName
        - email
        - createdAt
      properties:
        id:
          type: string
          example: pat_abc123
        firstName:
          type: string
          example: Juan
        lastName:
          type: string
          example: Dela Cruz
        email:
          type: string
          format: email
          example: juan.delacruz@example.com
        phone:
          type: string
          example: '+63 917 123 4567'
        dateOfBirth:
          type: string
          format: date
          example: '1990-05-15'
        createdAt:
          type: string
          format: date-time
          example: '2025-11-24T10:30:00Z'
        updatedAt:
          type: string
          format: date-time
          example: '2025-11-24T10:30:00Z'

    CreatePatientRequest:
      type: object
      required:
        - firstName
        - lastName
        - email
      properties:
        firstName:
          type: string
          minLength: 1
          maxLength: 100
        lastName:
          type: string
          minLength: 1
          maxLength: 100
        email:
          type: string
          format: email
        phone:
          type: string
          pattern: '^\+63 9\d{2} \d{3} \d{4}$'
        dateOfBirth:
          type: string
          format: date

    CursorPagination:
      type: object
      properties:
        nextCursor:
          type: string
          nullable: true
        prevCursor:
          type: string
          nullable: true
        hasMore:
          type: boolean
        limit:
          type: integer

    Error:
      type: object
      required:
        - code
        - message
        - timestamp
        - path
        - requestId
      properties:
        code:
          type: string
          example: VALIDATION_ERROR
        message:
          type: string
          example: Validation failed
        details:
          type: array
          items:
            type: object
            properties:
              field:
                type: string
              message:
                type: string
              code:
                type: string
        timestamp:
          type: string
          format: date-time
        path:
          type: string
        requestId:
          type: string

  responses:
    Unauthorized:
      description: Unauthorized - missing or invalid token
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: UNAUTHORIZED
              message: Authentication required
              timestamp: '2025-11-24T10:30:00Z'
              path: /api/v1/patients
              requestId: req_abc123

    ValidationError:
      description: Validation error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
          example:
            error:
              code: VALIDATION_ERROR
              message: Validation failed for one or more fields
              details:
                - field: email
                  message: Email is required
                  code: REQUIRED_FIELD
              timestamp: '2025-11-24T10:30:00Z'
              path: /api/v1/patients
              requestId: req_abc123

    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    Conflict:
      description: Resource conflict
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
```

</reference>

---

## Examples

<examples>
### Example 1: Design Patient Appointment API

**User Request:**
> "I need to design an API for scheduling patient appointments. Patients should be able to book, reschedule, and cancel appointments."

**Claude Response (with this skill activated):**

I'll design a RESTful API for patient appointment management following our API design standards.

**Resource Structure:**
- **Main resource:** `/patients/{patientId}/appointments`
- **Sub-resource:** `/appointments/{appointmentId}` (for direct access)

**Endpoints:**

```
# Patient-scoped operations
GET    /api/v1/patients/{patientId}/appointments          # List patient's appointments
POST   /api/v1/patients/{patientId}/appointments          # Create new appointment
GET    /api/v1/patients/{patientId}/appointments/{id}     # Get appointment details
PATCH  /api/v1/patients/{patientId}/appointments/{id}     # Reschedule appointment
DELETE /api/v1/patients/{patientId}/appointments/{id}     # Cancel appointment

# Direct appointment operations (for admins/doctors)
GET    /api/v1/appointments                               # List all appointments
GET    /api/v1/appointments/{id}                          # Get appointment by ID
```

**OpenAPI Specification:**

```yaml
/patients/{patientId}/appointments:
  post:
    summary: Schedule appointment
    tags:
      - Appointments
    security:
      - bearerAuth: []
    parameters:
      - name: patientId
        in: path
        required: true
        schema:
          type: string
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            required:
              - doctorId
              - datetime
              - type
            properties:
              doctorId:
                type: string
                example: doc_xyz789
              datetime:
                type: string
                format: date-time
                example: '2025-12-01T14:00:00+08:00'
              type:
                type: string
                enum: [consultation, followup, checkup]
              notes:
                type: string
    responses:
      '201':
        description: Appointment created
        headers:
          Location:
            schema:
              type: string
              example: /api/v1/appointments/apt_abc123
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Appointment'
      '409':
        description: Time slot not available
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: object
                  properties:
                    code:
                      type: string
                      example: TIME_SLOT_UNAVAILABLE
                    message:
                      type: string
                      example: 'The selected time slot is no longer available'
                    suggestedSlots:
                      type: array
                      items:
                        type: string
                        format: date-time
```

**Status Codes:**
- `201 Created` - Appointment successfully scheduled
- `400 Bad Request` - Invalid datetime format or missing required fields
- `404 Not Found` - Patient or doctor not found
- `409 Conflict` - Time slot already booked

**Result:**
- ✅ RESTful design (proper HTTP methods and status codes)
- ✅ Versioned (`/api/v1/`)
- ✅ Nested resource (`/patients/{id}/appointments`)
- ✅ OpenAPI 3.1 specification provided
- ✅ Proper error responses with suggestions

---

### Example 2: Review API Design for Security Issues

**User Request:**
> "Review this API endpoint for security issues"
>
> ```typescript
> app.get('/api/users/:userId/profile', async (req, res) => {
>   const profile = await db.users.findById(req.params.userId);
>   res.json(profile);
> });
> ```

**Claude Response (with this skill activated):**

**Security Issues Identified:**

1. **❌ No Authentication** - Anyone can access any user's profile
2. **❌ No Authorization** - No check if requesting user can view this profile
3. **❌ Sensitive Data Exposure** - Returning entire user object (may include password hash, internal IDs)
4. **❌ No Rate Limiting** - Vulnerable to enumeration attacks
5. **❌ No Input Validation** - userId not validated

**Secure Version:**

```typescript
import { authMiddleware } from './middleware/auth';
import { rateLimiter } from './middleware/rate-limit';

app.get(
  '/api/v1/users/:userId/profile',
  rateLimiter({ max: 100, windowMs: 60000 }), // 100 requests per minute
  authMiddleware, // Validate JWT token
  async (req, res) => {
    // Input validation
    if (!req.params.userId.match(/^usr_[a-zA-Z0-9]+$/)) {
      return res.status(400).json({
        error: {
          code: 'INVALID_USER_ID',
          message: 'User ID format is invalid',
          timestamp: new Date().toISOString(),
          path: req.path,
          requestId: req.id
        }
      });
    }

    // Authorization check (can only view own profile unless admin)
    const isOwnProfile = req.user.id === req.params.userId;
    const isAdmin = req.user.roles.includes('admin');

    if (!isOwnProfile && !isAdmin) {
      return res.status(403).json({
        error: {
          code: 'FORBIDDEN',
          message: 'You do not have permission to view this profile',
          timestamp: new Date().toISOString(),
          path: req.path,
          requestId: req.id
        }
      });
    }

    try {
      const user = await db.users.findById(req.params.userId);

      if (!user) {
        return res.status(404).json({
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
            timestamp: new Date().toISOString(),
            path: req.path,
            requestId: req.id
          }
        });
      }

      // Only return safe fields (no password, internal IDs)
      const safeProfile = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt
      };

      return res.status(200).json(safeProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred',
          timestamp: new Date().toISOString(),
          path: req.path,
          requestId: req.id
        }
      });
    }
  }
);
```

**Security improvements:**
- ✅ JWT authentication required
- ✅ Authorization check (own profile or admin)
- ✅ Input validation (userId format)
- ✅ Rate limiting (prevents enumeration)
- ✅ Sensitive data filtering (only safe fields returned)
- ✅ Proper error responses (standardized format)
- ✅ Error logging (for debugging without exposing internals)

</examples>

---

## Best Practices

<best_practices>
### Do's ✅

1. **Use nouns for resources, not verbs**
   - Why: HTTP methods already indicate the action
   - Example: `POST /api/v1/patients` NOT `POST /api/v1/createPatient`

2. **Always version your API**
   - Why: Allows backward-compatible changes without breaking clients
   - Example: `/api/v1/patients` NOT `/api/patients`

3. **Use proper HTTP status codes**
   - Why: Standardized, machine-readable responses
   - Example: `201 Created` for POST, `204 No Content` for DELETE

4. **Paginate collections**
   - Why: Prevents timeouts and memory issues with large datasets
   - Example: Use cursor-based pagination for datasets >10,000 records

5. **Document with OpenAPI 3.1**
   - Why: Auto-generates SDKs, enables API explorers, provides single source of truth
   - Example: Maintain `openapi.yaml` alongside code

---

### Don'ts ❌

1. **Never use verbs in URLs**
   - Why not: Redundant with HTTP methods, violates REST principles
   - Instead: Use HTTP methods (GET, POST, PUT, PATCH, DELETE)

2. **Never return raw database objects**
   - Why not: Exposes internal fields, password hashes, foreign keys
   - Instead: Use DTOs (Data Transfer Objects) with only safe fields

3. **Never skip authentication for "internal" endpoints**
   - Why not: Internal services can be compromised, SSRF attacks exist
   - Instead: Always require authentication, even for internal APIs

4. **Never use query params for resource IDs**
   - Why not: Resource IDs belong in the path
   - Instead: `GET /api/v1/patients/123` NOT `GET /api/v1/patients?id=123`

5. **Never return different response formats based on status code**
   - Why not: Inconsistent, hard to parse
   - Instead: Always use standard error format (even for 2xx errors with warnings)
</best_practices>

---

## Changelog

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-11-24 | 1.0 | Initial skill creation | Backend Team |

---

## Related Resources

**Skills:**
- [Security Best Practices](../../skills/_backend/security/SKILL.md)
- [Database Design Patterns](../../skills/_backend/database/SKILL.md)

**Commands:**
- [/generate-openapi](../../commands/generate-openapi.md) - Generate OpenAPI spec from code
- [/review-code](../../commands/review-code.md) - Security-focused code review

**Workflows:**
- [API Development Workflow](../../workflows/api-development-workflow.md) - Design → Implement → Test → Document

**Templates:**
- [OpenAPI Template](../openapi-template.yaml) - Complete OpenAPI 3.1 spec template

**Documentation:**
- [API Security Checklist](../../docs/api-security-checklist.md) - Pre-launch security validation
