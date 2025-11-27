# Multi-Agent Code Review Example

**Pattern:** Sequential agent chaining for comprehensive code review

**When to use:** Before merging pull requests, before production deployments, during technical debt assessment

**Agents used:** `code-architecture-reviewer` → `code-simplicity-reviewer` → `security-sentinel` → `performance-oracle`

**Shortcut:** Run `/review-code` command to invoke this entire chain

---

## Pattern Overview

This pattern chains 4 specialized review agents sequentially to provide comprehensive code analysis. Each agent has a specific focus area and produces findings that feed into a consolidated action plan.

```
┌─────────────────────────────┐
│ Code Changes (PR/Feature)   │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Agent 1: Architecture       │
│ • SOLID principles          │
│ • Coupling/cohesion         │
│ • Pattern consistency       │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Agent 2: Simplicity         │
│ • Cyclomatic complexity     │
│ • Nesting depth             │
│ • Cognitive load            │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Agent 3: Security           │
│ • OWASP Top 10              │
│ • PHI protection            │
│ • Input validation          │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Agent 4: Performance        │
│ • Algorithm complexity      │
│ • N+1 queries               │
│ • Bundle size               │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ Consolidated Report         │
│ • Prioritized findings      │
│ • Action items              │
│ • Merge decision            │
└─────────────────────────────┘
```

---

## Complete Example: Patient Registration Module

### Context

A developer has implemented a new patient registration feature with:
- Database schema changes (new `patient_registrations` table)
- API endpoints (`POST /api/registrations`, `GET /api/registrations/:id`)
- Frontend form component (`PatientRegistrationForm.tsx`)
- 450 lines of code changes across 12 files

---

## Step 1: Architecture Review

**Agent:** `code-architecture-reviewer`

**Prompt:**
```
Review the patient registration module for architectural quality.

Focus on:
- SOLID principles compliance
- Coupling between components
- Consistency with existing patterns
- Healthcare context (FHISIS integration, PhilHealth requirements)
```

**Agent Output:**

```markdown
## Architecture Review: Patient Registration Module

### Strengths ✅

1. **Separation of Concerns**
   - Clear layers: Controller → Service → Repository
   - No business logic in controllers
   - Database access isolated in repository

2. **Dependency Injection**
   - Services injected via constructor
   - Testable, loosely coupled
   - Follows existing codebase patterns

3. **Naming Conventions**
   - Clear, descriptive function names
   - Consistent with MYCURE standards
   - No ambiguous abbreviations

### Issues ⚠️

1. **HIGH: Tight Coupling to BillingService**
   - Location: `src/services/registration-service.ts:78`
   - Issue: Direct instantiation of BillingService within RegistrationService
   - Impact: Cannot test RegistrationService without BillingService
   - Recommendation: Inject BillingService via constructor, use events for decoupling

2. **MEDIUM: Single Responsibility Violation**
   - Location: `src/validators/patient-validator.ts`
   - Issue: Validator contains both validation logic AND business rules
   - Impact: Mixed concerns, harder to maintain
   - Recommendation: Extract business rules to separate service

3. **MEDIUM: Inconsistent Error Handling**
   - Location: Multiple files
   - Issue: Some functions throw errors, others return error objects
   - Recommendation: Standardize on throwing custom error classes

### Coupling/Cohesion Score: 7/10
- Good cohesion within modules
- Some tight coupling between services (item #1)
```

**Key Findings:**
- 1 HIGH (tight coupling)
- 2 MEDIUM (SRP violation, inconsistent error handling)
- Overall architectural quality: Good with improvement areas

---

## Step 2: Simplicity Review

**Agent:** `code-simplicity-reviewer`

**Input:** Architecture review findings + code changes

**Prompt:**
```
Review the patient registration module for complexity.

Focus on:
- Cyclomatic complexity (threshold: 10)
- Nesting depth (threshold: 3 levels)
- Function length (threshold: 50 lines)
- Opportunities for simplification
```

**Agent Output:**

```markdown
## Simplicity Review: Patient Registration Module

### Complexity Hotspots 🔥

1. **HIGH: processRegistration() is too complex**
   - Location: `src/services/registration-service.ts:142-198`
   - Cyclomatic complexity: 15 (threshold: 10)
   - Line count: 57 lines
   - Nesting depth: 4 levels
   - Issue: Combines validation, transformation, persistence, and notification

   **Current Structure:**
   ```typescript
   async processRegistration(data: PatientData) {
     // Validation (15 lines)
     if (!data.name) throw new Error(...)
     if (!data.birthdate) throw new Error(...)
     // ... 10 more validations

     // Transformation (12 lines)
     const transformed = {
       ...data,
       fullName: `${data.firstName} ${data.lastName}`,
       // ... more transformations
     }

     // Persistence (18 lines)
     const patient = await this.patientRepo.create(transformed)
     const billing = await this.billingService.createAccount(patient)
     // ... more persistence

     // Notification (12 lines)
     await this.notificationService.send(...)
     // ... more notifications

     return patient
   }
   ```

   **Recommendation: Extract to separate functions**
   ```typescript
   async processRegistration(data: PatientData) {
     const validated = await this.validateRegistration(data)
     const transformed = this.transformPatientData(validated)
     const patient = await this.persistPatient(transformed)
     await this.notifyStakeholders(patient)
     return patient
   }

   private async validateRegistration(data) { /* 15 lines */ }
   private transformPatientData(data) { /* 12 lines */ }
   private async persistPatient(data) { /* 18 lines */ }
   private async notifyStakeholders(patient) { /* 12 lines */ }
   ```
   - New complexity: 4 functions × 2-3 each = 8-12 (within threshold)

2. **MEDIUM: Nested ternary operators**
   - Location: `src/utils/formatters.ts:28`
   - Issue: Hard to read
   ```typescript
   const status = isPending ? 'pending' : isApproved ? 'approved' : isRejected ? 'rejected' : 'unknown'
   ```
   - Recommendation: Use if/else or lookup table
   ```typescript
   const statusMap = { pending: isPending, approved: isApproved, rejected: isRejected }
   const status = Object.keys(statusMap).find(key => statusMap[key]) || 'unknown'
   ```

### Cognitive Load Assessment

**Overall: MEDIUM-HIGH**
- Most functions easy to understand (<5 min)
- `processRegistration()` requires 10-15 min to fully comprehend
- Reducing complexity in item #1 would bring to LOW-MEDIUM
```

**Key Findings:**
- 1 HIGH (complex function)
- 1 MEDIUM (nested ternaries)
- Cognitive load: MEDIUM-HIGH (reducible to LOW-MEDIUM)

---

## Step 3: Security Audit

**Agent:** `security-sentinel`

**Input:** Architecture + Simplicity findings + code changes

**Prompt:**
```
Audit the patient registration module for security vulnerabilities.

Focus on:
- OWASP Top 10
- PHI protection (patient health information)
- Input validation and sanitization
- Healthcare-specific security (HIPAA considerations)
```

**Agent Output:**

```markdown
## Security Audit: Patient Registration Module

### 🚨 Critical Vulnerabilities

1. **CRITICAL: PHI Exposed in Error Logs**
   - Location: `src/middleware/error-handler.ts:22`
   - Severity: CRITICAL
   - Details: Full patient object logged on error, includes sensitive PHI
   ```typescript
   catch (error) {
     logger.error('Registration failed', { patient, error })
     // ❌ DANGER: 'patient' contains PHI (birthdate, address, phone)
   }
   ```
   - Exploit: Logs accessible to support staff, PHI visible without audit trail
   - Remediation:
   ```typescript
   catch (error) {
     logger.error('Registration failed', {
       patientId: patient.id, // ✅ Non-PHI identifier only
       error: error.message
     })
   }
   ```

2. **CRITICAL: SQL Injection Vulnerability**
   - Location: `src/repositories/patient-repository.ts:56`
   - Severity: CRITICAL
   - Details: User input concatenated directly into SQL query
   ```typescript
   const query = `SELECT * FROM patients WHERE name LIKE '%${searchTerm}%'`
   // ❌ DANGER: searchTerm not sanitized
   ```
   - Exploit: Attacker can inject SQL: `'; DROP TABLE patients; --`
   - Remediation:
   ```typescript
   const query = 'SELECT * FROM patients WHERE name LIKE ?'
   const results = await db.query(query, [`%${searchTerm}%`])
   // ✅ Parameterized query prevents injection
   ```

### ⚠️ High Severity Issues

3. **HIGH: Missing Authentication on Admin Endpoint**
   - Location: `src/routes/admin-routes.ts:45`
   - Severity: HIGH
   - Details: `/api/admin/registrations` endpoint has no authentication middleware
   ```typescript
   router.get('/api/admin/registrations', getAllRegistrations)
   // ❌ DANGER: Anyone can access all patient registrations
   ```
   - Remediation:
   ```typescript
   router.get('/api/admin/registrations',
     authenticateUser,
     requireRole('admin'),
     getAllRegistrations
   )
   // ✅ Authentication + authorization enforced
   ```

4. **HIGH: Weak Password Validation**
   - Location: `src/validators/user-validator.ts:12`
   - Severity: HIGH
   - Details: Password must be only 6 characters
   ```typescript
   if (password.length < 6) throw new Error('Password too short')
   // ❌ DANGER: 6 characters easily brute-forced
   ```
   - Remediation:
   ```typescript
   if (password.length < 12) throw new Error('Password must be at least 12 characters')
   if (!/[A-Z]/.test(password)) throw new Error('Password must contain uppercase')
   if (!/[0-9]/.test(password)) throw new Error('Password must contain number')
   // ✅ Strong password requirements
   ```

### Medium Severity Issues

5. **MEDIUM: No Rate Limiting on Registration Endpoint**
   - Location: `src/routes/registration-routes.ts:8`
   - Recommendation: Add rate limiting middleware (10 requests/minute)

### Healthcare Compliance Assessment

- ✅ **PHI Encrypted in Transit:** HTTPS/TLS 1.3
- ❌ **PHI in Logs:** CRITICAL issue (item #1)
- ✅ **Access Control:** Role-based (but needs auth on admin endpoint - item #3)
- ✅ **Audit Trail:** User actions logged (who, what, when)
- ⚠️ **Data Retention:** Not documented (PhilHealth requires 5 years)

### Summary

**Critical Issues:** 2 (PHI exposure, SQL injection)
**High Issues:** 2 (Missing auth, weak passwords)
**Medium Issues:** 1 (No rate limiting)

**Recommendation:** BLOCK MERGE until Critical and High issues resolved
```

**Key Findings:**
- 2 CRITICAL (PHI in logs, SQL injection)
- 2 HIGH (missing auth, weak passwords)
- 1 MEDIUM (rate limiting)
- **Decision:** Block merge

---

## Step 4: Performance Analysis

**Agent:** `performance-oracle`

**Input:** Architecture + Simplicity + Security findings + code changes

**Prompt:**
```
Analyze the patient registration module for performance bottlenecks.

Focus on:
- Algorithm complexity (O(n) or better preferred)
- Database query efficiency (N+1 problems)
- Frontend bundle size
- API response times (target: <2s on 3G)
```

**Agent Output:**

```markdown
## Performance Analysis: Patient Registration Module

### 🔥 Performance Bottlenecks

1. **HIGH: N+1 Query Problem in Patient List**
   - Location: `src/services/patient-service.ts:89`
   - Severity: HIGH
   - Issue: Fetches patients, then loops to fetch billing for each patient
   ```typescript
   const patients = await this.patientRepo.findAll() // 1 query
   for (const patient of patients) {
     patient.billing = await this.billingService.getAccount(patient.id) // N queries
   }
   // Total: 1 + N queries (for 50 patients = 51 queries!)
   ```
   - Impact: Page load 8.2s with 50 patients (target: <2s on 3G)
   - Recommendation: Use JOIN or eager loading
   ```typescript
   const patients = await this.patientRepo.findAllWithBilling()
   // Single query with JOIN: 1 query total
   // Expected: Page load ~1.5s
   ```

2. **MEDIUM: Large Bundle Size**
   - Location: `dist/patient-registration-bundle.js`
   - Size: 450KB uncompressed (180KB gzipped)
   - Issue: Includes entire lodash library (only using 3 functions)
   - Impact: Slow load on 3G Philippine connections (12s load time)
   - Recommendation: Use tree-shaking imports
   ```typescript
   // ❌ BEFORE
   import _ from 'lodash' // Entire library (71KB)
   const sorted = _.sortBy(patients, 'name')

   // ✅ AFTER
   import sortBy from 'lodash/sortBy' // Single function (2KB)
   const sorted = sortBy(patients, 'name')
   ```
   - Expected: Bundle reduced to 320KB → 8s load time (still needs further optimization)

3. **MEDIUM: Inefficient Search Algorithm**
   - Location: `src/utils/search.ts:45`
   - Complexity: O(n²) for patient search
   ```typescript
   function searchPatients(query, patients) {
     return patients.filter(patient => {
       return patient.records.some(record => {
         return record.notes.includes(query) // Nested loops
       })
     })
   }
   ```
   - Issue: For 1000 patients with avg 10 records each = 10,000 iterations
   - Recommendation: Index notes in database, use full-text search
   ```typescript
   // Database-level search (Postgres full-text)
   SELECT * FROM patients p
   JOIN patient_records pr ON p.id = pr.patient_id
   WHERE to_tsvector(pr.notes) @@ plainto_tsquery($1)
   // Expected: <100ms (vs 800ms current)
   ```

### Performance Metrics

**Current (Before Optimization):**
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Page load (50 patients) | 8.2s | <2s | ❌ FAIL |
| Bundle size | 450KB | <300KB | ❌ FAIL |
| Search time (1000 patients) | 800ms | <200ms | ❌ FAIL |
| API response time | 1.8s | <2s | ✅ PASS |

**Expected (After Optimization):**
| Metric | Expected | Target | Status |
|--------|----------|--------|--------|
| Page load (50 patients) | 1.5s | <2s | ✅ PASS |
| Bundle size | 320KB | <300KB | ⚠️ CLOSE |
| Search time (1000 patients) | <100ms | <200ms | ✅ PASS |
| API response time | 1.2s | <2s | ✅ PASS |

### Philippine Context Impact

**3G Connection (Rural Clinics):**
- Current: 12s load time → Unusable
- After optimization: 8s → Acceptable but not ideal
- Further optimization needed: Code splitting, lazy loading

**Recommendation:** Fix item #1 (HIGH priority), then reassess other optimizations
```

**Key Findings:**
- 1 HIGH (N+1 queries)
- 2 MEDIUM (bundle size, search algorithm)
- Current performance: FAILS 3G targets
- Expected after fixes: MEETS most targets

---

## Step 5: Consolidated Report

**Consolidation Process:**
1. Collect all findings from 4 agents
2. Prioritize by severity (Critical → High → Medium → Low)
3. Identify dependencies (must fix security before performance)
4. Create action plan

**Consolidated Action Items:**

```markdown
# Code Review Report: Patient Registration Module

**Reviewed:** 2024-11-24
**Files changed:** 12 files, +450 -120 lines
**Overall Assessment:** REQUEST CHANGES

---

## Critical Issues (Block Merge) 🚨

1. [ ] **Fix PHI exposure in error logs**
   - Agent: security-sentinel
   - Location: `src/middleware/error-handler.ts:22`
   - Action: Remove patient object from logs, use patientId only
   - Owner: @developer
   - Deadline: Before re-review

2. [ ] **Fix SQL injection vulnerability**
   - Agent: security-sentinel
   - Location: `src/repositories/patient-repository.ts:56`
   - Action: Use parameterized queries
   - Owner: @developer
   - Deadline: Before re-review

---

## High Priority (Fix Before Merge) ⚠️

3. [ ] **Add authentication to admin endpoint**
   - Agent: security-sentinel
   - Location: `src/routes/admin-routes.ts:45`
   - Action: Add authenticateUser + requireRole('admin') middleware
   - Owner: @developer
   - Deadline: Before merge

4. [ ] **Strengthen password requirements**
   - Agent: security-sentinel
   - Location: `src/validators/user-validator.ts:12`
   - Action: Require 12+ chars, uppercase, numbers
   - Owner: @developer
   - Deadline: Before merge

5. [ ] **Decouple RegistrationService from BillingService**
   - Agent: code-architecture-reviewer
   - Location: `src/services/registration-service.ts:78`
   - Action: Use dependency injection + events
   - Owner: @developer
   - Deadline: Before merge

6. [ ] **Fix N+1 query in patient list**
   - Agent: performance-oracle
   - Location: `src/services/patient-service.ts:89`
   - Action: Use JOIN or eager loading
   - Owner: @developer
   - Deadline: Before merge (critical for 3G performance)

---

## Medium Priority (Follow-up PR) 📋

7. [ ] **Reduce complexity of processRegistration()**
   - Agent: code-simplicity-reviewer
   - Location: `src/services/registration-service.ts:142-198`
   - Action: Extract validation, transformation, persistence to separate functions
   - Owner: @developer
   - Deadline: Next sprint

8. [ ] **Fix SRP violation in PatientValidator**
   - Agent: code-architecture-reviewer
   - Location: `src/validators/patient-validator.ts`
   - Action: Extract business rules to separate service
   - Owner: @developer
   - Deadline: Next sprint

9. [ ] **Optimize bundle size**
   - Agent: performance-oracle
   - Location: `dist/patient-registration-bundle.js`
   - Action: Use tree-shaking lodash imports, code splitting
   - Owner: @developer
   - Deadline: Next sprint

10. [ ] **Add rate limiting**
    - Agent: security-sentinel
    - Location: `src/routes/registration-routes.ts:8`
    - Action: Add rate limiting middleware (10 req/min)
    - Owner: @devops
    - Deadline: Before production

---

## Low Priority (Optional) 💡

11. [ ] **Replace nested ternary operators**
    - Agent: code-simplicity-reviewer
    - Location: `src/utils/formatters.ts:28`
    - Action: Use if/else or lookup table
    - Owner: @developer
    - Deadline: When touching this file

12. [ ] **Standardize error handling**
    - Agent: code-architecture-reviewer
    - Location: Multiple files
    - Action: Use custom error classes consistently
    - Owner: @developer
    - Deadline: Tech debt sprint

---

## Merge Decision

**Status:** ❌ REQUEST CHANGES

**Rationale:**
- 2 Critical security issues (PHI exposure, SQL injection)
- 4 High priority issues (auth, passwords, coupling, performance)
- Cannot merge until Critical + High resolved

**Next Steps:**
1. Developer fixes items #1-6 (Critical + High)
2. Re-run `/review-code` workflow
3. If all Critical/High resolved → Approve merge
4. Create follow-up tickets for items #7-12 (Medium/Low)

---

## Summary by Agent

| Agent | Critical | High | Medium | Low |
|-------|----------|------|--------|-----|
| code-architecture-reviewer | 0 | 1 | 2 | 1 |
| code-simplicity-reviewer | 0 | 1 | 1 | 1 |
| security-sentinel | 2 | 2 | 1 | 0 |
| performance-oracle | 0 | 1 | 2 | 0 |
| **TOTAL** | **2** | **5** | **6** | **2** |
```

---

## Key Takeaways

**Why chain 4 agents?**
- Each agent specializes in one domain (architecture, simplicity, security, performance)
- Sequential chaining allows each agent to build on previous findings
- Consolidated report provides holistic view + prioritized action plan

**When to use this pattern:**
- Before merging significant PRs (>100 lines changed)
- Before production deployments
- During technical debt sprints
- When onboarding new developers (teach code quality standards)

**Customization:**
- Skip agents if not relevant (e.g., skip performance for docs-only changes)
- Add agents (e.g., add WCAG audit for UI changes)
- Adjust sequence (e.g., security-first for security-sensitive changes)

**Related:**
- [Code Review Workflow](../../../workflows/code-review-workflow.md) - Complete process
- [/review-code Command](../../../commands/review-code.md) - One-command invocation
- [Agent Quick Reference](../../../docs/agent-quick-reference.md) - Which agent to use
