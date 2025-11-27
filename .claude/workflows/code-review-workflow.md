# Code Review Workflow

**Purpose:** Systematic code review process before merging PRs or releasing features

**When to use:** Before merging pull requests, before production deployments, during technical debt assessment

**Estimated time:** 30-60 minutes (depending on code size)

---

## Overview

This workflow chains 4 review agents to provide comprehensive code analysis covering architecture, simplicity, security, and performance. Each agent provides specialized expertise to ensure code quality and MYCURE healthcare compliance.

**Quick start:** Run `/review-code` slash command to invoke this entire workflow.

---

## Workflow Steps

### Step 1: Architecture Review
**Agent:** `code-architecture-reviewer`

**Purpose:** Evaluate structural quality and architectural patterns

**What to review:**
- [ ] SOLID principles compliance (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion)
- [ ] Coupling and cohesion levels
- [ ] Naming conventions and clarity
- [ ] Code organization and file structure
- [ ] Pattern consistency across codebase

**Output:**
- Architectural strengths
- Anti-patterns identified
- Refactoring recommendations
- Coupling/cohesion score

**Decision Gate:** If Critical architectural issues found → Block merge, require refactoring

---

### Step 2: Simplicity Review
**Agent:** `code-simplicity-reviewer`

**Purpose:** Identify complexity and suggest simplifications

**What to review:**
- [ ] Cyclomatic complexity (functions with >10 branches)
- [ ] Nesting depth (>3 levels indicates complexity)
- [ ] Function length (>50 lines may be too long)
- [ ] Cognitive load (can developer understand in <5 minutes?)
- [ ] Opportunities for abstraction or decomposition

**Output:**
- Complexity hotspots with file paths and line numbers
- Simplification strategies
- Before/after examples
- Cognitive load assessment

**Decision Gate:** If High complexity without justification → Request simplification

---

### Step 3: Security Audit
**Agent:** `security-sentinel`

**Purpose:** Identify security vulnerabilities and healthcare compliance issues

**What to review:**
- [ ] OWASP Top 10 vulnerabilities
  - SQL Injection
  - Cross-Site Scripting (XSS)
  - Cross-Site Request Forgery (CSRF)
  - Insecure authentication/authorization
  - Security misconfigurations
- [ ] Healthcare-specific security
  - Patient data encryption (at rest and in transit)
  - HIPAA considerations (if applicable to Philippine context)
  - Access control for sensitive medical data
- [ ] Input validation and sanitization
- [ ] Secrets management (no hardcoded credentials)

**Output:**
- Vulnerability list with severity (Critical, High, Medium, Low)
- Specific file locations and exploit scenarios
- Remediation recommendations
- Compliance assessment

**Decision Gate:** If Critical or High severity vulnerabilities → Block merge, require immediate fix

---

### Step 4: Performance Analysis
**Agent:** `performance-oracle`

**Purpose:** Identify performance bottlenecks and optimization opportunities

**What to review:**
- [ ] Algorithmic complexity (O(n²) or worse requires justification)
- [ ] Database query efficiency
  - N+1 query problems
  - Missing indexes
  - Inefficient joins
- [ ] Frontend rendering performance
  - Unnecessary re-renders
  - Large bundle sizes
  - Blocking JavaScript
- [ ] Memory leaks or inefficient memory usage
- [ ] API response times

**Output:**
- Performance bottlenecks with metrics
- Optimization recommendations
- Before/after performance impact estimates
- Load testing suggestions (if applicable)

**Decision Gate:** If performance degrades user experience → Request optimization

---

## Step 5: Healthcare Context Validation

**Purpose:** Ensure MYCURE-specific requirements are met

**What to validate:**
- [ ] **WCAG 2.2 Level AA compliance** (if UI changes)
  - Run `/audit-wcag` command
  - Color contrast ratios
  - Keyboard navigation
  - Screen reader compatibility
- [ ] **Patient safety language** (if user-facing)
  - No alarming words ("Error", "Failed", "Fatal")
  - Calm alternatives used
- [ ] **Philippine healthcare context** (if applicable)
  - Offline-first functionality (for rural clinics)
  - FHISIS integration considerations
  - PhilHealth compatibility
  - Mobile-responsive (80%+ PH users on mobile)

**Output:**
- WCAG compliance report
- Patient safety language audit
- Philippine context validation

**Decision Gate:** If healthcare compliance fails → Block merge, require fixes

---

## Step 6: Consolidation & Action Plan

**Purpose:** Synthesize findings and create action plan

**Process:**
1. **Collect all findings** from Steps 1-5
2. **Prioritize** by severity:
   - **Critical:** Block merge, require immediate fix (security vulnerabilities, WCAG violations)
   - **High:** Request fix before merge (architectural issues, performance problems)
   - **Medium:** Recommend fix in follow-up PR (complexity, minor optimizations)
   - **Low:** Optional improvements (nice-to-have refactoring)

3. **Create action items:**
   ```markdown
   ## Code Review Action Items

   ### Critical (Block Merge)
   - [ ] Fix SQL injection vulnerability in `src/services/patient-service.ts:142`
   - [ ] Resolve WCAG color contrast violation in patient portal button

   ### High Priority (Fix Before Merge)
   - [ ] Refactor `calculateInventoryValue()` to reduce complexity from O(n²) to O(n)
   - [ ] Add patient safety language to error message in `src/components/ErrorModal.tsx:28`

   ### Medium Priority (Follow-up PR)
   - [ ] Extract repeated validation logic into shared utility
   - [ ] Add database index on `patient_records.clinic_id` for query optimization

   ### Low Priority (Optional)
   - [ ] Consider renaming `handleStuff()` to more descriptive `processPatientRegistration()`
   ```

4. **Assign owners and deadlines**
5. **Document review in PR comments**

**Output:**
- Prioritized action item list
- Merge decision (Approve | Request Changes | Block)
- Follow-up tasks for backlog

---

## Workflow Diagram

```
┌─────────────────────────────────────────────┐
│  Code Changes Ready for Review              │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Step 1: Architecture Review                │
│  (code-architecture-reviewer)               │
│  • SOLID principles                         │
│  • Coupling/cohesion                        │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Step 2: Simplicity Review                  │
│  (code-simplicity-reviewer)                 │
│  • Complexity analysis                      │
│  • Cognitive load                           │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Step 3: Security Audit                     │
│  (security-sentinel)                        │
│  • OWASP Top 10                             │
│  • Healthcare data protection               │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Step 4: Performance Analysis               │
│  (performance-oracle)                       │
│  • Bottlenecks                              │
│  • Query optimization                       │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Step 5: Healthcare Context Validation      │
│  • WCAG 2.2 AA (/audit-wcag)                │
│  • Patient safety language                  │
│  • Philippine healthcare context            │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  Step 6: Consolidation & Action Plan        │
│  • Prioritize findings                      │
│  • Create action items                      │
│  • Merge decision                           │
└──────────────────┬──────────────────────────┘
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
    ┌──────────┐      ┌──────────┐
    │  Approve │      │  Request │
    │  Merge   │      │  Changes │
    └──────────┘      └──────────┘
```

---

## Example Output

```markdown
# Code Review Report: Patient Registration Module

**Reviewed by:** code-review-workflow
**Date:** 2024-11-24
**Files changed:** 12 files, +450 -120 lines

---

## Summary

**Overall Assessment:** Request Changes (2 Critical, 3 High, 5 Medium, 2 Low findings)

**Critical Issues:** 2
**High Priority:** 3
**Medium Priority:** 5
**Low Priority:** 2

---

## Findings by Agent

### Architecture Review (code-architecture-reviewer)

✅ **Strengths:**
- Clear separation of concerns (controllers, services, repositories)
- Consistent use of dependency injection
- Good naming conventions

⚠️ **Issues:**
- **HIGH:** Tight coupling between `RegistrationService` and `BillingService` (src/services/registration-service.ts:78)
  - Recommendation: Introduce event-based decoupling
- **MEDIUM:** `PatientValidator` class violates Single Responsibility Principle (validation + business logic)
  - Recommendation: Extract business logic to separate service

---

### Simplicity Review (code-simplicity-reviewer)

⚠️ **Issues:**
- **HIGH:** `processRegistration()` has cyclomatic complexity of 15 (threshold: 10)
  - Location: src/services/registration-service.ts:142-198
  - Recommendation: Extract validation, transformation, and persistence into separate functions
- **MEDIUM:** Nested ternary operators reduce readability
  - Location: src/utils/formatters.ts:28
  - Recommendation: Use if/else or lookup table

---

### Security Audit (security-sentinel)

🚨 **Critical Issues:**
- **CRITICAL:** SQL injection vulnerability in patient search
  - Location: src/repositories/patient-repository.ts:56
  - Details: User input directly concatenated into SQL query
  - Recommendation: Use parameterized queries or ORM

- **CRITICAL:** Patient PHI exposed in error logs
  - Location: src/middleware/error-handler.ts:22
  - Details: Full patient object logged on error (includes sensitive data)
  - Recommendation: Sanitize logs, exclude PHI fields

⚠️ **High Issues:**
- **HIGH:** Missing authentication on admin endpoint
  - Location: src/routes/admin-routes.ts:45
  - Recommendation: Add role-based access control middleware

---

### Performance Analysis (performance-oracle)

⚠️ **Issues:**
- **HIGH:** N+1 query problem in patient list
  - Location: src/services/patient-service.ts:89
  - Impact: 50+ database queries for single page load
  - Recommendation: Use eager loading or join query

- **MEDIUM:** Large bundle size (450KB uncompressed)
  - Impact: Slow load on 3G connections (Philippine rural clinics)
  - Recommendation: Code splitting, lazy loading

---

### Healthcare Context Validation

🚨 **Critical Issues:**
- **CRITICAL:** WCAG color contrast violation
  - Location: src/components/PatientForm/index.css:42
  - Details: Error text has 2.8:1 contrast (minimum: 4.5:1)
  - Recommendation: Change to #DC2626 or darker red

⚠️ **Issues:**
- **MEDIUM:** Alarming error message
  - Location: src/components/ErrorModal.tsx:28
  - Current: "Fatal Error: Patient record failed to save"
  - Recommended: "Unable to save patient record. Your data is safe. Please try again."

---

## Action Plan

### Critical (Block Merge) - Must fix immediately
1. [ ] Fix SQL injection in `patient-repository.ts:56` - Use parameterized query
2. [ ] Remove PHI from error logs in `error-handler.ts:22` - Sanitize before logging
3. [ ] Fix WCAG color contrast in `PatientForm/index.css:42` - Use #DC2626

### High Priority (Fix Before Merge) - Recommend fixing
4. [ ] Add authentication to admin routes in `admin-routes.ts:45`
5. [ ] Resolve N+1 query in `patient-service.ts:89` - Use eager loading
6. [ ] Decouple RegistrationService from BillingService - Use events

### Medium Priority (Follow-up PR) - Create backlog tickets
7. [ ] Reduce complexity of `processRegistration()` - Extract functions
8. [ ] Split PatientValidator responsibilities - Follow SRP
9. [ ] Implement code splitting - Reduce bundle size
10. [ ] Replace nested ternary in `formatters.ts:28` - Use if/else
11. [ ] Update error message to patient safety language

### Low Priority (Optional) - Nice to have
12. [ ] Consider adding comments to complex logic
13. [ ] Add JSDoc for public API methods

---

## Merge Decision

**Status:** REQUEST CHANGES

**Rationale:** 3 Critical issues (SQL injection, PHI exposure, WCAG violation) must be resolved before merge. These pose security risks and legal compliance issues for MYCURE healthcare software.

**Next Steps:**
1. Developer fixes Critical and High priority issues
2. Re-run code review workflow
3. If all Critical/High resolved → Approve merge
```

---

## Best Practices

**DO:**
- ✅ Run complete workflow for all PRs touching critical code (auth, billing, patient data)
- ✅ Review incrementally (don't wait for large PRs)
- ✅ Use `/review-code` slash command for consistency
- ✅ Document all findings with file paths and line numbers
- ✅ Prioritize healthcare compliance (WCAG, patient safety)

**DON'T:**
- ❌ Skip security audit for "small changes" (vulnerabilities don't care about PR size)
- ❌ Approve with Critical findings unresolved
- ❌ Ignore WCAG violations (legal requirement)
- ❌ Merge without healthcare context validation

---

## Related Resources

- [Agents Catalog](../agents/README.md) - Details on each review agent
- [Healthcare UX Guidelines](../skills/_healthcare/healthcare-ux-guidelines/SKILL.md) - WCAG compliance standards
- [Security Sentinel Agent](../agents/_review/security-sentinel.md) - Security audit methodology
- [/review-code Command](../commands/review-code.md) - Slash command for this workflow

---

**Remember:** In healthcare software, code review isn't just about quality—it's about patient safety and legal compliance. Every line of code has potential to impact patient care.
