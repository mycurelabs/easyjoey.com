# Animation Patterns Guide

Comprehensive guide to purposeful, performant CSS animations and motion design for healthcare interfaces.

---

## Philosophy: Motion with Purpose

**Avoid**: Micro-animations everywhere, distracting effects
**Embrace**: Intentional motion that enhances understanding

### When to Use Animation

1. **Provide feedback** - User action causes visible response
2. **Guide attention** - Draw eyes to important changes
3. **Establish hierarchy** - Reveal information progressively
4. **Reduce cognitive load** - Smooth transitions vs. jarring changes
5. **Delight (sparingly)** - Memorable moments, not every interaction

### When NOT to Use Animation

1. **Critical medical data** - No delays in emergency information
2. **High-frequency actions** - Repetitive tasks become annoying
3. **Accessibility concerns** - Respect `prefers-reduced-motion`
4. **Low-performance devices** - Avoid janky animations

---

## CSS-First Approach

**Priority:**
1. **CSS animations** - Fast, performant, no JavaScript
2. **CSS transitions** - Simple state changes
3. **React Motion** - Only for complex React components
4. **JavaScript animations** - Last resort, library-heavy tasks

### Why CSS-First?

- **Performance**: Hardware-accelerated by browsers
- **Declarative**: Easy to understand and maintain
- **Responsive**: Works without JavaScript
- **Accessible**: Respects user preferences automatically

---

## Essential Animation Patterns

### 1. Page Load Stagger

**Use Case**: Progressive reveal of page content
**Duration**: 0.6-0.8s per element
**Delay**: Stagger by 0.1-0.2s

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
}

.hero-subtitle {
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}

.hero-description {
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
}

.hero-cta {
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both;
}
```

**Healthcare Adaptation**: Reduce to 0.4s duration for faster information access

### 2. Hover States

**Use Case**: Interactive element feedback
**Duration**: 0.2-0.3s
**Easing**: ease or ease-out

```css
.button {
  transition: all 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
}

.button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 102, 204, 0.2);
}
```

**Healthcare Pattern**: Calm, predictable movement

```css
.patient-card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.patient-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}
```

### 3. Modal/Dialog Entrance

**Use Case**: Overlay content appearing
**Duration**: 0.3-0.4s
**Effect**: Scale + fade

```css
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal {
  animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-backdrop {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### 4. Loading States

**Use Case**: Indicate processing/waiting
**Duration**: 1.5-2s loop
**Effect**: Subtle pulse or spin

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.loading-indicator {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Spinner for longer waits */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

**Healthcare Loading**: Clear, calm feedback

```css
.medical-record-loading {
  animation: pulse 1.2s ease-in-out infinite;
  color: var(--clinical-blue);
}

.loading-text::after {
  content: '...';
  animation: ellipsis 1.5s steps(4) infinite;
}

@keyframes ellipsis {
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75%, 100% { content: '...'; }
}
```

### 5. Success/Error Feedback

**Use Case**: Action confirmation
**Duration**: 0.4-0.6s
**Effect**: Scale bounce or shake

```css
/* Success - Gentle bounce */
@keyframes successBounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.success-message {
  animation: successBounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Error - Shake */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.error-input {
  animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
}
```

### 6. Dropdown/Accordion Expand

**Use Case**: Reveal hidden content
**Duration**: 0.3s
**Effect**: Height transition

```css
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.accordion.open .accordion-content {
  max-height: 1000px; /* Larger than content */
}

/* Alternative: Grid approach for smoother animation */
.dropdown {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}

.dropdown.open {
  grid-template-rows: 1fr;
}

.dropdown-content {
  overflow: hidden;
}
```

---

## Easing Functions (Timing)

### Cubic Bezier Curves

**ease-out** (fast start, slow end):
```css
transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);
```
**Use for**: Entrances, expanding elements

**ease-in** (slow start, fast end):
```css
transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
```
**Use for**: Exits, collapsing elements

**ease-in-out** (slow both ends):
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```
**Use for**: Full journey animations

**Bounce**:
```css
transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```
**Use for**: Playful feedback (sparingly in healthcare)

### Custom Curves for Healthcare

**Calm (reduced bounce):**
```css
--ease-calm: cubic-bezier(0.25, 0.1, 0.25, 1);
```

**Clinical (linear-ish, predictable):**
```css
--ease-clinical: cubic-bezier(0.4, 0, 0.6, 1);
```

**Tool**: https://cubic-bezier.com/

---

## Performance Optimization

### Hardware-Accelerated Properties

**✅ Animate These (GPU-accelerated):**
- `opacity`
- `transform` (translate, scale, rotate)

**❌ Avoid Animating (CPU-heavy):**
- `width`, `height` (use `transform: scale()` instead)
- `top`, `left` (use `transform: translate()` instead)
- `margin`, `padding`
- `background-position` (use `transform` on pseudo-element instead)

### Optimized Patterns

**Bad (reflows/repaints):**
```css
.card:hover {
  width: 320px; /* Triggers reflow */
  height: 280px; /* Triggers reflow */
}
```

**Good (GPU-accelerated):**
```css
.card {
  width: 300px;
  height: 260px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05); /* GPU-accelerated */
}
```

### Will-Change Hint

**Use sparingly** for known animations:
```css
.modal {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.modal.animated {
  will-change: auto;
}
```

---

## Accessibility: Reduced Motion

### Respect User Preferences

**Always provide reduced-motion alternative:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Better approach (preserve essential animations):**

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable decorative animations */
  .hero-title,
  .card:hover {
    animation: none;
    transition: none;
  }

  /* Keep essential feedback (instant) */
  .button:active {
    transition: opacity 0.01ms;
    opacity: 0.7;
  }

  /* Keep loading indicators (simplified) */
  .loading-spinner {
    animation: fadeIn 0.3s; /* One-time fade, no spin */
  }
}
```

---

## Healthcare-Specific Patterns

### Patient Safety: Instant Alerts

**Critical information = ZERO animation delay:**

```css
.alert-critical {
  /* No animation - instant visibility */
  animation: none;
  transition: none;
}

.alert-warning {
  /* Minimal animation - just fade */
  animation: fadeIn 0.15s;
}

.alert-info {
  /* Can afford gentle entrance */
  animation: fadeInUp 0.3s ease-out;
}
```

### Medical Data Transitions

**Smooth value changes without distraction:**

```css
.metric-value {
  transition: color 0.3s ease;
}

.metric-value.elevated {
  color: var(--warn-amber);
}

.metric-value.critical {
  color: var(--alert-red);
  animation: pulseAlert 1s ease-in-out 3; /* Pulse 3 times, then stop */
}

@keyframes pulseAlert {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

### Form Validation Feedback

```css
.input-field {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-field:focus {
  border-color: var(--clinical-blue);
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.input-field.error {
  border-color: var(--alert-red);
  animation: shake 0.4s;
}

.input-field.success {
  border-color: var(--medical-green);
}

.validation-message {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Low-Bandwidth Considerations (LGU)

### Minimal JavaScript

**Pure CSS animations** for all common patterns:

```css
/* No JS needed - CSS handles everything */
.menu-toggle:checked ~ .menu {
  animation: slideIn 0.3s ease-out forwards;
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

### Reduced Animation Budget

**For slow devices, simplify:**

```css
/* Development/Testing */
.fancy-animation {
  animation: complexAnimation 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Production (LGU) */
@media (max-width: 768px), (prefers-reduced-motion: reduce) {
  .fancy-animation {
    animation: fadeIn 0.3s ease-out;
  }
}
```

---

## Common Animation Library

**Reusable keyframes:**

```css
/* Entrances */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

/* Exits */
@keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes fadeOutUp { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-30px); } }
@keyframes slideOutLeft { from { transform: translateX(0); } to { transform: translateX(-100%); } }

/* Feedback */
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }

/* Loading */
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes ellipsis { 0% { content: ''; } 25% { content: '.'; } 50% { content: '..'; } 75%, 100% { content: '...'; } }
```

---

## Duration Guidelines

| Animation Type | Duration | Easing | Use Case |
|---------------|----------|--------|----------|
| Micro-interactions | 100-200ms | ease-out | Button press, checkbox toggle |
| Hover states | 200-300ms | ease | Cards, links, interactive elements |
| Transitions | 300-400ms | ease-in-out | Tab switches, page sections |
| Entrances | 400-600ms | cubic-bezier(0.4, 0, 0.2, 1) | Modals, drawers, notifications |
| Complex choreography | 600-1000ms | custom curves | Page load sequences |
| Loading indicators | 1500-2000ms (loop) | ease-in-out | Spinners, progress bars |

**Healthcare Rule**: When in doubt, go faster (reduce by 30%)

---

## Testing Checklist

- [ ] **Works without JavaScript** (progressive enhancement)
- [ ] **Respects prefers-reduced-motion** (accessibility)
- [ ] **Smooth at 60fps** on target devices (performance)
- [ ] **Provides clear feedback** for all actions (usability)
- [ ] **No animation delays** for critical medical info (patient safety)
- [ ] **Purposeful, not decorative** (every animation has a reason)
- [ ] **Tested on low-end devices** (for LGU contexts)
- [ ] **Print styles disable animations** (@media print)

---

## Quick Reference

**Essential Trio:**
1. **Page Load**: fadeInUp, 0.6s, staggered by 0.2s
2. **Hover**: translateY(-2px), 0.2s ease, box-shadow
3. **Modal**: scaleIn, 0.3s cubic-bezier(0.16, 1, 0.3, 1)

**Healthcare Adaptations:**
- Reduce all durations by 30%
- Instant visibility for critical alerts
- Calm, predictable motion (no bounces on medical data)
- Always include prefers-reduced-motion fallbacks

**Performance:**
- Animate only `opacity` and `transform`
- Use `will-change` sparingly
- Test on 30fps devices

---

**Remember**: Motion should enhance, not distract. In healthcare, clarity and speed trump delight.
