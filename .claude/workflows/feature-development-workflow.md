# Feature Development Workflow

**Purpose:** Evidence-based feature development process for MYCURE healthcare products

**When to use:** Developing new features, major enhancements, or new modules

**Estimated time:** 2-4 weeks (depending on feature complexity)

---

## Overview

This workflow ensures features are built on HIGH confidence research, designed with healthcare compliance, planned systematically, and validated before release. It combines multiple skills and agents for evidence-based product development.

**Philosophy:** Build the right thing (research) the right way (design + compliance) with the right plan (development review) and validate it works (user testing).

---

## Workflow Phases

### Phase 1: Research (Days 1-3)
**Skill:** `research-synthesis-guidelines`
**Command:** `/research-evidence`

**Purpose:** Understand user needs and validate feature necessity with HIGH confidence evidence

**Steps:**

1. **Define Research Question**
   ```markdown
   Research Question: Do Philippine clinic administrators need multi-location stock transfer functionality?

   Success Criteria: HIGH confidence finding (3+ sources, PH-specific, recent, triangulated)
   ```

2. **Gather Evidence**
   - **Primary Research:**
     - User interviews (8-10 target users)
     - Direct observation (3-5 clinic visits)
     - Surveys (50+ target users)

   - **Secondary Research:**
     - DOH reports and statistics
     - Industry studies (healthcare IT in Philippines)
     - Competitor analysis

   - **Internal Data:**
     - Support tickets and feature requests
     - Usage analytics from pilot clinics
     - Sales feedback

3. **Grade Confidence**
   Apply HIGH/MEDIUM/LOW grading framework:

   **HIGH Confidence Requirements:**
   - ✅ 3+ independent sources
   - ✅ Primary research included
   - ✅ Recent data (within 2 years)
   - ✅ Philippine-specific evidence
   - ✅ Consistent across all sources

4. **Triangulate Findings**
   ```markdown
   ## Finding: Multi-location stock transfer is essential [HIGH CONFIDENCE]

   **Evidence:**
   1. **Interview** - 8/10 clinic admins transfer stock 2-3x/week (June 2024)
   2. **Observation** - Manual Excel tracking takes 15-20 min/transfer (June 2024)
   3. **DOH Report** - 42% of private clinics operate 2+ locations (2023)

   **Triangulation:** Interview + Observation + Government data = HIGH

   **Implications:** Must-have feature for multi-location clinics. Manual process inefficient.
   ```

5. **Document with Citations**
   - Include dates, sources, specific data points
   - Preserve raw research data in appendices
   - Acknowledge limitations and gaps

**Decision Gate:**
- ✅ HIGH confidence → Proceed to Phase 2
- ⚠️ MEDIUM confidence → Validate further or descope
- ❌ LOW confidence → DO NOT proceed, research more

**Output:** Research report with confidence-graded findings

---

### Phase 2: Design (Days 4-7)
**Skills:** `frontend-design` + `healthcare-ux-guidelines`
**Commands:** `/design-ui`, `/audit-wcag`

**Purpose:** Create compliant, distinctive UI/UX that meets healthcare standards

**Steps:**

1. **UI Design** (frontend-design skill)
   Run `/design-ui` command with context:

   ```markdown
   Interface Type: Dashboard widget for stock transfers
   Target Users: Clinic administrators, pharmacists

   Design Requirements:
   - Typography: JetBrains Mono for lot numbers (zero-ambiguity)
   - Colors: MYCURE Clinical palette (Clinical Blue, Medical Green)
   - Animation: Fast transitions (100ms for status updates)
   ```

   **Create:**
   - Wireframes/mockups
   - Component specifications
   - Interaction patterns

2. **Apply MYCURE Standards**
   - ❌ NEVER: Inter, Roboto fonts
   - ✅ PREFER: Space Grotesk (headings), IBM Plex Sans (body), JetBrains Mono (data)
   - Color: MYCURE Clinical palette (#0066CC, #003366, #00A86B)
   - Animation: Healthcare-optimized (100ms, 150ms, 200ms)

3. **WCAG 2.2 Level AA Validation** (healthcare-ux-guidelines skill)
   Run `/audit-wcag` command:

   **Check:**
   - [ ] Color contrast 4.5:1 (text), 3:1 (UI components)
   - [ ] Keyboard navigation fully functional
   - [ ] Screen reader compatible
   - [ ] Focus indicators 3px minimum
   - [ ] Touch targets 44x44px
   - [ ] Form labels clear

4. **Patient Safety Language**
   Review all user-facing text:

   | ❌ Avoid | ✅ Use Instead |
   |---------|---------------|
   | "Transfer failed - error 500" | "Unable to complete transfer. Please verify the quantity and try again." |
   | "Invalid lot number" | "Please check the lot number and try again." |
   | "Stock not found" | "This item is not available at the selected location." |

5. **Philippine Healthcare Context**
   - [ ] Works offline (rural clinics with 2G/3G)
   - [ ] Mobile-responsive (80%+ PH users on mobile)
   - [ ] Filipino language support (if patient-facing)
   - [ ] Optimized for low bandwidth (<500KB page load)

**Decision Gate:**
- ✅ WCAG audit passes → Proceed to Phase 3
- ❌ WCAG violations → Fix before proceeding

**Output:** WCAG-compliant UI mockups with patient safety language

---

### Phase 3: Planning (Days 8-10)
**Agent:** `development-plan-reviewer`
**Commands:** `/plan-refactor` (if refactoring)

**Purpose:** Create systematic implementation plan with risk assessment

**Steps:**

1. **Write Technical Specification**
   ```markdown
   # Technical Specification: Multi-Location Stock Transfer

   ## Functional Requirements
   - FR1: Users can initiate transfer from Source Location to Destination Location
   - FR2: System validates sufficient stock at Source before transfer
   - FR3: Transfer creates audit trail (who, what, when, where, why)
   - FR4: Destination must acknowledge receipt before stock deducted from Source

   ## Non-Functional Requirements
   - NFR1: Works offline, syncs when connected (IndexedDB)
   - NFR2: WCAG 2.2 Level AA compliant
   - NFR3: Response time <2 seconds on 3G connection
   - NFR4: Supports 1000+ concurrent transfers across all clinics

   ## Data Model
   [Database schema, API endpoints, data flows]

   ## Philippine Healthcare Context
   - FHISIS export compatibility
   - PhilHealth audit trail requirements
   - LGU reporting needs
   ```

2. **Run development-plan-reviewer Agent**
   Agent validates:
   - [ ] Technical feasibility
   - [ ] Completeness (all requirements addressed)
   - [ ] Resource estimates realistic
   - [ ] Risks identified with mitigation
   - [ ] Standards compliance (WCAG, security, healthcare)

3. **Estimate Resources**
   - Development time (hours/days)
   - Team capacity
   - Dependencies (external APIs, other features)
   - Buffer time (20-30% for unknowns)

4. **Identify Risks**
   ```markdown
   | Risk | Likelihood | Impact | Mitigation |
   |------|-----------|--------|------------|
   | Offline sync conflicts | Medium | High | Implement conflict resolution UI + last-write-wins with manual override |
   | Low bandwidth timeout | High | Medium | Optimize payload size, implement retry logic |
   | PhilHealth audit requirements unclear | Low | High | Consult with PhilHealth liaison, design flexible audit log |
   ```

5. **Sequence Implementation**
   - Phase 1: Core transfer logic (backend)
   - Phase 2: UI components (frontend)
   - Phase 3: Offline sync (IndexedDB)
   - Phase 4: Testing and validation

**Decision Gate:**
- ✅ Plan approved by stakeholders → Proceed to Phase 4
- ❌ Plan has gaps or high risks → Revise and resubmit

**Output:** Approved technical specification and implementation plan

---

### Phase 4: Implementation (Days 11-18)

**Purpose:** Build feature according to plan while maintaining compliance

**Steps:**

1. **Setup Development Environment**
   - Create feature branch
   - Set up local testing environment
   - Configure linting/formatting tools

2. **Implement Core Functionality**
   Follow TDD (Test-Driven Development):
   - Write tests first (unit, integration)
   - Implement to pass tests
   - Refactor for clarity

3. **Maintain Compliance Throughout**
   - Use patient safety language in all error messages
   - Implement WCAG-compliant HTML/ARIA
   - Add keyboard navigation support
   - Test with screen reader regularly

4. **Code Review**
   - Self-review against checklist
   - Peer review
   - Run `/review-code` command before requesting review

5. **Testing**
   - Unit tests (>80% coverage)
   - Integration tests (API endpoints)
   - E2E tests (user workflows)
   - Accessibility testing (keyboard nav, screen reader)
   - Cross-browser testing
   - Mobile testing (iOS, Android)
   - Low-bandwidth testing (3G throttling)

6. **Documentation**
   - Update API documentation
   - Write user guide
   - Add inline code comments for complex logic
   - Document configuration options

**Output:** Tested, documented, review-ready code

---

### Phase 5: Validation (Days 19-21)

**Purpose:** Validate assumptions from original research and ensure feature works as intended

**Steps:**

1. **Internal Testing**
   - QA team testing
   - Product manager validation
   - Stakeholder review

2. **User Testing with Healthcare Professionals**
   - 5-8 target users (clinic admins, pharmacists)
   - Real tasks with actual data
   - Think-aloud protocol
   - Record observations and feedback

3. **Metrics Collection**
   ```markdown
   ## Validation Metrics

   **Hypothesis (from research):** Multi-location transfer will save 10-15 minutes per transfer

   **Measurement:**
   - Manual process: 15.2 minutes average (baseline from research)
   - MYCURE process: [Measure during testing]
   - Time savings: [Calculate]

   **Success Criteria:** ≥10 minutes saved (66% reduction)
   ```

4. **WCAG Final Validation**
   Run `/audit-wcag` command on production-ready code:
   - [ ] All WCAG 2.2 AA criteria met
   - [ ] Keyboard navigation tested
   - [ ] Screen reader tested (NVDA/JAWS)
   - [ ] Color contrast verified (WebAIM tool)
   - [ ] Patient safety language validated

5. **Philippine Context Testing**
   - [ ] Offline mode tested (disconnect network)
   - [ ] Low bandwidth tested (3G throttling)
   - [ ] Mobile devices tested (iOS/Android)
   - [ ] Filipino language tested (if applicable)

6. **Document Validation Findings** (research-synthesis-guidelines)
   ```markdown
   ## Validation Study: Multi-Location Stock Transfer [HIGH CONFIDENCE]

   **Method:** User testing with 8 clinic administrators (June 2024)

   **Finding:** Transfer time reduced from 15.2 min to 3.8 min (75% reduction)

   **Evidence:**
   1. **User testing** - 8 users completed 3 transfers each (n=24 transfers)
   2. **Time tracking** - Average: 3.8 min (range: 3.2-4.5 min)
   3. **User feedback** - 8/8 rated feature "very valuable" (5/5 scale)

   **Confidence:** HIGH (user testing + time data + feedback)

   **Decision:** Ship to production
   ```

**Decision Gate:**
- ✅ Validation confirms HIGH confidence + no critical issues → Ship
- ⚠️ Validation shows gaps or usability issues → Iterate
- ❌ Validation fails hypotheses → Re-research or pivot

**Output:** Validated feature ready for production release

---

## Workflow Diagram

```
┌──────────────────────────────────────┐
│  Phase 1: Research                   │
│  • Define question                   │
│  • Gather evidence                   │
│  • Grade confidence (H/M/L)          │
│  • Triangulate                       │
└──────────┬───────────────────────────┘
           │
       HIGH confidence?
           │
           ▼
┌──────────────────────────────────────┐
│  Phase 2: Design                     │
│  • UI mockups (/design-ui)           │
│  • MYCURE standards                  │
│  • WCAG audit (/audit-wcag)          │
│  • Patient safety language           │
└──────────┬───────────────────────────┘
           │
      WCAG passes?
           │
           ▼
┌──────────────────────────────────────┐
│  Phase 3: Planning                   │
│  • Technical spec                    │
│  • Plan review (dev-plan-reviewer)   │
│  • Estimate resources                │
│  • Identify risks                    │
└──────────┬───────────────────────────┘
           │
     Plan approved?
           │
           ▼
┌──────────────────────────────────────┐
│  Phase 4: Implementation             │
│  • TDD (tests first)                 │
│  • Maintain compliance               │
│  • Code review (/review-code)        │
│  • Testing (unit, integration, E2E)  │
└──────────┬───────────────────────────┘
           │
     Tests pass?
           │
           ▼
┌──────────────────────────────────────┐
│  Phase 5: Validation                 │
│  • User testing (5-8 users)          │
│  • Metrics collection                │
│  • Final WCAG audit                  │
│  • Document findings (H/M/L)         │
└──────────┬───────────────────────────┘
           │
   Validation successful?
           │
     ┌─────┴─────┐
     │           │
     ▼           ▼
┌─────────┐  ┌────────┐
│ Ship to │  │Iterate │
│Production│  │        │
└─────────┘  └────────┘
```

---

## Example: Multi-Location Stock Transfer Feature

### Phase 1: Research (3 days)

**Research Question:** Do clinics need multi-location stock transfer?

**Evidence Gathered:**
1. Interviewed 10 clinic administrators (8 said yes, transfers 2-3x/week)
2. Observed 3 clinics using manual Excel tracking (15-20 min per transfer)
3. DOH 2023 report: 42% of private clinics have 2+ locations

**Confidence Grading:** HIGH (3+ sources, primary research, recent, PH-specific, consistent)

**Decision:** Proceed to design ✅

---

### Phase 2: Design (4 days)

**UI Mockup:**
- Dashboard widget with "Transfer Stock" button
- Modal form: Source Location, Destination Location, Item, Quantity, Lot Number, Reason
- Color: Clinical Blue (#0066CC) for action button
- Typography: JetBrains Mono for lot numbers

**WCAG Validation:**
- Color contrast: 7.2:1 (AAA) ✅
- Keyboard navigation: Tab order logical ✅
- Screen reader: All fields labeled ✅
- Touch targets: 48x48px ✅

**Patient Safety Language:**
- Error: "Unable to complete transfer. Requested quantity (500) exceeds available stock (300)." ✅

**Decision:** WCAG passes, proceed to planning ✅

---

### Phase 3: Planning (3 days)

**Technical Spec:**
- Backend: GraphQL mutation `initiateStockTransfer`
- Frontend: React component `StockTransferModal`
- Database: `stock_transfers` table with audit fields
- Offline: IndexedDB with sync queue

**Resource Estimate:**
- Backend: 16 hours
- Frontend: 24 hours
- Testing: 12 hours
- Total: 52 hours (2 developers × 1.5 weeks with buffer)

**Risks:**
- Offline sync conflicts (Medium likelihood, High impact)
- Mitigation: Manual conflict resolution UI

**Decision:** Plan approved by stakeholders ✅

---

### Phase 4: Implementation (8 days)

**Progress:**
- Backend API: Complete ✅
- Frontend UI: Complete ✅
- Offline sync: Complete ✅
- Unit tests: 87% coverage ✅
- Integration tests: All passing ✅
- E2E tests: 12 scenarios passing ✅

**Code Review:**
- Architecture: SOLID principles followed ✅
- Simplicity: Complexity within acceptable range ✅
- Security: No vulnerabilities ✅
- Performance: < 2s response time on 3G ✅

**Decision:** Tests pass, code approved, proceed to validation ✅

---

### Phase 5: Validation (3 days)

**User Testing:** 8 clinic administrators

**Metrics:**
- Manual process: 15.2 min average
- MYCURE process: 3.8 min average
- Time savings: 11.4 min (75% reduction) ✅

**WCAG Final Audit:** All criteria met ✅

**User Feedback:** 8/8 rated "very valuable" ✅

**Validation Finding:** HIGH confidence (user testing + metrics + feedback confirm original research)

**Decision:** Ship to production ✅

---

## Best Practices

**DO:**
- ✅ Base features on HIGH confidence research (3+ sources)
- ✅ Design with WCAG 2.2 AA from the start (not as afterthought)
- ✅ Use patient safety language in ALL user-facing text
- ✅ Test with real users (healthcare professionals, patients)
- ✅ Validate assumptions from original research

**DON'T:**
- ❌ Build features based on LOW confidence assumptions
- ❌ Skip WCAG validation ("we'll fix accessibility later")
- ❌ Use alarming error messages (violates patient safety)
- ❌ Ship without user testing
- ❌ Ignore Philippine healthcare context (offline, mobile, LGU)

---

## Related Resources

- [Research Synthesis Guidelines](../skills/_healthcare/research-synthesis-guidelines/SKILL.md) - Confidence grading framework
- [Healthcare UX Guidelines](../skills/_healthcare/healthcare-ux-guidelines/SKILL.md) - WCAG + patient safety
- [Frontend Design](../skills/_frontend/frontend-design/SKILL.md) - MYCURE design standards
- [Development Plan Reviewer](../agents/_review/development-plan-reviewer.md) - Plan validation agent
- [/research-evidence Command](../commands/research-evidence.md) - Research synthesis shortcut
- [/design-ui Command](../commands/design-ui.md) - Design with MYCURE standards
- [/audit-wcag Command](../commands/audit-wcag.md) - WCAG validation shortcut

---

**Remember:** In healthcare software, features that don't solve real problems (LOW confidence research) waste development time. Features that don't meet accessibility standards (WCAG violations) exclude patients with disabilities and violate legal requirements. Evidence-based development ensures we build the right thing the right way.
