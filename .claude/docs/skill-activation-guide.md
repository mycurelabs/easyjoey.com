# Skill Activation Guide

**Purpose:** Understand when skills auto-activate and how to trigger them manually

**Quick Answer:** Most skills auto-activate when you mention their domain. Some require explicit invocation.

---

## Activation Modes

### AUTO Mode (Default)
Skill activates automatically when you mention its domain in conversation.

**Example:**
```
You: "Can you design a patient registration form?"
→ frontend-design skill auto-activates
→ Applies MYCURE typography and color standards automatically
```

### SUGGEST Mode
Claude suggests the skill when relevant, but doesn't auto-activate.

**Example:**
```
You: "I need to create a social media post about our new feature"
→ Claude suggests: "I can use the marketing-content-guidelines skill to help with that"
→ You confirm, skill activates
```

### MANUAL Mode
You explicitly invoke the skill or use a slash command.

**Example:**
```
You: "/create-social-post"
→ marketing-content-guidelines skill activates
→ Generates platform-specific posts
```

---

## Skills by Category

### Healthcare (_healthcare)

| **Skill** | **Auto-Activates When You Mention** | **Slash Command** |
|-----------|-------------------------------------|-------------------|
| research-synthesis-guidelines | "research findings", "confidence level", "triangulate evidence" | `/research-evidence` |
| healthcare-ux-guidelines | "WCAG", "accessibility", "patient safety language", "screen reader" | `/audit-wcag` |

**Auto-Activation Examples:**
- ✅ "What confidence level is this research?" → research-synthesis-guidelines
- ✅ "Is this color contrast WCAG compliant?" → healthcare-ux-guidelines
- ✅ "Can patients with screen readers use this?" → healthcare-ux-guidelines

---

### Frontend (_frontend)

| **Skill** | **Auto-Activates When You Mention** | **Slash Command** |
|-----------|-------------------------------------|-------------------|
| frontend-design | "design UI", "create mockup", "typography", "color palette", "animation" | `/design-ui` |

**Auto-Activation Examples:**
- ✅ "Design a dashboard for clinic administrators" → frontend-design
- ✅ "What typography should I use for patient names?" → frontend-design
- ✅ "What's the MYCURE color for action buttons?" → frontend-design

---

### Content (_content)

| **Skill** | **Auto-Activates When You Mention** | **Slash Command** |
|-----------|-------------------------------------|-------------------|
| marketing-content-guidelines | "social media post", "Instagram", "LinkedIn", "hashtags" | `/create-social-post` |
| video-production-guidelines | "video script", "demo video", "Apple Keynote", "voiceover" | None (manual) |

**Auto-Activation Examples:**
- ✅ "Create an Instagram post about our stock transfer feature" → marketing-content-guidelines
- ✅ "How many hashtags should I use on LinkedIn?" → marketing-content-guidelines
- ✅ "Write a demo video script" → video-production-guidelines

---

## Explicit Invocation (When to Use)

### Use Slash Commands When:
1. **You want specific output format**
   - `/create-social-post` → Generates all 4 platforms (Instagram, LinkedIn, Twitter, Facebook)
   - `/audit-wcag` → Generates structured checklist with pass/fail

2. **You're starting a workflow**
   - `/review-code` → Launches 4-agent review chain
   - `/research-evidence` → Starts research documentation template

3. **You want to be explicit**
   - Prevents ambiguity about which skill to use
   - Ensures consistent output format

### Use Natural Language When:
1. **Asking questions**
   - "What's the difference between HIGH and MEDIUM confidence?"
   - "Is #0066CC the right blue for buttons?"

2. **Iterating on content**
   - "Make the Instagram post more concise"
   - "Change the color contrast to AAA level"

3. **Combining multiple skills**
   - "Design a WCAG-compliant patient form with patient safety error messages"
   - (auto-activates frontend-design + healthcare-ux-guidelines)

---

## Skill Chaining (Auto-Activation Sequences)

Some workflows automatically chain multiple skills:

### Feature Development
```
You: "Let's build a multi-location stock transfer feature"

Auto-Activates:
1. research-synthesis-guidelines (validate need with HIGH confidence)
2. frontend-design (design UI with MYCURE standards)
3. healthcare-ux-guidelines (WCAG validation)
4. development-plan-reviewer (technical planning)
```

### Marketing Launch
```
You: "Let's launch our new billing module"

Auto-Activates:
1. marketing-content-guidelines (social posts)
2. video-production-guidelines (demo script)
3. frontend-design (landing page)
```

### Code Review
```
You: "/review-code"

Auto-Activates:
1. code-architecture-reviewer
2. code-simplicity-reviewer
3. security-sentinel
4. performance-oracle
```

---

## Troubleshooting

### "Skill didn't auto-activate when I expected it to"

**Possible causes:**
1. **Ambiguous domain** - Be more specific
   - ❌ "Make it look better" (unclear which skill)
   - ✅ "Design this with MYCURE typography" (frontend-design activates)

2. **Skill doesn't exist** - Check [Skills Catalog](../skills/README.md)

3. **Feature not in skill scope** - Some tasks don't require skills
   - Example: "What's 2 + 2?" (no skill needed, basic math)

### "I want to force a specific skill"

**Solution:** Use explicit invocation
```
You: "Using the frontend-design skill, create a patient portal layout"
→ Explicitly activates frontend-design
→ Prevents ambiguity
```

---

## Quick Reference Table

| **Task** | **Skill That Auto-Activates** | **Alternative: Slash Command** |
|----------|-------------------------------|-------------------------------|
| Design UI | frontend-design | `/design-ui` |
| WCAG validation | healthcare-ux-guidelines | `/audit-wcag` |
| Social media post | marketing-content-guidelines | `/create-social-post` |
| Research documentation | research-synthesis-guidelines | `/research-evidence` |
| Code review | (chain of 4 agents) | `/review-code` |
| Refactoring plan | development-plan-reviewer | `/plan-refactor` |
| Video script | video-production-guidelines | (manual only) |

---

## Pro Tips

1. **Trust auto-activation** - Most of the time, Claude will activate the right skill when you mention its domain.

2. **Use slash commands for consistency** - Slash commands ensure the same output format every time.

3. **Combine skills naturally** - Don't overthink it. Say "Design a WCAG-compliant form" and both frontend-design and healthcare-ux-guidelines will activate.

4. **Check the Skills Catalog** - See all available skills in [.claude/skills/README.md](../skills/README.md)

---

**Related:**
- [Agent Quick Reference](agent-quick-reference.md) - Which agent to use
- [Healthcare Checklist](healthcare-checklist.md) - Pre-launch validation
- [Skills Catalog](../skills/README.md) - All available skills
