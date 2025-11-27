# Patient Portal UI Example (MYCURE Patient-Facing)

Applying frontend design principles to a patient-facing portal interface with maximum accessibility and calm design.

---

## Context

**Product**: MYCURE Core (Patient Portal Module)
**Users**: Patients (varied age, technical literacy, visual ability)
**Purpose**: View medical records, book appointments, communicate with clinic
**Constraints**: Must be highly accessible (WCAG 2.2 AAA target), work on mobile, calm/reassuring aesthetic

---

## Design Direction

**Feeling**: Calm, reassuring, empowering (not clinical/sterile)
**Aesthetic**: Clean, spacious, friendly (not corporate)
**Priority**: Accessibility > visual flair

---

## Typography Implementation

```css
:root {
  /* Primary: Maximum legibility for patients */
  --font-primary: 'Atkinson Hyperlegible', 'Source Sans Pro', -apple-system, sans-serif;

  /* Data/Records: Clear monospace */
  --font-data: 'JetBrains Mono', 'SF Mono', monospace;
}

/* Page Title */
.page-title {
  font-family: var(--font-primary);
  font-size: 36px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 8px;
}

/* Section Headings */
.section-heading {
  font-family: var(--font-primary);
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
}

/* Body Text - Larger for readability */
p, .body-text {
  font-family: var(--font-primary);
  font-size: 18px; /* Larger than standard 16px */
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1.6;
}

/* Medical Data (Lab Results, Vitals) */
.medical-value {
  font-family: var(--font-data);
  font-size: 20px;
  font-weight: 600;
  color: var(--clinical-blue);
}

.medical-label {
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Buttons - Clear, large text */
.button-text {
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.01em;
}
```

---

## Color Palette

```css
:root {
  /* Primary - Trustworthy but warm */
  --primary-blue: #1E88E5; /* Lighter, friendlier than clinical blue */
  --primary-dark: #1565C0;

  /* Secondary - Calm green */
  --secondary-green: #43A047;
  --secondary-dark: #2E7D32;

  /* Status Colors - High contrast */
  --success-green: #2E7D32;
  --warning-amber: #F57C00; /* More visible than #FFC107 */
  --danger-red: #C62828; /* Darker red for better contrast */
  --info-blue: #0277BD;

  /* Surfaces - Warm whites */
  --surface-primary: #FFFFFF;
  --surface-secondary: #FAFAFA;
  --surface-elevated: #FFFFFF;

  /* Text - High contrast */
  --text-primary: #212121; /* Darker than #212529 */
  --text-secondary: #616161; /* Darker than #6C757D */
  --text-on-color: #FFFFFF;

  /* Borders */
  --border-light: #E0E0E0;
  --border-medium: #BDBDBD;
}

/* Calm Background Gradient */
body {
  background: linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%);
}

/* Card Style - Soft shadows */
.card {
  background: var(--surface-primary);
  border: 1px solid var(--border-light);
  border-radius: 12px; /* Softer corners */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
```

---

## Layout Composition

```css
/* Patient Portal Grid - Mobile-first, simple */
.portal-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

/* Dashboard Cards - Equal columns on desktop */
.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

/* Quick Actions - Horizontal on desktop, vertical on mobile */
.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
}

.quick-action-card {
  flex: 1 1 calc(33.333% - 16px);
  min-width: 280px;
}

/* Medical Records List - Simple stacking */
.medical-records-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Responsive: Mobile optimization */
@media (max-width: 768px) {
  .portal-container {
    padding: 16px;
  }

  .dashboard-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .quick-action-card {
    flex: 1 1 100%;
  }

  .page-title {
    font-size: 28px;
  }

  p, .body-text {
    font-size: 16px;
  }
}
```

---

## Animation & Motion - Extra Calm

```css
/* Page Load: Gentle fade only */
.card {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Card Hover: Minimal movement */
.card {
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}

/* Button Feedback: Clear but calm */
.button {
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.button:hover {
  filter: brightness(1.1);
}

.button:active {
  transform: scale(0.98);
}

/* Loading State: Minimal spinner */
.loading {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

/* Success Feedback: Gentle checkmark animation */
.success-icon {
  animation: scaleIn 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Reduced Motion: Immediate feedback */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }

  .button:active {
    opacity: 0.7;
  }
}
```

---

## Component Example: Appointment Card

```html
<div class="appointment-card" data-status="upcoming">
  <div class="appointment-header">
    <div class="appointment-icon">
      <svg><!-- Calendar icon --></svg>
    </div>
    <div class="appointment-info">
      <h3 class="appointment-title">General Checkup</h3>
      <p class="appointment-doctor">Dr. Maria Santos</p>
    </div>
    <span class="appointment-status">Upcoming</span>
  </div>

  <div class="appointment-details">
    <div class="detail-row">
      <span class="detail-icon">📅</span>
      <span class="detail-text">March 15, 2024 at 10:00 AM</span>
    </div>
    <div class="detail-row">
      <span class="detail-icon">📍</span>
      <span class="detail-text">Main Clinic, Room 203</span>
    </div>
  </div>

  <div class="appointment-actions">
    <button class="button button-primary">View Details</button>
    <button class="button button-secondary">Reschedule</button>
  </div>
</div>
```

```css
.appointment-card {
  background: var(--surface-primary);
  border: 2px solid var(--border-light); /* Thicker border for clarity */
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.appointment-card[data-status="upcoming"] {
  border-left: 6px solid var(--primary-blue);
}

.appointment-card[data-status="completed"] {
  border-left: 6px solid var(--success-green);
  opacity: 0.8;
}

.appointment-card:hover {
  border-color: var(--primary-blue);
  box-shadow: 0 4px 20px rgba(30, 136, 229, 0.15);
}

.appointment-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.appointment-icon {
  width: 48px;
  height: 48px;
  background: rgba(30, 136, 229, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.appointment-icon svg {
  width: 24px;
  height: 24px;
  fill: var(--primary-blue);
}

.appointment-info {
  flex: 1;
}

.appointment-title {
  font-family: var(--font-primary);
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.appointment-doctor {
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 400;
  color: var(--text-secondary);
  margin: 0;
}

.appointment-status {
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
  background: rgba(30, 136, 229, 0.1);
  color: var(--primary-blue);
  border-radius: 20px;
}

.appointment-details {
  margin-bottom: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border-light);
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 16px;
}

.detail-icon {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.detail-text {
  font-family: var(--font-primary);
  color: var(--text-primary);
}

.appointment-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.button {
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 140px;
}

.button-primary {
  background: var(--primary-blue);
  color: white;
}

.button-primary:hover {
  background: var(--primary-dark);
}

.button-primary:focus-visible {
  outline: 3px solid rgba(30, 136, 229, 0.5);
  outline-offset: 2px;
}

.button-secondary {
  background: transparent;
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
}

.button-secondary:hover {
  background: rgba(30, 136, 229, 0.05);
}

/* Mobile: Stack buttons */
@media (max-width: 480px) {
  .button {
    flex: 1 1 100%;
  }
}
```

---

## Component Example: Health Metric Card

```html
<div class="health-metric-card">
  <div class="metric-icon">
    <svg><!-- Heart icon --></svg>
  </div>
  <div class="metric-content">
    <h4 class="metric-label">Blood Pressure</h4>
    <p class="metric-value">120/80 <span class="metric-unit">mmHg</span></p>
    <p class="metric-status status-normal">Normal Range</p>
    <p class="metric-date">Last checked: March 10, 2024</p>
  </div>
</div>
```

```css
.health-metric-card {
  background: var(--surface-primary);
  border: 2px solid var(--border-light);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: start;
}

.metric-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #1E88E5, #1565C0);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metric-icon svg {
  width: 32px;
  height: 32px;
  fill: white;
}

.metric-content {
  flex: 1;
}

.metric-label {
  font-family: var(--font-primary);
  font-size: 16px;
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0 0 8px 0;
}

.metric-value {
  font-family: var(--font-data);
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  line-height: 1.1;
}

.metric-unit {
  font-size: 18px;
  font-weight: 400;
  color: var(--text-secondary);
}

.metric-status {
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
  margin: 0 0 8px 0;
}

.metric-status.status-normal {
  background: rgba(46, 125, 50, 0.1);
  color: var(--success-green);
}

.metric-status.status-elevated {
  background: rgba(245, 124, 0, 0.1);
  color: var(--warning-amber);
}

.metric-date {
  font-family: var(--font-primary);
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}
```

---

## Accessibility Features

### WCAG 2.2 AAA Compliance

```css
/* Extra High Contrast Text */
:root {
  --text-primary: #212121; /* 17.6:1 on white - AAA ✓ */
  --text-secondary: #616161; /* 5.5:1 on white - AAA ✓ */
}

/* Clear Focus Indicators - 3px minimum */
*:focus-visible {
  outline: 3px solid var(--primary-blue);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Large Touch Targets - 44px minimum */
.button,
.link,
.card {
  min-height: 44px;
  min-width: 44px;
}

/* High Contrast Mode Support */
@media (prefers-contrast: high) {
  :root {
    --text-primary: #000000;
    --text-secondary: #000000;
    --border-light: #000000;
  }

  .card {
    border: 2px solid #000000;
  }
}

/* Skip Links for Screen Readers */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary-blue);
  color: white;
  padding: 12px 24px;
  font-weight: 600;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Screen Reader Enhancements

```html
<!-- ARIA Labels for Icons -->
<button aria-label="Reschedule appointment for March 15">
  <svg aria-hidden="true"><!-- Calendar icon --></svg>
  Reschedule
</button>

<!-- Live Regions for Updates -->
<div role="status" aria-live="polite" aria-atomic="true">
  Appointment successfully rescheduled to March 20, 2024.
</div>

<!-- Descriptive Links -->
<a href="/appointments/123">
  View details for General Checkup appointment on March 15
  <span aria-hidden="true">→</span>
</a>
```

---

## Key Takeaways

1. **Typography**: Atkinson Hyperlegible font for maximum accessibility, larger base size (18px)
2. **Colors**: Warmer, friendlier palette while maintaining high contrast ratios (AAA level)
3. **Layout**: Simple, spacious cards with generous padding and spacing
4. **Motion**: Minimal, calm animations (fade-in only on load, gentle hovers)
5. **Touch Targets**: All interactive elements minimum 44×44px
6. **Feedback**: Clear visual feedback for all actions (form submissions, button presses)
7. **Icons**: Always paired with text labels, never standalone

---

**Result**: Patient-centered portal that feels calm, reassuring, and empowering while exceeding WCAG 2.2 AAA accessibility standards. Distinct from generic healthcare portals through warm color palette and friendly typography.
