# Healthcare Compliance Workflow

**Purpose:** Ensure MYCURE features meet WCAG 2.2 Level AA and patient safety language standards

**When to use:** Before every feature release, during design review, for compliance audits

**Estimated time:** 2-4 hours (depending on feature complexity)

---

## Overview

Healthcare software has legal and ethical obligations for accessibility and patient safety. This workflow validates compliance at multiple stages: design, implementation, and pre-release testing.

**Quick start:** Run `/audit-wcag` slash command for automated compliance checks.

---

## Workflow Steps

### Step 1: Pre-Development Compliance Review

**When:** During design phase, before writing code

**What to check:**

**Design Mockups:**
- [ ] Color contrast ratios calculated
  - Text: 4.5:1 minimum (7:1 preferred for healthcare)
  - UI components: 3:1 minimum
  - Use WebAIM Contrast Checker
- [ ] Keyboard navigation flow documented
  - Tab order logical
  - No keyboard traps
  - All interactive elements reachable
- [ ] Touch targets sized appropriately
  - Minimum: 44x44px
  - Preferred: 48x48px for healthcare (larger for patients with motor impairments)
- [ ] Form labels and instructions designed
  - Every input has visible label
  - Error identification clear
  - Help text provided where needed

**Error Messages:**
- [ ] Patient safety language used (no alarming words)
- [ ] Calm, professional tone
- [ ] Specific and actionable

| ❌ Alarming | ✅ Patient-Safe |
|------------|----------------|
| "Fatal Error: Database crashed" | "Unable to process request. Your data is safe. Please contact support." |
| "Invalid patient ID" | "Please check the patient ID and try again." |
| "Transfer failed - error 500" | "Unable to complete transfer. Please verify the information and try again." |

**Output:** Design approval with compliance notes

---

### Step 2: Implementation Compliance

**When:** During development

**What to implement:**

**HTML Accessibility:**
```html
<!-- ✅ Good: Semantic HTML with ARIA -->
<form role="form" aria-labelledby="patient-form-title">
  <h2 id="patient-form-title">Patient Registration</h2>

  <label for="patient-name">
    Full Name
    <span aria-label="required">*</span>
  </label>
  <input
    id="patient-name"
    type="text"
    required
    aria-required="true"
    aria-describedby="name-help"
  />
  <span id="name-help" class="help-text">
    Enter patient's full legal name
  </span>
</form>

<!-- ❌ Bad: No labels, no ARIA -->
<form>
  <input type="text" placeholder="Name" />
</form>
```

**Keyboard Navigation:**
```typescript
// ✅ Good: Keyboard support
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleSubmit();
  }

  if (event.key === 'Escape') {
    handleClose();
  }
}

// Ensure focusable elements have visible focus indicator
.button:focus {
  outline: 3px solid #0066CC;
  outline-offset: 2px;
}
```

**Patient Safety Language:**
```typescript
// ✅ Good: Calm, specific error messages
const errorMessages = {
  networkError: "Unable to connect to the server. Please check your internet connection and try again.",
  invalidInput: "Please check the {fieldName} and try again.",
  saveError: "Unable to save your changes. Your data is safe. Please try again or contact support.",
};

// ❌ Bad: Alarming, vague
const badMessages = {
  networkError: "Fatal network error - connection failed!",
  invalidInput: "Invalid input",
  saveError: "Error 500: Database write failed",
};
```

**Focus Management:**
```typescript
// ✅ Good: Manage focus for modals and dynamic content
function openModal() {
  const modal = document.querySelector('[role="dialog"]');
  const firstFocusable = modal.querySelector('button, input, select, textarea');

  // Save current focus to restore later
  previousFocus = document.activeElement;

  // Move focus to modal
  firstFocusable.focus();

  // Trap focus within modal
  modal.addEventListener('keydown', trapFocus);
}

function closeModal() {
  // Restore focus to element that opened modal
  previousFocus.focus();
}
```

**Output:** Accessible, patient-safe implementation

---

### Step 3: Testing Phase

**When:** Before requesting code review

**Automated Testing:**

Run `/audit-wcag` command for automated checks.

**Manual Testing Checklist:**

**Keyboard Navigation:**
- [ ] All interactive elements reachable via Tab
- [ ] Tab order is logical (left-to-right, top-to-bottom)
- [ ] No keyboard traps (can Tab out of all components)
- [ ] Enter/Space activates buttons/links
- [ ] Escape closes modals/dropdowns
- [ ] Arrow keys work in dropdowns/radio groups
- [ ] Focus indicators visible (3px minimum)

**Screen Reader Testing (NVDA or JAWS):**
- [ ] All content announced correctly
- [ ] Form labels read before inputs
- [ ] Error messages announced when triggered
- [ ] Dynamic content changes announced (aria-live)
- [ ] Landmarks and headings navigable
- [ ] Button/link purposes clear

**Color Contrast:**
- [ ] Use WebAIM Contrast Checker
- [ ] Body text: 4.5:1 minimum (7:1 preferred)
- [ ] Large text (18pt+): 3:1 minimum
- [ ] UI components: 3:1 minimum
- [ ] Test in low-light conditions (exam rooms often dim)

**Touch Targets (Mobile):**
- [ ] Minimum: 44x44px
- [ ] Adequate spacing between targets (8px minimum)
- [ ] Test on actual devices (iOS, Android)

**Patient Safety Language:**
- [ ] No alarming words (Error, Failed, Fatal, Broken)
- [ ] All error messages calm and specific
- [ ] Critical alerts clearly marked (allergies, drug interactions)
- [ ] Context appropriate (patient-visible vs staff-only)

**Output:** Testing report with pass/fail for each criterion

---

### Step 4: Philippine Healthcare Context Validation

**When:** Before deployment to Philippines

**Offline-First Testing:**
- [ ] Disconnect network, verify core functionality works
- [ ] Test sync when reconnecting
- [ ] Verify data integrity after offline operations
- [ ] Test conflict resolution (if applicable)

**Low-Bandwidth Testing:**
- [ ] Throttle to 3G speeds (Chrome DevTools)
- [ ] Page load < 10 seconds on 3G
- [ ] Images optimized (<100KB each)
- [ ] Total page size <500KB
- [ ] Critical content loads first (above-the-fold)

**Mobile Testing:**
- [ ] Responsive design on iOS/Android
- [ ] Touch targets appropriate (44x44px minimum)
- [ ] Forms usable with on-screen keyboard
- [ ] No horizontal scrolling
- [ ] Works in portrait and landscape

**Filipino Language Support (if patient-facing):**
- [ ] All patient-facing text translated
- [ ] Date/time formats localized
- [ ] Currency formatted correctly (₱)
- [ ] Error messages in Filipino

**LGU Deployment Readiness:**
- [ ] Works on older devices (2-3 year old Android)
- [ ] Minimal battery drain
- [ ] Accessible with basic digital literacy
- [ ] Icons + text labels (not icon-only)

**Output:** Philippine context validation report

---

### Step 5: Pre-Release Compliance Certification

**When:** Final check before production deployment

**WCAG 2.2 Level AA Conformance Report:**

```markdown
# WCAG 2.2 Level AA Conformance Report

**Feature:** Multi-Location Stock Transfer
**Auditor:** [Name]
**Date:** 2024-11-24
**WCAG Version:** 2.2 Level AA

## Conformance Level: AA

**Success Criteria Met:** 48/48 (100%)
**Critical Issues:** 0
**Non-Critical Issues:** 2 (documented below)

## Testing Summary

### Principle 1: Perceivable
- [x] 1.1.1 Non-text Content (Level A)
- [x] 1.3.1 Info and Relationships (Level A)
- [x] 1.4.3 Contrast (Minimum) (Level AA) - 7.2:1 body text, 4.8:1 UI
- [x] 1.4.11 Non-text Contrast (Level AA) - 3.5:1 buttons

### Principle 2: Operable
- [x] 2.1.1 Keyboard (Level A) - All functions keyboard accessible
- [x] 2.1.2 No Keyboard Trap (Level A) - No traps detected
- [x] 2.4.3 Focus Order (Level A) - Logical tab order
- [x] 2.4.7 Focus Visible (Level AA) - 3px outline on all focusable elements

### Principle 3: Understandable
- [x] 3.2.1 On Focus (Level A) - No unexpected context changes
- [x] 3.3.1 Error Identification (Level A) - Errors clearly identified
- [x] 3.3.2 Labels or Instructions (Level A) - All inputs labeled
- [x] 3.3.3 Error Suggestion (Level AA) - Specific error messages provided

### Principle 4: Robust
- [x] 4.1.2 Name, Role, Value (Level A) - All components accessible
- [x] 4.1.3 Status Messages (Level AA) - aria-live regions implemented

## Non-Critical Issues

1. **Enhancement Opportunity:** Add aria-describedby to Lot Number field
   - Current: Label only
   - Recommended: Add help text explaining lot number format
   - Priority: Low (usability enhancement, not compliance issue)

2. **Enhancement Opportunity:** Increase focus indicator thickness
   - Current: 3px (meets minimum)
   - Recommended: 4px for better visibility in bright exam rooms
   - Priority: Low (exceeds minimum, but could be better)

## Patient Safety Language Audit

**All error messages reviewed:** ✅ Pass
**No alarming terminology:** ✅ Pass
**Calm, professional tone:** ✅ Pass

Examples:
- "Unable to complete transfer. Requested quantity (500) exceeds available stock (300)."
- "Please check the lot number and try again."
- "This item is not available at the selected location."

## Philippine Healthcare Context

**Offline functionality:** ✅ Tested and working
**Low bandwidth (3G):** ✅ Page loads in 8.2 seconds
**Mobile responsive:** ✅ Tested on iOS and Android
**Filipino language:** N/A (staff-only interface)

## Certification

This feature **CONFORMS** to WCAG 2.2 Level AA standards and MYCURE patient safety language requirements.

**Approved for production deployment:** Yes

**Signature:** ___________________________
**Date:** 2024-11-24
```

**Output:** Conformance report for compliance records

---

## Workflow Diagram

```
┌─────────────────────────────────┐
│ Step 1: Pre-Development         │
│ • Review design mockups         │
│ • Check contrast ratios         │
│ • Validate patient safety lang  │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Step 2: Implementation          │
│ • Semantic HTML/ARIA            │
│ • Keyboard navigation           │
│ • Focus management              │
│ • Patient safety messages       │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Step 3: Testing                 │
│ • Keyboard nav (/audit-wcag)    │
│ • Screen reader (NVDA/JAWS)     │
│ • Color contrast (WebAIM)       │
│ • Touch targets (mobile)        │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Step 4: PH Context Validation   │
│ • Offline testing               │
│ • 3G bandwidth testing          │
│ • Mobile devices (iOS/Android)  │
│ • LGU deployment readiness      │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Step 5: Compliance Certification│
│ • WCAG conformance report       │
│ • Patient safety audit          │
│ • Production approval           │
└─────────────────────────────────┘
```

---

## Tools & Resources

**Automated Testing:**
- `/audit-wcag` command (automated WCAG checks)
- axe DevTools (browser extension)
- Lighthouse (Chrome DevTools)
- WAVE (WebAIM)

**Manual Testing:**
- NVDA (free screen reader for Windows)
- JAWS (screen reader for Windows)
- VoiceOver (Mac/iOS screen reader)
- WebAIM Contrast Checker
- Chrome DevTools (keyboard nav, 3G throttling)

**Reference:**
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Healthcare UX Guidelines](../skills/_healthcare/healthcare-ux-guidelines/SKILL.md)
- [Patient Safety Language](../skills/_healthcare/healthcare-ux-guidelines/reference/PATIENT_SAFETY_LANGUAGE.md)
- [WCAG Compliance Checklist](../skills/_healthcare/healthcare-ux-guidelines/reference/WCAG_COMPLIANCE.md)

---

## Best Practices

**DO:**
- ✅ Check compliance early (design phase, not after implementation)
- ✅ Test with actual assistive technologies (screen readers, keyboard only)
- ✅ Use patient safety language in ALL user-facing text
- ✅ Test on real devices (mobile, low bandwidth)
- ✅ Document conformance for legal/audit records

**DON'T:**
- ❌ Treat accessibility as "nice to have" (it's legally required)
- ❌ Rely only on automated tools (catch ~30%, miss ~70%)
- ❌ Skip keyboard testing ("most users use mouse")
- ❌ Use alarming error messages (violates patient safety)
- ❌ Assume urban internet speeds (test on 3G for rural Philippines)

---

**Remember:** WCAG 2.2 Level AA is not just a guideline—it's a legal requirement for healthcare software. Patient safety language isn't optional—it's an ethical obligation. Compliance protects patients and the organization.
