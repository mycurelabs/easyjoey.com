# Claude Code Skills Catalog

Domain expertise modules that auto-activate based on task context to provide specialized knowledge and guidelines.

## Overview

This directory contains **28 specialized skills** organized into 9 functional categories. Each skill provides domain-specific knowledge, frameworks, templates, and best practices that enhance Claude's capabilities in specific areas.

**Total Skills:** 28
**Categories:** 9
**Last Updated:** 2025-11-26

---

## Quick Reference by Category

| Category | Count | Purpose |
|----------|-------|---------|
| [Documents](#documents-skills) | 3 | Document generation, changelogs, internal communications |
| [Content](#content-skills) | 3 | Content research, marketing posts, video production |
| [Development](#development-skills) | 2 | MCP servers, webapp testing |
| [Organization](#organization-skills) | 2 | File organization, invoice management |
| [Analysis](#analysis-skills) | 4 | Competitive analysis, developer growth, leads, meeting insights |
| [Utilities](#utilities-skills) | 6 | Artifacts, domain names, images, skill creation, sharing, videos |
| [Branding](#branding-skills) | 4 | Brand guidelines, canvas design, image generation, themes |
| [Frontend](#frontend-skills) | 1 | Frontend design with distinctive aesthetics |
| [Healthcare](#healthcare-skills) | 3 | Healthcare UX (general + Philippine), research synthesis |

---

## Documents Skills

**Location:** `_documents/`
**Count:** 3 skills
**Purpose:** Creating various types of documentation

### changelog-generator

**Auto-activates for:** Changelog creation, release notes, version documentation

**Capabilities:**
- Generates user-facing changelogs from git commits
- Categorizes changes (features, fixes, breaking changes)
- Transforms technical commits into customer-friendly language
- Creates version release documentation

**Example:** "Create a changelog for version 2.1.0 based on the last 3 weeks of commits"

---

### document-skills

**Auto-activates for:** General document creation, templates, structured writing

**Capabilities:**
- Provides document templates and structures
- Guides structured writing
- Ensures consistency across documentation
- Supports various document types

**Example:** "Create a technical specification document for the new API"

---

### internal-comms

**Auto-activates for:** Internal company communications, status reports, updates

**Capabilities:**
- Status reports and project updates
- Leadership updates and announcements
- Team newsletters and FAQs
- Incident reports and post-mortems
- Uses company-preferred formats

**Example:** "Write a status report for the MYCURE inventory module development"

---

## Content Skills

**Location:** `_content/`
**Count:** 3 skills
**Purpose:** Content creation for marketing, research, and video

### content-research-writer

**Auto-activates for:** Research-backed content writing, citations, article creation

**Capabilities:**
- Conducts research while writing
- Adds citations and references
- Improves hooks and engagement
- Iterates on outlines
- Provides real-time feedback

**Example:** "Write a blog post about Philippine healthcare digitalization with research citations"

---

### marketing-content-guidelines

**Auto-activates for:** Social media posts, marketing campaigns, brand voice content

**Framework:** **Hook-Body-CTA-Hashtags** structure

**Capabilities:**
- Instagram, LinkedIn, Twitter, Facebook post formatting
- Character count validation per platform
- Content pillar strategy (Educational 30%, Product 25%, Industry 20%, Community 15%, Health 10%)
- Platform-specific hashtag counts
- Brand voice standards (Professional, Confident, Empathetic, Modern)

**Example:** "Create an Instagram post announcing MYCURE's new appointment reminder feature"

**Key Standards:**
- Hook: 10-15 words, <125 characters
- Platform hashtags: Instagram 8-10, LinkedIn 3-5, Twitter 2-3
- Always include #MYCURE #CMS first

---

### video-production-guidelines

**Auto-activates for:** Video scripts, scene breakdowns, production planning

**Framework:** **Apple Keynote Methodology** + **Two-Column AV Script Format**

**Capabilities:**
- Video script writing (demo, tutorial, explainer, testimonial)
- Scene breakdowns with visual-audio harmony
- Production workflows and checklists
- Apple Keynote principles:
  - One message per scene
  - Visual supports audio (doesn't duplicate)
  - 3-second minimum per element
  - Progressive disclosure

**Example:** "Write a 2-minute demo video script for MYCURE's Registration module"

**Timing Formula:** Word count ÷ 2.5 = seconds of narration

---

## Development Skills

**Location:** `_development/`
**Count:** 2 skills
**Purpose:** Development tools and testing frameworks

### mcp-builder

**Auto-activates for:** MCP server creation, Model Context Protocol integration

**Capabilities:**
- Guide for creating high-quality MCP servers
- Python (FastMCP) and Node/TypeScript (MCP SDK) support
- Tool design for LLM interactions
- External service integration patterns

**Example:** "Create an MCP server to integrate with PhilHealth API"

---

### webapp-testing

**Auto-activates for:** Web application testing with Playwright

**Capabilities:**
- Frontend functionality verification
- UI behavior debugging
- Browser screenshot capture
- Browser log analysis
- Local web application interaction

**Example:** "Test the patient registration form for accessibility compliance"

---

## Organization Skills

**Location:** `_organization/`
**Count:** 2 skills
**Purpose:** File and document organization

### file-organizer

**Auto-activates for:** File organization, folder structure, duplicate cleanup

**Capabilities:**
- Intelligently organizes files and folders
- Finds and removes duplicates
- Suggests better file structures
- Automates cleanup tasks
- Reduces cognitive load

**Example:** "Organize my Downloads folder with medical research papers"

---

### invoice-organizer

**Auto-activates for:** Invoice organization, receipt management, tax preparation

**Capabilities:**
- Reads messy invoice/receipt files
- Extracts key information
- Renames consistently (YYYY-MM-DD_Vendor_Amount.pdf)
- Sorts into logical folders
- Prepares for tax filing

**Example:** "Organize 50 PDF invoices from 2024 for tax preparation"

---

## Analysis Skills

**Location:** `_analysis/`
**Count:** 4 skills
**Purpose:** Various analytical tasks

### competitive-ads-extractor

**Auto-activates for:** Competitor ad analysis, ad library research

**Capabilities:**
- Extracts ads from Facebook, LinkedIn ad libraries
- Analyzes competitor messaging and creative
- Identifies what's working in competitor campaigns
- Provides inspiration for own ad campaigns

**Example:** "Analyze competitor clinic management software ads on LinkedIn"

---

### developer-growth-analysis

**Auto-activates for:** Developer skill analysis, growth tracking

**Capabilities:**
- Analyzes Claude Code chat history
- Identifies coding patterns and gaps
- Curates learning resources from HackerNews
- Sends personalized growth reports to Slack
- Tracks development progress

**Example:** "Analyze my last month of coding sessions and suggest areas for improvement"

---

### lead-research-assistant

**Auto-activates for:** Lead generation, prospect research

**Capabilities:**
- Identifies high-quality leads for products/services
- Analyzes business and target companies
- Provides actionable contact strategies
- Supports sales and business development

**Example:** "Find 20 leads for MYCURE in Metro Manila clinics with 50+ daily patients"

---

### meeting-insights-analyzer

**Auto-activates for:** Meeting analysis, communication improvement

**Capabilities:**
- Analyzes meeting transcripts and recordings
- Identifies behavioral patterns
- Detects conflict avoidance, filler words, dominance
- Provides actionable communication feedback
- Improves leadership skills

**Example:** "Analyze this team standup recording and identify areas where I could improve"

---

## Utilities Skills

**Location:** `_utilities/`
**Count:** 6 skills
**Purpose:** General-purpose utility tools

### artifacts-builder

**Auto-activates for:** Complex claude.ai HTML artifacts

**Capabilities:**
- Creates multi-component artifacts
- Uses React, Tailwind CSS, shadcn/ui
- Handles state management and routing
- For complex artifacts requiring advanced features

**Example:** "Build an interactive patient data dashboard artifact"

---

### domain-name-brainstormer

**Auto-activates for:** Domain name ideation, availability checking

**Capabilities:**
- Generates creative domain name ideas
- Checks availability across TLDs (.com, .io, .dev, .ai, etc.)
- Saves hours of brainstorming
- Considers brand alignment

**Example:** "Generate domain names for a clinic management platform targeting rural Philippines"

---

### image-enhancer

**Auto-activates for:** Image quality improvement, screenshot enhancement

**Capabilities:**
- Improves image resolution and sharpness
- Enhances clarity for documentation
- Prepares images for presentations
- Optimizes for social media posts

**Example:** "Enhance this screenshot of the MYCURE dashboard for the landing page"

---

### skill-creator

**Auto-activates for:** Creating or updating Claude skills

**Capabilities:**
- Guide for creating effective skills
- Extends Claude with specialized knowledge
- Workflow and tool integration
- Skill structure best practices

**Example:** "Help me create a skill for Philippine tax compliance"

---

### skill-share

**Auto-activates for:** Sharing skills with team on Slack

**Capabilities:**
- Creates new Claude skills
- Automatically shares on Slack using Rube
- Enables team collaboration
- Facilitates skill discovery

**Example:** "Share the MYCURE healthcare UX skill with the team on Slack"

---

### video-downloader

**Auto-activates for:** Downloading videos from YouTube and platforms

**Capabilities:**
- Downloads videos for offline viewing
- Handles various formats and quality options
- Supports editing and archival
- Multiple platform support

**Example:** "Download this YouTube tutorial on Drizzle ORM for offline reference"

---

## Branding Skills

**Location:** `_branding/`
**Count:** 4 skills
**Purpose:** Brand identity, visual design, theming

### brand-guidelines

**Auto-activates for:** Anthropic brand application, official colors/typography

**Capabilities:**
- Applies Anthropic official brand colors
- Uses Anthropic typography standards
- Ensures visual formatting consistency
- Maintains company design standards

**Example:** "Apply Anthropic branding to this slide deck"

---

### canvas-design

**Auto-activates for:** Static visual art, posters, designs

**Capabilities:**
- Creates beautiful visual art (PNG, PDF)
- Uses design philosophy principles
- Original designs (no copyright violations)
- Posters, art, static pieces

**Example:** "Design a poster for World Health Day promoting MYCURE"

---

### gemini-imagegen

**Auto-activates for:** Image generation and editing via Gemini API

**Capabilities:**
- Text-to-image generation
- Image editing and style transfer
- Logo creation with text
- Stickers and product mockups
- Multi-turn refinement

**Example:** "Generate a modern logo for MYCURE with a medical cross and Philippine flag colors"

---

### theme-factory

**Auto-activates for:** Styling artifacts with themes

**Capabilities:**
- 10 pre-set themes with colors/fonts
- Applies to slides, docs, reports, HTML landing pages
- Generates new themes on-the-fly
- Consistent visual identity

**Example:** "Apply a professional healthcare theme to this landing page artifact"

---

## Frontend Skills

**Location:** `_frontend/`
**Count:** 1 skill
**Purpose:** Frontend design with distinctive aesthetics

### frontend-design

**Auto-activates for:** UI design, landing pages, dashboards, patient portals, forms

**Capabilities:**
- Creates distinctive, production-grade interfaces
- **Avoids generic "AI slop":**
  - ❌ Never: Inter, Roboto, Arial, Helvetica fonts
  - ❌ Never: Purple gradients, generic layouts
  - ✅ Prefer: JetBrains Mono, IBM Plex, Space Grotesk, distinctive fonts
- **Typography:** Purpose-driven font selection, scale systems, WCAG contrast
- **Color Systems:** CSS variables, narrative-driven palettes, MYCURE Clinical & Gov palettes
- **Animation:** CSS-first, purposeful motion, reduced motion support
- **Healthcare Adaptations:** Clinical trust colors, calm animations, WCAG AAA compliance

**Example:** "Design a patient portal dashboard for MYCURE with distinctive typography"

**MYCURE Palettes:**
```css
/* Clinical Trust */
--clinical-blue: #0066CC;
--trust-navy: #003366;
--medical-green: #00A86B;

/* Government Professional */
--manila-blue: #003DA5;
--official-gold: #FCD116;
```

---

## Healthcare Skills

**Location:** `_healthcare/`
**Count:** 3 skills
**Purpose:** Healthcare-specific UX and research standards

### healthcare-ux-standards (NEW)

**Auto-activates for:** General healthcare apps (HIS, EMR, patient portals, telehealth) with US/International focus

**Framework:** **WCAG 2.2 Level AA** + **US/International Regulatory Compliance**

**Capabilities:**
- WCAG 2.2 Level AA compliance (including 9 new 2.2 criteria)
- US Regulatory Framework:
  - HHS Section 504 Final Rule (May 2024) - Deadlines: May 2026/2027
  - ADA Title III requirements
  - Section 508 for federal healthcare
  - 21st Century Cures Act patient portal access
  - **HIPAA clarification**: Does NOT require accessibility (common misconception)
- International Standards:
  - EN 301 549 (EU)
  - NHS Digital Service Standard (UK - WCAG 2.2 AA)
  - Australian Digital Health Agency
  - ISO 62366 (medical device usability)
- Healthcare Application Types:
  - Hospital Information Systems (HIS)
  - Electronic Medical Records (EMR/EHR)
  - Patient Portals, Telehealth Platforms
  - Medical Kiosks
- Mobile & AI Accessibility:
  - iOS (VoiceOver) and Android (TalkBack)
  - Healthcare chatbot accessibility
  - HL7 FHIR patient access

**Key WCAG 2.2 Additions:**
- 3.3.8 Accessible Authentication - password managers, biometrics
- 3.3.7 Redundant Entry - auto-populate patient data
- 2.5.8 Target Size Minimum - 24x24px touch targets

**Example:** "Review this EMR interface for WCAG 2.2 compliance and HHS Section 504 requirements"

---

### healthcare-ux-guidelines (Philippine Context)

**Auto-activates for:** Philippine healthcare apps, MYCURE development, LGU health systems

**Framework:** **WCAG 2.2 Level AA** + **Patient Safety Language** + **Philippine Healthcare Context**

**Capabilities:**
- WCAG 2.2 Level AA compliance (mandatory minimum)
- Patient safety language for error messages
- Philippine LGU healthcare context (FHISIS, PhilHealth, RHU, BHS)
- Offline-first for rural deployment
- Low-bandwidth optimization
- Accessibility requirements:
  - Color contrast ratios
  - Keyboard navigation
  - Screen reader support
  - Focus indicators
  - Error identification

**Patient Safety Language:**
| ❌ Never Use | ✅ Use Instead |
|-------------|---------------|
| Error, Failed | Unable to process, Not completed |
| Invalid, Illegal | Please check, Please verify |
| Denied, Rejected | Unable to access, Needs review |
| Fatal, Critical (non-safety) | Please contact support |

**Example:** "Review this patient registration form for WCAG compliance and patient safety language"

---

### research-synthesis-guidelines

**Auto-activates for:** Research documentation, evidence grading, healthcare analysis

**Framework:** **HIGH/MEDIUM/LOW Confidence Grading** + **Triangulation Methodology**

**Capabilities:**
- **Confidence Grading:**
  - **HIGH:** 3+ sources, primary research, recent (2yrs), PH-specific, consistent
  - **MEDIUM:** 1-2 sources, some gaps in quality/recency
  - **LOW:** Single source, outdated, assumptions, contradictory
- **Triangulation:** Multi-source validation (data, method, context)
- **Citation Standards:** Rigorous sourcing for credibility
- **Philippine Healthcare Context:** LGU, RHU, BHS, FHISIS, PhilHealth
- **Research Report Templates**

**Example:** "Synthesize user research findings on clinic inventory management with confidence grading"

**Research Template:**
```markdown
## Finding: [Title] [HIGH/MEDIUM/LOW CONFIDENCE]

**Evidence:**
1. **[Source type]** - [Citation with date and specific data]
2. **[Source type]** - [Citation]
3. **[Source type]** - [Citation]

**Triangulation:** [How sources validate finding]

**Implications:** [What this means for MYCURE]
```

---

## Skill Selection Guide

### "I need to..."

**...write social media posts** → `marketing-content-guidelines`
**...create video scripts** → `video-production-guidelines`
**...generate changelogs** → `changelog-generator`
**...design frontend interfaces** → `frontend-design`
**...ensure healthcare accessibility (US/International)** → `healthcare-ux-standards`
**...ensure healthcare accessibility (Philippine)** → `healthcare-ux-guidelines`
**...document research findings** → `research-synthesis-guidelines`
**...organize files** → `file-organizer`, `invoice-organizer`
**...analyze competitors** → `competitive-ads-extractor`
**...find leads** → `lead-research-assistant`
**...create visual designs** → `canvas-design`, `gemini-imagegen`
**...build MCP servers** → `mcp-builder`
**...test web apps** → `webapp-testing`

---

## Auto-Activation System

### How Skills Auto-Activate

Skills automatically activate when Claude detects relevant keywords or task patterns in the conversation. Each skill's `description` field contains activation triggers.

**Example:**
- User: "Create an Instagram post about our new feature"
- Triggers: "Instagram post" → `marketing-content-guidelines` auto-activates

### Activation Modes

**1. Suggest Mode (Recommended)**
- Shows skill suggestions without auto-loading
- User approves before full activation
- 90% token savings
- Better control

**2. Auto-Load Mode**
- Skills load automatically when detected
- Fastest workflow
- Higher token usage
- Less control

**Configuration:** Set in `.claude/config/settings.json` (see config section below)

---

## Healthcare Skills Deep Dive

### Why Healthcare Needs Specialized Skills

**Patient Safety:**
- Error messages visible to patients must not cause alarm
- "Error: Fatal failure" → Patient panic
- "Unable to process request" → Professional, calm

**Regulatory Compliance (US/International):**
- HHS Section 504 Final Rule (May 2024) - Deadlines: May 2026/2027
- ADA Title III for private healthcare providers
- EN 301 549 for EU healthcare
- NHS Digital requires WCAG 2.2 AA

**Regulatory Compliance (Philippine):**
- WCAG 2.2 Level AA is legal requirement (not optional)
- Philippine DOH standards (FHISIS reporting)
- PhilHealth integration requirements

**Context Sensitivity:**
- Urban private clinics ≠ Rural LGU health centers
- Connectivity varies (99% uptime vs <50% uptime)
- Staff literacy ranges widely

### Skill Selection: healthcare-ux-standards vs healthcare-ux-guidelines

| Use Case | Skill |
|----------|-------|
| General HIS, EMR, patient portals | `healthcare-ux-standards` |
| US/International market focus | `healthcare-ux-standards` |
| HHS Section 504, ADA, EN 301 549 compliance | `healthcare-ux-standards` |
| Philippine healthcare context | `healthcare-ux-guidelines` |
| MYCURE product development | `healthcare-ux-guidelines` |
| LGU, RHU, BHS, FHSIS systems | `healthcare-ux-guidelines` |
| Offline-first requirements | `healthcare-ux-guidelines` |

### MYCURE Product Context

The Philippine healthcare skill (`healthcare-ux-guidelines`) and `research-synthesis-guidelines` include Philippine healthcare context:

**Philippine LGU Health Structure:**
- Provincial Health Office (PHO)
- City/Municipal Health Office (CHO/MHO)
- Rural Health Units (RHUs)
- Barangay Health Stations (BHS)

**Systems Integration:**
- FHISIS (Field Health Service Information System) - DOH reporting
- PhilHealth - National health insurance claims
- LGU reporting requirements

**Environmental Factors:**
- Connectivity: Urban 90%+ vs Rural 30-50%
- Resources: Private well-funded vs Public budget-constrained
- Languages: English/Filipino (NCR) vs Regional languages (provinces)

---

## Frontend Design Philosophy

### Avoiding "AI Slop"

The `frontend-design` skill was created based on Anthropic's blog post on improving frontend design. Key principles:

**1. Distinctive Typography**
- Never use: Inter, Roboto, Arial, Helvetica (overused, generic)
- Prefer: Space Grotesk, JetBrains Mono, IBM Plex, DM Sans
- Purpose-driven selection (not just "looks good")

**2. Narrative-Driven Colors**
- Avoid: Purple gradients (#8B5CF6), teal accents (#14B8A6)
- Use: Colors with meaning tied to product/brand
- MYCURE: Clinical trust blues, medical greens, government professional blues

**3. Purposeful Animation**
- CSS-first (not JavaScript heavy)
- Calm, professional (not flashy)
- Healthcare-appropriate (reduced motion support)
- Performance-optimized

**4. Unique Layouts**
- Avoid: Center-aligned hero sections with gradients
- Use: Asymmetric layouts, unexpected grid patterns
- Healthcare: Information hierarchy emphasizes safety, clarity

---

## Content Strategy Framework

### Marketing Content Pillars

From `marketing-content-guidelines`:

1. **Educational (30%)** - Tips, best practices, how-tos
2. **Product Value (25%)** - MYCURE features, benefits, updates
3. **Industry Leadership (20%)** - Trends, insights, analysis
4. **Community Building (15%)** - Stories, testimonials, engagement
5. **Health Awareness (10%)** - Public health, wellness

**Balance rationale:** Provides value first (education + industry leadership = 50%), then promotes product, builds community, and contributes to public health.

### Video Production Principles

From `video-production-guidelines`:

**Apple Keynote Methodology:**
1. **One Message Per Scene** - Single idea = clarity + retention
2. **Visual Supports Audio** - Complementary, not redundant
3. **3-Second Rule** - Minimum time for visual processing
4. **Progressive Disclosure** - Tease → Problem → Solution → Demo → Benefit → CTA

---

## Research Evidence Standards

### Confidence Grading Rationale

From `research-synthesis-guidelines`:

**Why 3+ sources for HIGH confidence?**
- Single source can be biased, incomplete, or outlier
- Two sources can coincidentally agree
- Three+ sources indicate consensus, especially if diverse types

**Why Philippine-specific required?**
- Healthcare varies dramatically by country
- US/EU data doesn't translate to Philippine LGU context
- Connectivity, resources, literacy, regulations all differ

**Why recent data (2 years)?**
- Healthcare technology evolves rapidly
- COVID-19 changed healthcare workflows significantly
- Philippine government systems (FHISIS, PhilHealth) update regularly

---

## Skill Development Best Practices

### Creating New Skills

Use the `skill-creator` skill for guidance. Key principles:

1. **Clear Activation Triggers** - Define keywords/contexts in description
2. **Comprehensive Documentation** - Examples, templates, checklists
3. **Reference Files** - Separate detailed guides from main SKILL.md
4. **MYCURE Context** - Include Philippine healthcare considerations when relevant
5. **Auto-Activation** - Test triggers work correctly

### Skill Structure

```
skill-name/
├── SKILL.md (main documentation with YAML frontmatter)
├── reference/ (detailed guides)
│   ├── guide-1.md
│   └── guide-2.md
└── examples/ (if applicable)
    ├── example-1.md
    └── example-2.md
```

---

## Multi-Skill Workflows

### Content Production Workflow

1. `content-research-writer` → Research and draft article
2. `marketing-content-guidelines` → Create social media posts promoting article
3. `video-production-guidelines` → Create video script summarizing article
4. `brand-guidelines` → Ensure all content follows brand standards

---

### Healthcare Product Development Workflow

1. `research-synthesis-guidelines` → Synthesize user research findings
2. `frontend-design` → Design UI mockups with distinctive aesthetics
3. `healthcare-ux-guidelines` → Validate WCAG compliance and patient safety language
4. `video-production-guidelines` → Create demo video
5. `marketing-content-guidelines` → Launch social media campaign

---

## Configuration

### Auto-Activation Settings

Recommended configuration in `.claude/config/settings.json`:

```json
{
  "skills": {
    "mode": "suggest",
    "autoActivation": {
      "_healthcare/*": "auto",
      "_frontend/*": "suggest",
      "_content/*": "suggest",
      "*": "manual"
    }
  }
}
```

**Explanation:**
- **suggest mode**: 90% token savings, user approval required
- **auto**: Always load (use for critical skills like healthcare compliance)
- **suggest**: Show suggestion, user approves
- **manual**: Never auto-activate

---

## Maintenance

### Adding New Skills

1. Create skill in appropriate `_category/` subdirectory
2. Include YAML frontmatter:
   ```yaml
   ---
   name: skill-name
   description: When to use and auto-activation triggers
   ---
   ```
3. Add comprehensive documentation
4. Update this README.md catalog
5. Test auto-activation triggers

### Updating Existing Skills

Skills evolve based on:
- User feedback and usage patterns
- MYCURE product updates
- Philippine healthcare regulation changes
- TOPSI Inc. standards evolution
- Framework/technology updates

---

## Related Documentation

- [Agents Catalog](../agents/README.md) - Task automation agents
- [Templates](../templates/README.md) - Product and design templates
- [Frontend Design Examples](\_frontend/frontend-design/examples/) - Healthcare UI examples
- [Healthcare UX Reference](_healthcare/healthcare-ux-guidelines/reference/) - WCAG compliance checklists

---

**Remember:** Skills provide domain expertise. They auto-activate to enhance your workflow, provide standards, and ensure consistency across TOPSI Inc. products like MYCURE.
