# Healthcare Validation Example

**Pattern:** Multi-stage healthcare compliance validation

**When to use:** Before releasing UI changes, before production deployments, during compliance audits

**Skill used:** `healthcare-ux-guidelines` (3 validation stages)

**Workflow:** [Healthcare Compliance Workflow](../../../workflows/healthcare-compliance-workflow.md)

**Shortcut:** Run `/audit-wcag` command to invoke WCAG validation

---

## Pattern Overview

This pattern validates healthcare software against 3 critical compliance areas: WCAG 2.2 Level AA accessibility, patient safety language, and Philippine healthcare context. All 3 must pass before production release.

```
┌──────────────────────────────┐
│ UI Changes (Feature/PR)      │
└────────────┬─────────────────┘
             │
             ▼
┌──────────────────────────────┐
│ Stage 1: WCAG 2.2 AA         │
│ • Color contrast (4.5:1)     │
│ • Keyboard navigation        │
│ • Screen reader              │
│ • Focus indicators           │
│ • Touch targets (44x44px)    │
└────────────┬─────────────────┘
             │
             ▼ WCAG passes?
┌──────────────────────────────┐
│ Stage 2: Patient Safety      │
│ • Error message language     │
│ • No alarming words          │
│ • Calm, specific, actionable │
│ • Critical alerts marked     │
└────────────┬─────────────────┘
             │
             ▼ Patient safety passes?
┌──────────────────────────────┐
│ Stage 3: Philippine Context  │
│ • Offline functionality      │
│ • 3G bandwidth (<10s load)   │
│ • Mobile-responsive          │
│ • Filipino language (if req'd)│
└────────────┬─────────────────┘
             │
             ▼ All 3 stages pass?
┌──────────────────────────────┐
│ Approved for Production      │
└──────────────────────────────┘
```

---

## Complete Example: Patient Portal Dashboard

### Context

A developer has redesigned the patient portal dashboard with:
- New color scheme (updated to match MYCURE Clinical palette)
- Redesigned alert system (drug interactions, allergy warnings)
- Mobile-responsive layout (tablets + smartphones)
- 8 files changed, +320 -180 lines

**Goal:** Validate compliance before deploying to 50,000+ patients

---

## Stage 1: WCAG 2.2 Level AA Validation

**Skill:** `healthcare-ux-guidelines`

**Command:** `/audit-wcag`

**Prompt:**
```
Audit the patient portal dashboard for WCAG 2.2 Level AA compliance.

Files changed:
- src/components/PatientDashboard/index.tsx
- src/components/AlertBanner/styles.css
- src/components/MedicationCard/index.tsx

Focus on:
- Color contrast (4.5:1 text, 3:1 UI)
- Keyboard navigation
- Screen reader compatibility
- Touch targets (44x44px minimum)
```

**healthcare-ux-guidelines Output:**

```markdown
## WCAG 2.2 Level AA Audit: Patient Portal Dashboard

### Color Contrast

**Body Text:**
- [x] ✅ Primary text (#333333) on white: **12.6:1** (AAA)
- [x] ✅ Secondary text (#666666) on white: **5.7:1** (AA)
- [x] ❌ **FAIL:** Disabled button text (#999999) on white: **2.8:1** (below 4.5:1 minimum)

**UI Components:**
- [x] ✅ Clinical Blue button (#0066CC) on white: **7.2:1** (AAA)
- [x] ✅ Medical Green success (#00A86B) on white: **7.5:1** (AAA)
- [x] ❌ **FAIL:** Alert banner border (#E0E0E0): **1.2:1** (below 3:1 minimum for UI components)

**Critical Issues:**
1. **Disabled button text fails WCAG**
   - Location: `src/components/PatientDashboard/styles.css:42`
   - Current: #999999 (2.8:1 contrast)
   - Required: 4.5:1 minimum
   - Fix: Change to #767676 (4.54:1) or darker

2. **Alert banner border too light**
   - Location: `src/components/AlertBanner/styles.css:18`
   - Current: #E0E0E0 (1.2:1 contrast)
   - Required: 3:1 minimum for UI components
   - Fix: Change to #767676 (4.54:1)

---

### Keyboard Navigation

**Tab Order Test:**
```
1. Skip to main content link ✅
2. Medications card ✅
3. View prescription button ✅
4. Appointments card ✅
5. Schedule appointment button ✅
6. Alerts card ✅
7. Dismiss alert button ✅
```

- [x] ✅ All interactive elements reachable via Tab
- [x] ✅ Tab order logical (left-to-right, top-to-bottom)
- [x] ✅ No keyboard traps detected
- [x] ✅ Enter/Space activates buttons
- [x] ❌ **FAIL:** Escape does not close alert banner (expected behavior for dismissible alerts)

**Critical Issue:**
3. **Alert banner missing Escape key handler**
   - Location: `src/components/AlertBanner/index.tsx:45`
   - Expected: Escape key dismisses alert
   - Actual: No keyboard dismiss (only mouse click on ✕ button)
   - Fix: Add keydown handler for Escape

---

### Screen Reader Compatibility

**NVDA Test Results:**

```html
<!-- Medication Card -->
<div role="article" aria-labelledby="med-card-title">
  <h3 id="med-card-title">Current Medications</h3>
  <ul>
    <li>
      <span class="medication-name">Amoxicillin 500mg</span>
      <span class="dosage">Take 3 times daily</span>
    </li>
  </ul>
</div>
```

- [x] ✅ Landmarks properly labeled (role="article")
- [x] ✅ Headings navigable (H3 for card titles)
- [x] ❌ **FAIL:** Medication dosage missing screen reader announcement
   - Location: `src/components/MedicationCard/index.tsx:28`
   - Issue: Dosage styled with CSS (color only), no semantic markup
   - Screen reader reads: "Amoxicillin 500mg Take 3 times daily" (runs together)
   - Fix: Add aria-label or separate elements

**Alert Banner:**
```html
<!-- ❌ BEFORE -->
<div class="alert-banner">
  <span class="icon">⚠️</span>
  Drug interaction warning: Amoxicillin + Warfarin
  <button>✕</button>
</div>

<!-- ✅ AFTER -->
<div
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
  aria-labelledby="alert-title"
>
  <span role="img" aria-label="warning">⚠️</span>
  <span id="alert-title">
    <strong>Drug Interaction Warning:</strong>
    Amoxicillin may interact with Warfarin
  </span>
  <button aria-label="Dismiss alert">✕</button>
</div>
```

**Critical Issue:**
4. **Alert banner missing ARIA roles**
   - Location: `src/components/AlertBanner/index.tsx:12`
   - Missing: role="alert", aria-live="assertive"
   - Impact: Critical drug warnings not announced to screen reader users
   - Fix: Add ARIA attributes (see code above)

---

### Focus Indicators

- [x] ✅ All focusable elements have visible outline
- [x] ✅ Focus outline 3px solid #0066CC (meets minimum)
- [x] ✅ Outline offset 2px (good separation)
- [x] ✅ High contrast in both light and dark backgrounds

---

### Touch Targets (Mobile)

**Tested on iPhone 13 and Samsung Galaxy S21:**

- [x] ✅ All buttons: 48x48px (exceeds 44x44px minimum)
- [x] ✅ Card tap areas: 64px height (adequate)
- [x] ❌ **FAIL:** Dismiss alert ✕ button: 32x32px (below 44x44px minimum)

**Critical Issue:**
5. **Dismiss button too small for mobile**
   - Location: `src/components/AlertBanner/styles.css:28`
   - Current: 32x32px
   - Required: 44x44px minimum (48x48px preferred for healthcare)
   - Fix: Increase button size to 48x48px

---

### Summary: WCAG 2.2 Level AA

**Status:** ❌ **FAIL** (5 critical issues)

**Critical Issues:**
1. Disabled button text contrast: 2.8:1 (needs 4.5:1)
2. Alert banner border contrast: 1.2:1 (needs 3:1)
3. Alert banner missing Escape key handler
4. Alert banner missing ARIA roles (critical for drug warnings)
5. Dismiss button too small: 32x32px (needs 44x44px)

**Action:** Fix all 5 issues before proceeding to Stage 2
```

### Decision Gate 1: WCAG Compliance

**Assessment:** 5 critical failures ❌

**Decision:** BLOCK RELEASE, fix issues

*(Developer fixes all 5 issues, re-runs `/audit-wcag`)*

**Re-Audit Result:** ✅ All WCAG 2.2 Level AA criteria met

**Decision:** Proceed to Stage 2 (Patient Safety Language)

---

## Stage 2: Patient Safety Language Validation

**Skill:** `healthcare-ux-guidelines` (patient safety mode)

**Prompt:**
```
Audit the patient portal dashboard for patient safety language compliance.

Focus on:
- Error messages (no alarming words)
- Alert messages (calm, specific, actionable)
- Critical warnings (drug interactions, allergies)
```

**healthcare-ux-guidelines Output:**

```markdown
## Patient Safety Language Audit: Patient Portal Dashboard

### Error Messages

**Scenario: Network error loading medications**

❌ **BEFORE (Alarming):**
```
Error: Failed to load medications. Connection timeout.
```
- Alarming words: "Error", "Failed"
- Technical jargon: "Connection timeout"
- Not actionable: What should patient do?

✅ **AFTER (Patient-Safe):**
```
Unable to load your medications. Please check your internet connection and try again. If the problem continues, contact support at 02-1234-5678.
```
- Calm: "Unable to" (not "Error" or "Failed")
- Specific: Mentions internet connection
- Actionable: Check connection, contact support with phone number
- Reassuring: Implies data is safe

---

**Scenario: Prescription refill not available**

❌ **BEFORE (Vague):**
```
Refill request failed.
```
- Alarming: "failed"
- Vague: Why did it fail?
- Not actionable: What should patient do?

✅ **AFTER (Patient-Safe):**
```
Your prescription refill is not yet available. Refills become available 5 days before your medication runs out. You can request a refill starting December 20, 2024.
```
- Calm: No alarming words
- Specific: Explains why (timing) and when available
- Actionable: Clear next step (when to request)

---

### Alert Messages (Drug Interactions, Allergies)

**Scenario: Drug interaction warning**

❌ **BEFORE (Too Alarming):**
```
⛔ CRITICAL ERROR: DANGEROUS DRUG INTERACTION DETECTED!
Amoxicillin + Warfarin may cause FATAL bleeding!
DO NOT TAKE THESE TOGETHER!
```
- Overly alarming: "FATAL", "DO NOT", all caps, red exclamation marks
- May cause panic: Patients may stop necessary medications without consulting doctor
- Not balanced: Doesn't mention interaction is manageable with monitoring

✅ **AFTER (Patient-Safe but Clear):**
```
⚠️ Drug Interaction Notice
Amoxicillin may interact with your Warfarin (blood thinner).

What this means:
This combination may increase the effect of Warfarin. Your doctor will monitor your blood levels more frequently.

What to do:
✓ Continue taking your medications as prescribed
✓ Inform your doctor at your next visit (scheduled Dec 15)
✓ Watch for unusual bruising or bleeding
✓ Do not stop taking medications without consulting your doctor

Questions? Call your clinic: 02-1234-5678
```
- Clear but not alarming: "may interact" (not "FATAL")
- Contextualizes: Explains what interaction means
- Actionable: Specific steps to take
- Empowers patient: Continue medications, monitor, inform doctor
- Provides support: Clinic phone number

---

**Scenario: Allergy alert**

❌ **BEFORE:**
```
ERROR: You are allergic to this medication! DO NOT TAKE!
```

✅ **AFTER:**
```
⚠️ Allergy Alert
Your medical record indicates an allergy to Penicillin.

This medication (Amoxicillin) contains Penicillin.

What to do:
✓ Do not take this medication
✓ Contact your doctor immediately: 02-1234-5678
✓ Inform pharmacy staff of your allergy

If you believe this alert is an error, ask your doctor to update your allergy list.
```
- Clear warning: "Allergy Alert" (not "ERROR")
- Specific: Names the allergen (Penicillin)
- Actionable: Call doctor, inform pharmacy
- Empowers: Mentions updating if error

---

### Critical Warnings Assessment

**Drug Interaction Warnings:**
- [x] ✅ Clearly marked with ⚠️ icon
- [x] ✅ High contrast (visible in dim rooms)
- [x] ✅ Announced to screen readers (role="alert")
- [x] ✅ Persistent (doesn't auto-dismiss)
- [x] ✅ Actionable guidance provided
- [x] ✅ Balanced (clear but not panic-inducing)

**Allergy Alerts:**
- [x] ✅ Highest priority (top of dashboard)
- [x] ✅ Cannot be dismissed (permanent visibility)
- [x] ✅ Specific allergen named
- [x] ✅ Doctor contact included

---

### Summary: Patient Safety Language

**Status:** ✅ **PASS**

**Strengths:**
- No alarming words ("Error", "Failed", "Fatal", "Critical")
- All messages calm, specific, actionable
- Critical warnings balanced (clear without panic)
- Support contact information provided
- Empowers patients (explains what to do)

**Recommendation:** Approved for patient-facing deployment

---

### Examples Approved for Use

| Context | ❌ Avoid | ✅ Use |
|---------|---------|--------|
| Network error | "Error 500: Server failed" | "Unable to load. Please check your connection and try again." |
| Invalid input | "Invalid date of birth" | "Please check the date of birth and try again. Use format: MM/DD/YYYY." |
| Prescription unavailable | "Refill request failed" | "Your refill is not yet available. You can request starting December 20, 2024." |
| Drug interaction | "FATAL INTERACTION!" | "Drug interaction notice: [Name] may interact with [Name]. What to do: [Steps]" |
| Allergy alert | "ERROR: ALLERGIC!" | "Allergy Alert: Your medical record indicates an allergy to [Allergen]. Do not take this medication. Contact your doctor: [Phone]." |
```

### Decision Gate 2: Patient Safety Language

**Assessment:** All criteria met ✅

**Decision:** Proceed to Stage 3 (Philippine Context)

---

## Stage 3: Philippine Healthcare Context Validation

**Skill:** `healthcare-ux-guidelines` (Philippine context mode)

**Prompt:**
```
Validate the patient portal dashboard for Philippine healthcare context.

Focus on:
- Offline functionality (rural clinics with 2G/3G)
- Low bandwidth (<10s load on 3G)
- Mobile-responsive (80%+ PH users on mobile)
- Filipino language support (if patient-facing)
```

**healthcare-ux-guidelines Output:**

```markdown
## Philippine Context Validation: Patient Portal Dashboard

### Offline Functionality Testing

**Test Method:** Disconnect network, interact with dashboard

**Core Functionality:**
- [x] ✅ View medications list (cached in IndexedDB)
- [x] ✅ View upcoming appointments (cached)
- [x] ✅ Read previous messages from doctor (cached)
- [x] ❌ **FAIL:** Cannot view prescription refill history (requires network)

**Offline Sync:**
- [x] ✅ "Offline" indicator shown in header
- [x] ✅ Actions queued for sync (appointment requests, messages)
- [x] ✅ Auto-sync when reconnected (tested)
- [x] ✅ Conflict resolution UI (if data changed server-side)

**Critical Issue:**
1. **Prescription refill history requires network**
   - Location: `src/services/prescription-service.ts:89`
   - Issue: No offline cache for refill history
   - Impact: Rural patients with unreliable internet cannot view history
   - Fix: Cache last 12 months of refill history in IndexedDB
   - Priority: HIGH (affects 35% of rural patients)

---

### Low Bandwidth Testing (3G Throttling)

**Test Method:** Chrome DevTools, Fast 3G (750 Kbps)

**Page Load Performance:**

| Asset | Size | Load Time (3G) | Status |
|-------|------|---------------|--------|
| HTML | 12 KB | 0.8s | ✅ |
| CSS | 45 KB | 2.1s | ✅ |
| JavaScript (bundle) | 180 KB (gzipped) | 6.2s | ✅ |
| Images (hero, icons) | 85 KB | 3.8s | ✅ |
| **Total** | **322 KB** | **9.2s** | ✅ **PASS** (target: <10s) |

**Critical Content Load (Above-the-Fold):**
- Medications card: **2.1s** ✅ (target: <3s)
- Appointments card: **2.3s** ✅
- Alerts banner: **1.8s** ✅

**Optimization Opportunities:**
- Lazy-load below-the-fold content (messages, refill history)
- Use WebP images (save ~30% size)
- Code splitting (reduce initial bundle)

---

### Mobile-Responsive Testing

**Devices Tested:**
- iPhone 13 (iOS 17) - Safari
- Samsung Galaxy S21 (Android 13) - Chrome
- Xiaomi Redmi Note 10 (Android 12) - Chrome (popular in Philippines)

**Portrait Mode (320px-428px width):**
- [x] ✅ All cards stack vertically (no horizontal scroll)
- [x] ✅ Touch targets 48x48px (tested)
- [x] ✅ Text readable without zoom (16px body text)
- [x] ✅ Forms usable with on-screen keyboard

**Landscape Mode (568px-926px width):**
- [x] ✅ Two-column layout (medications + appointments side-by-side)
- [x] ✅ No content cut off

**On-Screen Keyboard:**
- [x] ✅ Input fields visible when keyboard open
- [x] ✅ Auto-scroll to focused field
- [x] ✅ "Done" button on iOS keyboard submits form

---

### Filipino Language Support

**Scope:** Patient portal is patient-facing → Filipino language required

**Translation Status:**

| Element | English | Filipino | Status |
|---------|---------|----------|--------|
| Medications | "Current Medications" | "Kasalukuyang Gamot" | ✅ |
| Appointments | "Upcoming Appointments" | "Mga Susunod na Appointment" | ✅ |
| Refills | "Request Refill" | "Humiling ng Refill" | ✅ |
| Alerts | "Drug Interaction Notice" | "Paalala: Interaksyon ng Gamot" | ✅ |
| Error messages | "Unable to load" | "Hindi ma-load" | ✅ |
| Date format | "MM/DD/YYYY" | "MM/DD/YYYY" (same) | ✅ |
| Currency | "$" | "₱" | ✅ |

- [x] ✅ All patient-facing text translated
- [x] ✅ Language toggle accessible (top-right header)
- [x] ✅ Preference saved (localStorage)
- [x] ✅ Default language: Filipino (majority of patients)

**Filipino Error Message Examples:**
```
English: "Unable to load your medications. Please check your internet connection."
Filipino: "Hindi ma-load ang iyong mga gamot. Pakisuri ang iyong internet connection."

English: "Your refill is not yet available. You can request starting December 20."
Filipino: "Ang iyong refill ay hindi pa available. Pwede kang humiling simula Disyembre 20."
```

---

### LGU Deployment Readiness

**Target Users:** Patients in LGU health centers (RHUs, BHSs)

**Digital Literacy:**
- [x] ✅ Simple navigation (3 main sections: Gamot, Appointments, Messages)
- [x] ✅ Icons + text labels (not icon-only)
- [x] ✅ No complex gestures (no pinch-to-zoom required, no swipe gestures)
- [x] ✅ Large tap targets (48x48px)

**Device Compatibility:**
- [x] ✅ Works on 2-3 year old Android devices (tested Xiaomi Redmi Note 10)
- [x] ✅ Minimal battery drain (no auto-refresh, sync on demand)
- [x] ✅ Low memory usage (<50MB)

---

### Philippine Healthcare Integration

**FHISIS Compatibility:**
- N/A (patient portal doesn't export to FHISIS)

**PhilHealth Requirements:**
- [x] ✅ Patient consent documented (accepted terms during registration)
- [x] ✅ Data privacy notice displayed (footer link)

**DOH Compliance:**
- [x] ✅ Patient data encrypted (HTTPS/TLS 1.3)
- [x] ✅ Audit trail (patient actions logged)

---

### Summary: Philippine Healthcare Context

**Status:** ⚠️ **PASS with 1 Issue**

**Critical Issue:**
1. Prescription refill history not cached for offline (needs fix before rural deployment)

**Strengths:**
- ✅ Offline core functionality works
- ✅ Loads in <10s on 3G
- ✅ Mobile-responsive (tested on Philippine devices)
- ✅ Filipino language fully translated
- ✅ LGU deployment ready (simple, accessible)

**Recommendation:**
- Fix offline refill history caching
- Deploy to urban clinics immediately (reliable internet)
- Deploy to rural clinics after offline fix (1-2 days)
```

### Decision Gate 3: Philippine Context

**Assessment:** 1 non-critical issue (offline caching) ⚠️

**Decision:**
- ✅ Approve for urban clinic deployment (reliable internet)
- ⏸️ Hold rural clinic deployment until offline caching fixed (1-2 days)

---

## Final Compliance Report

```markdown
# Healthcare Compliance Certification: Patient Portal Dashboard

**Date:** 2024-11-24
**Auditor:** healthcare-ux-guidelines skill
**Version:** v2.1.0

---

## Certification Summary

**Overall Status:** ✅ **APPROVED FOR PRODUCTION** (Urban clinics)

| Validation Stage | Status | Critical Issues | Notes |
|-----------------|--------|----------------|-------|
| WCAG 2.2 Level AA | ✅ PASS | 0 | All 5 initial issues fixed |
| Patient Safety Language | ✅ PASS | 0 | No alarming language detected |
| Philippine Context | ⚠️ PASS* | 1* | *Offline refill caching pending |

---

## Stage 1: WCAG 2.2 Level AA ✅

**Conformance Level:** AA (meets all criteria)

**Success Criteria Met:** 48/48 (100%)

**Testing Summary:**
- Color contrast: All elements 4.5:1+ (text), 3:1+ (UI)
- Keyboard navigation: All interactive elements reachable, logical tab order
- Screen reader: NVDA tested, all content announced correctly
- Touch targets: All 44x44px+ (healthcare standard: 48x48px achieved)
- Focus indicators: 3px minimum, high contrast

**Issues Resolved:**
1. Disabled button contrast increased: 2.8:1 → 4.54:1 ✅
2. Alert border contrast increased: 1.2:1 → 4.54:1 ✅
3. Escape key handler added to alert banner ✅
4. ARIA roles added (role="alert", aria-live) ✅
5. Dismiss button size increased: 32px → 48px ✅

---

## Stage 2: Patient Safety Language ✅

**Status:** PASS (all criteria met)

**Audit Results:**
- ✅ No alarming words ("Error", "Failed", "Fatal", "Critical")
- ✅ All error messages calm, specific, actionable
- ✅ Drug interaction warnings balanced (clear but not panic-inducing)
- ✅ Allergy alerts appropriately prioritized
- ✅ Support contact information provided

**Examples Approved:**
- Network error: "Unable to load. Please check your connection and try again."
- Drug interaction: "Drug interaction notice: [Details]. What to do: [Steps]."
- Allergy alert: "Allergy Alert: Your record indicates allergy to [Name]. Do not take. Contact doctor: [Phone]."

---

## Stage 3: Philippine Healthcare Context ⚠️

**Status:** PASS with 1 pending issue

**Testing Results:**
- ✅ Offline core functionality works (medications, appointments cached)
- ✅ Page loads in 9.2s on 3G (target: <10s)
- ✅ Mobile-responsive (tested iOS, Android, Xiaomi devices)
- ✅ Filipino language fully translated (100% coverage)
- ✅ LGU deployment ready (simple, accessible, low battery drain)

**Pending Issue:**
1. Prescription refill history not cached for offline
   - Priority: HIGH for rural deployment
   - Estimated fix: 1-2 days
   - Workaround: Deploy to urban clinics first (reliable internet)

---

## Production Deployment Authorization

**Approved for:** Urban Clinics (Metro Manila, Provincial Cities)

**Conditions:**
- ✅ All WCAG 2.2 AA criteria met
- ✅ Patient safety language validated
- ✅ Works on 3G connections
- ✅ Mobile-responsive
- ✅ Filipino language available

**Hold for:** Rural Clinics (RHUs, BHSs)

**Reason:** Offline refill caching pending (1-2 days)

**Next Steps:**
1. Deploy to urban clinics (50,000+ patients)
2. Monitor for 1 week
3. Fix offline refill caching
4. Deploy to rural clinics (20,000+ patients)

---

## Signature

**Auditor:** Claude (healthcare-ux-guidelines skill)
**Date:** November 24, 2024
**Approved for Production:** Yes (Urban clinics)

---

## Related Documentation

- [Healthcare Compliance Workflow](../../../workflows/healthcare-compliance-workflow.md)
- [WCAG 2.2 Reference](../../../skills/_healthcare/healthcare-ux-guidelines/reference/WCAG_COMPLIANCE.md)
- [Patient Safety Language Guide](../../../skills/_healthcare/healthcare-ux-guidelines/reference/PATIENT_SAFETY_LANGUAGE.md)
```

---

## Key Takeaways

**Why 3-stage validation?**
- **WCAG:** Legal requirement (accessibility for all users, including patients with disabilities)
- **Patient Safety:** Ethical obligation (calm language prevents panic in healthcare context)
- **Philippine Context:** Practical necessity (offline + 3G + mobile + Filipino = usable for target users)

**All 3 must pass before production release**
- Cannot skip any stage (all are critical for healthcare software)
- Issues in any stage block release
- Validation done pre-release (not post-release, when fixing is costly)

**Decision Gates:**
- Gate 1 (WCAG): Block if any failures (legal/accessibility requirement)
- Gate 2 (Patient Safety): Block if alarming language (ethical/safety requirement)
- Gate 3 (Philippine): Block if doesn't work for target users (practical requirement)

**When to use this pattern:**
- Before every UI release (patient-facing or staff-facing)
- During compliance audits
- Before deploying to new regions (rural vs urban)
- When regulations update (WCAG 2.2 vs 2.1)

**Time investment:**
- Stage 1 (WCAG): 1-2 hours
- Stage 2 (Patient Safety): 30 minutes
- Stage 3 (Philippine): 1-2 hours
- Total: ~3-4 hours (worth it to avoid legal/ethical issues)

**Related:**
- [Healthcare Compliance Workflow](../../../workflows/healthcare-compliance-workflow.md) - Complete process
- [Healthcare Checklist](../../../docs/healthcare-checklist.md) - Printable validation checklist
- [/audit-wcag Command](../../../commands/audit-wcag.md) - One-command WCAG validation
