# Frontend Design Skill Documentation

**Distinctive, production-grade frontend interfaces for TOPSI Inc. products with emphasis on MYCURE healthcare adaptations.**

---

## Overview

This skill provides comprehensive frontend design guidance to create **distinctive** user interfaces that avoid generic "AI slop" aesthetics while maintaining healthcare-appropriate professionalism and accessibility.

**Key Philosophy:** Every design decision should be **purposeful** and **distinctive**. Generic choices (Inter font, purple gradients, center-aligned hero sections) signal lack of design intention.

---

## What This Skill Does

### Auto-Activates For:
- UI design and mockup creation
- Landing pages and marketing sites
- Dashboards and admin panels
- Patient portals and healthcare interfaces
- Form design and input validation
- Component libraries and design systems

### Provides:
1. **Typography Guidelines** - Purpose-driven font selection avoiding generic choices
2. **Color Systems** - CSS variable-based palettes with narrative meaning
3. **Animation Patterns** - CSS-first, healthcare-appropriate motion design
4. **Healthcare Adaptations** - MYCURE-specific design standards
5. **Reference Documentation** - Detailed guides for each design aspect
6. **Healthcare Examples** - Real-world MYCURE interface patterns

---

## Why This Skill Exists

### The Problem: Generic "AI Slop" Design

**Common anti-patterns:**
- ❌ Inter/Roboto fonts (overused, soulless)
- ❌ Purple gradients (#8B5CF6 to #7C3AED)
- ❌ Teal accents (#14B8A6)
- ❌ Center-aligned hero sections with gradient backgrounds
- ❌ Generic spacing and layouts
- ❌ Predictable component patterns

**Why these are problematic:**
- Instantly recognizable as "AI-generated"
- No brand personality or distinction
- Forgettable and interchangeable
- Doesn't build trust in professional contexts
- Especially harmful for healthcare (trust is critical)

### The Solution: Distinctive, Purposeful Design

**This skill enforces:**
- ✅ **Purposeful typography** - Fonts chosen for meaning and context
- ✅ **Narrative-driven colors** - Palettes that tell a brand story
- ✅ **Unique layouts** - Asymmetric, unexpected, memorable
- ✅ **Healthcare-appropriate** - Professional, calm, trustworthy
- ✅ **Performance-first** - CSS-native, accessible, fast

---

## Structure

```
frontend-design/
├── SKILL.md (main skill documentation)
├── README.md (this file - philosophy and overview)
├── reference/
│   ├── typography-guide.md (font selection, scale, implementation)
│   ├── color-systems.md (palettes, CSS variables, WCAG)
│   └── animation-patterns.md (CSS animations, healthcare timing)
└── examples/
    ├── healthcare-dashboard.md (MYCURE admin dashboard)
    └── patient-portal-ui.md (Patient-facing portal)
```

---

## Core Principles

### 1. Typography is Voice

**Fonts communicate before words do.**

**MYCURE Clinical:**
- **Headlines:** Space Grotesk (geometric, modern, trustworthy)
- **Body:** IBM Plex Sans (designed for IBM - professional, readable)
- **Data/Technical:** JetBrains Mono (monospace for medical records, codes)

**Why not Inter?**
- Inter is the "Times New Roman" of modern web design
- Conveys "I used the default"
- Lacks personality and distinction
- Acceptable for internal tools, not patient-facing

**Why JetBrains Mono for medical data?**
- Designed for code readability
- Excellent character distinction (0 vs O, 1 vs l)
- Critical for medical codes, patient IDs, lab values
- Conveys precision and accuracy

### 2. Color Tells a Story

**Colors should have meaning tied to product/brand.**

**MYCURE Clinical Palette:**
```css
:root {
  /* Primary - Clinical Trust */
  --clinical-blue: #0066CC;      /* Trust, reliability, medical */
  --trust-navy: #003366;         /* Depth, professionalism */
  --medical-green: #00A86B;      /* Health, growth, positive outcomes */

  /* Neutrals - Professional Foundation */
  --slate-50: #F8FAFC;
  --slate-900: #0F172A;

  /* Semantic - Healthcare Context */
  --critical-red: #DC2626;       /* Allergies, critical alerts */
  --warning-amber: #F59E0B;      /* Warnings, expiring medications */
  --success-emerald: #059669;    /* Successful operations */
}
```

**Why this palette?**
- **Clinical Blue (#0066CC)**: Universally associated with healthcare, trust
- **Medical Green (#00A86B)**: Positive health outcomes, not nature/environment
- **Trust Navy (#003366)**: Professional depth, government credibility
- No purple (overused), no teal (#14B8A6 too trendy)

**MYCURE Government Palette** (for LGU deployments):
```css
:root {
  --manila-blue: #003DA5;        /* Philippine flag blue */
  --official-gold: #FCD116;      /* Philippine flag gold/yellow */
  --government-gray: #4B5563;    /* Official, formal */
}
```

### 3. Animation is Purposeful

**Movement should enhance, not distract.**

**Healthcare Animation Philosophy:**
- **Calm, not flashy** - Patients may be anxious
- **Fast, not slow** - Healthcare professionals are busy
- **Meaningful, not decorative** - Every animation has a reason

**Timing Standards:**
```css
/* MYCURE Timing: 30% faster than consumer apps */
--duration-fast: 100ms;     /* Instant feedback */
--duration-base: 150ms;     /* Standard transitions */
--duration-slow: 200ms;     /* Complex state changes */

/* Consumer apps typically use 150ms, 250ms, 350ms */
/* Healthcare: Reduce by 30% for faster information access */
```

**Animation Types:**
1. **Feedback** - Button clicks, form submissions (100ms)
2. **Transitions** - Page changes, modal opens (150ms)
3. **Load States** - Skeleton screens, progress (200ms)

**Always include:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. Accessibility is Mandatory

**WCAG 2.2 Level AA is the minimum, not a goal.**

For healthcare:
- ✅ **WCAG AAA contrast** where possible (7:1 for body text)
- ✅ **Keyboard navigation** fully functional
- ✅ **Screen reader** support comprehensive
- ✅ **Focus indicators** highly visible (3px outline minimum)
- ✅ **Touch targets** minimum 44x44px

**Why AAA for healthcare?**
- Healthcare staff work in varying light conditions (exam rooms, nighttime)
- Patients may have vision impairments
- Critical information must be unmistakably readable
- Legal and ethical obligation

---

## Healthcare-Specific Adaptations

### Patient Safety Language Integration

Design must support **patient safety language** standards:

**Error States:**
```jsx
// ❌ Bad - Alarming
<div className="error">
  <AlertTriangle /> Fatal Error: System Crashed
</div>

// ✅ Good - Calm, Professional
<div className="notice">
  <Info /> Unable to process request. Please try again or contact support.
</div>
```

**Color-coding aligned with patient safety:**
- 🔴 Red: Only for life-critical alerts (allergies, drug interactions)
- 🟡 Amber: Important but not critical (expiring medications, low stock)
- 🟢 Green: Positive confirmations (successful save, appointment confirmed)
- 🔵 Blue: Informational (tips, help text)

### Philippine Healthcare Context

**Connectivity Considerations:**
- Offline-first design (rural clinics with 2G/3G)
- Progressive enhancement (works without JavaScript)
- Lightweight assets (images <100KB, total page <500KB)
- Clear loading states (clinics have slow connections)

**Literacy Considerations:**
- Icon + text labels (not icon-only)
- Plain language (not medical jargon for patient-facing)
- Visual hierarchy (important info prominent)
- Consistent patterns (reduce learning curve)

**Language Support:**
- English primary (official language for healthcare)
- Filipino/Tagalog secondary
- Regional language support (Cebuano, Ilocano, etc. for RHUs)

---

## Reference Documentation

### typography-guide.md

**Covers:**
- Font selection by use case
- Never-use fonts (Inter, Roboto) and why
- Recommended font pairings
- Type scale systems
- WCAG contrast requirements
- Loading optimization (font-display: swap)

**Key Takeaway:** Typography is the most impactful design decision. Choose fonts that reinforce brand personality and product purpose.

---

### color-systems.md

**Covers:**
- CSS variable implementation
- MYCURE Clinical palette (trust, medical, professional)
- MYCURE Government palette (Philippine flag colors)
- Semantic color usage (critical, warning, success)
- WCAG AA and AAA contrast ratios
- Dark mode implementation

**Key Takeaway:** Colors should tell a story. MYCURE Clinical uses blues/greens to convey medical trust. MYCURE Government uses Philippine flag colors for LGU credibility.

---

### animation-patterns.md

**Covers:**
- CSS-first animations (not JavaScript)
- Page load stagger patterns
- Hover and focus states
- Loading indicators
- Healthcare-specific timing (30% faster)
- Reduced motion support

**Key Takeaway:** Healthcare animations should be fast, calm, and purposeful. Never sacrifice information access speed for visual flourish.

---

## Healthcare Examples

### healthcare-dashboard.md

**MYCURE Admin Dashboard Design**

**Purpose:** Daily operations interface for clinic staff

**Design Decisions:**
- **Typography:** JetBrains Mono for patient IDs (zero-ambiguity)
- **Layout:** Asymmetric grid (not center-aligned generic)
- **Colors:** Clinical Blue primary, success states for completed tasks
- **Animations:** Fast transitions (100ms) for rapid task switching
- **Accessibility:** WCAG AAA contrast, keyboard shortcuts

**User Context:**
- Used 8+ hours daily by clinic staff
- High information density required
- Speed is priority over aesthetic flourish

---

### patient-portal-ui.md

**Patient-Facing Portal Design**

**Purpose:** Patients view records, book appointments, pay bills

**Design Decisions:**
- **Typography:** IBM Plex Sans (readable, trustworthy, not clinical)
- **Layout:** Generous whitespace (reduce anxiety)
- **Colors:** Calm blues, affirming greens, minimal reds
- **Animations:** Smooth, reassuring (150ms transitions)
- **Language:** Patient safety language (no "errors" or "failures")

**User Context:**
- Patients may be anxious about health
- Varying digital literacy
- Mobile-first (patients use smartphones)

---

## Usage Guide

### When to Use This Skill

**Activate when:**
- Designing new UI mockups or wireframes
- Creating component libraries
- Building landing pages or marketing sites
- Implementing dashboards or admin panels
- Designing patient-facing interfaces

**Ask yourself:**
1. "Does this look generic or distinctive?"
2. "Would a patient trust this interface?"
3. "Can I explain why I chose this font/color/animation?"
4. "Does this meet WCAG AAA standards?"

If answers are "generic," "no," "no," "no" → use this skill.

---

### Workflow

1. **Read SKILL.md** for overview and quick reference
2. **Check relevant reference guide** (typography, color, or animation)
3. **Review healthcare examples** for similar use cases
4. **Design with purpose** - every choice should have a reason
5. **Validate accessibility** - WCAG AAA contrast, keyboard nav
6. **Test with healthcare context** - rural connectivity, anxious patients

---

## Anti-Pattern Checklist

Before finalizing any design, verify:

- [ ] **Not using Inter or Roboto fonts**
- [ ] **No purple gradients (#8B5CF6)**
- [ ] **No teal accents (#14B8A6)**
- [ ] **Not center-aligned generic hero section**
- [ ] **Colors have narrative meaning (not random)**
- [ ] **Typography chosen for purpose (not default)**
- [ ] **Animations CSS-first (not JavaScript heavy)**
- [ ] **WCAG AAA contrast for body text (7:1)**
- [ ] **Reduced motion support implemented**
- [ ] **Patient safety language used in errors**

If any checkbox is unchecked → revise design.

---

## Collaboration with Other Skills

### frontend-design + healthcare-ux-guidelines

**Together they ensure:**
- Distinctive design (frontend-design)
- WCAG 2.2 AA compliance minimum (healthcare-ux)
- Patient safety language (healthcare-ux)
- Philippine healthcare context (both)

**Workflow:**
1. Design with `frontend-design` (distinctive aesthetics)
2. Validate with `healthcare-ux-guidelines` (compliance + safety)

---

### frontend-design + marketing-content-guidelines

**Together they ensure:**
- Consistent brand identity across design and content
- Visual design reinforces marketing message
- Social media assets match website aesthetics

**Example:** Landing page using MYCURE Clinical palette + social posts using same palette = brand consistency

---

## Continuous Improvement

### This Skill Evolves Based On:

1. **Anthropic design research** - Latest frontend design best practices
2. **MYCURE user feedback** - Healthcare professional and patient input
3. **WCAG updates** - As accessibility standards evolve (WCAG 3.0 future)
4. **Philippine healthcare context** - DOH regulations, LGU requirements

### Contributing

If you identify:
- New design anti-patterns to avoid
- Better font pairings for healthcare
- Improved animation patterns
- Additional healthcare examples

→ Update reference files and notify team

---

## Success Metrics

**A design using this skill should:**
- ✅ **Be instantly recognizable as MYCURE** (not generic healthcare app)
- ✅ **Build trust** (patients and healthcare professionals feel confident)
- ✅ **Be accessible** (WCAG AAA where possible, AA minimum)
- ✅ **Perform well** (fast load, works offline, CSS-first)
- ✅ **Tell a story** (colors, fonts, layout reinforce MYCURE's purpose)

---

## Related Resources

**Internal:**
- [healthcare-ux-guidelines](../../_healthcare/healthcare-ux-guidelines/SKILL.md) - WCAG + patient safety
- [brand-guidelines](../../_branding/brand-guidelines/SKILL.md) - Anthropic branding
- [theme-factory](../../_branding/theme-factory/SKILL.md) - Pre-built themes

**External:**
- [Anthropic Design Blog](https://claude.com/blog/improving-frontend-design-through-skills) - Original inspiration
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/) - Accessibility standards
- [Philippine DOH Design Standards](https://doh.gov.ph/) - Government healthcare guidelines

---

**Remember:** Design is not decoration. Every choice—font, color, spacing, animation—should serve a purpose and reinforce MYCURE's mission to digitalize Philippine healthcare with trust and professionalism.
