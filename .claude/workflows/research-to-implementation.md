# Research to Implementation Workflow

**Purpose:** Systematic process from evidence synthesis to production code

**When to use:** Starting new features, validating product direction, making data-driven decisions

**Estimated time:** 2-4 weeks (research → build → validate)

---

## Overview

This workflow ensures product decisions are grounded in HIGH confidence research, designed with compliance, and validated against original assumptions. It prevents building features nobody needs and validates that implementations solve real problems.

**Philosophy:** Research → Decide → Design → Build → Validate → Iterate or Ship

**Quick start:** Run `/research-evidence` to begin research synthesis

---

## Phase 1: Research Synthesis

**Skill:** `research-synthesis-guidelines`
**Command:** `/research-evidence`
**Duration:** 3-5 days

### Step 1: Define Research Question

```markdown
Research Question: Do multi-location clinics need automated stock transfer functionality?

Why we're asking: Manual tracking reported as pain point in 3 sales calls.
Decision impact: Major feature (3-4 weeks development)
Required confidence level: HIGH (3+ sources, primary research, PH-specific)
```

### Step 2: Gather Evidence

**Primary Research (must include):**
- User interviews: 8-10 target users
- Direct observation: 3-5 site visits
- Surveys: 50+ target users

**Secondary Research:**
- Government data (DOH reports)
- Industry studies
- Competitor analysis

**Internal Data:**
- Support tickets
- Feature requests
- Pilot clinic feedback

### Step 3: Apply Confidence Grading

**HIGH Confidence Requirements:**
```markdown
✅ 3+ independent sources
✅ Primary research included (interviews/observation)
✅ Recent data (within 2 years for healthcare)
✅ Philippine-specific (not US/EU extrapolated)
✅ Consistent across all sources (no major contradictions)
```

### Step 4: Document Findings

```markdown
## Finding: Multi-location stock transfer is essential [HIGH CONFIDENCE]

**Summary:** 80% of multi-location clinics transfer stock 2-3x per week, spending 15-20 minutes per transfer on manual Excel tracking.

**Evidence:**
1. **Interview** - Dr. Santos (Clinic A), "We transfer stock between branches 2-3 times weekly. Excel tracking takes 15-20 minutes per transfer." June 15, 2024
2. **Interview** - 7 additional clinic administrators reported similar patterns (June 2024)
3. **Observation** - Observed 3 clinics: average 17.2 minutes per transfer (n=9 transfers), June 10-12, 2024
4. **DOH Report** - 2023 Philippine Health Facility Survey, page 42: "42% of private clinics operate 2+ locations"

**Triangulation:** Interview reports + Direct observation + Government data = HIGH confidence

**Limitations:** Urban Metro Manila clinics only. Rural multi-location clinics not studied.

**Implications:** Must-have feature for multi-location clinic market segment (42% of target market). Current manual process inefficient (15-20 min). Opportunity for 75%+ time savings.
```

### Decision Gate: Confidence Level

- ✅ **HIGH** → Proceed to Phase 2 (Implementation)
- ⚠️ **MEDIUM** → Validate further if feature is critical, or descope if nice-to-have
- ❌ **LOW** → DO NOT proceed. Conduct additional research or abandon feature.

**Output:** Research report with confidence-graded findings

---

## Phase 2: Decision Making

**Duration:** 1 day

### Assess Confidence Level

**HIGH Confidence Finding:**
```
Decision: PROCEED with full implementation
Rationale: 3+ sources, primary research, PH-specific, recent, consistent
Risk: Low (well-validated need)
Investment: Justified (target 42% of market)
```

**MEDIUM Confidence Finding:**
```
Decision: VALIDATE FURTHER or BUILD MVP
Rationale: Some evidence gaps (only 1-2 sources, dated, extrapolated)
Risk: Medium (may build wrong thing)
Investment: Limited scope until validated
```

**LOW Confidence Finding:**
```
Decision: DO NOT BUILD
Rationale: Insufficient evidence (single source, assumption, contradictory)
Risk: HIGH (likely waste development time)
Investment: Research more before proceeding
```

### Extract Requirements from Research

```markdown
## Functional Requirements (from HIGH confidence findings)

FR1: Transfer stock between locations
  Source: 8/8 interviews mentioned need

FR2: Validate sufficient stock before transfer
  Source: Observation showed manual validation step

FR3: Create audit trail (who, what, when, where, why)
  Source: DOH report requires audit trails

FR4: Work offline (rural clinics)
  Source: 3/8 clinics reported unreliable internet

FR5: Mobile-responsive
  Source: 6/8 administrators use smartphones primarily
```

**Output:** Requirements document grounded in research

---

## Phase 3: Design & Planning

**Skills:** `frontend-design` + `healthcare-ux-guidelines`
**Commands:** `/design-ui`, `/audit-wcag`
**Duration:** 4-7 days

### Design UI (frontend-design)

Run `/design-ui` with research context:

```markdown
Interface: Stock transfer form
Users: Clinic administrators (from research: 60% female, age 28-45, medium digital literacy)
Context: Used 2-3x per week, mobile-first

Design requirements:
- Typography: JetBrains Mono for lot numbers (research showed confusion with similar characters)
- Colors: MYCURE Clinical palette
- Offline-first: Research showed 37% use in areas with unreliable internet
```

### Validate Compliance (healthcare-ux-guidelines)

Run `/audit-wcag`:
- Color contrast 7:1 (research: 2 users reported vision impairments)
- Touch targets 48x48px (research: used on mobile 75% of time)
- Patient safety language (all error messages)

### Plan Implementation (development-plan-reviewer)

Technical specification with:
- Database schema
- API endpoints
- Offline sync strategy (IndexedDB)
- Philippine context (FHISIS, PhilHealth)

**Output:** WCAG-compliant designs + implementation plan

---

## Phase 4: Implementation

**Duration:** 8-12 days

### Build According to Plan

- Implement features validated by HIGH confidence research
- Maintain WCAG compliance
- Use patient safety language
- Test offline functionality

### Continuous Validation

During development, ask:
- Does this solve the problem identified in research?
- Are we building what users said they need?
- Does this match observed workflows?

**Output:** Feature ready for validation testing

---

## Phase 5: Validation

**Skill:** `research-synthesis-guidelines` (validate assumptions)
**Duration:** 3-5 days

### User Testing with Original Research Participants

**Recruit:** Same 8-10 users from original research
**Tasks:** Real workflows with actual data
**Method:** Think-aloud protocol, time on task

### Measure Against Research Hypotheses

```markdown
## Original Research Hypothesis:
"Multi-location transfer automation will save 10-15 minutes per transfer"

## Validation Testing:
Method: 8 users × 3 transfers each = 24 transfers
Baseline (from research): 17.2 min average
MYCURE process: [Measure]
Time savings: [Calculate]

## Results:
MYCURE average: 3.8 min per transfer
Time savings: 13.4 min (78% reduction)

Hypothesis: CONFIRMED ✅
Confidence: HIGH (user testing validates original research)
```

### Grade Validation Confidence

```markdown
## Validation Finding: Transfer time reduced 78% [HIGH CONFIDENCE]

**Evidence:**
1. **User testing** - 8 users, 24 transfers, average 3.8 min (range: 3.2-4.5), June 2024
2. **User feedback** - 8/8 rated feature "very valuable" (5/5 scale)
3. **Observation** - No confusion, workflows intuitive, no errors

**Triangulation:** Testing metrics + User feedback + Observation = HIGH

**Comparison to Original Research:**
- Original hypothesis: 10-15 min savings ✅
- Actual result: 13.4 min savings (within predicted range)
- Original finding VALIDATED

**Decision:** Ship to production
```

### Validation Decision Gates

**Validation Confirms HIGH Confidence:**
```
✅ SHIP TO PRODUCTION
Rationale: Original research validated by user testing
Risk: Low (evidence-based, user-validated)
```

**Validation Shows Gaps:**
```
⚠️ ITERATE
Rationale: Implementation doesn't fully solve researched problem
Risk: Medium (may need adjustments)
Action: Address gaps, re-test
```

**Validation Contradicts Research:**
```
❌ STOP - RE-RESEARCH
Rationale: Original research may have been flawed
Risk: HIGH (building wrong thing)
Action: Conduct new research to understand discrepancy
```

**Output:** Validation report with ship/iterate/stop decision

---

## Phase 6: Iteration or Ship

### If Validation Successful (HIGH confidence)

**Ship to Production:**
1. Final WCAG audit (`/audit-wcag`)
2. Security review (`security-sentinel`)
3. Performance testing (`performance-oracle`)
4. Deploy to production
5. Monitor metrics
6. Document validated finding for future reference

### If Validation Shows Issues (MEDIUM/LOW confidence)

**Iterate:**
1. Identify specific gaps (what didn't work?)
2. Understand why (user interviews, observation)
3. Make targeted fixes
4. Re-test with users
5. Re-grade confidence
6. Repeat until HIGH confidence or pivot

### If Validation Contradicts Research (LOW confidence)

**Stop and Re-Research:**
1. Document what went wrong (research flaw? implementation issue?)
2. Conduct additional research to understand discrepancy
3. Decide: Fix research, fix implementation, or abandon feature

**Output:** Production release OR iteration plan OR pivot decision

---

## Workflow Diagram

```
┌──────────────────────────────────┐
│ Phase 1: Research Synthesis      │
│ • Define question                │
│ • Gather evidence                │
│ • Grade confidence (H/M/L)       │
│ • Document findings              │
└────────────┬─────────────────────┘
             │
        HIGH confidence?
             │
             ▼
┌──────────────────────────────────┐
│ Phase 2: Decision Making         │
│ • Assess confidence              │
│ • Extract requirements           │
│ • Decide: Proceed/Validate/Stop  │
└────────────┬─────────────────────┘
             │
          Proceed?
             │
             ▼
┌──────────────────────────────────┐
│ Phase 3: Design & Planning       │
│ • UI design (/design-ui)         │
│ • WCAG audit (/audit-wcag)       │
│ • Implementation plan            │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│ Phase 4: Implementation          │
│ • Build feature                  │
│ • Maintain compliance            │
│ • Continuous validation          │
└────────────┬─────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│ Phase 5: Validation              │
│ • User testing (original users)  │
│ • Measure against hypothesis     │
│ • Grade validation confidence    │
└────────────┬─────────────────────┘
             │
      Validation successful?
             │
     ┌───────┴───────┐
     │               │
     ▼               ▼
┌─────────┐   ┌──────────┐
│  Ship   │   │ Iterate  │
│   to    │   │    or    │
│ Prod    │   │Re-Research│
└─────────┘   └──────────┘
```

---

## Example: Stock Transfer Feature

### Phase 1: Research (HIGH Confidence)
- 8 interviews + 3 observations + DOH data
- Finding: 80% transfer 2-3x/week, 15-20 min each
- Confidence: HIGH ✅

### Phase 2: Decision
- Proceed with full implementation (HIGH confidence justifies investment)

### Phase 3: Design
- Mobile-first UI (research: 75% use mobile)
- Offline-capable (research: 37% unreliable internet)
- WCAG AAA contrast (research: 2 users vision-impaired)

### Phase 4: Implementation
- 10 days development
- All requirements from research implemented
- WCAG compliant, patient safety language

### Phase 5: Validation
- 8 users (same as original research)
- Result: 3.8 min average (vs 17.2 min baseline)
- 78% time savings (hypothesis: 66-88%)
- Finding: HIGH confidence ✅

### Phase 6: Ship
- Validation confirms research
- Deploy to production
- Monitor: 4.2 min average in real usage (close to testing)

**Result:** Evidence-based feature that solves real problem, validated before and after implementation.

---

## Best Practices

**DO:**
- ✅ Base decisions on HIGH confidence research (3+ sources)
- ✅ Validate assumptions with original research participants
- ✅ Document both research and validation findings
- ✅ Stop if validation contradicts research (investigate discrepancy)
- ✅ Use validation metrics to measure success

**DON'T:**
- ❌ Build features based on LOW confidence assumptions
- ❌ Skip validation ("we already researched it")
- ❌ Ignore discrepancies between research and validation
- ❌ Cherry-pick validation data to confirm bias
- ❌ Ship without measuring against original hypothesis

---

## Related Resources

- [Research Synthesis Guidelines](../skills/_healthcare/research-synthesis-guidelines/SKILL.md) - Confidence grading framework
- [Feature Development Workflow](feature-development-workflow.md) - Complete feature process
- [Healthcare UX Guidelines](../skills/_healthcare/healthcare-ux-guidelines/SKILL.md) - WCAG + patient safety
- [/research-evidence Command](../commands/research-evidence.md) - Research synthesis shortcut

---

**Remember:** Research without validation is guessing. Implementation without research is gambling. This workflow ensures every feature is grounded in evidence and validated before release—minimizing waste and maximizing impact.
