# LLM Prompt: Sticky Scroll Features Section

Use the following prompt to recreate the "Built for healthcare excellence" section for your solo practitioner clinic management system.

---

## PROMPT START

Create a **Sticky Scroll Features Section** for a landing page. This section showcases product features using a scroll-based progressive reveal animation pattern.

### Section Structure

**Layout**: Two-column grid on desktop
- **Left Column**: Sticky header content (stays visible while scrolling)
- **Right Column**: 4 feature cards that animate in progressively as user scrolls

### Required Dependencies

```bash
npm install @bsmnt/scrollytelling framer-motion lucide-react
```

### Required Components

#### 1. AnimatedShinyText Component

Create `components/magicui/animated-shiny-text.tsx`:

```tsx
import { ComponentPropsWithoutRef, CSSProperties, FC } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={{ "--shiny-width": `${shimmerWidth}px` } as CSSProperties}
      className={cn(
        "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
```

#### 2. Add Tailwind Animation

Add to `tailwind.config.js` under `extend.animation`:

```js
animation: {
  "shiny-text": "shiny-text 8s infinite",
},
keyframes: {
  "shiny-text": {
    "0%, 90%, 100%": { "background-position": "calc(-100% - var(--shiny-width)) 0" },
    "30%, 60%": { "background-position": "calc(100% + var(--shiny-width)) 0" },
  },
},
```

### Section Code Pattern

```tsx
import { Scrollytelling } from "@bsmnt/scrollytelling";
import { motion } from "framer-motion";
import { Calendar, Zap, Video, WifiOff } from "lucide-react"; // Choose relevant icons
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";

// Feature data structure - CUSTOMIZE THIS FOR YOUR PRODUCT
const features = [
  {
    icon: Calendar,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    titleColor: "text-primary",
    gradientFrom: "from-primary/5",
    gradientTo: "to-primary/10",
    borderColor: "border-primary/20",
    badgeBg: "bg-primary/30 dark:bg-primary/60",
    badgeBorder: "border-primary/40 dark:border-primary/70",
    badgeTextColor: "!text-[#004d66] dark:!text-white",
    title: "Your Clinical Command Center",
    subtitle: "Powerful dashboard control",
    description: "Take control of every patient interaction from one powerful dashboard...",
    cardTitle: "Dr. Smith - Cardiology",
    cardSubtitle: "Today 2:30 PM",
    badgeText: "Confirmed",
    animationStart: 0,
    animationEnd: 30,
    waypointAt: 25,
  },
  {
    icon: Zap,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    titleColor: "text-purple-600",
    gradientFrom: "from-purple-500/5",
    gradientTo: "to-purple-500/10",
    borderColor: "border-purple-500/20",
    badgeBg: "bg-purple-500/30 dark:bg-purple-500/60",
    badgeBorder: "border-purple-500/40 dark:border-purple-500/70",
    badgeTextColor: "!text-purple-600 dark:!text-purple-200",
    title: "Operations That Actually Work",
    subtitle: "Intelligent automation",
    description: "See your entire practice come alive with intelligent automation...",
    cardTitle: "Patient Records",
    cardSubtitle: "2,847 active files",
    badgeText: "HIPAA Compliant",
    animationStart: 20,
    animationEnd: 50,
    waypointAt: 50,
  },
  // Add 2 more features with orange and green color schemes
];

// Section JSX
<Scrollytelling.Root start="top bottom" end="bottom top" scrub={true}>
  <section className="w-full py-8 sm:py-12 md:py-16 mb-16 sm:mb-20 md:mb-32 relative">
    <div className="container px-4 sm:px-6 md:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* Sticky Left Content */}
        <div className="lg:sticky lg:top-32 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="rounded-full px-3 py-1 bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 inline-flex items-center justify-center h-8 w-fit">
              <AnimatedShinyText className="text-xs font-medium !mx-0 !max-w-none !text-[#004d66] dark:!text-white !bg-gradient-to-r !from-transparent !via-[#004d66]/80 dark:!via-white/80 !via-50% !to-transparent !leading-none" shimmerWidth={140}>
                {/* YOUR BADGE TEXT */}
                Solo Practice Excellence
              </AnimatedShinyText>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mt-4">
              Built for solo
              <br />practitioners
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-lg">
              Solo practitioners deserve technology that matches their dedication.
              Our platform combines powerful features with simplicity, so you can
              focus on patient care while we handle the rest.
            </p>
          </motion.div>
        </div>

        {/* Progressive Feature Reveals */}
        <div className="space-y-40">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <Scrollytelling.Animation
                tween={{
                  start: feature.animationStart,
                  end: feature.animationEnd,
                  from: { opacity: 0, y: 60, scale: 0.9 }
                }}
              >
                <div className="space-y-6">
                  {/* Feature Header */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${feature.iconBg} rounded-2xl flex items-center justify-center`}>
                      <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-bold ${feature.titleColor}`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">{feature.subtitle}</p>
                    </div>
                  </div>

                  {/* Feature Description */}
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature Card */}
                  <div className={`bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} rounded-2xl p-6 ${feature.borderColor} border`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${feature.iconBg.replace('/10', '')} rounded-full flex items-center justify-center`}>
                            <feature.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">{feature.cardTitle}</div>
                            <div className="text-xs text-muted-foreground">{feature.cardSubtitle}</div>
                          </div>
                        </div>
                        <div className={`text-xs ${feature.badgeBg} border ${feature.badgeBorder} rounded-full px-3 py-1 inline-flex items-center justify-center h-7 min-w-fit`}>
                          <AnimatedShinyText className={`!mx-0 !max-w-none ${feature.badgeTextColor} !bg-gradient-to-r !from-transparent !via-current !via-50% !to-transparent !leading-none !flex !items-center`} shimmerWidth={120}>
                            {feature.badgeText}
                          </AnimatedShinyText>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Scrollytelling.Animation>
              <Scrollytelling.Waypoint at={feature.waypointAt} label={`feature-${index + 1}`} />
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  </section>
</Scrollytelling.Root>
```

### Color Scheme Pattern (4 Features)

1. **Feature 1**: Primary/Brand color (blue/teal)
2. **Feature 2**: Purple (`purple-500`, `purple-600`)
3. **Feature 3**: Orange (`orange-500`, `orange-600`)
4. **Feature 4**: Green (`green-500`, `green-600`)

### Key Design Patterns

1. **Scroll Animation**: Features fade in with `opacity: 0 → 1`, `y: 60 → 0`, `scale: 0.9 → 1`
2. **Staggered Timing**: Each feature starts animating at different scroll positions (0%, 20%, 35%, 45%)
3. **Waypoints**: Mark scroll positions at 25%, 50%, 75%, 100%
4. **Sticky Header**: Left column stays fixed at `top-32` while right column scrolls
5. **Spacing**: `space-y-40` between features creates scroll room for animations

### Customization Points

- Badge text and shimmer effect
- Main heading (2-line format with line break)
- Description paragraph
- 4 feature cards with unique colors
- Icons from lucide-react
- Card content (title, subtitle, badge)

---

## PROMPT END

Copy everything between "PROMPT START" and "PROMPT END" to use with another LLM.
