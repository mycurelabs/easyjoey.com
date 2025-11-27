# Website Replication Guide: Dentalemon → EasyJoey

## Context for LLM

You are helping replicate a production-ready SaaS landing page from an existing website (Dentalemon - dental practice management software) to create a new website (EasyJoey). The structure, components, animations, and styling should remain identical - only branding and content should change.

---

## Source Reference: Dentalemon Codebase Structure

### Tech Stack
- **Framework**: Next.js 16.0.1 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Animations**: Framer Motion
- **Component Library**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **Theme**: next-themes (light/dark mode)
- **Type Safety**: TypeScript 5

### Project Structure
```
src/
├── app/
│   ├── globals.css          # Theme variables, animations, Tailwind config
│   ├── layout.tsx           # Root layout with metadata, fonts, providers
│   ├── page.tsx             # Home page composing all sections
│   ├── favicon.ico
│   ├── icon.png
│   └── apple-icon.png
├── components/
│   ├── ui/                  # Base UI components (shadcn/ui)
│   │   ├── button.tsx       # Variant-based button (CVA)
│   │   └── card.tsx         # Composable card system
│   ├── magicui/             # Animated components
│   │   ├── shimmer-button.tsx
│   │   ├── animated-shiny-text.tsx
│   │   └── number-ticker.tsx
│   ├── navbar.tsx           # Sticky nav with scroll morph + active section detection
│   ├── hero.tsx             # Hero with CTAs + product screenshot
│   ├── features.tsx         # 6-item feature grid
│   ├── social-proof.tsx     # 3 alternating image/content sections
│   ├── pricing.tsx          # 3-tier pricing cards
│   ├── cta.tsx              # Final call-to-action
│   ├── footer.tsx           # 4-column footer
│   ├── logo.tsx             # Responsive logo component
│   └── theme-provider.tsx   # Theme context wrapper
└── lib/
    └── utils.ts             # cn() utility for className merging

public/
├── logo.png                 # Brand logo
├── [product-screenshot].png # Hero image
└── features/                # Feature section images/videos
```

### Dependencies (package.json)
```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.553.0",
    "next": "16.0.1",
    "next-themes": "^0.4.6",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.0.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## Step-by-Step Replication Process

### Step 1: Create New Next.js Project
```bash
npx create-next-app@latest easyjoey.com --typescript --tailwind --eslint --app --src-dir
cd easyjoey.com
```

### Step 2: Install Dependencies
```bash
npm install framer-motion lucide-react next-themes class-variance-authority clsx tailwind-merge @radix-ui/react-slot
```

### Step 3: Copy Core Files Structure

Copy these directories/files from Dentalemon maintaining structure:
1. `src/components/` - All component files
2. `src/lib/utils.ts` - Utility function
3. `src/app/globals.css` - Theme and styling
4. `components.json` - shadcn/ui config
5. `postcss.config.mjs` - PostCSS config

### Step 4: Update Branding (Files to Modify)

#### 4.1 `src/app/globals.css` - Update Brand Colors
```css
:root {
  --primary: [NEW_PRIMARY_COLOR];      /* e.g., #4F46E5 for indigo */
  --primary-foreground: [CONTRAST];    /* Text color on primary */
  /* Keep all other variables */
}
```

#### 4.2 `src/app/layout.tsx` - Update Metadata
```tsx
export const metadata: Metadata = {
  title: "EasyJoey - [Your Tagline]",
  description: "[Your description]",
}
```

#### 4.3 `src/components/navbar.tsx` - Update Brand Name
- Line with brand name: Change "Dentalemon" to "EasyJoey"
- Update CTA button text if needed

#### 4.4 `src/components/hero.tsx` - Update Content
- Headline (h1)
- Subheadline (p)
- CTA button text
- Product screenshot path

#### 4.5 `src/components/features.tsx` - Update Features
```tsx
const features = [
  { icon: "...", title: "...", description: "..." },
  // Update all 6 features
]
```
- Section title
- Section description

#### 4.6 `src/components/social-proof.tsx` - Update "Why Choose" Section
- Badge text: "Why Choose EasyJoey"
- Section headline
- 3 feature blocks with:
  - Title, description, bullet points
  - Images/videos in public/features/

#### 4.7 `src/components/pricing.tsx` - Update Pricing
```tsx
const plans = [
  { name: "...", price: "...", features: [...] },
  // Update all 3 tiers
]
```

#### 4.8 `src/components/cta.tsx` - Update CTA
- Headline
- Description
- Button text

#### 4.9 `src/components/footer.tsx` - Update Footer
- Brand name and tagline
- Product links
- Company links
- Contact information
- Copyright text

#### 4.10 `public/` - Replace Assets
- `logo.png` - New brand logo
- Hero product screenshot
- `features/` - Feature images/videos
- Favicon and app icons

---

## Design System Reference

### Typography Scale
```
H1 (Hero):    text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight
H2 (Section): text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight
H3 (Card):    text-xl md:text-2xl tracking-tight
Body:         text-base sm:text-lg leading-relaxed
Muted:        text-base text-muted-foreground
```

### Spacing Pattern
```
Section:    py-20 md:py-32
Container:  container px-6 (max-w-7xl mx-auto)
Grid gap:   gap-6
Margins:    mb-6, mb-12
```

### Animation Pattern (Framer Motion)
```tsx
// Standard fade-in from bottom
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  viewport={{ once: true }}
>

// Staggered children
{items.map((item, index) => (
  <motion.div
    transition={{ duration: 0.5, delay: index * 0.1 }}
  />
))}
```

### Interactive States
```
Hover:  hover:scale-105 transition-all duration-300
Active: active:scale-95
Focus:  2px solid ring, 2px offset
```

---

## Content Placeholders to Fill

Before starting, prepare:

1. **Brand Info**
   - [ ] Brand name: EasyJoey
   - [ ] Tagline/slogan
   - [ ] Primary color (hex)
   - [ ] Logo file (PNG, ideally square)

2. **Hero Section**
   - [ ] Main headline (action-oriented, 6-10 words)
   - [ ] Subheadline (1-2 sentences)
   - [ ] Primary CTA text
   - [ ] Secondary CTA text
   - [ ] Product screenshot/mockup

3. **Features (6 items)**
   - [ ] Feature 1: icon, title, description
   - [ ] Feature 2: icon, title, description
   - [ ] Feature 3: icon, title, description
   - [ ] Feature 4: icon, title, description
   - [ ] Feature 5: icon, title, description
   - [ ] Feature 6: icon, title, description

4. **Why Choose Section (3 items)**
   - [ ] Feature 1: title, description, 3 bullets, image
   - [ ] Feature 2: title, description, 3 bullets, image/video
   - [ ] Feature 3: title, description, 3 bullets, image

5. **Pricing (3 tiers)**
   - [ ] Starter: name, price, 5 features
   - [ ] Pro: name, price, 6 features (popular)
   - [ ] Enterprise: name, price, 6 features

6. **CTA Section**
   - [ ] Headline
   - [ ] Description
   - [ ] Button text

7. **Footer**
   - [ ] Company tagline
   - [ ] Contact info (address, phone, email)
   - [ ] Social links (if any)

---

## Quick Start Prompt for New LLM

Copy this prompt to start:

```
I'm creating a new SaaS landing page website called "easyjoey.com" based on an existing template structure. The template uses:

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion for animations
- shadcn/ui components
- TypeScript

The website should have these sections:
1. Navbar (sticky, morphs on scroll, theme toggle)
2. Hero (headline, subheadline, 2 CTAs, product screenshot)
3. Features (6-item grid with icons)
4. Why Choose Us (3 alternating image/content blocks)
5. Pricing (3-tier cards)
6. CTA (final call-to-action)
7. Footer (4-column layout)

Please help me set up this project with [DESCRIBE YOUR PRODUCT/SERVICE] branding and content.

My brand details:
- Name: EasyJoey
- Primary color: [HEX]
- Product: [DESCRIPTION]
- Target audience: [WHO]
```

---

## Notes

- The navbar has advanced features: scroll-aware morphing, intersection observer for active section, mobile drawer
- Social proof section supports both images and MP4 videos (autoplay, muted, loop)
- All animations use Framer Motion with consistent patterns
- Theme system supports light/dark mode via CSS variables
- Focus states are WCAG 2.1 AA compliant
