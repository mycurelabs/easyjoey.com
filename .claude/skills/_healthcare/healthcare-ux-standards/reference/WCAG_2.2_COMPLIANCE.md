# WCAG 2.2 AA Compliance Checklist for Healthcare

**Version:** 1.0.0
**Domain:** Healthcare UX
**Standard:** WCAG 2.2 Level AA
**Last Updated:** 2025-11

---

## Overview

This document provides a comprehensive WCAG 2.2 Level AA compliance audit checklist for healthcare interfaces including Hospital Information Systems (HIS), Electronic Medical Records (EMR/EHR), patient portals, telehealth platforms, and mobile health applications.

**Recommended Standard:** WCAG 2.2 Level AA

**Why WCAG 2.2 AA?**
- Legal requirement under HHS Section 504 (WCAG 2.1 AA minimum, 2.2 AA acceptable as equivalent or better)
- ADA Title III de facto standard
- NHS Digital mandatory requirement
- Healthcare accessibility is patient safety
- Serves users with visual, auditory, motor, and cognitive disabilities
- Improved authentication accessibility critical for patient portals

---

## Regulatory Alignment

### US Healthcare Requirements

| Regulation | Standard | Deadline | Covered Entities |
|------------|----------|----------|------------------|
| **HHS Section 504** | WCAG 2.1 AA | May 11, 2026 (15+) / May 10, 2027 (<15) | Medicare/Medicaid providers |
| **ADA Title III** | WCAG 2.1 AA (de facto) | Active | Private healthcare providers |
| **Section 508** | WCAG 2.0 AA | Active | Federal agencies, contractors |
| **Section 1557 ACA** | WCAG 2.1 AA | Active | Healthcare providers, insurers |

### International Requirements

| Standard | Version | Region | Notes |
|----------|---------|--------|-------|
| **EN 301 549** | v3.2.1 (WCAG 2.1) | EU | v4.1.1 (2026) will include WCAG 2.2 |
| **NHS Digital** | WCAG 2.2 AA | UK | AAA recommended where possible |
| **Australian DHA** | WCAG 2.1 AA | Australia | My Health Record standard |

---

## Quick Reference: Critical Violations

These violations are common in healthcare audits and must be fixed with **P0 (Critical) priority**:

1. **Missing focus indicators** - Invisible keyboard navigation
2. **Insufficient color contrast** - Text < 4.5:1 ratio
3. **Touch targets < 24x24px** - Difficult to tap on mobile/kiosks
4. **Missing alt text** - Images/icons without descriptions
5. **Non-semantic HTML** - Divs used instead of buttons
6. **Form inputs without labels** - Screen readers can't identify fields
7. **Inaccessible authentication** - Blocks password managers, no biometric option
8. **Redundant data entry required** - Patients must re-enter information

---

## WCAG 2.2 Principles

### 1. Perceivable
Information and UI components must be presentable to users in ways they can perceive.

### 2. Operable
UI components and navigation must be operable by all users.

### 3. Understandable
Information and UI operation must be understandable.

### 4. Robust
Content must be robust enough to be interpreted by assistive technologies.

---

## Complete Audit Checklist

### Principle 1: Perceivable

#### 1.1 Text Alternatives (Level A)

**1.1.1 Non-text Content (Level A)**

- [ ] All images have `alt` attributes
- [ ] Decorative images have `alt=""` (empty alt)
- [ ] Complex images (charts, diagrams) have extended descriptions
- [ ] Icons have accessible names (aria-label or visually hidden text)
- [ ] Form buttons have text labels or aria-label
- [ ] CAPTCHA has accessible alternative (audio, object recognition)

**Common healthcare violations:**
- Medical images without clinical descriptions
- Chart/graph images without data tables
- Icon-only buttons in EHR systems

**How to test:**
```bash
# Check for images without alt text in HTML files
grep -r "<img" . | grep -v "alt="
```

**Patient safety impact:** Screen reader users cannot understand content or actions.

---

#### 1.2 Time-based Media (Level A)

**1.2.1 Audio-only and Video-only (Level A)**
- [ ] Pre-recorded audio-only content has text transcript
- [ ] Pre-recorded video-only content has audio description or transcript

**1.2.2 Captions (Prerecorded) (Level A)**
- [ ] Pre-recorded video with audio has synchronized captions

**1.2.3 Audio Description or Media Alternative (Level A)**
- [ ] Pre-recorded video has audio description or text transcript

**Healthcare context:** Patient education videos, telehealth recordings, training materials.

---

#### 1.3 Adaptable (Level A)

**1.3.1 Info and Relationships (Level A)**
- [ ] Headings use proper heading tags (`<h1>`, `<h2>`, etc.)
- [ ] Lists use proper list tags (`<ul>`, `<ol>`, `<li>`)
- [ ] Tables use proper table tags with `<th>`, `<thead>`, `<tbody>`
- [ ] Form inputs have associated `<label>` elements
- [ ] Related form elements grouped with `<fieldset>` and `<legend>`

**Common healthcare violations:**
- Bold text used as heading instead of `<h2>`
- Patient data in divs instead of semantic `<table>`
- Form inputs with placeholder-only labels

**Patient safety impact:** Screen readers cannot navigate structure or understand relationships.

---

**1.3.2 Meaningful Sequence (Level A)**
- [ ] Content order makes sense when linearized
- [ ] Reading order matches visual order
- [ ] CSS positioning doesn't break logical order

**1.3.3 Sensory Characteristics (Level A)**
- [ ] Instructions don't rely solely on shape, size, visual location
- [ ] Instructions don't rely solely on sound

**Examples:**
- Bad: "Click the round button on the right"
- Good: "Click the 'Confirm Appointment' button"

---

**1.3.4 Orientation (Level AA)**
- [ ] Content doesn't restrict to single orientation (portrait or landscape)
- [ ] Exception: Orientation essential (e.g., medical imaging viewer)

**1.3.5 Identify Input Purpose (Level AA)**
- [ ] Form inputs have `autocomplete` attributes where applicable
- [ ] Personal information fields identified (name, email, address, phone)
- [ ] Medical form fields support browser autofill where appropriate

**Example:**
```html
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="text" name="dob" autocomplete="bday">
```

---

#### 1.4 Distinguishable (Level A)

**1.4.1 Use of Color (Level A)**
- [ ] Color is not the only way to convey information
- [ ] Links are distinguishable without color alone (underline or bold)
- [ ] Status indicators use icons + text, not color alone

**Examples:**
- Bad: Red/green status with no text
- Good: Completed (check icon), Pending (clock icon)

---

**1.4.2 Audio Control (Level A)**
- [ ] Auto-playing audio can be paused or stopped
- [ ] Audio does not play automatically for > 3 seconds

---

**1.4.3 Contrast (Minimum) (Level AA) - CRITICAL**
- [ ] Normal text (< 18pt): **4.5:1** contrast ratio minimum
- [ ] Large text (>= 18pt or 14pt bold): **3:1** contrast ratio minimum
- [ ] UI components (buttons, form borders): **3:1** contrast ratio minimum

**Common healthcare violations:**
- Light gray text on white background
- Placeholder text too light
- Disabled buttons with insufficient contrast
- Medication dosage in low-contrast text

**Tools to test:**
- Chrome DevTools: Inspect > Contrast ratio indicator
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- axe DevTools browser extension

**Patient safety impact:** Users with low vision cannot read critical medical information.

---

**1.4.4 Resize Text (Level AA)**
- [ ] Text can be resized up to 200% without loss of content or functionality
- [ ] No horizontal scrolling at 200% zoom (responsive design)

**How to test:** Browser zoom to 200%, verify all content visible and functional.

---

**1.4.5 Images of Text (Level AA)**
- [ ] Actual text used instead of images of text (exceptions: logos)
- [ ] Text in images has sufficient contrast

---

**1.4.10 Reflow (Level AA)**
- [ ] Content reflows to single column at 320px width (400% zoom)
- [ ] No horizontal scrolling required (except tables, maps, diagrams)

**How to test:** Resize browser to 320px width, verify no horizontal scrolling.

---

**1.4.11 Non-text Contrast (Level AA) - CRITICAL**
- [ ] UI components have 3:1 contrast ratio against adjacent colors
- [ ] Focus indicators have 3:1 contrast ratio
- [ ] Form input borders have 3:1 contrast ratio

**Common healthcare violations:**
- Light gray form borders on white background
- Focus indicators too subtle
- Icon buttons without sufficient contrast

---

**1.4.12 Text Spacing (Level AA)**
- [ ] Content readable with increased text spacing:
  - Line height: 1.5x font size
  - Paragraph spacing: 2x font size
  - Letter spacing: 0.12x font size
  - Word spacing: 0.16x font size

**How to test:** Apply CSS override, verify no content cut off.

---

**1.4.13 Content on Hover or Focus (Level AA)**
- [ ] Hover/focus content (tooltips, submenus) is dismissible (Escape key)
- [ ] Hover/focus content is hoverable (mouse can move to it)
- [ ] Hover/focus content is persistent (doesn't disappear until dismissed)

---

### Principle 2: Operable

#### 2.1 Keyboard Accessible (Level A)

**2.1.1 Keyboard (Level A) - CRITICAL**
- [ ] All functionality available via keyboard
- [ ] No keyboard trap (can navigate away from all elements)
- [ ] Custom controls have keyboard support

**How to test:** Navigate entire interface with keyboard only (Tab, Shift+Tab, Enter, Space, Arrow keys).

**Common healthcare violations:**
- Clickable divs without tabindex or keyboard handlers
- Dropdown menus that only open on hover
- Date pickers without keyboard navigation
- Modals that don't trap focus properly

**Patient safety impact:** Keyboard-only users cannot complete critical healthcare tasks.

---

**2.1.2 No Keyboard Trap (Level A)**
- [ ] Focus can be moved away from all components
- [ ] If focus trapped (modal), instructions provided for escaping

---

**2.1.4 Character Key Shortcuts (Level A)**
- [ ] Single character shortcuts can be turned off, remapped, or only active on focus

---

#### 2.2 Enough Time (Level A)

**2.2.1 Timing Adjustable (Level A)**
- [ ] Time limits can be turned off, adjusted, or extended
- [ ] User warned before time expires (20 seconds minimum)

**Healthcare context:** Session timeouts in patient portals, form submission timeouts.

**NHS Recommendation:** Minimum 20 hours for inactivity in multi-step forms.

---

**2.2.2 Pause, Stop, Hide (Level A)**
- [ ] Auto-updating content can be paused, stopped, or hidden
- [ ] Blinking/scrolling content can be paused

---

#### 2.3 Seizures and Physical Reactions (Level A)

**2.3.1 Three Flashes or Below Threshold (Level A)**
- [ ] No content flashes more than 3 times per second
- [ ] Flashing content below safe thresholds

**Healthcare context:** Loading animations, success indicators, alert notifications.

---

#### 2.4 Navigable (Level A)

**2.4.1 Bypass Blocks (Level A)**
- [ ] Skip navigation links provided ("Skip to main content")
- [ ] Proper heading structure allows screen reader navigation

---

**2.4.2 Page Titled (Level A)**
- [ ] Every page has descriptive, unique `<title>`

**Example:** `<title>Patient Registration - HealthCare Portal</title>`

---

**2.4.3 Focus Order (Level A)**
- [ ] Focus order follows meaningful sequence
- [ ] Tab order matches visual order

**How to test:** Tab through page, verify focus moves logically.

---

**2.4.4 Link Purpose (In Context) (Level A)**
- [ ] Link text describes destination or purpose
- [ ] Avoid "click here" or "read more" without context

**Examples:**
- Bad: "Click here for more information"
- Good: "Learn more about prescription refill process"

---

**2.4.5 Multiple Ways (Level AA)**
- [ ] Multiple ways to find pages (navigation menu, search, sitemap)

---

**2.4.6 Headings and Labels (Level AA)**
- [ ] Headings and labels are descriptive
- [ ] Form labels clearly describe purpose

---

**2.4.7 Focus Visible (Level AA) - CRITICAL**
- [ ] Keyboard focus indicator is visible
- [ ] Focus indicator has 3:1 contrast ratio
- [ ] Focus indicator not removed with CSS

**Common healthcare violations:**
- `outline: none` in CSS without replacement
- Focus indicator same color as background
- Focus indicator too subtle to see

**How to test:** Tab through interface, verify focus indicator always visible.

**Patient safety impact:** Keyboard users don't know where they are in the interface.

---

**2.4.11 Focus Not Obscured (Minimum) (Level AA) - NEW IN WCAG 2.2**
- [ ] Keyboard focus not entirely hidden by sticky headers/footers
- [ ] Focus visible when modals or overlays present
- [ ] Account for EHR sticky navigation elements

**Healthcare impact:** EHR systems often have persistent headers that can obscure focus.

```css
/* Good: Account for sticky header */
:target {
  scroll-margin-top: 80px;
}
```

---

#### 2.5 Input Modalities (Level A)

**2.5.1 Pointer Gestures (Level A)**
- [ ] All multipoint/path-based gestures have single-pointer alternative
- [ ] Swiping, dragging have click/tap alternative

---

**2.5.2 Pointer Cancellation (Level A)**
- [ ] Click/tap not executed on down-event
- [ ] Can abort or undo accidental clicks

---

**2.5.3 Label in Name (Level A)**
- [ ] Visible text label matches accessible name
- [ ] Button text matches aria-label

**Example:**
```html
<!-- Good: Visible text matches aria-label -->
<button aria-label="Schedule Appointment">Schedule Appointment</button>

<!-- Bad: Mismatch confuses voice control -->
<button aria-label="Submit">Schedule Appointment</button>
```

---

**2.5.4 Motion Actuation (Level A)**
- [ ] Functionality triggered by device motion has UI control alternative
- [ ] Shake to undo has button alternative

---

**2.5.7 Dragging Movements (Level AA) - NEW IN WCAG 2.2**
- [ ] All drag-and-drop functionality has single-pointer alternative
- [ ] Can reorder items without dragging

**Healthcare impact:** Appointment rescheduling, priority ordering in task lists.

---

**2.5.8 Target Size (Minimum) (Level AA) - NEW IN WCAG 2.2 - CRITICAL**
- [ ] Interactive elements at least **24x24 CSS pixels**
- [ ] Recommended: **44x44px** for touch interfaces
- [ ] Spacing between targets sufficient to avoid accidental taps

**Healthcare context:** Medical kiosks, mobile health apps, patient portal on tablets.

```css
/* WCAG 2.2 AA minimum */
.button { min-width: 24px; min-height: 24px; }

/* Recommended for healthcare */
.button { min-width: 44px; min-height: 44px; }
```

**Patient safety impact:** Users with motor impairments cannot accurately tap small targets.

---

### Principle 3: Understandable

#### 3.1 Readable (Level A)

**3.1.1 Language of Page (Level A)**
- [ ] Page language specified in HTML (`<html lang="en">`)

---

**3.1.2 Language of Parts (Level AA)**
- [ ] Language changes within page marked with `lang` attribute

**Example:** `<span lang="es">Nombre del paciente</span>`

---

#### 3.2 Predictable (Level A)

**3.2.1 On Focus (Level A)**
- [ ] Focus alone doesn't trigger context change
- [ ] No automatic navigation or form submission on focus

---

**3.2.2 On Input (Level A)**
- [ ] Changing settings doesn't automatically trigger context change
- [ ] Form submission requires explicit action (button click)

---

**3.2.3 Consistent Navigation (Level AA)**
- [ ] Navigation order consistent across pages
- [ ] Global navigation doesn't change order

---

**3.2.4 Consistent Identification (Level AA)**
- [ ] Same functionality has consistent labels across pages
- [ ] "Save" buttons always labeled "Save", not "Submit" on one page and "Save" on another

---

**3.2.6 Consistent Help (Level A) - NEW IN WCAG 2.2**
- [ ] Help mechanisms appear in consistent locations across pages
- [ ] Contact info, chat, FAQ in same position throughout site

**Healthcare impact:** Critical for patient portals where users may need support.

```html
<!-- Good: Consistent footer help -->
<footer class="help-footer">
  <a href="/help">Help Center</a>
  <button>Chat Support</button>
  <a href="tel:+18005551234">1-800-555-1234</a>
</footer>
```

---

#### 3.3 Input Assistance (Level A)

**3.3.1 Error Identification (Level A) - CRITICAL**
- [ ] Form errors clearly identified
- [ ] Error messages describe what's wrong
- [ ] Errors use patient safety language (see PATIENT_SAFETY_LANGUAGE.md)

**Examples:**
- Bad: "Error: Invalid input"
- Good: "Please enter a valid date of birth (MM/DD/YYYY)"

---

**3.3.2 Labels or Instructions (Level A)**
- [ ] All form inputs have visible labels
- [ ] Required fields indicated with `*` or text
- [ ] Instructions provided for complex inputs

**Common healthcare violations:**
- Placeholder text used instead of labels
- No indication of required fields
- No format instructions (date, phone number, insurance ID)

---

**3.3.3 Error Suggestion (Level AA)**
- [ ] Error messages suggest how to fix
- [ ] Suggestions don't compromise security (passwords)

**Examples:**
- Bad: "Insurance ID invalid"
- Good: "Insurance ID should be 9 digits (e.g., 123456789)"

---

**3.3.4 Error Prevention (Legal, Financial, Data) (Level AA)**
- [ ] Reversible: Actions can be undone
- [ ] Reviewed: Data reviewed before final submission
- [ ] Confirmed: Confirmation step for critical actions

**Healthcare context:** Appointment cancellations, prescription orders, billing transactions, patient record updates.

---

**3.3.7 Redundant Entry (Level A) - NEW IN WCAG 2.2 - CRITICAL**
- [ ] Information previously entered auto-populates or is selectable
- [ ] Patients don't re-enter name, address, insurance on every form step
- [ ] Exception: Security (re-enter password to confirm)

**Healthcare impact:** Critical for multi-step registration, appointment booking, insurance forms.

```html
<!-- Good: Auto-populate from previous step -->
<label for="confirm-email">Confirm Email</label>
<input type="email" id="confirm-email" value="patient@example.com">
<small>Email from Step 1. Edit if needed.</small>
```

---

**3.3.8 Accessible Authentication (Minimum) (Level AA) - NEW IN WCAG 2.2 - CRITICAL**
- [ ] Authentication doesn't rely solely on cognitive function tests
- [ ] Password fields allow paste (support password managers)
- [ ] Biometric login alternative available
- [ ] Object recognition allowed (identify your photo from options)
- [ ] No CAPTCHA without accessible alternative

**Healthcare impact:** Essential for patient portal login accessibility.

```html
<!-- Good: Allows password managers -->
<input type="password" autocomplete="current-password">

<!-- Good: Biometric alternative -->
<button>Sign in with Fingerprint</button>
<button>Sign in with Face ID</button>
```

---

### Principle 4: Robust

#### 4.1 Compatible (Level A)

**4.1.1 Parsing (Level A) - DEPRECATED in WCAG 2.2**
- This criterion was removed as modern browsers handle parsing consistently.

---

**4.1.2 Name, Role, Value (Level A) - CRITICAL**
- [ ] All UI components have accessible name
- [ ] Role determined programmatically (semantic HTML or ARIA role)
- [ ] States and properties programmatically set (aria-checked, aria-expanded)

**Common healthcare violations:**
- Clickable divs without role="button"
- Custom checkboxes without aria-checked
- Dropdowns without aria-expanded
- Icons without aria-label or title

**Examples:**
```html
<!-- Good: Button with accessible name -->
<button type="button">Schedule Appointment</button>

<!-- Bad: Div without role or name -->
<div onclick="schedule()">Schedule Appointment</div>

<!-- Good: Div with proper ARIA -->
<div
  role="button"
  tabindex="0"
  aria-label="Schedule Appointment"
  onclick="schedule()"
  onkeydown="if(event.key==='Enter')schedule()"
>
  Schedule Appointment
</div>

<!-- Good: Custom checkbox with ARIA -->
<div
  role="checkbox"
  aria-checked="true"
  aria-label="Receive appointment reminders"
  tabindex="0"
></div>
```

**Patient safety impact:** Screen readers cannot identify controls or their states.

---

## Mobile App Accessibility

### iOS Accessibility Requirements

**VoiceOver Compatibility:**
- [ ] All controls have accessibilityLabel
- [ ] Custom controls have accessibilityTraits
- [ ] Support Dynamic Type (text scaling)
- [ ] Implement accessibility rotor actions

**Touch Targets:**
- [ ] Minimum 44x44 points for all interactive elements
- [ ] Adequate spacing between touch targets

**Testing:**
- Use Accessibility Inspector in Xcode
- Test with VoiceOver enabled (Settings > Accessibility > VoiceOver)

### Android Accessibility Requirements

**TalkBack Compatibility:**
- [ ] contentDescription for all meaningful UI elements
- [ ] Proper focus order (android:focusable, android:nextFocusDown)
- [ ] Support system font scaling

**Touch Targets:**
- [ ] Minimum 48x48 dp for all interactive elements
- [ ] Minimum 8dp spacing between targets

**Testing:**
- Use Accessibility Scanner app
- Test with TalkBack enabled (Settings > Accessibility > TalkBack)

### Cross-Platform Requirements

- [ ] Support both portrait and landscape orientations
- [ ] Pinch-to-zoom not disabled
- [ ] Text resizing up to 200%
- [ ] Alternative to complex gestures (swipe, drag, multi-finger)

---

## Healthcare AI/Chatbot Accessibility

### Conversational Interface Requirements

**Keyboard Navigation:**
- [ ] All chat controls accessible via keyboard
- [ ] Tab focuses on input, send button, and settings
- [ ] Escape closes chat window

**Screen Reader Compatibility:**
```html
<!-- Good: ARIA live region for chat -->
<div role="log" aria-live="polite" aria-label="Chat conversation">
  <div class="message">
    <span class="sr-only">You said:</span>
    What appointments do I have?
  </div>
  <div class="message">
    <span class="sr-only">Assistant replied:</span>
    You have 2 upcoming appointments...
  </div>
</div>
```

**Voice Interface:**
- [ ] Text input alternative to voice
- [ ] Clear error recovery for misunderstood speech
- [ ] Confirmation before executing critical actions

---

## Testing Tools

### Automated Testing (Catches ~30% of issues)

**Browser Extensions:**
- **axe DevTools** (Chrome, Firefox) - Best automated checker
- **WAVE** (Chrome, Firefox, Edge) - Visual feedback
- **Lighthouse** (Chrome DevTools) - Accessibility score + issues

**CI/CD Integration:**
- jest-axe for component testing
- Pa11y CI for automated testing
- axe-core CLI

### Manual Testing (Catches remaining 70%)

**Keyboard Navigation:**
1. Disconnect mouse
2. Use only keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys)
3. Verify all functionality accessible
4. Check for keyboard traps

**Screen Reader Testing:**
- **macOS:** VoiceOver (Cmd+F5)
- **Windows:** NVDA (free) or JAWS (paid)
- **iOS:** VoiceOver (Settings > Accessibility)
- **Android:** TalkBack (Settings > Accessibility)

**Screen Reader Testing Checklist:**
- [ ] Navigate by headings (H key)
- [ ] Navigate by landmarks (D key)
- [ ] Navigate by form fields (F key)
- [ ] Navigate by links (K key)
- [ ] Verify all images have alt text
- [ ] Verify all form inputs have labels
- [ ] Verify all buttons have accessible names

**Zoom Testing:**
- [ ] Zoom to 200% (browser zoom)
- [ ] Verify no horizontal scrolling
- [ ] Verify all content visible
- [ ] Verify all functionality works

**High Contrast Mode:**
- **Windows:** Settings > Ease of Access > High Contrast
- **macOS:** System Preferences > Accessibility > Display > Increase Contrast
- Verify all content visible and usable

---

## Accessibility Statement Template

For healthcare applications:

```markdown
## Accessibility Statement

[Organization Name] is committed to ensuring digital accessibility for people
with disabilities. We are continually improving the user experience for everyone
and applying the relevant accessibility standards.

### Conformance Status

[Application Name] conforms to WCAG 2.2 Level AA standards. These guidelines
explain how to make web content more accessible for people with disabilities.

### Technical Specifications

This application relies on the following technologies:
- HTML5
- CSS3
- JavaScript
- ARIA (Accessible Rich Internet Applications)

### Compatibility with Assistive Technologies

This application is designed to be compatible with:
- Screen readers (NVDA, JAWS, VoiceOver, TalkBack)
- Screen magnification software
- Speech recognition software
- Keyboard-only navigation

### Known Limitations

[List any known accessibility limitations and remediation plans]

### Feedback

We welcome your feedback on the accessibility of [Application Name].
Please contact us if you encounter accessibility barriers:

- Email: accessibility@example.com
- Phone: 1-800-XXX-XXXX
- TTY: 1-800-XXX-XXXX

We aim to respond to accessibility feedback within 5 business days.

### Assessment Approach

[Application Name] was assessed by:
- Internal accessibility team
- Automated testing tools (axe DevTools, Lighthouse)
- Manual testing with screen readers
- Keyboard navigation testing
- User testing with people with disabilities

### Compliance Date

This accessibility statement was last reviewed on [DATE].
```

---

## Related Documentation

- [SKILL.md](../SKILL.md) - Healthcare UX standards overview
- [PATIENT_SAFETY_LANGUAGE.md](PATIENT_SAFETY_LANGUAGE.md) - Error messaging standards

---

## External Resources

**WCAG Documentation:**
- WCAG 2.2: https://www.w3.org/WAI/WCAG22/quickref/
- What's New in WCAG 2.2: https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/

**US Regulatory:**
- HHS Section 504: https://www.hhs.gov/civil-rights/for-individuals/disability/
- ADA Web Guidance: https://www.ada.gov/resources/web-guidance/
- Section 508: https://www.section508.gov/

**International:**
- EN 301 549: https://www.etsi.org/deliver/etsi_en/301500_301599/301549/
- NHS Digital: https://service-manual.nhs.uk/accessibility

**Testing Tools:**
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/extension/
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- NVDA: https://www.nvaccess.org/
