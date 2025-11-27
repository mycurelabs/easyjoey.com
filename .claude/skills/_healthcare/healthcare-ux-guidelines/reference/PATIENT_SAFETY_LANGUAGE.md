# Patient Safety Language Guidelines

**Version:** 1.0.0
**Domain:** Healthcare UX
**Last Updated:** 2025-11-03

---

## Overview

This document defines patient safety language standards for error messaging, notifications, and system feedback
in MYCURE healthcare interfaces.

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

### ❌ Avoid → ✅ Use Instead

**System States:**

| ❌ Avoid | ✅ Use Instead |
|---------|---------------|
| Error | Unable to process |
| Failed | Not completed |
| Broken | Not working as expected |
| Crashed | Stopped responding |
| Down | Temporarily unavailable |
| Offline | Not currently available |

**Validation Issues:**

| ❌ Avoid | ✅ Use Instead |
|---------|---------------|
| Invalid | Please check [field name] |
| Illegal | Not allowed |
| Forbidden | Not available |
| Denied | Unable to access |
| Rejected | Needs review |

**Data Issues:**

| ❌ Avoid | ✅ Use Instead |
|---------|---------------|
| Missing | Not found |
| Deleted | Removed |
| Lost | Not available |
| Corrupted | Unable to read |

**Urgency Levels:**

| ❌ Avoid | ✅ Use Instead |
|---------|---------------|
| Fatal error | Please contact support |
| Critical failure | Needs immediate attention |
| Alert! | Please note |
| Warning! | Important |

---

## Message Templates

### Form Validation Errors

**Required Field Empty:**

```
❌ Error: Field required
✅ Please enter [field name]
```

**Invalid Format:**

```
❌ Invalid email address
✅ Please enter a valid email address (e.g., name@example.com)
```

**Out of Range:**

```
❌ Error: Value too high
✅ Quantity cannot exceed 500 (available stock)
```

**Duplicate Entry:**

```
❌ Error: Duplicate patient record
✅ A patient with this name and date of birth already exists. 
   Would you like to view the existing record?
```

---

### Data Not Found

**Patient Record:**

```
❌ Fatal error: Patient record not found
✅ This patient record is not currently available. 
   Please verify the patient ID or contact support if the issue persists.
```

**Inventory Item:**

```
❌ Error: Item does not exist
✅ This inventory item was not found. 
   Please check the item name or SKU and try again.
```

**Appointment:**

```
❌ Appointment not found - error code 404
✅ This appointment is not available. 
   It may have been rescheduled or canceled.
```

---

### Permission/Access Issues

**Unauthorized Access:**

```
❌ Access denied - forbidden
✅ You don't have permission to access this section. 
   Please contact your administrator for assistance.
```

**Session Expired:**

```
❌ Session timeout error
✅ Your session has expired for security. 
   Please sign in again to continue.
```

**Module Not Available:**

```
❌ Feature locked - access denied
✅ This feature is not included in your current plan. 
   Contact us to learn more about upgrading.
```

---

### System/Network Issues

**Connection Lost:**

```
❌ Network error - connection failed
✅ Unable to connect to the server. 
   Please check your internet connection and try again.
```

**Server Unavailable:**

```
❌ Server down - error 500
✅ We're experiencing technical difficulties. 
   Your data is safe. Please try again in a few moments.
```

**Timeout:**

```
❌ Request timed out - operation failed
✅ This is taking longer than expected. 
   Please try again or contact support if the issue continues.
```

---

### Data Integrity Issues

**Unable to Save:**

```
❌ Save failed - data not written
✅ Unable to save your changes. 
   Please verify the information and try again.
```

**Conflict Detected:**

```
❌ Error: Record was modified by another user
✅ This record has been updated by another user. 
   Please review the changes and try again.
```

**Data Loss Warning:**

```
❌ Warning: Unsaved changes will be lost
✅ You have unsaved changes. 
   Would you like to save before leaving this page?
```

---

### Stock/Inventory Issues

**Insufficient Stock:**

```
❌ Error: Stock transfer failed - insufficient inventory
✅ Unable to complete transfer. 
   Requested quantity (500) exceeds available stock (300).
```

**Lot Number Invalid:**

```
❌ Invalid lot number - error
✅ Please verify the lot number. 
   The lot number must match an existing batch.
```

**Expiry Date Issue:**

```
❌ Error: Expired medication
✅ This medication has passed its expiry date (January 15). 
   Please select a different lot or contact the pharmacy.
```

---

### Appointment/Scheduling Issues

**Time Slot Unavailable:**

```
❌ Error: Appointment slot blocked
✅ This time slot is no longer available. 
   Please select a different time or date.
```

**Scheduling Conflict:**

```
❌ Conflict error: Overlapping appointments
✅ This patient already has an appointment at this time. 
   Would you like to reschedule the existing appointment?
```

**Provider Unavailable:**

```
❌ Error: Doctor not available
✅ Dr. Santos is not available at this time. 
   Please select a different time or provider.
```

---

### Billing/Payment Issues

**Payment Failed:**

```
❌ Transaction failed - payment error
✅ Unable to process payment. 
   Please check your payment information and try again.
```

**Insufficient Funds:**

```
❌ Error: Payment declined - insufficient funds
✅ Payment was not processed. 
   Please contact your bank or try a different payment method.
```

**Invoice Not Found:**

```
❌ Invoice error: Not found
✅ This invoice is not available. 
   It may have been paid or deleted. Please contact billing for assistance.
```

---

## Context-Specific Guidelines

### 1. Visible to Patients

**When error messages may be seen by patients (registration desk, exam room displays):**

- Use most conservative language
- Avoid technical details
- Focus on reassurance
- Provide clear next steps

**Example scenarios:**

- Registration kiosk errors
- Appointment confirmation screens
- Patient portal messages
- Waiting room displays

**Template:**

```
✅ We're experiencing a temporary issue. 
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
✅ Unable to process request. 
   Please verify the information and try again. 
   (Error code: INV-001 for support reference)
```

---

### 3. Critical Patient Safety Issues

**When there IS an actual safety concern:**

- Use clear, direct language
- State the issue explicitly
- Provide specific actions
- Don't downplay severity

**Example: Drug Interaction Alert**

```
✅ IMPORTANT: Potential drug interaction detected.

Amoxicillin may interact with Warfarin currently prescribed to this patient.

Action required: Please review medications with prescribing physician before dispensing.

[Review Medications] [Override with Reason] [Cancel]
```

**Example: Allergy Alert**

```
✅ ALLERGY ALERT: Patient is allergic to Penicillin.

This medication (Amoxicillin) contains Penicillin.

Action required: Do not dispense. Select alternative medication.

[View Alternatives] [Cancel Order]
```

**When to use "WARNING" or "ALERT":**

- Actual patient safety risks (allergies, drug interactions, contraindications)
- Regulatory compliance issues (expired medications, licensing)
- Critical system failures affecting patient care
- Data integrity issues that could impact treatment decisions

---

## Notification Levels

### 1. Success Messages (Green)

**Purpose:** Confirm successful actions

**Tone:** Positive, brief

**Examples:**

```
✅ Patient record saved successfully.
✅ Appointment scheduled for January 15 at 2:00 PM.
✅ Stock transfer completed. Receipt confirmation sent to Clinic B.
```

---

### 2. Information Messages (Blue)

**Purpose:** Provide helpful context

**Tone:** Neutral, informative

**Examples:**

```
ℹ️ This patient has 2 upcoming appointments.
ℹ️ Stock levels will be updated after the transfer is received.
ℹ️ Appointment reminders will be sent 24 hours in advance.
```

---

### 3. Warning Messages (Orange)

**Purpose:** Highlight important considerations (not errors)

**Tone:** Important but not urgent

**Examples:**

```
⚠️ This medication will expire in 30 days.
⚠️ Patient has missed their last 2 appointments.
⚠️ Stock levels are below reorder threshold (50 units remaining).
```

---

### 4. Error Messages (Red)

**Purpose:** Indicate action could not be completed

**Tone:** Clear, helpful, solution-focused

**Examples:**

```
❌ Unable to complete transfer. Please verify the lot number and try again.
❌ This time slot is no longer available. Please select a different time.
❌ Unable to save changes. Please check the required fields.
```

---

### 5. Critical Alerts (Red with Icon)

**Purpose:** Patient safety or system security issues

**Tone:** Direct, clear, actionable

**Examples:**

```
🚨 ALLERGY ALERT: Patient is allergic to this medication.
🚨 IMPORTANT: Potential drug interaction detected.
🚨 This medication has expired. Do not dispense.
```

---

## Writing Effective Error Messages

### Structure Template

```
[WHAT HAPPENED]
Unable to complete stock transfer.

[WHY IT HAPPENED] (optional, if helpful)
Requested quantity (500) exceeds available stock (300).

[WHAT TO DO NEXT]
Please adjust the quantity and try again, or contact [Facility Name] to request additional stock.

[ADDITIONAL HELP] (optional)
For assistance, contact support at [CONTACT_INFO].
```

### Do's and Don'ts

**DO:**

- ✅ Be specific about what went wrong
- ✅ Suggest concrete next steps
- ✅ Use plain language patients can understand
- ✅ Provide context when helpful
- ✅ Offer alternatives when possible
- ✅ Include contact information for complex issues

**DON'T:**

- ❌ Use technical jargon or error codes in main message
- ❌ Blame the user ("You entered an invalid...")
- ❌ Use negative words (fail, wrong, bad)
- ❌ Make users feel stupid ("Obviously you can't...")
- ❌ Be vague ("Something went wrong")
- ❌ Use all caps (except for critical alerts like ALLERGY)

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

---

## Examples from MYCURE Audits

### Before/After: Inventory Transfer

**Before (from UX audit):**

```
❌ Error: Acknowledge transfer failed
```

**Issues:**

- "Error" is alarming
- "Acknowledge" is confusing (requires "thorough explanation" to clients)
- No explanation of what went wrong
- No next steps

**After:**

```
✅ Unable to complete transfer confirmation.

The receiving facility has not yet confirmed receipt of this transfer.

Please contact [Facility Name] to verify they received the stock, then try again.
```

**Improvements:**

- No alarming language
- Clear explanation of issue
- Specific next step
- Maintains professional tone

---

### Before/After: Patient Registration

**Before:**

```
❌ Fatal error: Patient database connection failed (ERR_DB_CONN_TIMEOUT)
```

**Issues:**

- "Fatal error" is extremely alarming
- Technical error code in main message
- No actionable information
- Visible to patient at registration desk

**After:**

```
✅ Unable to access patient records at this time.

Your information is safe. Please wait a moment while we reconnect.

If this issue continues, our staff will assist you manually.

(Error code DB-001 for support reference)
```

**Improvements:**

- Reassures patient their data is safe
- Explains what's happening
- Provides fallback option
- Technical details hidden but available for support

---

## Related Documentation

- [SKILL.md](SKILL.md) - Healthcare UX guidelines overview
- [WCAG_COMPLIANCE.md](WCAG_COMPLIANCE.md) - Accessibility requirements for error messaging
- [MYCURE_COMPONENTS.md](MYCURE_COMPONENTS.md) - Form validation and modal components

---
