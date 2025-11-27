---
name: audit-wcag
description: Validate WCAG 2.2 AA compliance and patient safety language for healthcare interfaces
---

Please audit the current changes for healthcare UX compliance using the healthcare-ux-guidelines skill.

Check for:

**WCAG 2.2 Level AA Compliance:**
- [ ] Color contrast ratios (4.5:1 text, 3:1 UI components)
- [ ] Keyboard navigation fully functional
- [ ] Screen reader compatibility
- [ ] Focus indicators visible (3px minimum)
- [ ] Touch targets 44x44px minimum
- [ ] Form labels and error identification

**Patient Safety Language:**
- [ ] No alarming words: "Error", "Failed", "Fatal", "Broken"
- [ ] Use calm alternatives: "Unable to process", "Not completed"
- [ ] Critical alerts properly marked (allergies, drug interactions)
- [ ] Context-appropriate (patient-visible vs staff-only)

**Philippine Healthcare Context:**
- [ ] Offline-first considerations
- [ ] Filipino language support (if patient-facing)
- [ ] LGU/RHU deployment readiness

Provide specific findings with file paths and line numbers.
