# Patient Safety Language Guidelines

**Version:** 1.0.0
**Domain:** Healthcare UX
**Last Updated:** 2025-11

---

## Overview

This document defines patient safety language standards for error messaging, notifications, and system feedback in healthcare interfaces including Hospital Information Systems (HIS), Electronic Medical Records (EMR/EHR), patient portals, telehealth platforms, and healthcare chatbots.

**Core Principle:** Healthcare software must not alarm patients or undermine trust in the system.

**Why this matters:**
- Patients may be anxious about their health
- Error messages are often visible in clinical settings (exam rooms, waiting areas)
- Alarming language increases patient stress and anxiety
- Trust is critical for patient compliance and satisfaction
- Healthcare professionals rely on system confidence

---

## Guiding Principles

### 1. Calm and Professional Tone

**Healthcare context requires measured, professional language.**

- Avoid emotional language (panic, crisis, catastrophic)
- Avoid technical jargon patients don't understand
- Use clear, simple explanations
- Maintain professional credibility

### 2. Focus on Solutions, Not Problems

**Error messages should guide users toward resolution.**

- Describe what needs to be done
- Provide specific next steps
- Offer alternatives when possible
- Avoid blame or judgment

### 3. Avoid Alarming Terminology

**Certain words trigger anxiety in healthcare settings.**

**NEVER use:**
- Error, Failed, Broken, Crashed
- Invalid, Illegal, Forbidden
- Fatal, Critical (except for actual life-threatening situations)
- Denied, Rejected, Blocked
- Alert, Warning (except for actual safety issues)

**Instead use:**
- Unable to process, Not available
- Needs attention, Requires review
- Please check, Please verify
- Not found, Not accessible

### 4. Be Specific and Actionable

**Vague errors increase frustration and errors.**

- State exactly what went wrong
- Suggest specific fix
- Provide context (why it matters)
- Include next steps

---

## Word Substitutions

### System States

| Avoid | Use Instead |
|-------|-------------|
| Error | Unable to process |
| Failed | Not completed |
| Broken | Not working as expected |
| Crashed | Stopped responding |
| Down | Temporarily unavailable |
| Offline | Not currently available |

### Validation Issues

| Avoid | Use Instead |
|-------|-------------|
| Invalid | Please check [field name] |
| Illegal | Not allowed |
| Forbidden | Not available |
| Denied | Unable to access |
| Rejected | Needs review |

### Data Issues

| Avoid | Use Instead |
|-------|-------------|
| Missing | Not found |
| Deleted | Removed |
| Lost | Not available |
| Corrupted | Unable to read |

### Urgency Levels

| Avoid | Use Instead |
|-------|-------------|
| Fatal error | Please contact support |
| Critical failure | Needs immediate attention |
| Alert! | Please note |
| Warning! | Important |

---

## Message Templates

### Form Validation Errors

**Required Field Empty:**
```
Bad:  Error: Field required
Good: Please enter [field name]
```

**Invalid Format:**
```
Bad:  Invalid email address
Good: Please enter a valid email address (e.g., name@example.com)
```

**Out of Range:**
```
Bad:  Error: Value too high
Good: Quantity cannot exceed 500 (available in inventory)
```

**Duplicate Entry:**
```
Bad:  Error: Duplicate patient record
Good: A patient with this name and date of birth already exists.
      Would you like to view the existing record?
```

**Date Validation:**
```
Bad:  Invalid date
Good: Please enter date of birth in MM/DD/YYYY format (e.g., 01/15/1985)
```

**Insurance ID:**
```
Bad:  Invalid insurance ID
Good: Insurance ID should be 9 digits. Please verify with your insurance card.
```

---

### Data Not Found

**Patient Record:**
```
Bad:  Fatal error: Patient record not found
Good: This patient record is not currently available.
      Please verify the patient ID or contact support if the issue persists.
```

**Appointment:**
```
Bad:  Appointment not found - error code 404
Good: This appointment is not available.
      It may have been rescheduled or canceled. Please check your email for updates.
```

**Prescription:**
```
Bad:  Error: Prescription does not exist
Good: This prescription was not found.
      Please check the prescription number or contact your pharmacy.
```

**Lab Results:**
```
Bad:  Error: No lab results
Good: Lab results are not yet available.
      Results typically take 2-3 business days. We'll notify you when ready.
```

---

### Permission/Access Issues

**Unauthorized Access:**
```
Bad:  Access denied - forbidden
Good: You don't have permission to access this section.
      Please contact your administrator for assistance.
```

**Session Expired:**
```
Bad:  Session timeout error
Good: Your session has expired for security.
      Please sign in again to continue.
```

**Feature Not Available:**
```
Bad:  Feature locked - access denied
Good: This feature is not included in your current plan.
      Contact us to learn more about upgrading.
```

**Record Access:**
```
Bad:  Error: Cannot access patient record
Good: You don't have permission to view this patient's record.
      If you believe this is an error, please contact Health Information Management.
```

---

### System/Network Issues

**Connection Lost:**
```
Bad:  Network error - connection failed
Good: Unable to connect to the server.
      Please check your internet connection and try again.
```

**Server Unavailable:**
```
Bad:  Server down - error 500
Good: We're experiencing technical difficulties.
      Your data is safe. Please try again in a few moments.
```

**Timeout:**
```
Bad:  Request timed out - operation failed
Good: This is taking longer than expected.
      Please try again or contact support if the issue continues.
```

**Maintenance:**
```
Bad:  System offline for maintenance
Good: We're performing scheduled maintenance to improve your experience.
      Service will resume at [TIME]. Thank you for your patience.
```

---

### Data Integrity Issues

**Unable to Save:**
```
Bad:  Save failed - data not written
Good: Unable to save your changes.
      Please verify the information and try again.
```

**Conflict Detected:**
```
Bad:  Error: Record was modified by another user
Good: This record has been updated by another user.
      Please review the changes and try again.
```

**Unsaved Changes:**
```
Bad:  Warning: Unsaved changes will be lost
Good: You have unsaved changes.
      Would you like to save before leaving this page?
```

---

### Appointment/Scheduling Issues

**Time Slot Unavailable:**
```
Bad:  Error: Appointment slot blocked
Good: This time slot is no longer available.
      Please select a different time or date.
```

**Scheduling Conflict:**
```
Bad:  Conflict error: Overlapping appointments
Good: This patient already has an appointment at this time.
      Would you like to reschedule the existing appointment?
```

**Provider Unavailable:**
```
Bad:  Error: Doctor not available
Good: Dr. Smith is not available at this time.
      Please select a different time or provider.
```

**Past Date:**
```
Bad:  Error: Cannot schedule in the past
Good: Please select a date in the future.
      The earliest available appointment is tomorrow.
```

---

### Billing/Payment Issues

**Payment Failed:**
```
Bad:  Transaction failed - payment error
Good: Unable to process payment.
      Please check your payment information and try again.
```

**Card Declined:**
```
Bad:  Error: Payment declined - insufficient funds
Good: Payment was not processed.
      Please contact your bank or try a different payment method.
```

**Insurance Verification:**
```
Bad:  Error: Insurance verification failed
Good: We're unable to verify your insurance at this time.
      Please contact your insurance provider or our billing department.
```

**Invoice Not Found:**
```
Bad:  Invoice error: Not found
Good: This invoice is not available.
      It may have been paid or adjusted. Please contact billing for assistance.
```

---

### Medication/Pharmacy Issues

**Out of Stock:**
```
Bad:  Error: Medication unavailable
Good: This medication is temporarily out of stock.
      We can notify you when it becomes available, or suggest an alternative.
```

**Dosage Issue:**
```
Bad:  Invalid dosage - error
Good: The requested dosage is outside the typical range.
      Please verify with the prescribing physician.
```

**Refill Too Early:**
```
Bad:  Error: Refill denied - too early
Good: This prescription cannot be refilled until [DATE].
      Per insurance guidelines, refills are available 7 days before the last dose.
```

---

### Telehealth Issues

**Connection Quality:**
```
Bad:  Error: Video connection failed
Good: Having trouble connecting?
      Try refreshing the page or check your camera permissions.
```

**Provider Delay:**
```
Bad:  Provider not available - error
Good: Your provider is running a few minutes behind.
      You're still in the queue. Estimated wait: 5 minutes.
```

**Technical Requirements:**
```
Bad:  Error: Browser not supported
Good: For the best experience, please use Chrome, Firefox, or Safari.
      Your current browser may not support all video features.
```

---

## Context-Specific Guidelines

### 1. Visible to Patients

**When error messages may be seen by patients (registration desk, exam room displays, patient portals):**

- Use most conservative language
- Avoid technical details
- Focus on reassurance
- Provide clear next steps

**Example scenarios:**
- Registration kiosk errors
- Appointment confirmation screens
- Patient portal messages
- Waiting room displays
- Telehealth interface errors

**Template:**
```
Good: We're experiencing a temporary issue.
      Please see the front desk for assistance.
```

---

### 2. Staff-Only Interfaces

**When messages are only seen by healthcare staff:**

- Can be more technical (but still professional)
- Can include system details for troubleshooting
- Still avoid alarming language
- Include error codes for support reference

**Template:**
```
Good: Unable to process request.
      Please verify the information and try again.
      (Reference: ERR-001 for support)
```

---

### 3. Critical Patient Safety Issues

**When there IS an actual safety concern:**

- Use clear, direct language
- State the issue explicitly
- Provide specific actions
- Don't downplay severity

**Drug Interaction Alert:**
```
Good: IMPORTANT: Potential drug interaction detected.

      Warfarin may interact with Aspirin currently prescribed to this patient.

      Action required: Please review medications with prescribing physician
      before dispensing.

      [Review Medications] [Override with Reason] [Cancel]
```

**Allergy Alert:**
```
Good: ALLERGY ALERT: Patient is allergic to Penicillin.

      This medication (Amoxicillin) is a penicillin-type antibiotic.

      Action required: Do not dispense. Select alternative medication.

      [View Alternatives] [Cancel Order]
```

**When to use "WARNING" or "ALERT":**
- Actual patient safety risks (allergies, drug interactions, contraindications)
- Regulatory compliance issues (expired medications, licensing)
- Critical system failures affecting patient care
- Data integrity issues that could impact treatment decisions

---

## Application-Specific Examples

### Hospital Information Systems (HIS)

**Bed Assignment:**
```
Bad:  Error: Bed assignment failed
Good: This bed is currently occupied or unavailable.
      Available beds in this unit: [LIST]. Select an alternative?
```

**Order Entry:**
```
Bad:  Order rejected
Good: This order requires additional verification.
      Reason: Dosage exceeds typical range for patient weight.
      [Verify Dosage] [Cancel Order]
```

### Electronic Medical Records (EMR/EHR)

**Chart Locking:**
```
Bad:  Error: Chart locked by another user
Good: This chart is currently being edited by [User Name].
      You can view the record in read-only mode or try again later.
```

**Documentation Timeout:**
```
Bad:  Session expired - work lost
Good: Your session is about to expire due to inactivity.
      Your notes have been auto-saved. Click Continue to keep working.
```

### Patient Portals

**Account Verification:**
```
Bad:  Error: Cannot verify identity
Good: We need to verify your identity for security.
      Please check your email for a verification link, or contact us for help.
```

**Appointment Booking:**
```
Bad:  Error: Booking failed
Good: We couldn't complete your appointment request.
      The selected time may no longer be available. Please select another time.
```

### Telehealth Platforms

**Audio Issues:**
```
Bad:  Audio error detected
Good: Having trouble with audio?
      • Check that your microphone is not muted
      • Allow microphone access in your browser
      • Try refreshing the page
```

**Video Issues:**
```
Bad:  Camera error
Good: We can't access your camera.
      • Make sure no other apps are using your camera
      • Check your browser permissions
      • You can continue with audio only if needed
```

---

## Healthcare Chatbot/AI Responses

### Greeting and Handoff

```
Good: Hello! I'm your virtual health assistant. I can help you with:
      • Scheduling appointments
      • Prescription refills
      • General health questions

      For medical emergencies, please call 911 or go to your nearest ER.

      How can I help you today?
```

### Understanding Failure

```
Bad:  Error: I didn't understand that
Good: I'm not sure I understood that correctly.
      Could you try rephrasing, or would you like to speak with a staff member?
```

### Escalation

```
Good: This question is best answered by one of our clinical staff.
      Would you like me to connect you with a nurse, or schedule a callback?
```

### Health Information Disclaimer

```
Good: I can provide general health information, but I'm not a substitute for
      medical advice from your doctor.

      For specific medical concerns, please schedule an appointment with your
      healthcare provider.
```

### System Limitations

```
Good: I don't have access to your medical records for privacy reasons.
      For questions about your specific health information, please sign in to
      your patient portal or call our office.
```

---

## Notification Levels

### 1. Success Messages (Green)

**Purpose:** Confirm successful actions

**Tone:** Positive, brief

**Examples:**
```
Good: Patient record saved successfully.
Good: Appointment scheduled for January 15 at 2:00 PM.
Good: Prescription refill request submitted. Allow 24-48 hours for processing.
```

---

### 2. Information Messages (Blue)

**Purpose:** Provide helpful context

**Tone:** Neutral, informative

**Examples:**
```
Good: This patient has 2 upcoming appointments.
Good: Lab results typically take 2-3 business days.
Good: Appointment reminders will be sent 24 hours in advance.
```

---

### 3. Attention Messages (Orange/Yellow)

**Purpose:** Highlight important considerations (not errors)

**Tone:** Important but not urgent

**Examples:**
```
Good: This medication will expire in 30 days.
Good: Patient has missed their last 2 appointments.
Good: Insurance authorization expires on [DATE].
```

---

### 4. Error Messages (Red)

**Purpose:** Indicate action could not be completed

**Tone:** Clear, helpful, solution-focused

**Examples:**
```
Good: Unable to complete request. Please verify the information and try again.
Good: This time slot is no longer available. Please select a different time.
Good: Unable to save changes. Please check the required fields.
```

---

### 5. Critical Alerts (Red with Icon)

**Purpose:** Patient safety or system security issues

**Tone:** Direct, clear, actionable

**Examples:**
```
Good: ALLERGY ALERT: Patient is allergic to this medication.
Good: IMPORTANT: Potential drug interaction detected.
Good: This medication has expired. Do not dispense.
```

---

## Writing Effective Error Messages

### Structure Template

```
[WHAT HAPPENED]
Unable to complete appointment request.

[WHY IT HAPPENED] (optional, if helpful)
The selected time is no longer available.

[WHAT TO DO NEXT]
Please select a different time, or call us to schedule.

[ADDITIONAL HELP] (optional)
For assistance, call (555) 123-4567.
```

### Do's and Don'ts

**DO:**
- Be specific about what went wrong
- Suggest concrete next steps
- Use plain language patients can understand
- Provide context when helpful
- Offer alternatives when possible
- Include contact information for complex issues

**DON'T:**
- Use technical jargon or error codes in main message
- Blame the user ("You entered an invalid...")
- Use negative words (fail, wrong, bad)
- Make users feel stupid
- Be vague ("Something went wrong")
- Use all caps (except for critical alerts like ALLERGY)

---

## Testing Guidelines

### Before Release Checklist

- [ ] All error messages reviewed by healthcare professional
- [ ] No alarming terminology used (Error, Failed, Broken, etc.)
- [ ] All messages provide clear next steps
- [ ] Messages appropriate for audience (patient-visible vs staff-only)
- [ ] Critical alerts properly identified and highlighted
- [ ] Spelling and grammar checked
- [ ] Tone is calm, professional, and helpful
- [ ] Messages tested with actual users (when possible)
- [ ] Accessibility: Messages announced by screen readers
- [ ] Accessibility: Error messages linked to form fields with aria-describedby

---

## Related Documentation

- [SKILL.md](../SKILL.md) - Healthcare UX standards overview
- [WCAG_2.2_COMPLIANCE.md](WCAG_2.2_COMPLIANCE.md) - Accessibility requirements for error messaging

---
