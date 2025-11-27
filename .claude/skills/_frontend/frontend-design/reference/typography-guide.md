# Typography Guide

Comprehensive guide to selecting and implementing distinctive typography that avoids generic "AI slop" aesthetics.

---

## Font Selection Philosophy

**Core Principle**: Typography should serve the content's purpose and reflect the product's character.

### Questions Before Choosing Fonts

1. **What is the content's purpose?**
   - Technical documentation → Monospace or technical sans
   - Editorial content → Serif for readability
   - Data-heavy interfaces → Clear, legible sans with good numerals
   - Marketing/Brand → Distinctive, memorable families

2. **Who is the audience?**
   - Medical professionals → Clinical, trustworthy
   - Patients → Highly legible, calm
   - Government/LGU → Authoritative, accessible
   - General public → Friendly, clear

3. **What technical constraints exist?**
   - Low-bandwidth → System fonts or optimized web fonts
   - Accessibility requirements → High x-height, clear glyphs
   - Language support → Extended character sets

---

## Font Recommendations by Use Case

### Healthcare/Medical (MYCURE)

**Clinical Interfaces:**
```css
/* Primary: Technical clarity */
font-family: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace;

/* Alternative: Professional sans */
font-family: 'IBM Plex Sans', 'Source Sans Pro', sans-serif;
```

**Why:**
- Monospace ensures data alignment (vital for medical records)
- Clear distinction between similar characters (0 vs O, 1 vs l)
- Professional, technical aesthetic builds trust

**Patient-Facing Interfaces:**
```css
/* Primary: Maximum legibility */
font-family: 'Atkinson Hyperlegible', 'Source Sans Pro', sans-serif;

/* Alternative: Friendly, clear */
font-family: 'IBM Plex Sans', 'Inter' /* only if necessary */, sans-serif;
```

**Why:**
- Atkinson Hyperlegible designed for low vision accessibility
- High x-height aids readability
- Clear, calming aesthetic reduces patient anxiety

### Government/LGU (MYCURE Gov)

```css
/* Headings: Authority */
font-family: 'Source Sans Pro', 'IBM Plex Sans', sans-serif;
font-weight: 700;

/* Body: Accessibility */
font-family: 'Atkinson Hyperlegible', 'Source Sans Pro', sans-serif;
font-weight: 400;
```

**Why:**
- High contrast between weights
- Excellent legibility on low-quality displays
- Professional government aesthetic
- Free, open-source (budget-friendly)

### Marketing/Editorial

```css
/* Display headings */
font-family: 'Playfair Display', 'Crimson Pro', serif;
font-weight: 700;

/* Subheadings */
font-family: 'Space Grotesk', 'DM Sans', sans-serif;
font-weight: 600;

/* Body copy */
font-family: 'Crimson Pro', 'Source Serif Pro', serif;
font-weight: 400;
```

**Why:**
- Serif displays add editorial credibility
- Geometric sans for modern contrast
- Serif body for long-form readability

---

## Generic Fonts to AVOID

These fonts signal "default AI output" and lack character:

| Font | Why to Avoid | Better Alternative |
|------|--------------|-------------------|
| Inter | Overused, generic | Space Grotesk, DM Sans, IBM Plex Sans |
| Roboto | Android default, soulless | Source Sans Pro, Atkinson Hyperlegible |
| Arial | Windows default, dated | Actual designed typeface |
| Helvetica | Overused, expensive | Source Sans Pro, IBM Plex Sans |
| Open Sans | Dated, ubiquitous | Source Sans Pro, Atkinson Hyperlegible |
| Lato | Generic "friendly" | IBM Plex Sans, DM Sans |
| Montserrat | Overused geometric | Space Grotesk, Syne |

**Exception**: Inter is acceptable ONLY when:
- Client specifically requests it for brand consistency
- Accessibility testing proves it superior for specific use case
- You acknowledge it's generic and compensate with other design elements

---

## Typography Scales

### Extreme Contrast (Recommended)

**3x+ ratio between display and body creates hierarchy:**

```css
:root {
  --text-base: 18px;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-md: 18px;
  --text-lg: 24px;
  --text-xl: 32px;
  --text-2xl: 48px;
  --text-3xl: 64px;
  --text-display: 96px; /* 96 / 18 = 5.33x ratio */
}
```

**Example Application:**
```css
h1 { font-size: var(--text-display); line-height: 1.1; }
h2 { font-size: var(--text-3xl); line-height: 1.2; }
h3 { font-size: var(--text-2xl); line-height: 1.3; }
p  { font-size: var(--text-md); line-height: 1.6; }
```

### Moderate Scale (Healthcare/Data-Heavy)

**Smaller jumps for clinical clarity:**

```css
:root {
  --text-base: 16px; /* Larger base for accessibility */
  --text-sm: 14px;
  --text-md: 16px;
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 32px;
  --text-3xl: 40px;
}
```

---

## Weight Ranges

Use the **full weight spectrum** (100-900), not just middle weights.

### Effective Weight Combinations

**High Contrast:**
```css
h1 { font-weight: 800; } /* Extra bold */
h2 { font-weight: 600; } /* Semi-bold */
p  { font-weight: 400; } /* Regular */
.caption { font-weight: 300; } /* Light */
```

**Data Hierarchy:**
```css
.data-label { font-weight: 700; text-transform: uppercase; }
.data-value { font-weight: 400; }
.data-unit { font-weight: 300; font-size: 0.875em; }
```

---

## Line Height & Spacing

### Line Height Rules

```css
/* Display text: Tight */
h1, h2 { line-height: 1.1; }

/* Headings: Comfortable */
h3, h4 { line-height: 1.3; }

/* Body text: Readable */
p { line-height: 1.6; }

/* Small text: Extra spacious */
.caption { line-height: 1.8; }
```

### Letter Spacing (Tracking)

```css
/* Display: Slight negative for tightness */
h1 { letter-spacing: -0.02em; }

/* Uppercase labels: Increased tracking */
.label { letter-spacing: 0.08em; text-transform: uppercase; }

/* Monospace data: Slight increase for clarity */
.code { letter-spacing: 0.02em; }
```

---

## Loading Fonts Efficiently

### Google Fonts (Recommended for Web)

**Optimized Loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;800&family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

**Key Parameters:**
- `family=Font+Name:wght@300;400;600;800` - Only load needed weights
- `&display=swap` - Show fallback until font loads (avoids FOIT)
- Multiple families: `family=Font1&family=Font2`

### Self-Hosted (Better Performance)

```css
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**Benefits:**
- Faster loading (no external request)
- Works offline
- Full control over caching
- Better for low-bandwidth (LGU contexts)

---

## Fallback Stacks

**Always provide fallbacks** for when custom fonts fail to load:

```css
/* Monospace */
font-family: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 'Courier New', monospace;

/* Sans-serif */
font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;

/* Serif */
font-family: 'Crimson Pro', 'Georgia', 'Times New Roman', serif;
```

**System Font Stack (Fallback for Low-Bandwidth):**
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

---

## Accessibility Considerations

### Minimum Sizes

```css
/* WCAG 2.2 Recommendations */
body { font-size: 16px; } /* Never below 16px for body text */
small { font-size: 14px; } /* Minimum 14px for small text */
```

### High Contrast

```css
/* Sufficient contrast ratios */
.text-primary { color: #212529; } /* On white: 16.1:1 */
.text-secondary { color: #6C757D; } /* On white: 4.54:1 - Passes AA */
.text-muted { color: #ADB5BD; } /* On white: 2.85:1 - FAILS - Avoid for critical text */
```

### Resizable Text

```css
/* Use rem units for scalability */
html { font-size: 16px; } /* Base */
h1 { font-size: 4rem; } /* Scales with user zoom */
p { font-size: 1rem; } /* Scales with user zoom */
```

---

## Healthcare-Specific Patterns

### Medical Records

```css
.medical-record {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  line-height: 1.6;
  letter-spacing: 0.02em;
}

.record-label {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
}

.record-value {
  font-weight: 400;
  font-size: 18px;
  color: var(--text-primary);
}
```

### Patient Safety Labels

```css
.alert-label {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 700;
  font-size: 18px; /* Larger for visibility */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.alert-critical {
  color: #DC3545; /* Red */
}

.alert-warning {
  color: #FFC107; /* Amber */
}
```

---

## Quick Reference

| Use Case | Font Choice | Weights | Size Scale |
|----------|-------------|---------|------------|
| Medical Data | JetBrains Mono | 300, 400, 600, 800 | 16-18px base |
| Patient UI | Atkinson Hyperlegible | 400, 700 | 16px base, 1.6 line-height |
| Gov/LGU | Source Sans Pro | 400, 600, 700 | 16px base, high contrast |
| Marketing Headings | Playfair Display | 700, 800 | 48-96px display |
| Editorial Body | Crimson Pro | 400, 600 | 18px, 1.6 line-height |
| Technical Docs | JetBrains Mono | 400, 600 | 16px, 1.5 line-height |

---

**Remember**: Typography is 95% of web design. Choose thoughtfully, implement precisely, test thoroughly.
