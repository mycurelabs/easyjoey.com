---
title: [Feature/Project Name] - Design Brief
date: YYYY-MM-DD
designer: [Your Name]
product: [MYCURE Core | MYCURE Gov | Other]
status: [Draft | In Review | Approved | In Progress | Completed]
---

# [Feature/Project Name] - Design Brief

**Project Overview:** [1-2 sentence description of what you're designing]

**Target Users:** [Clinic administrators | Patients | Healthcare professionals | etc.]

**Context:** [Where/when will this be used? Desktop? Mobile? Both?]

---

## Project Details

### Purpose

**What problem does this solve?**

[Describe the user problem this design addresses]

**What user need does this fulfill?**

[Based on research - link to research report if available]

**Research Foundation:** [Link to research document, if applicable]

### Success Criteria

**How will we measure success?**

1. [Measurable criterion 1 - e.g., "Task completion time < 5 minutes"]
2. [Measurable criterion 2 - e.g., "95%+ user satisfaction"]
3. [Measurable criterion 3 - e.g., "Zero accessibility violations"]

---

## Target Users

### Primary Users

**Role:** [e.g., Clinic Administrators]

**Demographics:**
- Age range: [e.g., 25-45]
- Digital literacy: [Low | Medium | High]
- Device usage: [Desktop 40% | Mobile 60%]
- Location: [Metro Manila | Provincial | Rural | Mixed]

**User Goals:**
1. [Goal 1]
2. [Goal 2]
3. [Goal 3]

**Pain Points:**
- [Pain point 1 - from research]
- [Pain point 2 - from research]

### Secondary Users

[Repeat structure for secondary users if applicable]

---

## MYCURE Brand Standards Checklist

**Refer to:**  [Frontend Design Skill](../skills/_frontend/frontend-design/SKILL.md)

### Typography ✅

- [ ] **Headlines:** Space Grotesk (geometric, modern, authoritative)
  - Usage: Page titles, section headings, hero text
  - Weights: 400 (Regular), 500 (Medium), 700 (Bold)

- [ ] **Body Text & UI:** IBM Plex Sans (professional, readable, trustworthy)
  - Usage: Paragraphs, form labels, navigation, buttons
  - Weights: 400 (Regular), 500 (Medium), 600 (SemiBold)

- [ ] **Data & Codes:** JetBrains Mono (zero-ambiguity, monospace)
  - Usage: Lot numbers, patient IDs, drug codes, dosages, timestamps
  - Weight: 400 (Regular)
  - Critical for: Distinguishing I vs l vs 1, O vs 0

**❌ NEVER use:** Inter, Roboto, Arial, Helvetica, system defaults

### Color Palette ✅

**MYCURE Clinical Palette:**

- [ ] **Clinical Blue (Primary):** #0066CC
  - Usage: Primary actions, links, emphasis
  - Contrast: 7.2:1 on white (WCAG AAA)

- [ ] **Trust Navy (Secondary):** #003366
  - Usage: Headings, subheadings, emphasis
  - Contrast: 13.7:1 on white (WCAG AAA)

- [ ] **Medical Green (Success):** #00A86B
  - Usage: Success messages, positive indicators, health status
  - Contrast: 7.5:1 on white (WCAG AAA)

**Neutral Grays:**
- [ ] Body text: #333333 (near-black, easier on eyes than pure black)
- [ ] Secondary text: #666666
- [ ] Borders/dividers: #E0E0E0
- [ ] Backgrounds: #F5F5F5 (off-white, reduces glare)

**❌ NEVER use:**
- Purple gradients
- Neon colors (#FF00FF, #00FFFF, #FFFF00)
- Pure black (#000000) or pure white (#FFFFFF) for text

### Animation Speeds ✅

**Healthcare-Optimized Durations:**

- [ ] **100ms:** Fast feedback (status updates, button hover)
  - Use for: Immediate response to user actions
  - Example: Background color change on button hover

- [ ] **150ms:** Smooth transitions (most UI changes)
  - Use for: General UI transitions
  - Example: Dropdown menu open, tab switching

- [ ] **200ms:** Modal/drawer open/close (larger components)
  - Use for: Noticeable but quick state changes
  - Example: Modal fade-in, side drawer slide-in

**❌ NEVER use:**
- >300ms animations (too slow for healthcare)
- Bouncy/playful animations (unprofessional for healthcare)
- Multiple simultaneous property animations (causes motion sickness)

### Layout Patterns ✅

- [ ] **Left-aligned with clear hierarchy** (NOT centered everything)
- [ ] **F-pattern reading flow** (easy to scan)
- [ ] **Icon + text labels** (NOT icon-only)
- [ ] **Vertical stacking on mobile** (NOT horizontal scrolling)

---

## WCAG 2.2 Level AA Requirements

**Mandatory for all MYCURE healthcare software**

**Refer to:** [Healthcare UX Guidelines](../skills/_healthcare/healthcare-ux-guidelines/SKILL.md)

### Color Contrast ✅

- [ ] Body text: 4.5:1 minimum (**7:1 preferred for healthcare**)
- [ ] Large text (18pt+): 3:1 minimum
- [ ] UI components: 3:1 minimum
- [ ] Test tool: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] Test in low-light conditions (dim exam rooms)

### Keyboard Navigation ✅

- [ ] All interactive elements reachable via Tab
- [ ] Tab order logical (left-to-right, top-to-bottom)
- [ ] No keyboard traps
- [ ] Enter/Space activates buttons and links
- [ ] Escape closes modals and dropdowns
- [ ] Arrow keys work in dropdowns/radio groups

### Focus Indicators ✅

- [ ] Visible on all focusable elements
- [ ] Minimum thickness: 3px (**4px preferred for healthcare**)
- [ ] High contrast (stands out in light and dark modes)
- [ ] Outline offset: 2px minimum
- [ ] Example: `outline: 4px solid #0066CC; outline-offset: 2px;`

### Screen Reader Compatibility ✅

- [ ] All content has semantic HTML or ARIA labels
- [ ] Form labels read before inputs
- [ ] Error messages announced (aria-live)
- [ ] Dynamic content changes announced
- [ ] Landmarks and headings navigable
- [ ] Button/link purposes clear
- [ ] Test with: NVDA (Windows) or JAWS

### Touch Targets (Mobile) ✅

- [ ] Minimum size: 44x44px (**48x48px preferred for healthcare**)
- [ ] Adequate spacing: 8px minimum between targets
- [ ] Test on actual devices (iOS and Android)
- [ ] No accidental activations

### Form Accessibility ✅

- [ ] Every input has visible label (NOT just placeholder)
- [ ] Required fields marked with aria-required="true"
- [ ] Error identification clear and specific
- [ ] Help text provided where needed (aria-describedby)
- [ ] Success messages announced (aria-live)

---

## Patient Safety Language

**Mandatory for all user-facing error messages**

**Refer to:** [Patient Safety Language Guide](../skills/_healthcare/healthcare-ux-guidelines/reference/PATIENT_SAFETY_LANGUAGE.md)

### Error Message Guidelines ✅

- [ ] **No alarming words:** ❌ "Error", "Failed", "Fatal", "Broken", "Crashed"
- [ ] **Calm alternatives:** ✅ "Unable to", "Please check", "Try again"
- [ ] **Specific and actionable:** Tell user exactly what went wrong and what to do next
- [ ] **Reassure data safety when appropriate**

### Examples ✅

| ❌ Alarming | ✅ Patient-Safe |
|-----------|----------------|
| "Fatal Error: Database crashed" | "Unable to process request. Your data is safe. Please contact support." |
| "Transfer failed - error 500" | "Unable to complete transfer. Please verify the information and try again." |
| "Invalid patient ID" | "Please check the patient ID and try again." |
| "Stock not found" | "This item is not available at the selected location." |

### Critical Alerts ✅

- [ ] Drug interaction warnings clearly marked (⚠️ high visibility)
- [ ] Allergy alerts prominently displayed (red/orange, high contrast)
- [ ] Dosage warnings require explicit acknowledgment
- [ ] Patient safety notifications prioritized over system messages

---

## Philippine Healthcare Context

**Mandatory considerations for Philippine market**

### Offline Functionality ✅

- [ ] Core functionality works offline (disconnect network to test)
- [ ] Data syncs when reconnected
- [ ] Conflict resolution handled gracefully
- [ ] User notified when offline vs online
- [ ] Local data stored securely (IndexedDB encrypted if sensitive)

**Context:** 35-40% of rural clinics have unreliable internet

### Low Bandwidth (3G) ✅

- [ ] Page loads in <10 seconds on 3G (Chrome DevTools throttling)
- [ ] Images optimized (<100KB each)
- [ ] Total page size <500KB
- [ ] Critical content loads first (above-the-fold)
- [ ] Lazy loading for non-critical assets

**Context:** Many users on 3G in provincial/rural areas

### Mobile-First Design ✅

- [ ] Responsive on iOS and Android
- [ ] Touch targets 44x44px minimum (48x48px preferred)
- [ ] Forms usable with on-screen keyboard
- [ ] No horizontal scrolling
- [ ] Works in portrait and landscape
- [ ] Test on actual devices

**Context:** 80%+ Philippine users access on mobile devices

### Filipino Language Support ✅

**If patient-facing:**
- [ ] All patient-facing text translated to Filipino
- [ ] Date/time formats localized (MM/DD/YYYY for Philippines)
- [ ] Currency formatted correctly (₱1,234.56)
- [ ] Error messages in Filipino
- [ ] Language toggle accessible

**If staff-only:**
- [ ] English is acceptable (medical terminology in English)
- [ ] Consider Filipino for common phrases

---

## Design Deliverables

### Required Deliverables ✅

- [ ] **Wireframes** (low-fidelity sketches or digital wireframes)
- [ ] **UI Mockups** (high-fidelity designs with MYCURE standards applied)
- [ ] **Interactive Prototype** (if complex interaction)
- [ ] **Component Specifications** (measurements, colors, typography)
- [ ] **Responsive Layouts** (mobile, tablet, desktop views)
- [ ] **Accessibility Annotations** (ARIA labels, keyboard nav notes)
- [ ] **Style Guide Entry** (if new patterns introduced)

### File Naming Convention

**Follow:** [FILE_NAMING.md](../../FILE_NAMING.md)

**Examples:**
- `patient-registration-wireframe-v1.fig`
- `stock-transfer-mockup-mobile.png`
- `dashboard-prototype-v2.fig`

---

## Design Process

### Research & Discovery (Done before design)

- [ ] User research reviewed
- [ ] Competitor analysis (if applicable)
- [ ] Technical constraints understood
- [ ] Stakeholder requirements gathered

### Sketching & Wireframing

- [ ] Low-fidelity sketches created
- [ ] User flows mapped
- [ ] Information architecture defined
- [ ] Feedback from stakeholders gathered

### High-Fidelity Design

- [ ] MYCURE brand standards applied
- [ ] WCAG requirements implemented
- [ ] Patient safety language used
- [ ] Philippine context considered
- [ ] Responsive layouts designed

### Validation

- [ ] WCAG audit completed (run `/audit-wcag`)
- [ ] Design review with team
- [ ] User testing (if possible)
- [ ] Stakeholder sign-off

---

## Technical Constraints

### System Constraints

- [ ] Framework: [e.g., React, Vue, HTML/CSS]
- [ ] Screen sizes: [Minimum supported width, e.g., 320px]
- [ ] Browser support: [Chrome, Firefox, Safari - which versions?]
- [ ] Performance budget: [e.g., <500KB total page size]

### Integration Points

- [ ] Existing components to reuse: [List]
- [ ] New components needed: [List]
- [ ] APIs required: [List]
- [ ] Third-party services: [List]

---

## Timeline

| Phase | Duration | Deliverable | Deadline |
|-------|----------|-------------|----------|
| Research & Discovery | [X days] | Research summary | YYYY-MM-DD |
| Wireframing | [X days] | Low-fi wireframes | YYYY-MM-DD |
| High-Fi Design | [X days] | UI mockups | YYYY-MM-DD |
| Prototyping | [X days] | Interactive prototype | YYYY-MM-DD |
| Validation | [X days] | WCAG audit report | YYYY-MM-DD |
| Handoff | [X days] | Developer specs | YYYY-MM-DD |

---

## Sign-Off

**Designer:** _____________________________ Date: __________

**Product Manager:** _____________________________ Date: __________

**Technical Lead:** _____________________________ Date: __________

**Stakeholder:** _____________________________ Date: __________

---

## Related Resources

- [Frontend Design Skill](../skills/_frontend/frontend-design/SKILL.md) - Complete MYCURE design standards
- [Healthcare UX Guidelines](../skills/_healthcare/healthcare-ux-guidelines/SKILL.md) - WCAG + patient safety
- [Design Anti-Patterns](../docs/design-anti-patterns.md) - What NOT to do
- [/design-ui Command](../commands/design-ui.md) - Quick UI design with standards applied
- [/audit-wcag Command](../commands/audit-wcag.md) - WCAG validation
