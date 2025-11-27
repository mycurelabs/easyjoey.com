# Healthcare Skills

**Specialized knowledge for building compliant, trustworthy healthcare software.**

---

## Overview

This directory contains **3 essential skills** for healthcare product development:

| Skill | Focus | Audience |
|-------|-------|----------|
| **healthcare-ux-standards** | General healthcare UX (US/International) | HIS, EMR, Patient Portals, Telehealth |
| **healthcare-ux-guidelines** | Philippine community health context | MYCURE, LGU, RHU, BHS systems |
| **research-synthesis-guidelines** | Evidence-based decision making | All healthcare research |

**Together, these skills ensure healthcare products are:**
- ✅ **Legally compliant** (WCAG 2.2 Level AA, HHS Section 504, ADA, EN 301 549)
- ✅ **Patient-safe** (error messages that don't alarm patients)
- ✅ **Evidence-based** (decisions grounded in HIGH confidence research)
- ✅ **Context-appropriate** (Philippine-specific OR US/International)

---

## Skill 0: healthcare-ux-standards (NEW)

**Purpose:** General healthcare UX standards for HIS, EMR/EHR, clinic management, patient portals, and telehealth platforms with US/International regulatory alignment.

### What This Skill Provides

**WCAG 2.2 Level AA Compliance:**
- Complete WCAG 2.2 checklist (including 9 new 2.2 criteria)
- Accessible authentication (3.3.8) - password managers, biometrics
- Redundant entry prevention (3.3.7) - auto-populate patient data
- Target size minimum (2.5.8) - 24x24px touch targets

**US Regulatory Framework:**
- HHS Section 504 Final Rule (May 2024) - Compliance deadlines May 2026/2027
- ADA Title III requirements
- Section 508 for federal healthcare
- 21st Century Cures Act patient portal access
- **HIPAA clarification**: Does NOT require accessibility (common misconception)

**International Standards:**
- EN 301 549 (EU) - European accessibility standard
- NHS Digital Service Standard (UK) - WCAG 2.2 AA
- Australian Digital Health Agency standards
- ISO 62366 (medical device usability)

**Healthcare Application Types:**
- Hospital Information Systems (HIS)
- Electronic Medical Records (EMR/EHR)
- Clinic/Practice Management
- Patient Portals
- Telehealth Platforms
- Medical Kiosks

**Mobile & AI Accessibility:**
- iOS (VoiceOver) and Android (TalkBack) requirements
- Healthcare chatbot accessibility
- Voice interface guidelines
- HL7 FHIR patient access considerations

### When This Skill Auto-Activates

- Designing general healthcare interfaces (HIS, EMR, clinic management)
- Building patient portals or telehealth platforms
- Creating US/International healthcare applications
- Conducting WCAG 2.2 accessibility audits
- Writing error messages for healthcare apps

### Relationship to healthcare-ux-guidelines

| healthcare-ux-standards | healthcare-ux-guidelines |
|------------------------|--------------------------|
| General healthcare (US/International) | Philippine community health |
| HIS, EMR, Patient Portals, Telehealth | LGU, RHU, BHS, FHSIS systems |
| WCAG 2.2, HHS Section 504, ADA, EN 301 549 | WCAG 2.2 + Philippine DOH context |
| No offline-first requirements | Offline-first for rural deployment |
| Standard bandwidth assumptions | Low-bandwidth optimization |

**Use healthcare-ux-standards when:**
- Building general healthcare management software
- Targeting US or international markets
- Regulatory compliance focus (HHS, ADA, EN 301 549)

**Use healthcare-ux-guidelines when:**
- Building for Philippine healthcare context
- MYCURE product development
- LGU/government health system integration
- FHISIS or PhilHealth requirements

---

## Skill 1: healthcare-ux-guidelines (MYCURE/Philippine)

---

## Why Healthcare Needs Specialized Skills

### The Stakes Are Higher

**In healthcare, bad UX decisions can:**
- 🚨 Violate legal accessibility requirements (WCAG 2.2 Level AA is law)
- 🚨 Cause patient panic (alarming error messages in exam rooms)
- 🚨 Lead to medical errors (poor UI design → wrong patient selected)
- 🚨 Reduce patient trust (unprofessional interfaces)
- 🚨 Waste healthcare professional time (inefficient workflows)

**Unlike consumer apps:**
- Can't just "iterate and improve" - must be compliant from launch
- Users include vulnerable populations (sick, anxious, disabled)
- Staff work under time pressure (slow UX = fewer patients treated)
- Operates in regulated environment (DOH, PhilHealth, HIPAA)

### The Philippine Healthcare Context

**Philippine healthcare is unique:**
- **LGU Structure:** Provincial Health Office → City/Municipal Health Office → RHU → BHS
- **Government Systems:** FHISIS reporting, PhilHealth claims, DOH regulations
- **Infrastructure:** Urban fiber (99% uptime) vs Rural 2G/3G (<50% reliability)
- **Literacy:** Varies widely (English/Filipino in NCR, regional languages in provinces)
- **Resources:** Private clinics well-funded vs LGU health centers budget-constrained

**Generic healthcare software (US/EU) doesn't account for:**
- Offline-first requirements (rural connectivity)
- FHISIS reporting format and requirements
- PhilHealth claims integration
- Multi-location inventory (clinics, RHUs, BHSs)
- Regional language support
- Low-resource environment optimization

---

## Skill 1: healthcare-ux-guidelines

**Purpose:** Ensure MYCURE interfaces meet accessibility standards and use patient-safe language

### What This Skill Provides

**WCAG 2.2 Level AA Compliance:**
- Complete audit checklist (166 success criteria)
- Color contrast requirements (4.5:1 text, 3:1 UI components)
- Keyboard navigation patterns
- Screen reader support guidelines
- Focus indicator standards
- Form validation requirements

**Patient Safety Language:**
- Error message word substitutions
- Notification level standards
- Context-specific messaging (patient-visible vs staff-only)
- Critical alert formatting
- Calm, professional tone guidelines

**Philippine Healthcare Context:**
- LGU health system understanding
- FHISIS and PhilHealth integration considerations
- Connectivity requirements (offline-first)
- Regional language support

### When This Skill Auto-Activates

- Designing healthcare interfaces
- Writing error messages or notifications
- Creating patient-facing features
- Building forms or data entry screens
- Implementing accessibility features
- Validating WCAG compliance

### Core Principle: Patient Safety First

**Every error message must ask:** "If a patient saw this on a screen in an exam room, would it cause unnecessary alarm?"

**Examples:**

| ❌ Alarming | ✅ Patient-Safe |
|-----------|----------------|
| "Fatal Error: System Crashed" | "Unable to process request. Your data is safe. Please contact support." |
| "Invalid patient record - FAILED" | "This patient record is not currently available. Please verify the patient ID." |
| "Error 500: Database connection failed" | "We're experiencing technical difficulties. Please try again in a few moments." |
| "Denied: Insufficient permissions" | "You don't have permission to access this section. Please contact your administrator." |

### WCAG 2.2 Level AA: Legal Minimum

**WCAG 2.2 Level AA is not optional for healthcare software:**
- Legal requirement in many jurisdictions
- DOH may enforce for government health systems
- PhilHealth may require for accredited software
- Ethical obligation to patients with disabilities

**Key Requirements:**
1. **Perceivable**
   - Text alternatives for non-text content
   - Captions for videos
   - Color contrast 4.5:1 (body text), 3:1 (UI components)
   - Resizable text up to 200% without loss of function

2. **Operable**
   - All functionality keyboard accessible
   - No keyboard traps
   - Sufficient time to read/interact
   - No flashing content (seizure risk)
   - Clear focus indicators (3px outline minimum)

3. **Understandable**
   - Readable text (plain language)
   - Predictable behavior
   - Clear error identification
   - Labels and instructions provided

4. **Robust**
   - Compatible with assistive technologies
   - Valid HTML/CSS
   - Accessible name and description for components

**For MYCURE, we aim for WCAG AAA where possible** (especially text contrast 7:1) because:
- Healthcare staff work in varying light conditions
- Patients may have vision impairments
- Critical information must be unmistakably readable

---

## Skill 2: research-synthesis-guidelines

**Purpose:** Ensure product decisions are grounded in HIGH confidence evidence, not assumptions

### What This Skill Provides

**Confidence Grading Framework:**
- **HIGH Confidence:** 3+ independent sources, primary research, recent (2yrs), PH-specific, consistent
- **MEDIUM Confidence:** 1-2 sources, some gaps in quality/recency/location
- **LOW Confidence:** Single source, outdated, assumptions, contradictory evidence

**Triangulation Methodology:**
- **Data Triangulation:** Primary + Secondary + Internal data
- **Method Triangulation:** Interviews + Surveys + Observation + Analytics
- **Context Triangulation:** Urban private + Rural LGU + Government hospitals

**Citation Standards:**
- Rigorous sourcing for credibility
- Date, source type, specific data points
- Enables verification and future research

**Research Report Templates:**
- Methodology section
- Findings with confidence grades
- Triangulation assessment
- Recommendations by confidence level

### When This Skill Auto-Activates

- Documenting user research findings
- Synthesizing market or competitive research
- Grading evidence quality
- Writing research reports or insights
- Analyzing Philippine healthcare systems
- Conducting stakeholder interviews
- Evaluating healthcare workflows

### Core Principle: Evidence-Based Product Development

**All MYCURE product decisions must be grounded in research.**

**Why:**
- Healthcare products impact patient care (lives depend on accuracy)
- Assumptions can lead to dangerous design flaws
- Stakeholder buy-in requires credible evidence
- Philippine healthcare context has unique requirements

**Example: Inventory Management Feature Decision**

**Question:** Should MYCURE support multi-location stock transfers?

**❌ Assumption-Based Decision:**
```
"Clinics probably need to transfer stock between locations,
so let's build transfer functionality."

Confidence: LOW
Risk: HIGH (may build unused feature, waste development time)
```

**✅ Evidence-Based Decision:**
```markdown
## Finding: Clinics require multi-location stock transfer capability [HIGH CONFIDENCE]

**Evidence:**
1. **Interview** - 8/10 clinic administrators in Metro Manila reported
   transferring stock between branches 2-3 times per week (June 2024)
2. **Observation** - Observed manual Excel-based transfer tracking at
   3 multi-location clinics, taking 15-20 minutes per transfer (June 2024)
3. **DOH data** - 2023 Philippine Health Facility Survey shows 42% of
   private clinics operate 2+ locations

**Triangulation:** Interview reports + Direct observation + Government data = HIGH

**Implications:** Multi-location transfer is a must-have feature for
target market (multi-location clinics). Current manual process takes
15-20 minutes; MYCURE can reduce to <5 minutes.

**Recommendation:** Prioritize transfer functionality in Phase 1.
```

**Result:** HIGH confidence → Proceed with development

### Confidence Grading in Practice

**HIGH Confidence (3+ sources, primary research, recent, PH-specific, consistent)**

**Decision impact:** Proceed with confidence
**Example findings:**
- Manual patient registration takes 12-15 minutes (observed + reported + DOH data)
- LGU health workers prefer mobile apps (survey + interviews + usage analytics)
- Inventory mismanagement costs clinics 15-20% of medication budget (interviews + DOH report + pilot data)

---

**MEDIUM Confidence (1-2 sources, some gaps)**

**Decision impact:** Proceed with caution, validate further if critical
**Example findings:**
- RHU staff prefer mobile over desktop (regional survey, not PH-specific)
- Patients want SMS appointment reminders (anecdotal, small sample)

**Action:** Conduct targeted PH-specific research before major investment

---

**LOW Confidence (single source, outdated, assumptions)**

**Decision impact:** DO NOT base major decisions on this
**Example findings:**
- Clinics willing to pay ₱50,000/month (assumption, no validation)
- Healthcare IT adoption increasing (2019 study, pre-COVID, outdated)

**Action:** Conduct pricing sensitivity survey, recent adoption study before proceeding

---

## How These Skills Work Together

### Product Development Workflow

**1. Research Phase** (research-synthesis-guidelines)
```
User Research → Confidence Grading → Evidence Synthesis → Recommendations
```
**Output:** HIGH confidence findings to drive decisions

---

**2. Design Phase** (healthcare-ux-guidelines + frontend-design)
```
Requirements → UX Design → WCAG Validation → Patient Safety Language → Mockups
```
**Output:** Compliant, patient-safe, distinctive interfaces

---

**3. Implementation Phase**
```
Development → WCAG Testing → Patient Safety Language Validation → Deployment
```
**Output:** Compliant, trustworthy healthcare software

---

**4. Validation Phase** (research-synthesis-guidelines)
```
User Testing → Metrics Analysis → Confidence Grading → Iterate or Ship
```
**Output:** Validated product ready for production

---

### Example: Appointment Reminder Feature

**Step 1: Research**
```markdown
## Finding: SMS appointment reminders reduce no-shows by 35-40% [HIGH CONFIDENCE]

**Evidence:**
1. **Pilot study** - MYCURE pilot clinic A: no-show rate dropped from 28% to 15%
   with SMS reminders (n=500 appointments, 3 months, 2024)
2. **Interview** - 9/10 clinic administrators reported 30-40% no-show reduction
   with manual SMS reminders (May 2024)
3. **DOH report** - 2023 study cited 37% average no-show reduction with automated
   reminders in Metro Manila clinics

**Triangulation:** Pilot data + Stakeholder interviews + Government report = HIGH

**Recommendation:** Build SMS reminder feature - HIGH ROI, proven effectiveness
```

**Step 2: Design (healthcare-ux-guidelines)**
```markdown
## UX Requirements:
- [ ] WCAG 2.2 Level AA contrast for reminder settings
- [ ] Keyboard navigation for reminder configuration
- [ ] Patient safety language:
      - ✅ "Unable to send reminder" (not "SMS failed")
      - ✅ "Reminder scheduled" (not "Reminder queued - no errors")
- [ ] Filipino language support for SMS content
- [ ] Opt-out mechanism (patient privacy)
```

**Step 3: Implementation**
```typescript
// Patient-safe error handling
async function sendAppointmentReminder(appointmentId: string) {
  try {
    await smsProvider.send({
      to: appointment.patient.mobile,
      message: reminderTemplate.filipino
    });

    return {
      status: 'success',
      message: 'Reminder scheduled for delivery'  // Not "SMS queued"
    };
  } catch (error) {
    return {
      status: 'error',
      // Patient-safe language (not "SMS failed - error 500")
      message: 'Unable to send reminder. Please contact the clinic to confirm your appointment.',
      supportCode: error.code  // Technical detail for staff only
    };
  }
}
```

**Step 4: Validation**
```markdown
## Validation Study: SMS Reminders [HIGH CONFIDENCE]

**Method:** 3-month trial, 5 clinics, 2,500 appointments

**Finding:** 38% reduction in no-shows (27% to 16.7%)

**Evidence:**
1. **Pilot analytics** - 2,500 appointments, no-show rate dropped 27% → 16.7%
2. **Clinic feedback** - 5/5 administrators rated feature "very valuable"
3. **Patient survey** - 92% of patients (n=150) found reminders helpful

**Confidence:** HIGH (pilot data + stakeholder feedback + patient survey)

**Decision:** Roll out to all MYCURE customers
```

---

## Philippine Healthcare Context Deep Dive

### LGU Health System Structure

```
Provincial Health Office (PHO)
├── City/Municipal Health Office (CHO/MHO)
│   ├── Rural Health Units (RHUs)
│   │   └── Barangay Health Stations (BHS)
│   └── City Health Centers
└── District Hospitals
```

**MYCURE must support:**
- Multi-level reporting (BHS → RHU → CHO → PHO)
- FHISIS export (monthly DOH reporting)
- Stock transfers across levels
- Different user permissions by level
- Offline operation (BHS often have no internet)

### Government Systems Integration

**FHISIS (Field Health Service Information System):**
- DOH monthly reporting requirement for LGU health facilities
- Specific data formats and fields
- Deadline-driven (monthly reports)
- MYCURE must support FHISIS-compliant export

**PhilHealth:**
- National health insurance (90%+ coverage)
- Claims processing and reimbursement
- Accreditation requirements
- MYCURE must integrate claims submission

### Infrastructure Reality

| Setting | Internet | Power | Staff Literacy |
|---------|----------|-------|----------------|
| Urban Private Clinic | Fiber, 99% uptime | Stable | High (English) |
| City LGU Health Center | DSL/Fiber, 80-90% | Stable | Medium-High |
| Rural RHU | 2G/3G, <50% | Intermittent | Medium |
| Barangay Health Station | None/2G | Unreliable | Low-Medium |

**Design Implications:**
- **Offline-first:** Must work without internet
- **Low bandwidth:** Optimize asset sizes (<500KB pages)
- **Power-aware:** Quick save, auto-save (power may cut)
- **Progressive enhancement:** Works without JavaScript
- **Language support:** Filipino/Tagalog + regional languages

---

## Compliance Checklist

### Before Launching Any MYCURE Feature

**Healthcare UX (healthcare-ux-guidelines):**
- [ ] WCAG 2.2 Level AA compliance verified (use audit checklist)
- [ ] All error messages use patient safety language
- [ ] Color contrast meets 4.5:1 minimum (7:1 for critical info)
- [ ] Keyboard navigation fully functional
- [ ] Screen reader tested with NVDA/JAWS
- [ ] Focus indicators visible (3px minimum)
- [ ] Touch targets 44x44px minimum
- [ ] Form validation clear and helpful
- [ ] Critical alerts properly highlighted
- [ ] Tested in low-light conditions

**Research Validation (research-synthesis-guidelines):**
- [ ] Feature justified by HIGH confidence research
- [ ] User needs documented with 3+ sources
- [ ] Philippine-specific validation (not US/EU extrapolation)
- [ ] Recent evidence (within 2 years)
- [ ] Triangulation performed (multiple data types/methods)
- [ ] Limitations and gaps acknowledged
- [ ] Stakeholder feedback incorporated

**Philippine Context:**
- [ ] Works offline (critical for rural deployment)
- [ ] FHISIS export compatible
- [ ] PhilHealth integration (if billing feature)
- [ ] Filipino language support
- [ ] Tested on 2G/3G connection speeds
- [ ] Asset sizes optimized (<100KB images)
- [ ] Progressive enhancement (no-JS mode)

---

## Continuous Improvement

### These Skills Evolve Based On:

1. **Regulatory Updates**
   - WCAG 2.2 → WCAG 3.0 (when released)
   - DOH policy changes (FHISIS requirements)
   - PhilHealth accreditation updates

2. **MYCURE User Feedback**
   - Clinic administrator input
   - Healthcare professional usability testing
   - Patient feedback (portal, kiosks)
   - LGU health worker field studies

3. **Research Findings**
   - New Philippine healthcare studies
   - International healthcare UX research
   - Accessibility research advances

4. **Technology Changes**
   - New WCAG techniques
   - Improved screen reader support
   - Better offline-first patterns

---

## Related Skills

**These healthcare skills integrate with:**

- **frontend-design** - Distinctive, trustworthy UI design
- **marketing-content-guidelines** - Patient-facing content tone
- **video-production-guidelines** - Training videos for healthcare staff
- **development-plan-reviewer** agent - Validates plans include WCAG compliance

---

## Success Metrics

**MYCURE products using these skills should achieve:**

✅ **Zero WCAG violations** (Level AA minimum)
✅ **Zero patient alarm incidents** (patient safety language compliance)
✅ **90%+ feature adoption** (evidence-based features users actually need)
✅ **HIGH research confidence** for all major decisions
✅ **DOH/PhilHealth compliance** (FHISIS, claims integration)
✅ **Works in rural settings** (offline-first, 2G/3G tested)

---

## Resources

**Internal:**
- [healthcare-ux-standards/SKILL.md](healthcare-ux-standards/SKILL.md) - General healthcare UX (US/International)
- [healthcare-ux-guidelines/SKILL.md](healthcare-ux-guidelines/SKILL.md) - Philippine community health context
- [research-synthesis-guidelines/SKILL.md](research-synthesis-guidelines/SKILL.md) - Complete confidence grading framework
- [frontend-design](../_frontend/frontend-design/SKILL.md) - Distinctive healthcare UI design

**External - General Healthcare:**
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [HHS Section 504](https://www.hhs.gov/civil-rights/for-individuals/disability/)
- [ADA Web Guidance](https://www.ada.gov/resources/web-guidance/)
- [EN 301 549](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/)
- [NHS Digital Accessibility](https://service-manual.nhs.uk/accessibility)

**External - Philippine Healthcare:**
- [Philippine DOH](https://doh.gov.ph/)
- [PhilHealth](https://www.philhealth.gov.ph/)
- [FHISIS Documentation](https://doh.gov.ph/FHISIS)

---

**Remember:** Healthcare software carries ethical and legal obligations. These skills ensure MYCURE products are compliant, trustworthy, and genuinely useful for Philippine healthcare providers and patients.
