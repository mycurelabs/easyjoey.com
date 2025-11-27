---
name: [agent-name]
description: [One-sentence description of what this agent does]
category: [Code Review | Feature Development | Research | Testing | Security | Other]
complexity: [Simple | Moderate | Complex]
estimated_duration: [5 min | 15 min | 30 min | 1 hour | 2+ hours]
requires_approval: [YES | NO]
author: [Your Name]
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
---

# [Agent Name]

**Agent Type:** [Sequential | Parallel | Hybrid]

**Purpose:** [2-3 sentences explaining what this agent accomplishes and when to use it]

**Best used for:** [Specific use cases where this agent excels]

---

## Agent Capabilities

### Primary Capability
**What it does:** [Main function of this agent]

**Success criteria:**
- [Measurable criterion 1]
- [Measurable criterion 2]
- [Measurable criterion 3]

### Secondary Capabilities
- [Capability 1]: [Brief description]
- [Capability 2]: [Brief description]
- [Capability 3]: [Brief description]

---

## When to Use This Agent

**Use this agent when:**
1. [Scenario 1 - be specific]
2. [Scenario 2 - be specific]
3. [Scenario 3 - be specific]

**Don't use this agent when:**
- [Scenario where a different approach is better]
- [Scenario where manual work is more efficient]
- [Scenario where a different agent is more appropriate]

**Alternative approaches:**
- [Alternative 1]: [When to use it instead]
- [Alternative 2]: [When to use it instead]

---

## Agent Workflow

### Phase 1: [Phase Name] (Duration: [X min])

**Objective:** [What does this phase accomplish?]

**Steps:**
1. **[Step 1 Title]**
   - Action: [What to do]
   - Tools: [Which Claude Code tools to use]
   - Output: [What to produce]
   - Success check: [How to verify success]

2. **[Step 2 Title]**
   - Action: [What to do]
   - Tools: [Which tools to use]
   - Output: [What to produce]
   - Success check: [How to verify success]

3. **[Step 3 Title]**
   - Action: [What to do]
   - Tools: [Which tools to use]
   - Output: [What to produce]
   - Success check: [How to verify success]

**Decision Gate:**
- [ ] All success checks passed?
- [ ] No blockers encountered?
- [ ] Ready to proceed to next phase?

**If blocked:** [What to do if this phase fails]

---

### Phase 2: [Phase Name] (Duration: [X min])

**Objective:** [What does this phase accomplish?]

**Steps:**
[Repeat structure from Phase 1]

**Decision Gate:**
[Repeat structure from Phase 1]

---

### Phase 3: [Phase Name] (Duration: [X min])

[Continue pattern for all phases]

---

## Agent Coordination

### Sequential Execution (If Applicable)

**Agent Chain:**
```
[Agent 1] → [Agent 2] → [Agent 3] → [Final Output]
```

**Handoff points:**
1. **[Agent 1] → [Agent 2]**
   - Trigger: [What event triggers next agent?]
   - Data passed: [What information is passed?]
   - Format: [How is data formatted?]

2. **[Agent 2] → [Agent 3]**
   - Trigger: [What event triggers next agent?]
   - Data passed: [What information is passed?]
   - Format: [How is data formatted?]

---

### Parallel Execution (If Applicable)

**Parallel agents:**
```
        ┌─ [Agent A] ─┐
[Input] ├─ [Agent B] ─┤ → [Consolidation] → [Final Output]
        └─ [Agent C] ─┘
```

**Coordination:**
- All agents run concurrently
- Results consolidated after all complete
- No dependencies between parallel agents

---

## State Management

**State tracking file:** `.claude/agents/state/[agent-name]-state.json`

**State schema:**
```json
{
  "agentName": "[agent-name]",
  "runId": "run_[timestamp]",
  "startedAt": "2025-11-24T10:30:00Z",
  "status": "running | completed | failed | blocked",
  "currentPhase": 1,
  "totalPhases": 3,
  "phases": [
    {
      "phaseNumber": 1,
      "name": "[Phase Name]",
      "status": "completed | in_progress | pending | failed",
      "startedAt": "2025-11-24T10:30:00Z",
      "completedAt": "2025-11-24T10:35:00Z",
      "duration": "5 minutes",
      "outputs": [
        {
          "type": "file",
          "path": "/path/to/output.md",
          "description": "[What this output is]"
        }
      ],
      "errors": []
    }
  ],
  "context": {
    "userRequest": "[Original user request]",
    "targetFiles": ["/path/to/file1.ts", "/path/to/file2.ts"],
    "parameters": {
      "key1": "value1",
      "key2": "value2"
    }
  },
  "results": {
    "summary": "[Brief summary of results]",
    "metrics": {
      "filesAnalyzed": 10,
      "issuesFound": 5,
      "timeElapsed": "15 minutes"
    },
    "recommendations": [
      "[Recommendation 1]",
      "[Recommendation 2]"
    ]
  }
}
```

**State updates:**
- Update state after each phase completes
- Log errors in `phases[].errors[]`
- Track all outputs in `phases[].outputs[]`

---

## Error Handling

### Common Errors

**Error 1: [Error Type]**
- **Cause:** [What causes this error?]
- **Detection:** [How to detect it?]
- **Resolution:** [How to fix it?]
- **Prevention:** [How to prevent it?]

**Error 2: [Error Type]**
- **Cause:** [What causes this error?]
- **Detection:** [How to detect it?]
- **Resolution:** [How to fix it?]
- **Prevention:** [How to prevent it?]

**Error 3: [Error Type]**
[Continue pattern]

---

### Error Recovery Strategy

**For non-critical errors:**
1. Log error in state file
2. Continue with warning
3. Report in final summary

**For critical errors:**
1. Log error in state file
2. Mark phase as "failed"
3. Stop agent execution
4. Report to user with recovery options

**For blockers (user input needed):**
1. Mark phase as "blocked"
2. Pause agent execution
3. Request user input/decision
4. Resume after user responds

---

## Output Artifacts

### Primary Outputs

**Output 1: [Artifact Name]**
- **Type:** [File type - markdown, code, JSON, etc.]
- **Location:** [Where is this saved?]
- **Format:** [What format/structure?]
- **Purpose:** [What is this used for?]

**Output 2: [Artifact Name]**
[Repeat structure]

### Secondary Outputs

- **State file:** `.claude/agents/state/[agent-name]-state.json`
- **Logs:** [Where are logs stored?]
- **Metrics:** [What metrics are collected?]

---

## Examples

### Example 1: [Simple Use Case]

**User Request:**
> "[Exact user request]"

**Agent Execution:**

**Phase 1: [Phase Name]** (2 minutes)
- Analyzed [X] files
- Found [Y] issues
- Output: [file-path]

**Phase 2: [Phase Name]** (3 minutes)
- Processed [X] items
- Generated [Y] recommendations
- Output: [file-path]

**Phase 3: [Phase Name]** (1 minute)
- Consolidated findings
- Created report
- Output: [file-path]

**Final Result:**
- ✅ Success: [What was accomplished]
- 📊 Metrics: [Key metrics]
- 📁 Artifacts: [What files were created]

---

### Example 2: [Complex Use Case]

[Repeat structure for complex scenario with multiple phases, errors, and recovery]

---

### Example 3: [Error Recovery Scenario]

**User Request:**
> "[Request that encounters an error]"

**Agent Execution:**

**Phase 1: [Phase Name]** (2 minutes)
- ✅ Completed successfully

**Phase 2: [Phase Name]** (Started)
- ❌ Error encountered: [Error description]
- Recovery action: [What was done to recover]
- Result: [Partial success | Full recovery | Failed]

**Agent Status:** [Completed with warnings | Blocked | Failed]

**User Action Required:** [What user needs to do]

---

## Performance Metrics

**Target metrics:**
- **Completion time:** [Target duration]
- **Success rate:** [Target % success]
- **Files processed:** [Expected number]
- **Issues detected:** [Expected range]

**Actual metrics (from testing):**
- **Average completion time:** [Actual duration]
- **Success rate:** [Actual % success]
- **Files processed:** [Actual number]
- **Issues detected:** [Actual range]

---

## Testing

### Test Cases

**Test Case 1: Happy Path**
- **Input:** [Test input]
- **Expected output:** [Expected result]
- **Success criteria:** [How to verify success]

**Test Case 2: Edge Case**
- **Input:** [Edge case input]
- **Expected output:** [Expected result]
- **Success criteria:** [How to verify success]

**Test Case 3: Error Case**
- **Input:** [Input that causes error]
- **Expected behavior:** [How agent should handle error]
- **Success criteria:** [Error handled gracefully]

---

### Testing Checklist

- [ ] Happy path tested (all phases complete successfully)
- [ ] Edge cases tested (unusual but valid inputs)
- [ ] Error cases tested (invalid inputs, missing files)
- [ ] State file created and updated correctly
- [ ] All outputs generated in correct format
- [ ] Error messages are clear and actionable
- [ ] Performance within target metrics
- [ ] Agent can be resumed after interruption

---

## Dependencies

### Required Tools
- [Tool 1]: [What it's used for]
- [Tool 2]: [What it's used for]
- [Tool 3]: [What it's used for]

### Required Skills
- [Skill 1]: [When it's needed]
- [Skill 2]: [When it's needed]

### Required Commands
- [Command 1]: [When it's invoked]
- [Command 2]: [When it's invoked]

### External Dependencies
- [Dependency 1]: [What version/requirement]
- [Dependency 2]: [What version/requirement]

---

## Invocation

### Command Line

```bash
# Direct invocation
/agent [agent-name]

# With parameters
/agent [agent-name] --target=/path/to/file.ts --depth=2

# Resume from state
/agent [agent-name] --resume=run_20251124_103000
```

### Programmatic

```typescript
// From another agent or workflow
const result = await invokeAgent({
  name: '[agent-name]',
  parameters: {
    target: '/path/to/file.ts',
    depth: 2
  },
  context: {
    userRequest: 'Original request',
    previousResults: {}
  }
});
```

### Via Task Tool

```markdown
User: "I need a comprehensive code review"