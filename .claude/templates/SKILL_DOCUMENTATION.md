# How to Write Effective Claude Skills

**Purpose:** This guide teaches you how to create high-quality Claude skills that extend Claude's capabilities with specialized domain knowledge, workflows, and best practices.

**Target Audience:** Developers, designers, researchers, and team leads who want to codify their expertise into reusable Claude skills.

---

## What is a Claude Skill?

A **Claude skill** is a structured knowledge package that teaches Claude Code how to perform domain-specific tasks with expertise. Skills are stored in the `.claude/skills/` directory and auto-activate based on user requests.

### Skills vs Commands vs Agents

| Type | Purpose | When to Use | Example |
|------|---------|-------------|---------|
| **Skill** | Domain knowledge, standards, best practices | Teaching Claude how to do something correctly | `healthcare-ux-guidelines`, `frontend-design` |
| **Command** | Workflow shortcut, quick action | One-off tasks with specific prompts | `/review-code`, `/audit-wcag` |
| **Agent** | Complex multi-step task executor | Long-running tasks requiring planning | `code-architecture-reviewer`, `research-analyst` |

**Use a skill when:**
- You have domain expertise to codify (design standards, research methodology, compliance requirements)
- Multiple people need to apply the same standards consistently
- You want Claude to automatically apply best practices without being asked

**Don't use a skill when:**
- It's a one-time task → Use a command instead
- It requires complex multi-step execution → Use an agent instead
- It's simple enough to explain in a user message → Just explain it directly

---

## Skill Activation Modes

Skills have 3 activation modes:

### 1. AUTO Mode (Automatic Activation)

**When to use:**
- Core domain standards that should ALWAYS be applied
- Safety-critical guidelines (patient safety language, accessibility requirements)
- Foundational best practices everyone should follow

**Example:**
```markdown
---
mode: AUTO
---
```

**Behavior:**
- Skill activates automatically when trigger keywords are detected
- No user confirmation required
- Claude applies the skill's knowledge immediately

**Good for:**
- `healthcare-ux-guidelines` (patient safety is non-negotiable)
- `frontend-design` (brand standards should always be applied)
- `research-synthesis-guidelines` (confidence grading should always be used)

---

### 2. SUGGEST Mode (Suggested Activation)

**When to use:**
- Helpful but not mandatory skills
- Skills that add extra rigor or polish
- Skills user might not know exist

**Example:**
```markdown
---
mode: SUGGEST
---
```

**Behavior:**
- Claude detects trigger keywords
- Claude suggests: "I can use the [skill-name] skill for this. Would you like me to?"
- User must confirm before skill activates

**Good for:**
- `video-production-guidelines` (user might want basic video, not full production quality)
- `marketing-content-guidelines` (user might want draft content, not polished marketing copy)
- `social-media-optimization` (user might want quick post, not optimized campaign)

---

### 3. MANUAL Mode (Explicit Activation Only)

**When to use:**
- Specialized skills used occasionally
- Skills with significant overhead (time, complexity)
- Skills that require specific context

**Example:**
```markdown
---
mode: MANUAL
---
```

**Behavior:**
- Skill NEVER activates automatically
- User must explicitly invoke: `/skill skill-name` or "Use the [skill-name] skill"
- Claude applies skill only when explicitly requested

**Good for:**
- `advanced-performance-tuning` (not needed for most code)
- `legal-compliance-review` (only needed for public-facing content)
- `security-penetration-testing` (only for security-focused tasks)

---

## Skill Structure (Copy-Paste Template)

Use this structure for all skills:

```markdown
---
name: [skill-name]
description: [One-sentence description]
category: [Healthcare | Frontend | Marketing | Research | Other]
mode: [AUTO | SUGGEST | MANUAL]
author: [Your Name]
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
---

# [Skill Name]

<purpose>
[2-3 sentences: what this skill does, when to use it, who benefits]
</purpose>

<activation_triggers>
**This skill auto-activates when:**
1. User mentions: [keyword1], [keyword2], [keyword3]
2. User asks: "[example question]"
3. User requests: "[example task]"
</activation_triggers>

<claude_instructions>
When this skill is activated:

### Step 1: [Action]
- Do: [specific action]
- Use tools: [which tools]
- Output: [what to output]

### Step 2: [Action]
[Continue pattern]
</claude_instructions>

<reference>
[Standards, guidelines, quick reference tables, common patterns]
</reference>

<examples>
### Example 1: [Scenario]
**User:** "[request]"
**Claude:** [response using skill]
**Result:** [outcome]
</examples>

<best_practices>
### Do's ✅
1. [Best practice 1]
2. [Best practice 2]

### Don'ts ❌
1. [Anti-pattern 1]
2. [Anti-pattern 2]
</best_practices>
```

---

## Writing Effective Activation Triggers

Good activation triggers are **specific, unambiguous, and cover 80% of use cases**.

### ✅ Good Triggers

**Example 1: Healthcare UX Guidelines**
```markdown
<activation_triggers>
**This skill auto-activates when:**
1. User mentions: "design", "UI", "interface", "accessibility", "WCAG", "patient safety"
2. User asks: "How should I design...", "What are the accessibility requirements..."
3. User requests: "Create a design brief", "Audit for WCAG compliance"
4. File context: Working in `/designs/`, `.figma`, `.sketch` files
</activation_triggers>
```
**Why it works:** Covers multiple trigger types (keywords, question patterns, task patterns, file context)

**Example 2: Research Synthesis Guidelines**
```markdown
<activation_triggers>
**This skill auto-activates when:**
1. User mentions: "research", "evidence", "confidence", "findings", "hypothesis", "validation"
2. User asks: "What's the confidence level...", "Should I proceed with this research..."
3. User requests: "Document my research", "Grade the confidence", "Synthesize findings"
4. File context: Working in `/research/`, creating research reports
</activation_triggers>
```
**Why it works:** Specific to research tasks, covers common question patterns

---

### ❌ Bad Triggers

**Example 1: Too Vague**
```markdown
<activation_triggers>
**This skill auto-activates when:**
1. User mentions: "help", "please", "need"
</activation_triggers>
```
**Why it fails:** Too generic, would activate on almost any request

**Example 2: Too Narrow**
```markdown
<activation_triggers>
**This skill auto-activates when:**
1. User mentions: "I want to create a React component with TypeScript using Tailwind CSS for the patient registration form"
</activation_triggers>
```
**Why it fails:** Too specific, would rarely activate

**Example 3: No Question Patterns**
```markdown
<activation_triggers>
**This skill auto-activates when:**
1. User mentions: "design"
</activation_triggers>
```
**Why it fails:** Doesn't cover how users actually ask for help ("How do I design...", "What are the design standards...")

---

## Progressive Disclosure: Show, Don't Tell

**Principle:** Skills should teach Claude through **examples and patterns**, not walls of text.

### ❌ Bad: Text-Heavy Explanation

```markdown
<reference>
## Color Guidelines

The primary color for MYCURE is Clinical Blue (#0066CC). This color should be used for primary actions, links, and emphasis. It has a contrast ratio of 7.2:1 on white backgrounds, which meets WCAG AAA standards. The secondary color is Trust Navy (#003366), used for headings and subheadings. It has a contrast ratio of 13.7:1 on white. The success color is Medical Green (#00A86B) with a 7.5:1 contrast ratio.
</reference>
```
**Why it fails:** Claude has to read through paragraphs to extract actionable information

---

### ✅ Good: Table Format

```markdown
<reference>
## MYCURE Color Palette

| Color | Hex | Contrast | Usage |
|-------|-----|----------|-------|
| Clinical Blue | #0066CC | 7.2:1 (AAA) | Primary actions, links, emphasis |
| Trust Navy | #003366 | 13.7:1 (AAA) | Headings, subheadings |
| Medical Green | #00A86B | 7.5:1 (AAA) | Success messages, health indicators |
| Body Text | #333333 | 12.6:1 (AAA) | All body text (easier on eyes than #000) |
</reference>
```
**Why it works:** Scannable, actionable, easy for Claude to reference

---

### ✅ Better: Visual Comparison

```markdown
<reference>
## Color Usage Patterns

### ❌ NEVER Use
- Purple gradients
- Neon colors (#FF00FF, #00FFFF, #FFFF00)
- Pure black (#000000) for text

### ✅ ALWAYS Use
- **Primary actions:** Clinical Blue (#0066CC)
- **Headings:** Trust Navy (#003366)
- **Success states:** Medical Green (#00A86B)
- **Body text:** Near-black (#333333)

**Example:**
```css
/* ❌ Bad */
button {
  background: linear-gradient(45deg, #FF00FF, #00FFFF);
  color: #000000;
}

/* ✅ Good */
button {
  background: #0066CC; /* Clinical Blue */
  color: #FFFFFF;
}
```
</reference>
```
**Why it works:** Shows concrete examples with visual ❌/✅ markers

---

## Examples: The Heart of Your Skill

**Rule of thumb:** Include at least 3 diverse examples showing different use cases.

### Example Structure

```markdown
<examples>
### Example 1: [Simple Use Case]

**User Request:**
> "I need to design a patient registration form"

**Claude Response (with this skill activated):**

I'll design a patient registration form using MYCURE healthcare standards.

[Shows step-by-step process]
1. Creates wireframe with left-aligned layout (F-pattern reading flow)
2. Applies MYCURE typography:
   - Headlines: Space Grotesk 24px Bold
   - Form labels: IBM Plex Sans 14px Medium
   - Patient ID field: JetBrains Mono 16px (zero-ambiguity)
3. Uses Clinical Blue (#0066CC) for primary "Submit" button
4. Ensures 48x48px touch targets for mobile
5. Validates WCAG 2.2 Level AA compliance

**Result:**
- Wireframe created: [patient-registration-wireframe.png](path/to/file)
- WCAG audit passed: 100% compliant
- Mobile-responsive: Tested on iOS and Android

---

### Example 2: [Complex Use Case]

**User Request:**
> "Create a dashboard for clinic administrators showing patient appointments, stock levels, and financial metrics"

**Claude Response (with this skill activated):**

[Shows how skill handles more complex request]

---

### Example 3: [Edge Case]

**User Request:**
> "Design an offline-first mobile app for rural health workers"

**Claude Response (with this skill activated):**

[Shows how skill handles Philippine context requirements]
```

**Why this works:**
- **Example 1:** Shows basic use case (most common scenario)
- **Example 2:** Shows complex use case (advanced scenario)
- **Example 3:** Shows edge case (important context-specific requirement)

---

## Testing Your Skill

Before considering your skill complete, test it thoroughly:

### Testing Checklist

- [ ] **Auto-activation test:** Does skill activate on all documented triggers?
- [ ] **Output format test:** Does Claude's output match documented format?
- [ ] **Standards application test:** Does Claude correctly apply all guidelines?
- [ ] **Example accuracy test:** Can Claude reproduce documented examples?
- [ ] **Best practices enforcement test:** Does Claude avoid documented anti-patterns?
- [ ] **Cross-reference test:** Do links to related skills/commands/workflows work?
- [ ] **Edge case test:** Does skill handle unusual requests gracefully?

### Testing Method

1. **Test auto-activation:**
   ```
   User: "I need to design a patient registration form"
   Expected: Healthcare UX skill activates automatically
   Verify: Claude mentions WCAG, patient safety language, MYCURE standards
   ```

2. **Test output format:**
   ```
   User: "Document my research findings"
   Expected: Research synthesis skill creates report with confidence grading
   Verify: Report includes HIGH/MEDIUM/LOW confidence, triangulation analysis
   ```

3. **Test standards application:**
   ```
   User: "Create a button component"
   Expected: Frontend design skill applies MYCURE standards
   Verify: Uses Clinical Blue (#0066CC), 48x48px touch target, proper typography
   ```

---

## Common Pitfalls

### ❌ Pitfall 1: Too Much Text, Not Enough Examples

**Bad:**
```markdown
<reference>
The research confidence grading framework is a systematic approach to evaluating the reliability of research findings. It uses multiple criteria including the number of independent sources, the recency of data, the specificity to the Philippine healthcare context, and the consistency of findings across different methodologies. High confidence requires at least three independent sources...
[continues for 10 paragraphs]
</reference>
```

**Good:**
```markdown
<reference>
## Confidence Grading Framework

| Criteria | HIGH | MEDIUM | LOW |
|----------|------|--------|-----|
| Sources | 3+ independent | 1-2 | 0 |
| Primary research | YES | Partial | NO |
| Recency | <2 years | 2-5 years | >5 years |
| PH-specific | YES | Partial | NO |
| Consistent | YES | Mostly | NO |

**Decision:**
- 5/5 criteria = HIGH ✅ → PROCEED
- 3-4/5 criteria = MEDIUM ⚠️ → VALIDATE FURTHER
- 0-2/5 criteria = LOW ❌ → DO NOT PROCEED
</reference>
```

---

### ❌ Pitfall 2: Vague Instructions

**Bad:**
```markdown
<claude_instructions>
When this skill is activated, design something good following best practices.
</claude_instructions>
```

**Good:**
```markdown
<claude_instructions>
When this skill is activated:

### Step 1: Read Design Requirements
- Use Read tool to read design brief (if exists)
- Extract: target users, success criteria, technical constraints
- Output: "I've reviewed the design brief for [feature]"

### Step 2: Apply MYCURE Brand Standards
- Typography: Space Grotesk (headlines), IBM Plex Sans (body), JetBrains Mono (data)
- Colors: Clinical Blue (#0066CC), Trust Navy (#003366), Medical Green (#00A86B)
- Animation: 100ms (fast), 150ms (smooth), 200ms (modal)
- Output: Design mockup with annotations showing which standards were applied

### Step 3: Validate WCAG 2.2 Level AA
- Check color contrast: 4.5:1 minimum (7:1 preferred)
- Verify keyboard navigation works
- Test with screen reader (NVDA/JAWS)
- Output: WCAG audit checklist with pass/fail status
</claude_instructions>
```

---

### ❌ Pitfall 3: No Cross-References

**Bad:**
```markdown
[Skill has no links to related resources]
```

**Good:**
```markdown
## Related Resources

**Skills:**
- [Research Synthesis Guidelines](../skills/_healthcare/research-synthesis-guidelines/SKILL.md) - Confidence grading for research
- [Frontend Design](../skills/_frontend/frontend-design/SKILL.md) - MYCURE brand standards

**Commands:**
- [/audit-wcag](../commands/audit-wcag.md) - WCAG 2.2 AA compliance check
- [/design-ui](../commands/design-ui.md) - Quick UI design with standards

**Workflows:**
- [Feature Development Workflow](../workflows/feature-development-workflow.md) - Research → Design → Implementation
- [Healthcare Compliance Workflow](../workflows/healthcare-compliance-workflow.md) - End-to-end compliance validation

**Templates:**
- [Design Brief Template](../templates/design-brief-template.md) - Standard design documentation
- [User Testing Report Template](../templates/user-testing-report-template.md) - Testing documentation
```

---

## Skill Maintenance

Skills require ongoing maintenance as standards evolve:

### When to Update a Skill

1. **Standards change** (e.g., WCAG 2.2 → WCAG 3.0)
2. **New patterns emerge** (e.g., new MYCURE color added to palette)
3. **User feedback** (e.g., skill activates too often or not often enough)
4. **Examples become outdated** (e.g., references deprecated APIs)
5. **Related resources change** (e.g., linked workflows are reorganized)

### Changelog Best Practices

Always maintain a changelog:

```markdown
## Changelog

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-01-15 | 1.0 | Initial skill creation | Jane Doe |
| 2025-02-10 | 1.1 | Added Filipino language support examples | John Smith |
| 2025-03-05 | 1.2 | Updated WCAG to 2.2 standards | Jane Doe |
| 2025-04-20 | 2.0 | Major refactor: Added offline-first patterns | Maria Garcia |
```

---

## Quick Start: Copy-Paste Skill

Want to create a skill right now? Copy this template:

```markdown
---
name: my-new-skill
description: [What does this skill do in one sentence?]
category: [Healthcare | Frontend | Marketing | Research | Other]
mode: AUTO
author: [Your Name]
created: 2025-11-24
last_updated: 2025-11-24
---

# My New Skill

<purpose>
**What this skill does:** [2-3 sentences]

**When to use this skill:** [When should this activate?]

**Target users:** [Who benefits?]
</purpose>

<activation_triggers>
**This skill auto-activates when:**
1. User mentions: [keyword1], [keyword2], [keyword3]
2. User asks: "[example question]"
3. User requests: "[example task]"
</activation_triggers>

<claude_instructions>
When this skill is activated:

### Step 1: [Action]
- Do: [specific action]
- Use tools: [which tools]
- Output: [what to output]

### Step 2: [Action]
- Do: [specific action]
- Output: [what to output]
</claude_instructions>

<reference>
## [Standard/Guideline Title]

| Category | Standard | Example | Rationale |
|----------|----------|---------|-----------|
| [Cat 1] | [Standard] | [Example] | [Why?] |
| [Cat 2] | [Standard] | [Example] | [Why?] |

### ❌ NEVER Use
- [Anti-pattern 1]
- [Anti-pattern 2]

### ✅ ALWAYS Use
- [Best practice 1]
- [Best practice 2]
</reference>

<examples>
### Example 1: [Scenario]
**User:** "[request]"
**Claude:** [response using skill]
**Result:** [outcome]

### Example 2: [Scenario]
**User:** "[request]"
**Claude:** [response using skill]
**Result:** [outcome]
</examples>

<best_practices>
### Do's ✅
1. [Best practice 1] - Why: [rationale]
2. [Best practice 2] - Why: [rationale]

### Don'ts ❌
1. Never [anti-pattern 1] - Instead: [alternative]
2. Never [anti-pattern 2] - Instead: [alternative]
</best_practices>

## Changelog

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-11-24 | 1.0 | Initial skill creation | [Your Name] |

## Related Resources

**Skills:**
- [Related Skill 1](../skills/[skill-name]/SKILL.md)

**Commands:**
- [Related Command 1](../commands/[command-name].md)

**Workflows:**
- [Related Workflow 1](../workflows/[workflow-name].md)
```

---

## Additional Resources

**Official Documentation:**
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Skill System Reference](https://docs.anthropic.com/claude-code/skills)
- [Agent SDK](https://github.com/anthropics/claude-agent-sdk)

**Examples in this Repository:**
- [Healthcare UX Guidelines](.claude/skills/_healthcare/healthcare-ux-guidelines/SKILL.md) - Complete example of AUTO mode skill
- [Frontend Design](.claude/skills/_frontend/frontend-design/SKILL.md) - Example with extensive reference tables
- [Marketing Content Guidelines](.claude/skills/_marketing/marketing-content-guidelines/SKILL.md) - Example with brand voice patterns

**Related Templates:**
- [Skill Template](skill-template.md) - Copy-paste skill structure
- [Agent Template](agent-template.md) - For complex task executors
- [Command Template](../commands/_TEMPLATE.md) - For workflow shortcuts
