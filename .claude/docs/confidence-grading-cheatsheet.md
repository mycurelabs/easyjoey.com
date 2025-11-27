# Confidence Grading Cheatsheet

**Purpose:** Grade research evidence as HIGH, MEDIUM, or LOW confidence

**Format:** Decision tree for quick assessment

**Run `/research-evidence` command to document findings with confidence grades**

---

## Quick Decision Tree

```
START: Do you have evidence for this claim?
│
├─ NO → LOW CONFIDENCE (assumption, no evidence)
│
└─ YES → How many independent sources?
           │
           ├─ Only 1 source → LOW CONFIDENCE (single source, not validated)
           │
           ├─ 2 sources → Ask: Do they triangulate?
           │              │
           │              ├─ NO → LOW CONFIDENCE (sources contradict)
           │              └─ YES → MEDIUM CONFIDENCE (needs more validation)
           │
           └─ 3+ sources → Ask: PRIMARY RESEARCH included?
                          │
                          ├─ NO → MEDIUM CONFIDENCE (secondary only)
                          │
                          └─ YES → Ask: RECENT data (within 2 years)?
                                   │
                                   ├─ NO → MEDIUM CONFIDENCE (outdated)
                                   │
                                   └─ YES → Ask: PHILIPPINE-SPECIFIC?
                                            │
                                            ├─ NO → MEDIUM CONFIDENCE (extrapolated)
                                            │
                                            └─ YES → Ask: CONSISTENT across all sources?
                                                     │
                                                     ├─ NO → MEDIUM CONFIDENCE (contradictions)
                                                     │
                                                     └─ YES → HIGH CONFIDENCE ✅
```

---

## HIGH Confidence Requirements

**All 5 criteria must be met:**

1. ✅ **3+ independent sources**
   - Interview + Observation + DOH report
   - Survey + Site visit + Industry study
   - Multiple methodologies (not just 3 interviews)

2. ✅ **Primary research included**
   - User interviews (you conducted)
   - Direct observation (you witnessed)
   - Surveys (you ran)
   - NOT: Articles, blog posts, third-party reports alone

3. ✅ **Recent data (within 2 years for healthcare)**
   - Healthcare changes rapidly (tech adoption, policies)
   - 2023-2024 data for 2024 decisions
   - Older data requires revalidation

4. ✅ **Philippine-specific evidence**
   - Data from Philippine clinics (not US/EU extrapolated)
   - DOH reports, PhilHealth data, LGU surveys
   - Philippine healthcare context (not generic)

5. ✅ **Consistent across all sources**
   - No major contradictions
   - Minor variations acceptable (e.g., 15-20 min vs 18 min)
   - Major conflicts (some say critical, others say not needed) = MEDIUM

**Decision:** Proceed with full implementation (HIGH confidence justifies investment)

---

## MEDIUM Confidence Requirements

**1-2 of the 5 criteria are missing:**

**Common scenarios:**
- 3+ sources, but only secondary research (no interviews/observation)
- 3+ sources, but data is 3-4 years old
- 3+ sources, but extrapolated from US/EU (not PH-specific)
- Only 2 sources (needs more validation)
- Some contradictions across sources

**Examples:**
- "US study shows feature X is popular + Philippine article mentions it"
  - Missing: Primary research, recent PH-specific data
  - Grade: MEDIUM

- "Interviewed 8 users in 2021 (3 years ago)"
  - Missing: Recent data (healthcare changes rapidly)
  - Grade: MEDIUM

- "3 sources, but one says critical, one says nice-to-have, one says not needed"
  - Missing: Consistency (major contradictions)
  - Grade: MEDIUM

**Decision:** Validate further (conduct additional research) OR build MVP (limited scope until validated)

---

## LOW Confidence Requirements

**3+ of the 5 criteria are missing:**

**Common scenarios:**
- Single source only (one interview, one article)
- Pure assumption (no evidence)
- Contradictory sources (major conflicts)
- Very outdated data (5+ years old)
- Completely extrapolated (no Philippine context at all)

**Examples:**
- "I think clinics need this feature" (assumption, no evidence)
  - Grade: LOW

- "One user mentioned it in a support ticket"
  - Missing: Multiple sources, primary research, triangulation
  - Grade: LOW

- "US study from 2018 says feature X is important"
  - Missing: Recent, PH-specific, primary research
  - Grade: LOW

**Decision:** DO NOT BUILD (insufficient evidence, likely waste development time)

---

## Triangulation Methods

**Data Triangulation (Multiple Data Sources)**
```
User interviews (qualitative)
+
Usage analytics (quantitative)
+
Support tickets (behavioral)
= HIGH confidence (different data types confirm)
```

**Method Triangulation (Multiple Methods)**
```
Observation (what people actually do)
+
Interviews (what people say they do)
+
Surveys (what people report doing)
= HIGH confidence (methods validate each other)
```

**Context Triangulation (Multiple Contexts)**
```
Urban Metro Manila clinics
+
Rural provincial clinics
+
LGU health centers
= HIGH confidence (works across contexts)
```

---

## Confidence Grading Examples

### Example 1: Multi-Location Stock Transfer

**Evidence:**
1. **Interview** - 8 clinic admins transfer stock 2-3x/week (June 2024)
2. **Observation** - Manual Excel tracking takes 15-20 min/transfer (June 2024)
3. **DOH Report** - 42% of private clinics operate 2+ locations (2023)

**Grading:**
- 3+ sources? ✅ (Interview + Observation + DOH)
- Primary research? ✅ (Interviews + Direct observation)
- Recent? ✅ (2023-2024 data)
- PH-specific? ✅ (Philippine clinics, DOH report)
- Consistent? ✅ (All sources confirm need)

**Grade: HIGH CONFIDENCE** → Proceed with full implementation

---

### Example 2: AI-Powered Diagnosis Feature

**Evidence:**
1. **Blog post** - "AI diagnosis is the future of healthcare" (US, 2023)
2. **Article** - "Philippine hospitals explore AI" (PH, 2022)

**Grading:**
- 3+ sources? ❌ (Only 2 sources)
- Primary research? ❌ (No interviews or observation)
- Recent? ⚠️ (2022-2023, borderline)
- PH-specific? ⚠️ (One PH article, but not primary research)
- Consistent? ✅ (Both articles agree)

**Grade: MEDIUM CONFIDENCE** → Validate further (conduct user interviews with Philippine doctors)

---

### Example 3: Clinic Wants Purple Theme

**Evidence:**
1. **Sales call** - One clinic admin said "I like purple" (June 2024)

**Grading:**
- 3+ sources? ❌ (Only 1 source)
- Primary research? ✅ (Direct conversation)
- Recent? ✅ (June 2024)
- PH-specific? ✅ (Philippine clinic)
- Consistent? ❌ (N/A - only one source, can't check consistency)

**Grade: LOW CONFIDENCE** → DO NOT build (single opinion, not validated, likely personal preference)

---

### Example 4: Offline-First Requirement

**Evidence:**
1. **Interview** - 6/10 clinic admins report unreliable internet (June 2024)
2. **Observation** - Witnessed 3 clinics lose connection during demos (June 2024)
3. **DOH Report** - 35% of rural clinics lack reliable internet (2023)
4. **LGU Survey** - 42% of RHUs report daily internet outages (2024)

**Grading:**
- 3+ sources? ✅ (Interview + Observation + DOH + LGU = 4 sources)
- Primary research? ✅ (Interviews + Direct observation)
- Recent? ✅ (2023-2024 data)
- PH-specific? ✅ (Philippine clinics, DOH, LGU)
- Consistent? ✅ (All sources confirm unreliable internet)

**Grade: HIGH CONFIDENCE** → Proceed with offline-first architecture (critical requirement)

---

## Common Pitfalls

### Pitfall 1: Assuming 1 Source = Validated
```
❌ "A doctor said clinics need feature X"
→ LOW confidence (single source, not triangulated)

✅ "8 doctors said clinics need feature X, we observed them using workarounds, and DOH report confirms the gap"
→ HIGH confidence (multiple sources, triangulated)
```

### Pitfall 2: Extrapolating from US/EU
```
❌ "This works in US hospitals, so it will work in Philippine clinics"
→ MEDIUM confidence (not PH-specific, needs validation)

✅ "This works in US hospitals, AND we tested with 10 Philippine clinics and confirmed it solves their problem"
→ HIGH confidence (validated in PH context)
```

### Pitfall 3: Outdated Data
```
❌ "2018 study shows clinics need feature X"
→ MEDIUM confidence (6 years old, healthcare changed)

✅ "2024 interviews confirm clinics still need feature X (same as 2018 study)"
→ HIGH confidence (revalidated with recent data)
```

### Pitfall 4: Cherry-Picking Evidence
```
❌ "2 sources say yes, 1 source says no" → Report only the 2 "yes" sources
→ MEDIUM confidence (contradictions ignored)

✅ "2 sources say yes, 1 source says no" → Investigate discrepancy
→ Understand why sources differ, then re-grade
```

---

## Decision Matrix

| **Confidence** | **3+ Sources** | **Primary Research** | **Recent (<2yr)** | **PH-Specific** | **Consistent** | **Action** |
|----------------|----------------|---------------------|------------------|----------------|----------------|------------|
| HIGH ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **Proceed** with full implementation |
| MEDIUM ⚠️ | ⚠️ 1-2 missing | ⚠️ 1-2 missing | ⚠️ 1-2 missing | ⚠️ 1-2 missing | ⚠️ 1-2 missing | **Validate further** or **Build MVP** |
| LOW ❌ | ❌ 3+ missing | ❌ 3+ missing | ❌ 3+ missing | ❌ 3+ missing | ❌ 3+ missing | **DO NOT build** (research more first) |

---

## Quick Self-Check

**Before proceeding with a feature, ask:**

1. Can I name 3+ independent sources for this claim? (Not 3 people saying the same thing, but 3 different evidence types)

2. Did we conduct primary research? (Interviews, observation, surveys - not just reading articles)

3. Is this data from the last 2 years? (Healthcare changes fast)

4. Is this specific to Philippine healthcare? (Not US/EU extrapolated)

5. Do all sources consistently say the same thing? (No major contradictions)

**If you answered YES to all 5 → HIGH confidence** ✅

**If you answered YES to 3-4 → MEDIUM confidence** ⚠️

**If you answered YES to 0-2 → LOW confidence** ❌

---

## Related Resources

- [Research Synthesis Guidelines](../skills/_healthcare/research-synthesis-guidelines/SKILL.md) - Complete confidence grading framework
- [Research to Implementation Workflow](../workflows/research-to-implementation.md) - Evidence → Validation process
- [/research-evidence Command](../commands/research-evidence.md) - Document findings with confidence grades
- [Feature Development Workflow](../workflows/feature-development-workflow.md) - Evidence-based development

---

**Remember:** In healthcare software, building the wrong feature (LOW confidence) wastes time and money. Building the right feature with HIGH confidence evidence ensures we solve real problems for Philippine healthcare providers.
