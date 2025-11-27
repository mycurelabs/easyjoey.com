# Research-Driven Development Example

**Pattern:** Evidence-based feature development from research to production

**When to use:** Developing new features, major enhancements, validating product direction

**Agents/Skills used:** `research-synthesis-guidelines` → `frontend-design` → `healthcare-ux-guidelines` → `development-plan-reviewer` → Validation

**Workflow:** [Research to Implementation](../../../workflows/research-to-implementation.md)

---

## Pattern Overview

This pattern ensures features are built on HIGH confidence research, designed with healthcare compliance, systematically planned, and validated before release. It prevents building features nobody needs.

```
┌──────────────────────────────┐
│ Phase 1: Research Synthesis  │
│ • Define question            │
│ • Gather evidence (3+ sources)│
│ • Grade confidence (H/M/L)   │
│ • Triangulate findings       │
└──────────┬───────────────────┘
           │
           ▼ HIGH confidence?
┌──────────────────────────────┐
│ Phase 2: Design              │
│ • UI mockups (frontend-design)│
│ • WCAG validation            │
│ • Patient safety language    │
└──────────┬───────────────────┘
           │
           ▼ WCAG passes?
┌──────────────────────────────┐
│ Phase 3: Planning            │
│ • Technical spec             │
│ • Plan review (dev-plan-reviewer)│
│ • Risk assessment            │
└──────────┬───────────────────┘
           │
           ▼ Plan approved?
┌──────────────────────────────┐
│ Phase 4: Implementation      │
│ • Build feature              │
│ • Maintain compliance        │
│ • Code review                │
└──────────┬───────────────────┘
           │
           ▼ Tests pass?
┌──────────────────────────────┐
│ Phase 5: Validation          │
│ • User testing (original users)│
│ • Measure against hypothesis │
│ • Document validation        │
└──────────┬───────────────────┘
           │
           ▼ Validation successful?
┌──────────────────────────────┐
│ Ship to Production           │
└──────────────────────────────┘
```

---

## Complete Example: Multi-Location Stock Transfer Feature

### Background

**Sales Feedback:** 3 sales calls mentioned "clinics want to transfer stock between locations, but manual tracking in Excel is time-consuming"

**Question:** Should we build multi-location stock transfer functionality? If so, what are the requirements?

**Goal:** Make data-driven decision with HIGH confidence evidence

---

## Phase 1: Research Synthesis

**Agent/Skill:** `research-synthesis-guidelines`

**Command:** `/research-evidence`

### Step 1: Define Research Question

```markdown
## Research Question
Do Philippine clinic administrators need multi-location stock transfer functionality?

**Why we're asking:** Manual tracking reported as pain point in 3 sales calls

**Decision impact:** Major feature (3-4 weeks development, ongoing maintenance)

**Required confidence level:** HIGH (3+ sources, primary research, PH-specific, recent, consistent)
```

### Step 2: Gather Evidence

**Primary Research (conducted by team):**

1. **User Interviews (June 10-15, 2024)**
   - Interviewed 10 clinic administrators
   - Question: "Do you operate multiple clinic locations? How do you handle stock transfers between locations?"
   - Results:
     - 8/10 operate 2+ locations
     - 8/8 multi-location clinics transfer stock 2-3 times per week
     - 7/8 use manual Excel tracking
     - Average time per transfer: 15-20 minutes reported

2. **Direct Observation (June 10-12, 2024)**
   - Observed 3 clinics during stock transfer process
   - Witnessed manual process:
     - Check source clinic inventory (Excel)
     - Call destination clinic to confirm need
     - Record transfer in Excel (source + destination)
     - Physical delivery (driver logs on paper)
     - Reconcile inventories next day
   - Measured time: 17.2 minutes average (n=9 transfers)
   - Observed pain points:
     - Excel files not synced (version conflicts)
     - Phone calls interrupt workflows
     - Manual reconciliation error-prone

3. **Survey (June 2024)**
   - 52 clinic administrators surveyed
   - 42% operate 2+ locations
   - 80% of multi-location clinics transfer stock weekly
   - 65% spend >10 minutes per transfer

**Secondary Research:**

4. **DOH Philippine Health Facility Survey (2023)**
   - Source: Department of Health, page 42
   - Finding: "42% of private clinics operate 2+ locations"
   - Context: Metro Manila (35%), provincial (48%)
   - Validates market size

**Internal Data:**

5. **Support Tickets (Past 6 months)**
   - 12 tickets requesting "inventory transfer between branches"
   - 8 tickets about "Excel inventory conflicts"

6. **Pilot Clinic Feedback (May 2024)**
   - Clinic A: "We need stock transfer. We're using Excel and it's painful."
   - Clinic B: "Can MYCURE track transfers between our 3 locations?"

### Step 3: Grade Confidence

**Confidence Checklist:**
- ✅ 3+ independent sources? YES (6 sources: interview + observation + survey + DOH + tickets + pilot)
- ✅ Primary research included? YES (interviews + observation + survey)
- ✅ Recent data (within 2 years)? YES (all data from 2023-2024)
- ✅ Philippine-specific? YES (Philippine clinics, DOH report)
- ✅ Consistent across sources? YES (all confirm need, no contradictions)

**Confidence Grade:** ✅ **HIGH CONFIDENCE**

### Step 4: Triangulate Findings

```markdown
## Finding: Multi-location stock transfer is essential [HIGH CONFIDENCE]

**Summary:**
80% of multi-location clinics transfer stock 2-3 times per week, spending 15-20 minutes per transfer on manual Excel tracking.

**Evidence:**

1. **Interview (Primary Research)** - 8 clinic administrators, June 2024
   - Direct quote, Dr. Santos (Clinic A): "We transfer stock between our 3 branches 2-3 times weekly. Excel tracking takes 15-20 minutes per transfer. We've had errors from file version conflicts."

2. **Observation (Primary Research)** - 3 clinics, 9 transfers observed, June 2024
   - Measured time: 17.2 minutes average (range: 14-21 min)
   - Observed: Excel version conflicts, phone call interruptions, manual reconciliation errors

3. **Survey (Primary Research)** - 52 clinic admins, June 2024
   - 42% operate 2+ locations
   - 80% of multi-location transfer stock weekly
   - 65% spend >10 minutes per transfer

4. **DOH Report (Secondary Research)** - 2023 Health Facility Survey
   - 42% of private clinics operate 2+ locations
   - Validates market size

5. **Support Tickets (Internal Data)** - Past 6 months
   - 12 tickets requesting transfer feature
   - 8 tickets about Excel conflicts

6. **Pilot Clinics (Internal Data)** - May 2024
   - 2 pilot clinics explicitly requested this feature

**Triangulation:**
- Data Triangulation: Qualitative (interviews) + Quantitative (survey, observation timing) + Archival (DOH report)
- Method Triangulation: Interviews (what they say) + Observation (what they actually do) + Survey (what they report)
- Context Triangulation: Urban clinics + Provincial clinics + Various clinic sizes

**Limitations:**
- Geographic: Metro Manila focused (8/10 interviews urban), rural multi-location clinics underrepresented
- Sample size: 10 interviews (adequate for HIGH confidence, but not exhaustive)
- Observation: Only 3 clinics observed (would benefit from more observations)

**Implications:**
- Market opportunity: 42% of private clinics (sizeable segment)
- Pain point validated: 15-20 minutes per transfer is significant time waste
- Frequency: 2-3 times per week = 30-60 minutes weekly (2-4 hours monthly)
- Time savings potential: If MYCURE reduces to 3-5 minutes → 66-75% time savings

**Recommendations:**
- PROCEED with full implementation (HIGH confidence justifies investment)
- Prioritize: Excel import/export (74% currently use Excel)
- Offline support: Rural clinics may have unreliable internet
- Mobile-first: Administrators often away from desk
```

### Decision Gate 1: Confidence Level

**Assessment:** HIGH confidence ✅

**Decision:** Proceed to Phase 2 (Design)

---

## Phase 2: Design

**Skills:** `frontend-design` + `healthcare-ux-guidelines`

**Commands:** `/design-ui` + `/audit-wcag`

### Step 1: UI Design

**Prompt to frontend-design:**
```
Design a multi-location stock transfer interface for MYCURE.

**Context from research:**
- Users: Clinic administrators, pharmacists
- Usage: 2-3 times per week (not daily, so discoverability important)
- Device: 60% mobile, 40% desktop (research finding)
- Digital literacy: Medium (based on observation)

**Requirements from research:**
- Select source and destination locations
- Enter item, quantity, lot number
- Validate sufficient stock at source
- Create audit trail (who, what, when, where, why)
- Work offline (rural clinics)

**MYCURE Standards:**
- Typography: JetBrains Mono for lot numbers (zero-ambiguity)
- Colors: MYCURE Clinical palette (Clinical Blue #0066CC)
- Animation: Healthcare-optimized (100ms for status updates)
```

**frontend-design Output:**

```markdown
## UI Design: Multi-Location Stock Transfer

### Component Hierarchy

**Dashboard Widget** (Discoverability)
```
┌──────────────────────────────────┐
│ Inventory Management             │
├──────────────────────────────────┤
│ [Transfer Stock Between Locations] │ ← Clinical Blue button
│ [Adjust Stock Levels]            │
│ [View Low Stock Alerts]          │
└──────────────────────────────────┘
```

**Transfer Modal** (Mobile-First Design)
```
┌──────────────────────────────────┐
│ ✕  Transfer Stock                │
├──────────────────────────────────┤
│ From Location *                  │
│ [Dropdown: Main Clinic ▼]        │
│                                  │
│ To Location *                    │
│ [Dropdown: Branch 2 ▼]           │
│                                  │
│ Item *                           │
│ [Dropdown: Amoxicillin 500mg ▼]  │
│ Available: 1,200 units           │
│                                  │
│ Quantity *                       │
│ [Input: 500        units]        │
│                                  │
│ Lot Number *                     │
│ [Input: LOT2024-001]  (JetBrains Mono) │
│                                  │
│ Reason                           │
│ [Textarea: Branch 2 low stock]   │
│                                  │
│ [Cancel]  [Transfer Stock →]     │
└──────────────────────────────────┘
```

### Typography

- **Headlines:** Space Grotesk, 24px bold ("Transfer Stock")
- **Labels:** IBM Plex Sans, 14px medium ("From Location", "To Location")
- **Lot Numbers:** JetBrains Mono, 16px regular (zero-ambiguity for LOT2024-001 vs LOT2O24-OO1)
- **Body:** IBM Plex Sans, 14px regular

### Color Palette

- **Primary Action:** Clinical Blue #0066CC ("Transfer Stock" button)
- **Success:** Medical Green #00A86B (confirmation message)
- **Text:** Near-black #333333 (AAA contrast)
- **Borders:** Light Gray #E0E0E0

### Animation

- **Stock validation:** 100ms fade-in (fast feedback when quantity entered)
- **Modal open/close:** 200ms ease-out
- **Button hover:** 100ms background color transition

### Mobile Optimization

- Touch targets: 48x48px minimum (exceeds WCAG 44x44px)
- Dropdowns: Native mobile pickers (better UX than custom dropdowns)
- Keyboard: Auto-advance from quantity → lot number
```

### Step 2: WCAG Validation

**Prompt to healthcare-ux-guidelines:**
```
Audit the stock transfer interface for WCAG 2.2 Level AA compliance.

Focus on:
- Color contrast (4.5:1 text, 3:1 UI)
- Keyboard navigation
- Screen reader compatibility
- Touch targets (44x44px minimum)
- Form labels
```

**healthcare-ux-guidelines Output:**

```markdown
## WCAG 2.2 Level AA Audit: Stock Transfer Interface

### Color Contrast ✅

- Clinical Blue button (#0066CC) on white background: **7.2:1** (AAA) ✅
- Text (#333333) on white: **12.6:1** (AAA) ✅
- Medical Green success (#00A86B) on white: **7.5:1** (AAA) ✅
- All elements exceed 4.5:1 minimum (AAA preferred for healthcare)

### Keyboard Navigation ✅

- Tab order: From → To → Item → Quantity → Lot Number → Reason → Cancel → Transfer
- All dropdowns keyboard accessible (Arrow keys to navigate, Enter to select)
- Modal opens: Focus moves to first field (From Location)
- Modal closes: Focus returns to "Transfer Stock" button
- Escape key closes modal
- No keyboard traps detected

### Screen Reader ✅

```html
<label for="from-location">
  From Location
  <span aria-label="required">*</span>
</label>
<select id="from-location" aria-required="true">
  <option>Main Clinic</option>
</select>

<label for="quantity">
  Quantity
  <span aria-label="required">*</span>
</label>
<input
  id="quantity"
  type="number"
  aria-required="true"
  aria-describedby="quantity-help"
/>
<span id="quantity-help">
  Available: 1,200 units at Main Clinic
</span>
```

- All form fields have visible labels ✅
- Required fields marked with aria-required="true" ✅
- Help text linked with aria-describedby ✅
- Error messages announced with aria-live ✅

### Touch Targets ✅

- All buttons: 48x48px (exceeds 44x44px minimum) ✅
- Dropdowns: 48px height ✅
- Inputs: 48px height ✅
- Adequate spacing: 8px between elements ✅

### Patient Safety Language ✅

**Error Messages:**

| Scenario | ❌ Avoid | ✅ Use |
|----------|---------|--------|
| Insufficient stock | "Transfer failed - not enough stock" | "Unable to complete transfer. Requested quantity (500) exceeds available stock (300)." |
| Invalid lot number | "Invalid lot number format" | "Please check the lot number and try again." |
| Network error | "Transfer failed - error 500" | "Unable to process transfer. Your data is saved and will sync when connected." |

All error messages calm, specific, actionable ✅

### Philippine Context ✅

- Offline support: Modal saves to IndexedDB, syncs when connected ✅
- Mobile-responsive: Tested on iOS and Android ✅
- Low bandwidth: Total payload <50KB ✅

### Decision: WCAG Compliant ✅

All WCAG 2.2 Level AA criteria met. Approved for implementation.
```

### Decision Gate 2: WCAG Compliance

**Assessment:** All criteria met ✅

**Decision:** Proceed to Phase 3 (Planning)

---

## Phase 3: Planning

**Agent:** `development-plan-reviewer`

**Command:** `/plan-refactor` (adapted for new feature)

### Technical Specification

**Prompt to development-plan-reviewer:**
```
Review the implementation plan for multi-location stock transfer.

**Requirements:**
- Transfer stock between clinic locations
- Validate sufficient stock before transfer
- Create audit trail (who, what, when, where, why)
- Work offline (rural clinics)
- Mobile-responsive

**Proposed Architecture:**
- Backend: GraphQL mutation `initiateStockTransfer`
- Frontend: React component `StockTransferModal`
- Database: `stock_transfers` table
- Offline: IndexedDB with sync queue

Validate feasibility, identify risks, estimate resources.
```

**development-plan-reviewer Output:**

```markdown
## Implementation Plan Review: Stock Transfer Feature

### Technical Feasibility ✅

**Architecture Assessment:**
- GraphQL mutation: ✅ Consistent with existing API patterns
- React component: ✅ Fits within current component architecture
- Database schema: ✅ Normalizedstorage, proper foreign keys
- Offline sync: ✅ IndexedDB used in existing features (proven pattern)

### Database Schema

```sql
CREATE TABLE stock_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_location_id UUID NOT NULL REFERENCES clinic_locations(id),
  to_location_id UUID NOT NULL REFERENCES clinic_locations(id),
  item_id UUID NOT NULL REFERENCES inventory_items(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  lot_number VARCHAR(50) NOT NULL,
  reason TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, in_transit, completed, cancelled
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  CONSTRAINT different_locations CHECK (from_location_id != to_location_id)
);

CREATE INDEX idx_transfers_from ON stock_transfers(from_location_id);
CREATE INDEX idx_transfers_to ON stock_transfers(to_location_id);
CREATE INDEX idx_transfers_status ON stock_transfers(status);
CREATE INDEX idx_transfers_created_at ON stock_transfers(created_at DESC);
```

### API Endpoints

**GraphQL Mutation:**
```graphql
mutation InitiateStockTransfer($input: StockTransferInput!) {
  initiateStockTransfer(input: $input) {
    transfer {
      id
      fromLocation { id, name }
      toLocation { id, name }
      item { id, name }
      quantity
      lotNumber
      status
      createdBy { id, name }
      createdAt
    }
    errors {
      field
      message
    }
  }
}

input StockTransferInput {
  fromLocationId: ID!
  toLocationId: ID!
  itemId: ID!
  quantity: Int!
  lotNumber: String!
  reason: String
}
```

**Validation Rules:**
1. `fromLocationId` != `toLocationId`
2. Sufficient stock at source location (quantity <= available)
3. Lot number exists at source location
4. User has permission for both locations
5. Item active (not discontinued)

### Resource Estimation

**Development:**
- Backend API (mutation, validation, audit log): **16 hours**
- Frontend component (modal, form, validation): **24 hours**
- Offline sync (IndexedDB queue, conflict resolution): **16 hours**
- Testing (unit, integration, E2E): **12 hours**
- Documentation: **4 hours**

**Total:** 72 hours = **9 days** (2 developers, 1.5 weeks with buffer)

**Dependencies:**
- None (all dependencies on existing features are optional)

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Offline sync conflicts (simultaneous transfers) | Medium | High | Implement last-write-wins with manual override UI. Show conflict warning to user. |
| Network timeout on 3G (large payload) | High | Medium | Optimize payload (<50KB). Implement retry logic with exponential backoff. |
| PhilHealth audit requirements unclear | Low | High | Consult with PhilHealth liaison. Design flexible audit log schema. Add fields later if needed. |
| User transfers more than available (race condition) | Low | Medium | Database constraint + optimistic locking. Show error if stock changed since validation. |

### Implementation Sequence

**Phase 1: Core Backend (Days 1-3)**
- Database schema migration
- GraphQL mutation (basic)
- Validation logic
- Audit trail logging

**Phase 2: Frontend UI (Days 4-6)**
- React component
- Form validation
- Error handling (patient safety language)
- WCAG compliance verification

**Phase 3: Offline Sync (Days 7-8)**
- IndexedDB queue
- Sync logic (when reconnected)
- Conflict resolution UI

**Phase 4: Testing & Documentation (Day 9)**
- Unit tests (>80% coverage)
- Integration tests (API)
- E2E tests (user workflows)
- User documentation

### Philippine Healthcare Context

**FHISIS Compatibility:**
- Export format: Include transfer data in inventory reports
- Date format: YYYY-MM-DD (matches FHISIS)

**PhilHealth Requirements:**
- Audit trail: ✅ who (created_by), what (all transfer details), when (timestamps), where (locations), why (reason field)
- Immutable records: ✅ No DELETE, only status updates (cancelled)

**LGU Deployment:**
- Offline-first: ✅ IndexedDB with sync
- Low bandwidth: ✅ Payload optimized (<50KB)
- Mobile-first: ✅ Responsive design

### Decision: Plan Approved ✅

**Strengths:**
- Clear architecture, consistent with existing patterns
- Comprehensive risk assessment with mitigations
- Realistic resource estimates (9 days reasonable)
- Healthcare compliance addressed (WCAG, audit trail, offline)

**Recommendations:**
1. Implement optimistic locking for race condition mitigation
2. Add telemetry to track offline sync success rate
3. Consider phased rollout (pilot clinics → all clinics)

**Approved for implementation.**
```

### Decision Gate 3: Plan Approval

**Assessment:** Plan approved ✅

**Decision:** Proceed to Phase 4 (Implementation)

---

## Phase 4: Implementation

**(Implementation details omitted for brevity - see [Feature Development Workflow](../../../workflows/feature-development-workflow.md))**

**Summary:**
- 9 days implementation (June 16-26, 2024)
- All requirements from research implemented
- WCAG compliant (verified with `/audit-wcag`)
- Patient safety language in all error messages
- Code review passed (security, performance, architecture validated)

---

## Phase 5: Validation

**Skill:** `research-synthesis-guidelines` (validation mode)

**Purpose:** Validate assumptions from original research

### User Testing

**Participants:** 8 clinic administrators (same 8 from original interviews in Phase 1)

**Method:** Think-aloud protocol, time on task

**Tasks:**
1. Transfer 50 units of Amoxicillin from Main Clinic to Branch 2
2. Transfer 100 units of Paracetamol with specific lot number
3. Check transfer history

**Metrics Collected:**

| Metric | Target (from research hypothesis) | Actual Result |
|--------|----------------------------------|---------------|
| Time per transfer | 3-5 minutes (66-75% reduction from 15-20 min) | **3.8 minutes average** (range: 3.2-4.5) |
| Success rate | 100% (no errors) | **100%** (24/24 transfers successful) |
| User satisfaction | "Valuable" or "Very valuable" | **8/8 rated "Very valuable" (5/5)** |
| Offline functionality | Works offline | ✅ **Tested, works** |

**Observations:**
- No confusion during workflows (intuitive UI)
- Zero errors (validation prevented all mistakes)
- 2 users initially didn't find "Transfer Stock" button (discoverability improved in v2)
- Lot number input with JetBrains Mono font well-received ("clear, no confusion")

### Validation Findings Documentation

```markdown
## Validation Study: Multi-Location Stock Transfer [HIGH CONFIDENCE]

**Summary:**
MYCURE's stock transfer feature reduced transfer time from 17.2 minutes (manual) to 3.8 minutes (75% reduction), confirming original research hypothesis.

**Evidence:**

1. **User testing (Primary Research)** - 8 clinic administrators, June 2024
   - Method: 24 transfers total (8 users × 3 transfers each)
   - Time: 3.8 minutes average (range: 3.2-4.5 minutes)
   - Success rate: 100% (0 errors)

2. **User feedback (Primary Research)** - 8 users, June 2024
   - Satisfaction: 8/8 rated "very valuable" (5/5 scale)
   - Direct quote: "This saves us so much time. Excel was a nightmare." - Dr. Santos

3. **Observation (Primary Research)** - Witnessed all 24 transfers
   - No confusion (workflows intuitive)
   - No errors (validation effective)
   - 2 users mentioned discoverability could be improved

**Triangulation:** User testing (quantitative) + User feedback (qualitative) + Observation = HIGH confidence

**Comparison to Original Research Hypothesis:**
- Original hypothesis: 66-75% time savings (from 15-20 min to 3-5 min)
- Actual result: 78% time savings (from 17.2 min to 3.8 min)
- **Hypothesis CONFIRMED ✅** (actual exceeds prediction)

**Limitations:**
- Same 8 users from original research (not new users, potential bias)
- Short-term testing (1 week), long-term adoption not measured
- Urban clinics only (rural offline testing pending)

**Confidence:** HIGH (user testing + metrics + feedback confirm original research)

**Decision:** ✅ Ship to production
```

### Decision Gate 4: Validation Success

**Assessment:** Validation confirms HIGH confidence ✅

**Decision:** Ship to production

---

## Phase 6: Ship to Production

**Final Checks:**
- [ ] ✅ WCAG conformance report signed
- [ ] ✅ Security review passed (no vulnerabilities)
- [ ] ✅ Performance tested (<2s on 3G)
- [ ] ✅ User documentation published
- [ ] ✅ Support team trained

**Deployment:** June 30, 2024

**Post-Launch Monitoring (First 30 days):**
- Actual time per transfer: **4.2 minutes average** (close to testing)
- Adoption: **78% of multi-location clinics using feature**
- Offline sync success rate: **99.2%** (4 conflicts, all resolved manually)
- Support tickets: **2 (minor UI questions)**

**Result:** ✅ Evidence-based feature that solves real problem, validated before and after implementation

---

## Key Takeaways

**Why use this pattern?**
- **Prevents waste:** HIGH confidence evidence ensures you build the right thing
- **Reduces risk:** Validation confirms assumptions before full rollout
- **Healthcare compliance:** WCAG built in from design phase (not retrofitted)
- **User-centered:** Based on actual user research, not assumptions

**Decision Gates are Critical:**
- Gate 1 (Research): Only proceed with HIGH confidence (prevents building wrong features)
- Gate 2 (WCAG): Must pass before implementation (prevents costly accessibility retrofits)
- Gate 3 (Planning): Must be feasible and low-risk (prevents technical debt)
- Gate 4 (Validation): Must confirm hypothesis (prevents shipping ineffective features)

**Time Investment vs. Payoff:**
- Research + Design + Planning: **~2 weeks**
- Implementation: **~2 weeks**
- Validation: **~1 week**
- Total: **~5 weeks** for validated, evidence-based feature
- Payoff: **78% time savings for 42% of target market** = High ROI

**When to use this pattern:**
- New features (not bug fixes)
- Major enhancements
- Strategic product decisions
- When user needs are unclear

**When NOT to use:**
- Bug fixes (just fix the bug)
- Minor UI tweaks
- Technical debt refactoring
- Well-understood requirements

**Related:**
- [Research to Implementation Workflow](../../../workflows/research-to-implementation.md) - Complete process
- [Feature Development Workflow](../../../workflows/feature-development-workflow.md) - Alternative approach
- [Confidence Grading Cheatsheet](../../../docs/confidence-grading-cheatsheet.md) - HIGH/MEDIUM/LOW framework
- [/research-evidence Command](../../../commands/research-evidence.md) - Document findings
