# Color Systems Guide

Comprehensive guide to creating memorable, accessible color palettes using CSS variables and context-driven design.

---

## Philosophy: Narrative-Driven Color

**Avoid**: Generic neutral palettes (all grays + one accent)
**Embrace**: Colors that tell a story and reflect purpose

### Questions Before Choosing Colors

1. **What feeling should this evoke?**
   - Trust → Blues, whites
   - Energy → Warm colors, high saturation
   - Calm → Desaturated, cool tones
   - Authority → Dark blues, blacks, gold accents

2. **What is the context?**
   - Healthcare → Clinical blues, medical greens, safety reds
   - Government → National colors, authoritative tones
   - Education → Warm, approachable colors
   - Finance → Professional blues, greens, grays

3. **Who uses this?**
   - Medical professionals → High contrast, clinical
   - Patients → Calm, reassuring
   - General public → Friendly, accessible

---

## Color Palettes for TOPSI Products

### MYCURE Clinical (Private Clinics)

**Primary Palette:**
```css
:root {
  /* Primary - Clinical Trust */
  --clinical-blue: #0066CC;
  --trust-navy: #003366;

  /* Accents - Medical Actions */
  --medical-green: #00A86B; /* Success, healthy status */
  --alert-red: #DC3545;     /* Alerts, critical */
  --warn-amber: #FFC107;    /* Warnings, caution */
  --info-cyan: #17A2B8;     /* Information */

  /* Surfaces */
  --surface-primary: #FFFFFF;
  --surface-secondary: #F8F9FA;
  --surface-tertiary: #E9ECEF;
  --surface-elevated: #FFFFFF;

  /* Text */
  --text-primary: #212529;
  --text-secondary: #6C757D;
  --text-muted: #ADB5BD;
  --text-on-color: #FFFFFF;

  /* Borders */
  --border-light: #DEE2E6;
  --border-medium: #CED4DA;
  --border-strong: #6C757D;
}
```

**Contrast Ratios (on white):**
- clinical-blue (#0066CC): 7.0:1 - Passes AAA ✓
- trust-navy (#003366): 12.7:1 - Passes AAA ✓
- medical-green (#00A86B): 3.5:1 - Passes AA (large text) ✓
- text-primary (#212529): 16.1:1 - Passes AAA ✓
- text-secondary (#6C757D): 4.5:1 - Passes AA ✓

### MYCURE Gov (LGU/Government)

**Philippine Flag-Inspired:**
```css
:root {
  /* Primary - Philippine Colors */
  --gov-blue: #0038A8;      /* Flag blue */
  --gov-red: #CE1126;       /* Flag red */
  --sunburst-gold: #FCD116; /* Sun yellow */

  /* Secondary - Service */
  --service-green: #00A86B;
  --neutral-gray: #6C757D;

  /* High Contrast Surfaces (for low-quality displays) */
  --surface: #FFFFFF;
  --surface-alt: #F1F3F5;
  --surface-dark: #343A40;

  /* High Contrast Text */
  --text: #1A1A1A;
  --text-on-dark: #FFFFFF;
  --text-muted: #495057; /* Darker than clinical for contrast */
}
```

**Design Notes:**
- Higher contrast ratios for low-quality displays
- Patriotic color scheme builds authority
- Simplified palette reduces cognitive load

---

## CSS Variable Architecture

### Semantic Naming

**Do This:**
```css
:root {
  /* Semantic names describe purpose */
  --color-primary: #0066CC;
  --color-success: #00A86B;
  --color-danger: #DC3545;
  --color-warning: #FFC107;

  /* Context-specific */
  --button-primary-bg: var(--color-primary);
  --button-primary-text: var(--text-on-color);
  --button-primary-hover: #0052A3; /* Darker */
}
```

**Not This:**
```css
:root {
  /* Literal color names - inflexible */
  --blue: #0066CC;
  --green: #00A86B;
  --red: #DC3545;
}
```

### Layered Variables

**Base → Semantic → Component:**
```css
:root {
  /* 1. Base Palette */
  --blue-600: #0066CC;
  --blue-700: #0052A3;
  --blue-800: #003D7A;

  /* 2. Semantic */
  --color-primary: var(--blue-600);
  --color-primary-hover: var(--blue-700);
  --color-primary-active: var(--blue-800);

  /* 3. Component-Specific */
  --button-bg: var(--color-primary);
  --button-bg-hover: var(--color-primary-hover);
  --button-bg-active: var(--color-primary-active);
}
```

---

## Dark Mode Support

### Toggle with Data Attribute

```css
:root {
  --surface-primary: #FFFFFF;
  --text-primary: #212529;
}

[data-theme="dark"] {
  --surface-primary: #1A1A1A;
  --text-primary: #F8F9FA;
  /* Keep accent colors but adjust brightness */
  --clinical-blue: #3399FF; /* Lighter for dark bg */
}
```

### Auto Dark Mode (System Preference)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --surface-primary: #1A1A1A;
    --text-primary: #F8F9FA;
    --clinical-blue: #3399FF;
  }
}
```

---

## Accessibility: WCAG 2.2 Contrast Requirements

### Minimum Ratios

- **Normal text (< 24px)**: 4.5:1 (AA), 7:1 (AAA)
- **Large text (≥ 24px)**: 3:1 (AA), 4.5:1 (AAA)
- **UI components**: 3:1 minimum

### Testing Colors

**Tool**: WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)

**Quick Reference:**
```css
/* On white (#FFFFFF) background */
--text-aaa: #212529;  /* 16.1:1 - Passes AAA ✓ */
--text-aa: #6C757D;   /* 4.54:1 - Passes AA ✓ */
--text-fail: #ADB5BD; /* 2.85:1 - FAILS ✗ */

/* On clinical-blue (#0066CC) background */
--on-blue-good: #FFFFFF; /* 7.0:1 - Passes AAA ✓ */
--on-blue-bad: #FFC107;  /* 1.8:1 - FAILS ✗ */
```

### Color-Blind Safe Palettes

**Avoid**: Red/Green as only differentiator
**Use**: Red/Blue, Green/Blue, or add patterns/icons

```css
/* Color-blind friendly status indicators */
.status-success {
  background: var(--medical-green);
  color: white;
  border-left: 4px solid #006B4E; /* Darker green */
}

.status-error {
  background: var(--alert-red);
  color: white;
  border-left: 4px solid #A02622; /* Darker red */
  /* Add icon for additional cue */
}

.status-warning {
  background: var(--warn-amber);
  color: #1A1A1A; /* Dark text on yellow */
  border-left: 4px solid #E0A800; /* Darker yellow */
}
```

---

## Advanced Color Techniques

### Gradients for Depth

**Subtle Background Gradients:**
```css
.hero {
  background: linear-gradient(135deg,
    var(--clinical-blue) 0%,
    var(--trust-navy) 100%
  );
}

.card {
  background: linear-gradient(180deg,
    #FFFFFF 0%,
    #F8F9FA 100%
  );
}
```

**Radial Gradients for Spotlights:**
```css
.spotlight {
  background:
    radial-gradient(circle at top right, var(--clinical-blue) 0%, transparent 50%),
    radial-gradient(circle at bottom left, var(--medical-green) 0%, transparent 50%),
    var(--surface-primary);
  background-blend-mode: multiply;
}
```

### Overlays & Blend Modes

```css
.image-overlay {
  position: relative;
}

.image-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--clinical-blue);
  mix-blend-mode: multiply;
  opacity: 0.3;
}
```

### Color Temperature Shifts

**Warm (Inviting):**
```css
:root {
  --warm-white: #FFF8F0;
  --warm-gray: #D4CAC0;
}
```

**Cool (Clinical):**
```css
:root {
  --cool-white: #F0F4FF;
  --cool-gray: #C0CAD4;
}
```

---

## Healthcare-Specific Color Patterns

### Patient Safety Color Coding

**Standard Medical Colors:**
```css
:root {
  /* Status Indicators */
  --status-normal: #00A86B;      /* Green - Normal/Healthy */
  --status-elevated: #FFC107;    /* Amber - Caution */
  --status-critical: #DC3545;    /* Red - Critical/Emergency */

  /* Priority Levels */
  --priority-low: #17A2B8;       /* Cyan - Info */
  --priority-medium: #FFC107;    /* Amber - Attention */
  --priority-high: #FD7E14;      /* Orange - Urgent */
  --priority-critical: #DC3545;  /* Red - Emergency */

  /* Medication Classes (if needed) */
  --med-antibiotic: #007BFF;
  --med-analgesic: #6C757D;
  --med-vaccine: #28A745;
}
```

### Alert System

```css
.alert {
  padding: 16px;
  border-radius: 4px;
  border-left: 4px solid;
  font-weight: 600;
}

.alert-critical {
  background: #F8D7DA;
  color: #721C24;
  border-color: var(--status-critical);
}

.alert-warning {
  background: #FFF3CD;
  color: #856404;
  border-color: var(--status-elevated);
}

.alert-info {
  background: #D1ECF1;
  color: #0C5460;
  border-color: var(--priority-low);
}

.alert-success {
  background: #D4EDDA;
  color: #155724;
  border-color: var(--status-normal);
}
```

### Data Visualization

**Health Metrics Chart Colors:**
```css
:root {
  /* Chart colors - distinct and accessible */
  --chart-1: #0066CC; /* Blue */
  --chart-2: #00A86B; /* Green */
  --chart-3: #FFC107; /* Amber */
  --chart-4: #DC3545; /* Red */
  --chart-5: #6610F2; /* Purple */
  --chart-6: #FD7E14; /* Orange */
}
```

---

## Government/LGU Considerations

### High-Contrast Mode

**For low-quality displays:**
```css
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000; /* Pure black */
    --surface-primary: #FFFFFF; /* Pure white */
    --clinical-blue: #0000CC; /* Maximum saturation */
  }
}
```

### Print-Friendly Colors

```css
@media print {
  :root {
    --surface-primary: #FFFFFF;
    --text-primary: #000000;
    /* Remove colored backgrounds */
    --surface-secondary: #FFFFFF;
    --surface-tertiary: #FFFFFF;
  }

  .card {
    border: 1px solid #000000; /* Add borders for definition */
  }
}
```

---

## Color Palette Generation

### Tools

1. **Coolors** (https://coolors.co/) - Generate palettes from seed color
2. **Adobe Color** (https://color.adobe.com/) - Color wheel, accessibility checker
3. **Paletton** (https://paletton.com/) - Complementary, triadic schemes
4. **Contrast Checker** (https://webaim.org/resources/contrastchecker/) - WCAG validation

### Starting from Brand Color

**Example: Start with TOPSI brand blue (#0066CC)**

1. **Generate Tints** (lighter):
```css
--blue-100: #E6F2FF; /* bg-primary + 95% white */
--blue-200: #CCE5FF; /* bg-primary + 80% white */
--blue-300: #99CCFF; /* bg-primary + 60% white */
```

2. **Generate Shades** (darker):
```css
--blue-700: #0052A3; /* bg-primary - 20% */
--blue-800: #003D7A; /* bg-primary - 40% */
--blue-900: #002952; /* bg-primary - 60% */
```

3. **Generate Complementary** (opposite on color wheel):
```css
--orange-600: #CC6600; /* Complement of #0066CC */
```

---

## Quick Reference Table

| Use Case | Primary | Accent | Background | Text |
|----------|---------|--------|------------|------|
| MYCURE Clinical | #0066CC (Blue) | #00A86B (Green), #DC3545 (Red) | #FFFFFF, #F8F9FA | #212529 |
| MYCURE Gov | #0038A8 (Navy) | #CE1126 (Red), #FCD116 (Gold) | #FFFFFF, #F1F3F5 | #1A1A1A |
| Marketing/Landing | #0066CC (Blue) | #FFC107 (Amber), #6610F2 (Purple) | #FFFFFF, Gradients | #212529 |
| Dark Mode | #3399FF (Light Blue) | #00D68F (Light Green) | #1A1A1A, #2D2D2D | #F8F9FA |

---

## Implementation Checklist

- [ ] **Define base palette** in `:root` CSS variables
- [ ] **Test all color combinations** for WCAG 2.2 AA compliance (minimum)
- [ ] **Create dark mode variants** (if applicable)
- [ ] **Document color meanings** for team consistency
- [ ] **Test on low-quality displays** (for LGU products)
- [ ] **Validate print styles** (if documents will be printed)
- [ ] **Check color-blind accessibility** (use simulators)
- [ ] **Ensure sufficient contrast** for all interactive elements (3:1 minimum)

---

**Remember**: Color is emotion. Choose intentionally, test thoroughly, and always prioritize accessibility over aesthetics.
