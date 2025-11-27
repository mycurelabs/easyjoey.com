# Healthcare Pre-Launch Checklist

**Purpose:** Validate healthcare compliance before releasing features

**Format:** Printable checkbox checklist for desk reference

**Run `/audit-wcag` command for automated checks**

---

## WCAG 2.2 Level AA Compliance

### Color Contrast
- [ ] Body text: 4.5:1 minimum (7:1 preferred for healthcare)
- [ ] Large text (18pt+): 3:1 minimum
- [ ] UI components (buttons, inputs): 3:1 minimum
- [ ] Test with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] Test in low-light conditions (dim exam rooms)

### Keyboard Navigation
- [ ] All interactive elements reachable via Tab key
- [ ] Tab order is logical (left-to-right, top-to-bottom)
- [ ] No keyboard traps (can Tab out of all components)
- [ ] Enter/Space activates buttons and links
- [ ] Escape closes modals and dropdowns
- [ ] Arrow keys work in dropdowns and radio groups

### Focus Indicators
- [ ] Focus indicators visible on all interactive elements
- [ ] Minimum thickness: 3px (4px preferred for healthcare)
- [ ] High contrast (stands out in both light and dark mode)
- [ ] Outline offset: 2px minimum for clarity

### Screen Reader Compatibility
- [ ] Test with NVDA (Windows) or JAWS
- [ ] All content announced correctly
- [ ] Form labels read before inputs
- [ ] Error messages announced when triggered (aria-live)
- [ ] Dynamic content changes announced
- [ ] Landmarks and headings navigable
- [ ] Button/link purposes clear

### Touch Targets (Mobile)
- [ ] Minimum size: 44x44px (48x48px preferred)
- [ ] Adequate spacing between targets: 8px minimum
- [ ] Test on actual devices (iOS and Android)
- [ ] No accidental activations

### Form Accessibility
- [ ] Every input has visible label (not just placeholder)
- [ ] Required fields marked with aria-required="true"
- [ ] Error identification clear and specific
- [ ] Help text provided where needed (aria-describedby)
- [ ] Success messages announced (aria-live)

---

## Patient Safety Language

### Error Messages
- [ ] No alarming words: ❌ "Error", "Failed", "Fatal", "Broken"
- [ ] Calm alternatives used: ✅ "Unable to", "Please check", "Try again"
- [ ] Specific and actionable (not vague)
- [ ] Reassure data safety when appropriate

### Examples - What NOT to Say
- ❌ "Fatal Error: Database crashed"
- ❌ "Transfer failed - error 500"
- ❌ "Invalid patient ID"
- ❌ "Stock not found"

### Examples - Patient-Safe Alternatives
- ✅ "Unable to process request. Your data is safe. Please contact support."
- ✅ "Unable to complete transfer. Please verify the information and try again."
- ✅ "Please check the patient ID and try again."
- ✅ "This item is not available at the selected location."

### Critical Alerts
- [ ] Drug interaction warnings clearly marked (high visibility)
- [ ] Allergy alerts prominently displayed (red/orange, high contrast)
- [ ] Dosage warnings require explicit acknowledgment
- [ ] Patient safety notifications prioritized over system messages

---

## Philippine Healthcare Context

### Offline-First (Rural Clinics)
- [ ] Core functionality works offline (disconnect network to test)
- [ ] Offline data syncs when reconnected
- [ ] Conflict resolution handled gracefully
- [ ] User notified when offline vs online
- [ ] Local data stored securely (IndexedDB encrypted if sensitive)

### Low Bandwidth (3G Connection)
- [ ] Page loads in <10 seconds on 3G (Chrome DevTools throttling)
- [ ] Images optimized (<100KB each)
- [ ] Total page size <500KB
- [ ] Critical content loads first (above-the-fold)
- [ ] Lazy loading for non-critical assets

### Mobile-First (80%+ PH Users)
- [ ] Responsive design on iOS and Android
- [ ] Touch targets 44x44px minimum (48x48px preferred)
- [ ] Forms usable with on-screen keyboard
- [ ] No horizontal scrolling
- [ ] Works in portrait and landscape orientations
- [ ] Test on actual devices (not just DevTools)

### Filipino Language Support (Patient-Facing)
- [ ] All patient-facing text translated to Filipino
- [ ] Date/time formats localized (MM/DD/YYYY for Philippines)
- [ ] Currency formatted correctly (₱1,234.56)
- [ ] Error messages in Filipino (if patient-facing)
- [ ] Language toggle accessible (if bilingual)

### LGU Deployment Readiness
- [ ] Works on 2-3 year old Android devices
- [ ] Minimal battery drain (test with Battery API)
- [ ] Accessible with basic digital literacy
- [ ] Icons + text labels (not icon-only)
- [ ] Simple navigation (no complex gestures)

---

## Philippine Healthcare Integration

### FHISIS Compatibility
- [ ] Data export format matches DOH FHISIS requirements
- [ ] All required fields captured
- [ ] Date formats match FHISIS (YYYY-MM-DD)
- [ ] Test export/import cycle

### PhilHealth Requirements
- [ ] Audit trail includes all required fields (who, what, when, where, why)
- [ ] Transaction records immutable
- [ ] User authentication logged
- [ ] Data retention meets 5-year requirement

### DOH Compliance
- [ ] Patient consent documented
- [ ] Data privacy notice displayed
- [ ] Medical records follow DOH format
- [ ] Inventory tracking meets DOH standards

---

## MYCURE Design Standards

### Typography
- [ ] Headlines: Space Grotesk (geometric, modern)
- [ ] Body text: IBM Plex Sans (professional, readable)
- [ ] Data/codes: JetBrains Mono (zero-ambiguity, monospace)
- [ ] ❌ NEVER: Inter, Roboto fonts

### Color Palette
- [ ] Clinical Blue: #0066CC (primary actions)
- [ ] Trust Navy: #003366 (headings, emphasis)
- [ ] Medical Green: #00A86B (success states)
- [ ] ❌ NEVER: Purple gradients, neon colors

### Animation Speed
- [ ] Status updates: 100ms (fast feedback)
- [ ] Transitions: 150ms (smooth, not distracting)
- [ ] Modal open/close: 200ms (noticeable but quick)
- [ ] ❌ NEVER: >300ms animations (too slow for healthcare)

---

## Security & Privacy

### Patient Health Information (PHI)
- [ ] PHI encrypted at rest (database encryption enabled)
- [ ] PHI encrypted in transit (HTTPS/TLS 1.3)
- [ ] Access control enforced (role-based permissions)
- [ ] PHI not logged in error messages
- [ ] PHI not exposed in URLs or browser history

### Authentication & Authorization
- [ ] Strong password requirements enforced
- [ ] Session timeouts configured (15 minutes for PHI access)
- [ ] Multi-factor authentication available (if required)
- [ ] Role-based access control (RBAC) implemented
- [ ] Failed login attempts throttled

### Audit Trail
- [ ] Who accessed what, when logged
- [ ] Data modifications logged (before/after)
- [ ] User actions logged (create, read, update, delete)
- [ ] Logs immutable (cannot be edited)
- [ ] Logs retained for 5 years (PhilHealth requirement)

---

## Testing Validation

### Manual Testing
- [ ] Keyboard-only navigation tested (unplug mouse)
- [ ] Screen reader tested (NVDA or JAWS)
- [ ] Mobile devices tested (iOS and Android)
- [ ] Low bandwidth tested (3G throttling)
- [ ] Offline functionality tested (disconnect network)

### Automated Testing
- [ ] Unit tests pass (>80% coverage preferred)
- [ ] Integration tests pass (API endpoints)
- [ ] E2E tests pass (critical user workflows)
- [ ] WCAG automated checks pass (run `/audit-wcag`)
- [ ] Security scans pass (no Critical/High vulnerabilities)

### User Acceptance Testing
- [ ] Healthcare professionals tested feature (5-8 users)
- [ ] Real tasks with actual data performed
- [ ] Feedback documented
- [ ] Issues resolved before launch

---

## Pre-Production Checklist

### Documentation
- [ ] User guide written (or updated)
- [ ] API documentation current
- [ ] Release notes prepared
- [ ] WCAG conformance report signed

### Deployment
- [ ] Database migrations tested
- [ ] Rollback plan documented
- [ ] Monitoring alerts configured
- [ ] Stakeholders notified of launch date

### Post-Launch
- [ ] Monitor error rates (first 24-48 hours)
- [ ] Collect user feedback
- [ ] Track key metrics (time savings, usage)
- [ ] Document lessons learned

---

## Decision Gate

**All Critical items must pass before production release:**

- 🚨 **CRITICAL:** WCAG 2.2 Level AA compliance
- 🚨 **CRITICAL:** Patient safety language (no alarming words)
- 🚨 **CRITICAL:** Offline functionality (for rural clinics)
- 🚨 **CRITICAL:** Mobile-responsive (80%+ PH users on mobile)
- 🚨 **CRITICAL:** Security (PHI encrypted, audit trail)

**If any Critical item fails → BLOCK RELEASE**

---

## Quick Reference

**Automated Check:** Run `/audit-wcag` command

**Manual Tests:**
1. Keyboard nav (unplug mouse, use Tab)
2. Screen reader (NVDA or JAWS)
3. Mobile (iOS/Android devices)
4. 3G speed (Chrome DevTools)
5. Offline (disconnect network)

**Patient Safety Language:**
- ❌ NEVER: "Error", "Failed", "Fatal"
- ✅ ALWAYS: "Unable to", "Please check", "Try again"

**MYCURE Standards:**
- Fonts: Space Grotesk, IBM Plex Sans, JetBrains Mono
- Colors: #0066CC (blue), #003366 (navy), #00A86B (green)
- Animations: 100ms, 150ms, 200ms

---

**Related:**
- [Healthcare Compliance Workflow](../workflows/healthcare-compliance-workflow.md) - Detailed compliance process
- [WCAG Compliance Reference](../skills/_healthcare/healthcare-ux-guidelines/reference/WCAG_COMPLIANCE.md)
- [Patient Safety Language Guide](../skills/_healthcare/healthcare-ux-guidelines/reference/PATIENT_SAFETY_LANGUAGE.md)
- [Agent Quick Reference](agent-quick-reference.md) - Which agent to use
