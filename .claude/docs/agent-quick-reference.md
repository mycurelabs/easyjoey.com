# Agent Quick Reference

**Purpose:** Find the right agent for your task in <30 seconds

**Format:** Problem → Agent → Location/Command

---

## Code Quality & Review

| **I Need To...** | **Use Agent** | **Location/Command** |
|------------------|---------------|---------------------|
| Review code architecture (SOLID, coupling) | code-architecture-reviewer | [.claude/agents/_review/](../agents/_review/) |
| Reduce code complexity | code-simplicity-reviewer | [.claude/agents/_review/](../agents/_review/) |
| Find security vulnerabilities | security-sentinel | [.claude/agents/_review/](../agents/_review/) or `/review-code` |
| Optimize performance | performance-oracle | [.claude/agents/_review/](../agents/_review/) |
| Complete code review (all 4 agents) | Run workflow | `/review-code` command |

---

## Planning & Strategy

| **I Need To...** | **Use Agent** | **Location/Command** |
|------------------|---------------|---------------------|
| Validate implementation plan | development-plan-reviewer | [.claude/agents/_review/](../agents/_review/) |
| Plan refactoring | development-plan-reviewer | `/plan-refactor` command |
| Assess technical feasibility | development-plan-reviewer | [.claude/agents/_review/](../agents/_review/) |
| Estimate development resources | development-plan-reviewer | [.claude/agents/_review/](../agents/_review/) |

---

## Healthcare Compliance

| **I Need To...** | **Use Agent** | **Location/Command** |
|------------------|---------------|---------------------|
| Validate WCAG 2.2 Level AA | healthcare-ux-guidelines skill | `/audit-wcag` command |
| Check patient safety language | healthcare-ux-guidelines skill | [.claude/skills/_healthcare/](../skills/_healthcare/) |
| Validate Philippine context | healthcare-ux-guidelines skill | [.claude/skills/_healthcare/](../skills/_healthcare/) |
| Complete compliance check | Run workflow | [healthcare-compliance-workflow.md](../workflows/healthcare-compliance-workflow.md) |

---

## Research & Evidence

| **I Need To...** | **Use Agent** | **Location/Command** |
|------------------|---------------|---------------------|
| Grade research confidence (HIGH/MEDIUM/LOW) | research-synthesis-guidelines skill | `/research-evidence` command |
| Triangulate findings | research-synthesis-guidelines skill | [.claude/skills/_healthcare/](../skills/_healthcare/) |
| Document evidence with citations | research-synthesis-guidelines skill | `/research-evidence` command |
| Validate assumptions | research-synthesis-guidelines skill | [research-to-implementation.md](../workflows/research-to-implementation.md) |

---

## Design & UI

| **I Need To...** | **Use Agent** | **Location/Command** |
|------------------|---------------|---------------------|
| Design UI with MYCURE standards | frontend-design skill | `/design-ui` command |
| Apply MYCURE typography | frontend-design skill | [.claude/skills/_frontend/](../skills/_frontend/) |
| Apply MYCURE color palette | frontend-design skill | [.claude/skills/_frontend/](../skills/_frontend/) |
| Create animations (healthcare-optimized) | frontend-design skill | `/design-ui` command |

---

## Marketing & Content

| **I Need To...** | **Use Agent** | **Location/Command** |
|------------------|---------------|---------------------|
| Create social media posts | marketing-content-guidelines skill | `/create-social-post` command |
| Write video script (Apple Keynote method) | video-production-guidelines skill | [.claude/skills/_content/](../skills/_content/) |
| Plan marketing campaign | Run workflow | [marketing-launch-workflow.md](../workflows/marketing-launch-workflow.md) |
| Coordinate multi-channel launch | Run workflow | [marketing-launch-workflow.md](../workflows/marketing-launch-workflow.md) |

---

## Complete Workflows

| **I Need To...** | **Use Workflow** | **Location** |
|------------------|------------------|--------------|
| Develop new feature (research → ship) | Feature Development | [feature-development-workflow.md](../workflows/feature-development-workflow.md) |
| Research → Decide → Build → Validate | Research to Implementation | [research-to-implementation.md](../workflows/research-to-implementation.md) |
| Review code before merge | Code Review | [code-review-workflow.md](../workflows/code-review-workflow.md) or `/review-code` |
| Ensure WCAG compliance | Healthcare Compliance | [healthcare-compliance-workflow.md](../workflows/healthcare-compliance-workflow.md) or `/audit-wcag` |
| Launch feature marketing | Marketing Launch | [marketing-launch-workflow.md](../workflows/marketing-launch-workflow.md) |

---

## Quick Decision Tree

```
Is it about CODE?
├─ Architecture/Structure → code-architecture-reviewer
├─ Complexity/Readability → code-simplicity-reviewer
├─ Security/Vulnerabilities → security-sentinel
├─ Performance/Optimization → performance-oracle
└─ All of the above → /review-code

Is it about RESEARCH?
├─ Grading confidence → research-synthesis-guidelines + /research-evidence
└─ Evidence → Validation → research-to-implementation workflow

Is it about DESIGN?
├─ UI mockups → frontend-design + /design-ui
├─ WCAG validation → healthcare-ux-guidelines + /audit-wcag
└─ Complete design → feature-development-workflow Phase 2

Is it about MARKETING?
├─ Social posts → marketing-content-guidelines + /create-social-post
├─ Video script → video-production-guidelines
└─ Full campaign → marketing-launch-workflow

Is it about PLANNING?
└─ Implementation plan → development-plan-reviewer + /plan-refactor
```

---

## Cheat Sheet: Slash Commands

| **Command** | **What It Does** | **When To Use** |
|-------------|------------------|-----------------|
| `/review-code` | 4-agent code review | Before merging PR |
| `/audit-wcag` | WCAG 2.2 AA validation | Before releasing UI |
| `/create-social-post` | Generate social media posts | Marketing launches |
| `/plan-refactor` | Create refactoring plan | Before major refactor |
| `/research-evidence` | Document research findings | After user research |
| `/design-ui` | Design with MYCURE standards | UI design phase |

---

**Pro Tip:** For multi-step processes, use workflows. For single tasks, use agents or slash commands.

**Related:**
- [Skill Activation Guide](skill-activation-guide.md) - Auto-activation modes
- [Healthcare Checklist](healthcare-checklist.md) - Pre-launch validation
- [Confidence Grading Cheatsheet](confidence-grading-cheatsheet.md) - HIGH/MEDIUM/LOW framework
