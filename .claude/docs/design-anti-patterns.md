# Design Anti-Patterns

**Purpose:** What NOT to do in MYCURE healthcare software design

**Format:** ❌ NEVER / ✅ USE format for quick scanning

**Run `/design-ui` command to apply MYCURE standards automatically**

---

## Typography Anti-Patterns

### ❌ NEVER Use These Fonts

**Inter (Generic Sans-Serif)**
- Too generic, lacks healthcare professionalism
- Used by thousands of apps (no brand distinctiveness)
- Not optimized for medical data readability

**Roboto (Android Default)**
- Associated with Android OS (not distinctive)
- Lacks authority for healthcare context
- Too casual for medical applications

**Arial/Helvetica (System Defaults)**
- Outdated, lacks modern healthcare feel
- Poor distinction between similar characters (I, l, 1)
- Not optimized for medical codes/lot numbers

### ✅ USE These Fonts

**Space Grotesk (Headlines, Titles)**
- Geometric, modern, authoritative
- High readability at large sizes
- Distinctive MYCURE brand identity
- Usage: Page titles, section headings, hero text

**IBM Plex Sans (Body Text, UI)**
- Professional, readable, trustworthy
- Optimized for extended reading
- Excellent legibility at small sizes
- Usage: Paragraphs, form labels, navigation

**JetBrains Mono (Data, Codes, Numbers)**
- Zero-ambiguity monospace
- Clear distinction: I vs l vs 1, O vs 0
- Essential for medical codes, lot numbers, patient IDs
- Usage: Lot numbers, patient IDs, drug codes, dosages

---

## Color Palette Anti-Patterns

### ❌ NEVER Use These Colors

**Purple Gradients**
```css
/* ❌ AVOID */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
- Too trendy, lacks healthcare professionalism
- Poor accessibility (low contrast with white text)
- Not distinctive for MYCURE brand

**Neon/Bright Colors**
```css
/* ❌ AVOID */
color: #FF00FF; /* Magenta */
color: #00FFFF; /* Cyan */
color: #FFFF00; /* Yellow */
```
- Alarming, unprofessional in healthcare context
- Poor WCAG contrast ratios
- Causes eye strain in dim exam rooms

**Pure Black/Pure White**
```css
/* ❌ AVOID */
color: #000000; /* Pure black */
background: #FFFFFF; /* Pure white */
```
- Maximum contrast can cause eye strain
- Not optimized for extended reading in healthcare
- Lacks warmth and trust

### ✅ USE These Colors

**MYCURE Clinical Palette**

**Clinical Blue (Primary)**
```css
/* ✅ USE for primary actions, links, emphasis */
color: #0066CC;
```
- Trust, reliability, professionalism
- High contrast with white backgrounds (7.2:1)
- Distinctive MYCURE brand color

**Trust Navy (Secondary)**
```css
/* ✅ USE for headings, subheadings, emphasis */
color: #003366;
```
- Authority, stability, medical expertise
- Excellent contrast for readability (13.7:1)
- Pairs well with Clinical Blue

**Medical Green (Success States)**
```css
/* ✅ USE for success messages, positive indicators */
color: #00A86B;
```
- Health, safety, positive outcomes
- WCAG AAA contrast (7.5:1)
- Universally understood success color

**Neutral Grays (Text, Backgrounds)**
```css
/* ✅ USE for body text, secondary info */
color: #333333; /* Near-black, easier on eyes */
background: #F5F5F5; /* Off-white, reduces glare */
```

---

## Animation Anti-Patterns

### ❌ NEVER Use These Timings

**Slow Animations (>300ms)**
```css
/* ❌ AVOID */
transition: all 0.5s ease; /* Too slow for healthcare */
transition: all 1s ease; /* WAY too slow */
```
- Feels sluggish, unprofessional
- Delays critical healthcare workflows
- Frustrates users in time-sensitive situations

**Bouncy/Playful Animations**
```css
/* ❌ AVOID */
animation: bounce 0.5s ease-in-out;
animation: wiggle 0.3s ease-in-out;
```
- Too playful for serious healthcare context
- Distracting during critical patient care
- Lacks professional authority

**Multiple Simultaneous Animations**
```css
/* ❌ AVOID animating multiple properties at once */
transition: transform 0.3s, opacity 0.3s, width 0.3s, height 0.3s;
```
- Causes motion sickness
- Distracting, reduces focus
- Poor performance on older devices

### ✅ USE These Timings

**Healthcare-Optimized Durations**

**100ms - Fast Feedback (Status Updates)**
```css
/* ✅ USE for immediate feedback */
transition: background-color 0.1s ease;
transition: border-color 0.1s ease;
```
- Instant response to user actions
- Critical for patient care workflows
- No perceived delay

**150ms - Smooth Transitions (Most UI)**
```css
/* ✅ USE for general UI transitions */
transition: all 0.15s ease;
```
- Smooth without being slow
- Balances speed and polish
- Default for most healthcare UI

**200ms - Modal/Drawer Open/Close**
```css
/* ✅ USE for larger components */
transition: transform 0.2s ease-out;
transition: opacity 0.2s ease-out;
```
- Noticeable but quick
- Gives context to UI state changes
- Not distracting during workflows

---

## Layout Anti-Patterns

### ❌ NEVER Use These Layouts

**Dashboard "Tiles" with Icons Only**
```
┌─────┐ ┌─────┐ ┌─────┐
│ 👤  │ │ 💊  │ │ 📊  │
└─────┘ └─────┘ └─────┘
```
- Ambiguous for users with basic digital literacy
- Inaccessible to screen readers
- Poor recognition (icon meaning not universal)

**Horizontal Scrolling (Mobile)**
```
[Card 1] [Card 2] [Card 3] →
```
- Poor discoverability (users don't scroll horizontally)
- Inaccessible to keyboard navigation
- Breaks mobile swipe gestures

**Centered Everything**
```
        Dashboard

    Welcome back, Dr. Santos

        [Patient List]

        [Inventory]
```
- Hard to scan (eyes must search for content)
- Wastes screen space
- Unprofessional for data-heavy healthcare apps

### ✅ USE These Layouts

**Left-Aligned with Clear Hierarchy**
```
Dashboard
├─ Quick Actions (top)
├─ Recent Patients (left column)
└─ Inventory Alerts (right column)
```
- Easy to scan (F-pattern reading)
- Efficient use of space
- Professional, data-first

**Vertical Stacking (Mobile)**
```
[Card 1]
[Card 2]
[Card 3]
```
- Natural scrolling behavior
- Keyboard accessible
- Works with screen readers

**Icon + Text Labels (Always)**
```
┌──────────────┐
│ 👤 Patients  │
└──────────────┘
┌──────────────┐
│ 💊 Inventory │
└──────────────┘
```
- Clear meaning (text clarifies icon)
- Accessible to all users
- Works for basic digital literacy

---

## Form Design Anti-Patterns

### ❌ NEVER Use These Patterns

**Placeholder as Label**
```html
<!-- ❌ AVOID -->
<input type="text" placeholder="Patient Name" />
```
- Label disappears when typing (memory burden)
- Inaccessible to screen readers
- Violates WCAG 2.2

**Tiny Touch Targets**
```css
/* ❌ AVOID */
button {
  width: 30px;
  height: 30px;
}
```
- Hard to tap on mobile (especially for older users)
- Violates WCAG (44x44px minimum)
- Causes errors in time-sensitive healthcare workflows

**Unlabeled Required Fields**
```html
<!-- ❌ AVOID -->
<input type="text" required />
```
- Users don't know field is required
- Inaccessible to screen readers
- Causes form submission errors

### ✅ USE These Patterns

**Visible Labels Always**
```html
<!-- ✅ USE -->
<label for="patient-name">
  Patient Name
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
```

**Minimum 48x48px Touch Targets**
```css
/* ✅ USE */
button {
  min-width: 48px;
  min-height: 48px;
  padding: 12px 24px;
}
```
- Easy to tap on mobile
- Exceeds WCAG minimum (44x44px)
- Reduces errors in patient care

**Clear Required Field Indicators**
```html
<!-- ✅ USE -->
<label for="drug-name">
  Drug Name
  <span class="required" aria-label="required">*</span>
</label>
<input
  id="drug-name"
  type="text"
  required
  aria-required="true"
/>
```

---

## Error Message Anti-Patterns

### ❌ NEVER Use These Messages

**Technical Jargon**
```
❌ "Error 500: Internal Server Error"
❌ "NullPointerException in PatientService.java:142"
❌ "Database connection timeout (code: ETIMEDOUT)"
```
- Alarming for patients/staff
- Not actionable (what should user do?)
- Violates patient safety language

**Vague Messages**
```
❌ "Something went wrong"
❌ "Invalid input"
❌ "Please try again"
```
- Not specific enough
- No actionable guidance
- Increases user frustration

**Alarming Language**
```
❌ "Fatal Error: Patient record failed"
❌ "Transfer failed - operation aborted"
❌ "Critical: Database crashed"
```
- Causes panic in healthcare settings
- Unprofessional, alarming
- Violates patient safety standards

### ✅ USE These Messages

**Calm, Specific, Actionable**
```
✅ "Unable to process request. Your data is safe. Please contact support."
✅ "Unable to complete transfer. Requested quantity (500) exceeds available stock (300)."
✅ "Please check the patient ID and try again."
✅ "This item is not available at the selected location."
```

**Structure: Problem + Context + Action**
```
Unable to [action] because [reason]. [What to do next].

Examples:
✅ "Unable to save patient record because the connection is unstable. Your changes are saved locally and will sync when connected."
✅ "Unable to transfer stock because the requested quantity exceeds available inventory. Please adjust the quantity and try again."
```

---

## Accessibility Anti-Patterns

### ❌ NEVER Do These

**Low Color Contrast**
```css
/* ❌ AVOID - 2.8:1 contrast (fails WCAG) */
color: #999999;
background: #FFFFFF;
```

**Missing Focus Indicators**
```css
/* ❌ AVOID - removes focus outline */
button:focus {
  outline: none;
}
```

**Keyboard Traps**
```javascript
// ❌ AVOID - traps focus
modal.addEventListener('keydown', (e) => {
  e.preventDefault(); // DON'T prevent all keys
});
```

### ✅ USE These Patterns

**High Contrast (WCAG AAA Preferred)**
```css
/* ✅ USE - 7.2:1 contrast (WCAG AAA) */
color: #0066CC;
background: #FFFFFF;
```

**Visible Focus Indicators**
```css
/* ✅ USE - 4px outline with offset */
button:focus {
  outline: 4px solid #0066CC;
  outline-offset: 2px;
}
```

**Focus Trap Management**
```javascript
// ✅ USE - trap focus within modal only
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal(); // Allow escape
  }
  if (e.key === 'Tab') {
    trapFocusWithinModal(e); // Trap tab only
  }
});
```

---

## Quick Reference Card

| Category | ❌ NEVER | ✅ USE |
|----------|---------|--------|
| **Fonts** | Inter, Roboto, Arial | Space Grotesk, IBM Plex Sans, JetBrains Mono |
| **Colors** | Purple gradients, neon | #0066CC (blue), #003366 (navy), #00A86B (green) |
| **Animation** | >300ms, bouncy | 100ms (fast), 150ms (smooth), 200ms (modal) |
| **Layout** | Icon-only, horizontal scroll | Icon + text, vertical stack |
| **Forms** | Placeholder as label, <44px | Visible labels, 48x48px touch targets |
| **Errors** | "Error 500", "Failed" | "Unable to", "Please check", "Try again" |
| **Contrast** | <4.5:1 text | 4.5:1 (AA), 7:1 (AAA preferred) |

---

## Related Resources

- [Frontend Design Skill](../skills/_frontend/frontend-design/SKILL.md) - Complete MYCURE design standards
- [Healthcare UX Guidelines](../skills/_healthcare/healthcare-ux-guidelines/SKILL.md) - WCAG compliance
- [/design-ui Command](../commands/design-ui.md) - Apply standards automatically
- [Healthcare Checklist](healthcare-checklist.md) - Pre-launch validation
