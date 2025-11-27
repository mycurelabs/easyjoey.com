# Skill Auto-Activation Patterns

This document demonstrates different auto-activation patterns for Claude skills with real-world examples from the Insights Foundry repository.

---

## Pattern 1: Keyword-Based Activation

**Best for:** Domain-specific skills with clear terminology

**Example: Healthcare UX Guidelines**

```markdown
<activation_triggers>
**This skill auto-activates when:**

1. **User mentions keywords:**
   - Primary: "design", "UI", "interface", "accessibility", "WCAG"
   - Healthcare-specific: "patient safety", "clinical", "medical UI"
   - Compliance: "compliance", "regulations", "standards"

2. **User asks questions like:**
   - "How should I design..."
   - "What are the accessibility requirements..."
   - "Does this meet WCAG standards..."
   - "How do I ensure patient safety in..."

3. **User requests tasks like:**
   - "Create a design brief for..."
   - "Audit this UI for accessibility"
   - "Design a patient registration form"
   - "Check this meets healthcare standards"
</activation_triggers>
```

**Why this works:**
- ✅ Multiple keyword categories (primary, domain, compliance)
- ✅ Question patterns match how users actually ask
- ✅ Task patterns match real user requests
- ✅ Covers 80%+ of expected use cases

**Test cases:**
```
✅ Activates: "I need to design a patient registration form"
✅ Activates: "How can I make this UI accessible?"
✅ Activates: "Does this meet WCAG 2.2 standards?"
❌ Doesn't activate: "I'm going to the pharmacy" (keyword present but wrong context)
```

---

## Pattern 2: File Context-Based Activation

**Best for:** Skills tied to specific file types or directories

**Example: Frontend Design Skill**

```markdown
<activation_triggers>
**This skill auto-activates when:**

1. **File context detected:**
   - Working in: `/designs/`, `/ui/`, `/components/`, `/pages/`
   - Editing files: `*.figma`, `*.sketch`, `*.tsx`, `*.jsx`, `*.vue`
   - Creating files: `design-brief-*.md`, `wireframe-*.png`

2. **User mentions keywords:**
   - "typography", "colors", "layout", "responsive", "mobile"
   - "MYCURE", "brand standards", "style guide"

3. **User asks questions like:**
   - "What font should I use for headings?"
   - "What's the brand color palette?"
   - "How do I ensure this is mobile-responsive?"
</activation_triggers>
```

**Why this works:**
- ✅ Automatically activates when user is in design-related directories
- ✅ Catches design work even if user doesn't explicitly mention "design"
- ✅ Provides context-aware suggestions

**Test cases:**
```
✅ Activates: User is editing `/designs/patient-portal.figma`
✅ Activates: User creates `src/components/Button.tsx` and asks "What should this look like?"
✅ Activates: User is in `/ui/` directory and mentions "colors"
❌ Doesn't activate: User is in `/api/` directory discussing "color-coded error responses"
```

---

## Pattern 3: Task Pattern-Based Activation

**Best for:** Skills that help with specific, recurring tasks

**Example: Research Synthesis Guidelines**

```markdown
<activation_triggers>
**This skill auto-activates when:**

1. **User requests research tasks:**
   - "Document my research findings"
   - "Grade the confidence level"
   - "Synthesize these findings"
   - "Create a research report"
   - "Validate this hypothesis"

2. **User asks confidence questions:**
   - "How confident should I be in this finding?"
   - "Is this HIGH or MEDIUM confidence?"
   - "Should I proceed with this research?"
   - "Do I have enough evidence?"

3. **User mentions evidence terms:**
   - "primary research", "secondary research"
   - "triangulation", "source", "evidence"
   - "hypothesis", "validation", "findings"

4. **File context:**
   - Creating/editing: `/research/*.md`, `*-research-report.md`
   - Working in: `/research/` directory
</activation_triggers>
```

**Why this works:**
- ✅ Covers common task verbs ("document", "grade", "synthesize")
- ✅ Includes confidence-specific questions
- ✅ Catches both file context and keywords
- ✅ Helps users who might not know about confidence grading

**Test cases:**
```
✅ Activates: "I need to document my research findings"
✅ Activates: "How confident should I be in this?"
✅ Activates: User creates `/research/patient-workflow-study.md`
❌ Doesn't activate: "I need to research which database to use" (wrong type of "research")
```

---

## Pattern 4: Multi-Mode Activation (AUTO + SUGGEST + MANUAL)

**Best for:** Skills with varying levels of importance depending on context

**Example: Marketing Content Guidelines**

```markdown
<activation_triggers>
**AUTO Mode (always activates):**
1. User explicitly asks: "Create a social media post", "Write marketing copy"
2. File context: Working in `/marketing/`, editing `*-campaign-*.md`

**SUGGEST Mode (offers activation):**
1. User mentions: "write a blog post", "create content", "draft an email"
2. Context: Might benefit from marketing guidelines, but not critical

**MANUAL Mode (explicit invocation only):**
1. User must explicitly request: "Use marketing-content-guidelines skill"
2. Use for: Advanced features (brand voice analysis, A/B test copy)
</activation_triggers>
```

**Why this works:**
- ✅ AUTO for clear marketing tasks (high value, low false positives)
- ✅ SUGGEST for ambiguous content tasks (user decides if needed)
- ✅ MANUAL for advanced features (avoids overwhelming users)

**Implementation:**

```markdown
---
name: marketing-content-guidelines
mode: AUTO
---

# Marketing Content Guidelines

<activation_triggers>
**AUTO Mode activates when:**
- User mentions: "social media post", "marketing copy", "campaign"
- File context: `/marketing/` directory, `*-campaign-*.md`

**Note:** For general content writing, suggest this skill but don't auto-activate.
Claude should ask: "Would you like me to apply MYCURE marketing content guidelines?"
</activation_triggers>
```

**Test cases:**
```
✅ AUTO: "Create a social media post about our new feature"
✅ SUGGEST: "Write a blog post about healthcare technology" (asks user first)
❌ NO ACTIVATION: "Send an email to the team" (internal communication, not marketing)
```

---

## Pattern 5: Context + Intent Detection

**Best for:** Skills that require both file context and user intent

**Example: Video Production Guidelines**

```markdown
<activation_triggers>
**This skill auto-activates when:**

1. **File context + video keywords:**
   - Editing: `*.mp4`, `*.mov`, `*.prproj`, `*.fcpx`
   - Working in: `/videos/`, `/media/`, `/production/`
   - AND user mentions: "edit", "video", "footage", "production"

2. **Video-specific tasks:**
   - "Create a video script"
   - "Plan a video shoot"
   - "Edit this video"
   - "Add subtitles"

3. **User asks video questions:**
   - "What should be in the video intro?"
   - "How long should this video be?"
   - "What video format should I use?"

**Note:** Does NOT activate for:
- Generic "video" mentions without production context
- Watching videos (user must be creating/editing)
</activation_triggers>
```

**Why this works:**
- ✅ Requires BOTH file context AND intent keywords (reduces false positives)
- ✅ Explicitly lists what it doesn't activate for
- ✅ Catches video production work at planning stage (script, shoot planning)

**Test cases:**
```
✅ Activates: User in `/videos/` directory, says "I need to edit this footage"
✅ Activates: User creates `video-script.md`, asks "What should be in the intro?"
❌ Doesn't activate: User says "I watched a video about React hooks" (watching, not creating)
❌ Doesn't activate: User in `/api/` directory, discusses "video streaming endpoints" (wrong context)
```

---

## Pattern 6: Progressive Activation (Light → Heavy)

**Best for:** Skills with basic and advanced features

**Example: Code Review Guidelines**

```markdown
<activation_triggers>
**Light Activation (suggestions only):**
1. User mentions: "review this code", "code review", "feedback"
2. Provides: Quick tips, common issues, style suggestions

**Full Activation (comprehensive analysis):**
1. User explicitly requests: "comprehensive code review", "full review", "audit this code"
2. OR user invokes: `/review-code` slash command
3. Provides: Architecture analysis, security audit, performance check, simplicity review

**Conditional Heavy Activation:**
1. Light review finds 3+ critical issues
2. Claude suggests: "I found several critical issues. Would you like a comprehensive review?"
</activation_triggers>
```

**Implementation:**

```markdown
<claude_instructions>
When this skill is activated:

### Light Mode (default for "review" keyword):
1. Scan for obvious issues (syntax errors, unused variables, console.logs)
2. Check style consistency
3. Provide 3-5 quick suggestions
4. If 3+ critical issues found → suggest Full Mode

### Full Mode (explicit request or `/review-code` command):
1. Launch code-architecture-reviewer agent
2. Launch security-sentinel agent
3. Launch performance-oracle agent
4. Launch code-simplicity-reviewer agent
5. Consolidate findings into comprehensive report
</claude_instructions>
```

**Why this works:**
- ✅ Light mode for quick checks (doesn't overwhelm user)
- ✅ Full mode for comprehensive reviews (when user explicitly wants it)
- ✅ Automatic escalation (suggests full mode when issues found)

**Test cases:**
```
✅ Light: "Can you review this code?" → Quick suggestions
✅ Full: "I need a comprehensive code review" → Launches 4 agents
✅ Escalation: Light review finds critical security issue → Suggests full review
```

---

## Pattern 7: Exclusion Patterns (What NOT to Activate On)

**Best for:** Skills with common false-positive keywords

**Example: Healthcare Compliance Skill**

```markdown
<activation_triggers>
**This skill auto-activates when:**

1. **User mentions healthcare compliance:**
   - "HIPAA", "PHI", "patient privacy", "data security"
   - "DOH requirements", "PhilHealth compliance"
   - "medical records", "healthcare regulations"

**This skill DOES NOT activate when:**

1. **Generic compliance mentions (wrong domain):**
   - ❌ "GDPR compliance" (general data privacy, not healthcare)
   - ❌ "cookie consent" (web compliance, not healthcare)
   - ❌ "terms of service" (legal, not healthcare)

2. **Healthcare terms without compliance context:**
   - ❌ "I'm going to the doctor" (personal, not development)
   - ❌ "healthcare industry trends" (research, not compliance)
   - ❌ "patient satisfaction survey" (UX research, not compliance)

3. **Code containing healthcare terms:**
   - ❌ Variable names: `patientId`, `medicalRecord` (just code, not compliance question)
   - ✅ Activate if: "Is this variable name HIPAA-compliant?" (explicit compliance question)
</activation_triggers>
```

**Why this works:**
- ✅ Explicitly lists exclusion patterns (reduces false positives)
- ✅ Distinguishes between domain terms and compliance context
- ✅ Prevents activation on casual mentions

**Test cases:**
```
✅ Activates: "Does this meet HIPAA requirements?"
✅ Activates: "How should I secure PHI in the database?"
❌ Doesn't activate: "I need to schedule a doctor's appointment"
❌ Doesn't activate: "const patientId = '123'" (just code, no compliance question)
✅ Activates: "Is using patientId as a URL parameter HIPAA-compliant?" (compliance question)
```

---

## Pattern 8: Sequential Skill Chaining

**Best for:** Skills that naturally follow each other in a workflow

**Example: Research → Design → Implementation Chain**

```markdown
<activation_triggers>
**This skill auto-activates when:**

1. **Standalone design requests:**
   - "Design a UI for..."
   - "Create a wireframe for..."

2. **After research skill completes:**
   - Research skill outputs requirements
   - Design skill auto-activates to create design brief
   - User is prompted: "I've synthesized the research. Would you like me to create a design brief based on these findings?"

3. **File context indicates design phase:**
   - Creating: `design-brief-*.md`
   - Working in: `/designs/` directory
   - Previous file: `*-research-report.md` (indicates transition from research to design)
</activation_triggers>

<skill_chaining>
**Upstream skills (triggers this skill):**
- research-synthesis-guidelines → Outputs requirements → Triggers design skill

**Downstream skills (this skill triggers):**
- design skill → Outputs design brief → Triggers frontend-development skill

**Handoff pattern:**
```
Research Skill Output:
→ Requirements extracted: [FR1, FR2, FR3, NFR1, NFR2]
→ Confidence: HIGH
→ Recommendation: PROCEED

Design Skill (auto-activates):
→ "Based on the HIGH confidence research findings, I'll create a design brief."
→ Reads research requirements
→ Creates design brief with MYCURE standards
→ Outputs: design-brief-[feature].md

Frontend Development Skill (suggests activation):
→ "I've completed the design brief. Would you like me to start implementing?"
```
</skill_chaining>
```

**Why this works:**
- ✅ Smooth workflow transitions (research → design → implementation)
- ✅ Context from previous skill informs next skill
- ✅ User can approve/decline each transition

**Test cases:**
```
✅ Standalone: "Design a patient registration form" → Design skill activates immediately
✅ Chained: Research skill completes → Design skill suggests activation
✅ File context: User creates `design-brief-appointments.md` → Design skill activates
```

---

## Anti-Patterns (What to Avoid)

### ❌ Anti-Pattern 1: Too Broad (Activates on Everything)

```markdown
<activation_triggers>
**This skill auto-activates when:**
- User mentions: "help", "please", "need", "want", "create", "make"
</activation_triggers>
```

**Why this fails:** These words appear in almost every request. Skill would activate constantly.

**Fix:** Use specific, domain-relevant keywords.

---

### ❌ Anti-Pattern 2: Too Narrow (Never Activates)

```markdown
<activation_triggers>
**This skill auto-activates when:**
- User says exactly: "I need to create a React TypeScript component with Tailwind CSS for patient registration using the MYCURE design system"
</activation_triggers>
```

**Why this fails:** Users rarely phrase requests this specifically.

**Fix:** Cover multiple phrasings and keywords that capture the same intent.

---

### ❌ Anti-Pattern 3: No Question Patterns

```markdown
<activation_triggers>
**This skill auto-activates when:**
1. User mentions: "design", "UI", "interface"
</activation_triggers>
```

**Why this fails:** Misses how users actually ask for help ("How do I...", "What should I...", "Can you...").

**Fix:** Include question patterns:

```markdown
<activation_triggers>
**This skill auto-activates when:**
1. User mentions: "design", "UI", "interface"
2. User asks: "How should I design...", "What are the design standards...", "Can you design..."
</activation_triggers>
```

---

### ❌ Anti-Pattern 4: Ignoring File Context

```markdown
<activation_triggers>
**This skill auto-activates when:**
1. User mentions: "video"
</activation_triggers>
```

**Why this fails:** "Video" appears in many contexts (watching videos, video streaming, video conferencing) where production guidelines aren't relevant.

**Fix:** Combine keyword with file context:

```markdown
<activation_triggers>
**This skill auto-activates when:**
1. User mentions: "video" AND (working in `/videos/` OR editing `.mp4`/`.mov` OR mentions "edit"/"production"/"script")
</activation_triggers>
```

---

## Testing Your Activation Pattern

**Checklist for testing:**

- [ ] Test with 10+ real user requests (varied phrasings)
- [ ] Test with edge cases (false positives, false negatives)
- [ ] Test with file context (does it activate in right directories?)
- [ ] Test with question patterns (does it catch "How do I...", "What should I..."?)
- [ ] Test exclusions (does it avoid activating on wrong contexts?)
- [ ] Test with teammates (different phrasing styles)

**Example test suite:**

```markdown
## Test Suite: Healthcare UX Guidelines Skill

### Should Activate ✅
1. "Design a patient registration form" → ✅ Activated
2. "How do I ensure WCAG compliance?" → ✅ Activated
3. "What colors should I use for medical UI?" → ✅ Activated
4. User creates `design-brief-appointments.md` → ✅ Activated
5. User in `/designs/` directory, mentions "accessibility" → ✅ Activated

### Should NOT Activate ❌
1. "I'm going to the doctor" → ❌ Correctly ignored (personal, not design)
2. "Research healthcare trends" → ❌ Correctly ignored (research, not design)
3. "const patientId = '123'" → ❌ Correctly ignored (just code)
4. "Schedule a medical appointment" → ❌ Correctly ignored (not a design task)

### Edge Cases 🔍
1. "Design a healthcare app" → ✅ Activated (generic but relevant)
2. "Review this UI for patients" → ✅ Activated (UI + patients = healthcare)
3. "Create a patient satisfaction survey" → ⚠️ Should suggest research-synthesis-guidelines instead
```

---

## Activation Pattern Template

**Copy-paste this template for new skills:**

```markdown
<activation_triggers>
**This skill auto-activates when:**

1. **User mentions keywords:**
   - Primary: [domain-specific terms]
   - Secondary: [related terms]
   - Avoid: [terms that might cause false positives]

2. **User asks questions like:**
   - "[Common question pattern 1]"
   - "[Common question pattern 2]"
   - "[Common question pattern 3]"

3. **User requests tasks like:**
   - "[Common task pattern 1]"
   - "[Common task pattern 2]"
   - "[Common task pattern 3]"

4. **File context detected:**
   - Working in: [relevant directories]
   - Editing files: [relevant file extensions]
   - Creating files: [relevant file name patterns]

**This skill DOES NOT activate when:**
- [Exclusion pattern 1 - why it's excluded]
- [Exclusion pattern 2 - why it's excluded]
- [Exclusion pattern 3 - why it's excluded]
</activation_triggers>
```

---

## Related Resources

- [SKILL_DOCUMENTATION.md](../SKILL_DOCUMENTATION.md) - Complete guide to writing skills
- [skill-template.md](../skill-template.md) - Copy-paste skill template
- [simple-skill-example.md](simple-skill-example.md) - Basic skill example
- [complex-skill-with-references-example.md](complex-skill-with-references-example.md) - Advanced skill with references
