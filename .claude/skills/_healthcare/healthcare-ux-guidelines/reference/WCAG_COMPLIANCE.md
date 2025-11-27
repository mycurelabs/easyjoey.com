# WCAG 2.1 AA Compliance Checklist

**Version:** 1.0.0
**Domain:** Healthcare UX
**Standard:** WCAG 2.1 Level AA
**Last Updated:** 2025-11-03

---

## Overview

This document provides a comprehensive WCAG 2.1 Level AA compliance audit checklist for MYCURE healthcare interfaces.

**MYCURE Standard:** All interfaces must meet **WCAG 2.1 Level AA** minimum requirements.

**Why WCAG 2.1 AA?**

- Legal requirement in many jurisdictions
- Healthcare accessibility is patient safety
- Serves users with disabilities (visual, auditory, motor, cognitive)
- Improves usability for all users

---

## Quick Reference

### Critical Violations (Fix Immediately)

These violations are common in MYCURE audits and must be fixed with **P0 (Critical) priority**:

1. **Missing focus indicators** - Invisible keyboard navigation
2. **Insufficient color contrast** - Text < 4.5:1 ratio
3. **Touch targets < 44x44px** - Difficult to tap on mobile
4. **Missing alt text** - Images/icons without descriptions
5. **Non-semantic HTML** - Divs used instead of buttons
6. **Form inputs without labels** - Screen readers can't identify fields

---

## WCAG 2.1 Principles

### 1. Perceivable

Information and UI components must be presentable to users in ways they can perceive.

### 2. Operable

UI components and navigation must be operable by all users.

### 3. Understandable

Information and UI operation must be understandable.

### 4. Robust

Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

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

**Common violations:**

- Missing alt text on product/feature images
- Icons without accessible names
- Image buttons without labels

**How to test:**

```bash
# Check for images without alt text
grep -r "<img" Design Projects/ | grep -v "alt="
```

**Patient safety impact:** Screen reader users cannot understand content or actions.

---

#### 1.2 Time-based Media (Level A)

**1.2.1 Audio-only and Video-only (Level A)**

- [ ] Pre-recorded audio-only content has text transcript
- [ ] Pre-recorded video-only content has audio description or text transcript

**1.2.2 Captions (Prerecorded) (Level A)**

- [ ] Pre-recorded video with audio has synchronized captions

**1.2.3 Audio Description or Media Alternative (Level A)**

- [ ] Pre-recorded video has audio description or text transcript

**MYCURE context:** Video tutorials, product demos, training materials.

---

#### 1.3 Adaptable (Level A)

**1.3.1 Info and Relationships (Level A)**

- [ ] Headings use proper heading tags (`<h1>`, `<h2>`, etc.)
- [ ] Lists use proper list tags (`<ul>`, `<ol>`, `<li>`)
- [ ] Tables use proper table tags (`<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`)
- [ ] Form inputs have associated `<label>` elements
- [ ] Related form elements grouped with `<fieldset>` and `<legend>`

**Common violations:**

- Bold text used as heading instead of `<h2>`
- Divs with CSS instead of semantic `<table>`
- Form inputs without labels, only placeholders

**How to test:**

```bash
# Check for bold text used as headings
grep -r "\\*\\*[A-Z]" Design Projects/ | grep -v "^##"
```

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

- ❌ "Click the round button on the right"
- ✅ "Click the 'Confirm Transfer' button"

---

**1.3.4 Orientation (Level AA)**

- [ ] Content doesn't restrict to single orientation (portrait or landscape)
- [ ] Exception: Orientation essential (e.g., piano app, bank check)

**1.3.5 Identify Input Purpose (Level AA)**

- [ ] Form inputs have `autocomplete` attributes where applicable
- [ ] Personal information fields identified (name, email, address, etc.)

**Example:**

```html
<input type="email" name="email" autocomplete="email" />
<input type="tel" name="phone" autocomplete="tel" />
```

---

#### 1.4 Distinguishable (Level A)

**1.4.1 Use of Color (Level A)**

- [ ] Color is not the only way to convey information
- [ ] Links are distinguishable without color alone (underline or bold)
- [ ] Status indicators use icons + text, not color alone

**Examples:**

- ❌ Red/green status with no text
- ✅ ✅ Completed, ⏳ Pending (icon + text)

---

**1.4.2 Audio Control (Level A)**

- [ ] Auto-playing audio can be paused or stopped
- [ ] Audio does not play automatically for > 3 seconds

---

**1.4.3 Contrast (Minimum) (Level AA) ⚠️ CRITICAL**

- [ ] Normal text (< 18pt): 4.5:1 contrast ratio minimum
- [ ] Large text (≥ 18pt or 14pt bold): 3:1 contrast ratio minimum
- [ ] UI components (buttons, form borders): 3:1 contrast ratio minimum

**Common violations:**

- Light gray text on white background (2:1 ratio)
- Placeholder text too light (often 2.5:1)
- Disabled buttons with insufficient contrast

**Tools to test:**

- Chrome DevTools: Inspect > Contrast ratio indicator
- WebAIM Contrast Checker: <https://webaim.org/resources/contrastchecker/>
- axe DevTools browser extension

**Patient safety impact:** Users with low vision cannot read critical information.

---

**1.4.4 Resize Text (Level AA)**

- [ ] Text can be resized up to 200% without loss of content or functionality
- [ ] No horizontal scrolling at 200% zoom (responsive design)

**How to test:** Browser zoom to 200%, verify all content visible and functional.

---

**1.4.5 Images of Text (Level AA)**

- [ ] Actual text used instead of images of text (exceptions: logos, essential presentation)
- [ ] Text in images has sufficient contrast

---

**1.4.10 Reflow (Level AA)**

- [ ] Content reflows to single column at 320px width (400% zoom)
- [ ] No horizontal scrolling required
- [ ] Exception: Tables, maps, diagrams

**How to test:** Resize browser to 320px width, verify no horizontal scrolling.

---

**1.4.11 Non-text Contrast (Level AA) ⚠️ CRITICAL**

- [ ] UI components have 3:1 contrast ratio against adjacent colors
- [ ] Focus indicators have 3:1 contrast ratio
- [ ] Form input borders have 3:1 contrast ratio

**Common violations:**

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

**2.1.1 Keyboard (Level A) ⚠️ CRITICAL**

- [ ] All functionality available via keyboard
- [ ] No keyboard trap (can navigate away from all elements)
- [ ] Custom controls have keyboard support

**How to test:** Navigate entire interface with keyboard only (Tab, Shift+Tab, Enter, Space, Arrow keys).

**Common violations:**

- Clickable divs without tabindex or keyboard handlers
- Dropdown menus that only open on hover
- Modals that don't trap focus properly

**Patient safety impact:** Keyboard-only users cannot complete critical tasks.

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

**MYCURE context:** Session timeouts, inactivity warnings.

---

**2.2.2 Pause, Stop, Hide (Level A)**

- [ ] Auto-updating content can be paused, stopped, or hidden
- [ ] Blinking/scrolling content can be paused

---

#### 2.3 Seizures and Physical Reactions (Level A)

**2.3.1 Three Flashes or Below Threshold (Level A)**

- [ ] No content flashes more than 3 times per second
- [ ] Flashing content below safe thresholds

**MYCURE context:** Loading animations, success indicators.

---

#### 2.4 Navigable (Level A)

**2.4.1 Bypass Blocks (Level A)**

- [ ] Skip navigation links provided ("Skip to main content")
- [ ] Proper heading structure allows screen reader navigation

---

**2.4.2 Page Titled (Level A)**

- [ ] Every page has descriptive, unique `<title>`

**Example:** `<title>Patient Registration - MYCURE</title>`

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

- ❌ "Click here for more information"
- ✅ "Learn more about patient registration workflow"

---

**2.4.5 Multiple Ways (Level AA)**

- [ ] Multiple ways to find pages (navigation menu, search, sitemap)

---

**2.4.6 Headings and Labels (Level AA)**

- [ ] Headings and labels are descriptive
- [ ] Form labels clearly describe purpose

---

**2.4.7 Focus Visible (Level AA) ⚠️ CRITICAL**

- [ ] Keyboard focus indicator is visible
- [ ] Focus indicator has 3:1 contrast ratio (1.4.11)
- [ ] Focus indicator not removed with CSS

**Common violations:**

- `outline: none` in CSS without replacement
- Focus indicator same color as background
- Focus indicator too subtle to see

**How to test:** Tab through interface, verify focus indicator always visible.

**Patient safety impact:** Keyboard users don't know where they are in the interface.

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
<!-- ✅ Good: Visible text matches aria-label -->
<button aria-label="Confirm Transfer">Confirm Transfer</button>

<!-- ❌ Bad: Mismatch confuses voice control -->
<button aria-label="Submit">Confirm Transfer</button>
```

---

**2.5.4 Motion Actuation (Level A)**

- [ ] Functionality triggered by device motion has UI control alternative
- [ ] Shake to undo has button alternative

---

**2.5.5 Target Size (Level AAA, but RECOMMENDED for AA) ⚠️ CRITICAL**

- [ ] Touch targets at least 44x44px (CSS pixels)
- [ ] Absolute minimum: 24x24px (WCAG 2.2 Level AA requirement)
- [ ] Spacing between targets sufficient to avoid accidental taps

**MYCURE standard:** 44x44px minimum for all interactive elements.

**Common violations:**

- Icon buttons < 44x44px without padding
- Close buttons in corners too small
- Checkbox/radio inputs too small

**Patient safety impact:** Users with motor impairments cannot accurately tap targets.

---

### Principle 3: Understandable

#### 3.1 Readable (Level A)

**3.1.1 Language of Page (Level A)**

- [ ] Page language specified in HTML (`<html lang="en">`)

---

**3.1.2 Language of Parts (Level AA)**

- [ ] Language changes within page marked with `lang` attribute

**Example:** `<span lang="tl">Pangalan ng Pasyente</span>` (Filipino text)

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
- [ ] Save buttons always labeled "Save", not "Submit" on one page and "Save" on another

---

#### 3.3 Input Assistance (Level A)

**3.3.1 Error Identification (Level A) ⚠️ CRITICAL**

- [ ] Form errors clearly identified
- [ ] Error messages describe what's wrong
- [ ] Errors use patient safety language (see [PATIENT_SAFETY_LANGUAGE.md](PATIENT_SAFETY_LANGUAGE.md))

**Examples:**

- ❌ "Error: Invalid input"
- ✅ "Unable to process. Please enter a valid email address."

---

**3.3.2 Labels or Instructions (Level A)**

- [ ] All form inputs have visible labels
- [ ] Required fields indicated with `*` or text
- [ ] Instructions provided for complex inputs

**Common violations:**

- Placeholder text used instead of labels
- No indication of required fields
- No format instructions (date, phone number)

---

**3.3.3 Error Suggestion (Level AA)**

- [ ] Error messages suggest how to fix
- [ ] Suggestions don't compromise security (passwords)

**Examples:**

- ❌ "Quantity invalid"
- ✅ "Quantity cannot exceed 500 (available stock)"

---

**3.3.4 Error Prevention (Legal, Financial, Data) (Level AA)**

- [ ] Reversible: Actions can be undone
- [ ] Reviewed: Data reviewed before final submission
- [ ] Confirmed: Confirmation step for critical actions

**MYCURE context:** Stock transfers, patient record updates, billing transactions.

**Implementation:** Use [Confirmation Modal](MYCURE_COMPONENTS.md#confirmation-modal) for critical actions.

---

### Principle 4: Robust

#### 4.1 Compatible (Level A)

**4.1.1 Parsing (Level A) - DEPRECATED in WCAG 2.2**

- [ ] HTML validates (no duplicate IDs, proper nesting)

---

**4.1.2 Name, Role, Value (Level A) ⚠️ CRITICAL**

- [ ] All UI components have accessible name
- [ ] Role determined programmatically (semantic HTML or ARIA role)
- [ ] States and properties programmatically set (aria-checked, aria-expanded)

**Common violations:**

- Clickable divs without role="button"
- Custom checkboxes without aria-checked
- Dropdowns without aria-expanded
- Icons without aria-label or title

**Examples:**

```html
<!-- ✅ Good: Button with accessible name -->
<button type="button">Confirm Transfer</button>

<!-- ❌ Bad: Div without role or name -->
<div onclick="confirmTransfer()">Confirm Transfer</div>

<!-- ✅ Good: Div with proper ARIA -->
<div role="button" tabindex="0" aria-label="Confirm Transfer" onclick="confirmTransfer()">
  📤
</div>

<!-- ✅ Good: Custom checkbox with ARIA -->
<div
  role="checkbox"
  aria-checked="true"
  aria-label="Enable notifications"
  tabindex="0"
></div>
```

**Patient safety impact:** Screen readers cannot identify controls or their states.

---

## Testing Tools

### Automated Testing (Catches ~30% of issues)

**Browser Extensions:**

- **axe DevTools** (Chrome, Firefox) - Best automated checker
- **WAVE** (Chrome, Firefox, Edge) - Visual feedback
- **Lighthouse** (Chrome DevTools) - Accessibility score + issues

**Command Line:**

```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Run audit on file
axe Design\ Projects/mycure-inventory-ux/implementation-guide.md
```

**CI/CD Integration:**

- jest-axe for React component testing
- Pa11y CI for automated testing

### Manual Testing (Catches remaining 70%)

**Keyboard Navigation:**

1. Disconnect mouse
2. Use only keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys)
3. Verify all functionality accessible

**Screen Reader Testing:**

- **macOS:** VoiceOver (Cmd+F5)
- **Windows:** NVDA (free) or JAWS (paid)
- **Mobile:** TalkBack (Android), VoiceOver (iOS)

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

**For MYCURE product documentation:**

```markdown
## Accessibility Statement

MYCURE is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

### Conformance Status

MYCURE [Module Name] conforms to WCAG 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities.

### Feedback

We welcome your feedback on the accessibility of MYCURE. Please contact us if you encounter accessibility barriers:

- Email: [CONTACT_EMAIL]
- Phone: [CONTACT_PHONE]

We aim to respond to accessibility feedback within 5 business days.

### Technical Specifications

MYCURE accessibility relies on the following technologies:

- HTML5
- CSS3
- JavaScript
- ARIA (Accessible Rich Internet Applications)

### Assessment Approach

MYCURE was assessed by:

- Internal accessibility team
- Automated testing tools (axe DevTools, Lighthouse)
- Manual testing with screen readers (NVDA, VoiceOver)
- Keyboard navigation testing

### Last Reviewed

This accessibility statement was last reviewed on 2025-11-03.
```

---

## Related Documentation

- [SKILL.md](SKILL.md) - Healthcare UX guidelines overview
- [MYCURE_COMPONENTS.md](MYCURE_COMPONENTS.md) - Component library with accessibility specs
- [PATIENT_SAFETY_LANGUAGE.md](PATIENT_SAFETY_LANGUAGE.md) - Error messaging standards

---
