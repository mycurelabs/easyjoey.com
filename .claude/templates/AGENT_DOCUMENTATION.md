# How to Write Effective Claude Agents

**Purpose:** This guide teaches you how to create high-quality Claude agents that autonomously execute complex, multi-step tasks with proper state management, error handling, and coordination patterns.

**Target Audience:** Developers and architects who want to build specialized agents that extend Claude Code's capabilities for complex workflows.

---

## What is a Claude Agent?

A **Claude agent** is an autonomous task executor that performs complex, multi-step operations with:
- **State tracking** (knows what it's doing, what it's done, where it is)
- **Error handling** (graceful failures, recovery strategies)
- **Coordination** (can chain with other agents or run in parallel)
- **Decision making** (can adapt based on intermediate results)

### Agents vs Skills vs Commands

| Type | Purpose | Complexity | Autonomy | State Tracking |
|------|---------|------------|----------|----------------|
| **Command** | Quick shortcut | Simple | Low | None |
| **Skill** | Domain knowledge | Variable | Medium | None |
| **Agent** | Complex task executor | High | High | Full |

**Use an agent when:**
- Task requires 3+ sequential phases
- Each phase depends on results of previous phase
- Task may take 5+ minutes to complete
- You need to track progress and resume if interrupted
- Multiple decisions need to be made autonomously
- Task involves coordination between multiple sub-tasks

**Don't use an agent when:**
- Simple one-step task → Use a command
- Providing domain knowledge → Use a skill
- Quick lookup or search → Use tools directly

---

## Agent Architecture Patterns

### Pattern 1: Sequential Agent (Most Common)

**Use for:** Tasks with clear phases that must execute in order

```
[Phase 1: Analysis] → [Phase 2: Processing] → [Phase 3: Report]
       ↓                      ↓                       ↓
   Decision Gate         Decision Gate          Final Output
```

**Example:** Code review agent
1. Phase 1: Analyze code structure
2. Phase 2: Check for issues (security, performance, style)
3. Phase 3: Generate consolidated report

**Characteristics:**
- Each phase completes before next begins
- Later phases depend on earlier phase outputs
- Decision gates between phases
- Can stop/resume at any phase

---

### Pattern 2: Parallel Agent

**Use for:** Tasks with independent sub-tasks that can run concurrently

```
                ┌─ [Task A] ─┐
[Input/Setup] →├─ [Task B] ─┤→ [Consolidation] → [Final Output]
                └─ [Task C] ─┘
```

**Example:** Multi-file analysis agent
1. Setup: Identify files to analyze
2. Parallel: Analyze each file independently
3. Consolidation: Merge results into report

**Characteristics:**
- Sub-tasks have no dependencies
- All sub-tasks start simultaneously
- Results consolidated after all complete
- Faster than sequential (if sub-tasks are independent)

---

### Pattern 3: Hybrid Agent (Sequential + Parallel)

**Use for:** Complex workflows with both sequential phases and parallel sub-tasks

```
[Phase 1: Sequential] → ┌─ [Parallel A] ─┐ → [Phase 3: Sequential]
                        ├─ [Parallel B] ─┤
                        └─ [Parallel C] ─┘
```

**Example:** Research-driven development agent
1. Phase 1: Conduct research (sequential)
2. Phase 2: Run multiple validations in parallel
3. Phase 3: Synthesize findings and create report (sequential)

**Characteristics:**
- Combines benefits of both patterns
- More complex to coordinate
- Most flexible for real-world workflows

---

## State Management (Critical for Agents)

**Why state management matters:**
- Agents can take minutes/hours to complete
- User may interrupt (Ctrl+C, network issue, system restart)
- Need to resume from where it stopped, not restart from beginning
- Need to track progress for user visibility

### State File Structure

**Location:** `.claude/agents/state/[agent-name]-[run-id].json`

**Minimal state schema:**
```json
{
  "agentName": "code-review-agent",
  "runId": "run_20251124_103045",
  "status": "running",
  "currentPhase": 2,
  "totalPhases": 4,
  "startedAt": "2025-11-24T10:30:45Z",
  "phases": [
    {
      "phaseNumber": 1,
      "name": "Code Structure Analysis",
      "status": "completed",
      "startedAt": "2025-11-24T10:30:45Z",
      "completedAt": "2025-11-24T10:33:12Z",
      "outputs": [
        {
          "type": "file",
          "path": "/path/to/structure-analysis.md"
        }
      ]
    },
    {
      "phaseNumber": 2,
      "name": "Security Audit",
      "status": "in_progress",
      "startedAt": "2025-11-24T10:33:15Z"
    }
  ]
}
```

### State Updates

**When to update state:**
1. **Agent starts:** Create initial state file
2. **Phase completes:** Update phase status to "completed", add outputs
3. **Phase starts:** Update current phase number, phase status to "in_progress"
4. **Error occurs:** Add error to phase.errors[], mark phase as "failed"
5. **Agent completes:** Update agent status to "completed", add final results

**Example state update workflow:**
```typescript
// Agent starts
const state = {
  agentName: 'code-review-agent',
  runId: generateRunId(),
  status: 'running',
  currentPhase: 1,
  totalPhases: 3,
  startedAt: new Date().toISOString(),
  phases: []
};
await writeState(state);

// Phase 1 starts
state.phases.push({
  phaseNumber: 1,
  name: 'Code Analysis',
  status: 'in_progress',
  startedAt: new Date().toISOString()
});
await writeState(state);

// Phase 1 completes
state.phases[0].status = 'completed';
state.phases[0].completedAt = new Date().toISOString();
state.phases[0].outputs = [{ type: 'file', path: '/path/to/output.md' }];
state.currentPhase = 2;
await writeState(state);

// Agent completes
state.status = 'completed';
state.completedAt = new Date().toISOString();
state.results = { summary: '...', metrics: {...}, recommendations: [...] };
await writeState(state);
```

---

## Decision Gates (Critical Success Factor)

**What is a decision gate?**
A checkpoint between phases where the agent decides whether to:
- ✅ Proceed to next phase
- ⚠️ Proceed with warnings
- ❌ Stop execution (critical error)
- ⏸️ Block and wait for user input

### Decision Gate Pattern

```markdown
## Phase 1: Analysis

[Phase steps...]

### Decision Gate
- [ ] Analysis completed successfully?
- [ ] No critical errors found?
- [ ] All required data collected?
- [ ] Next phase prerequisites met?

**Decision:**
- If all ✅ → Proceed to Phase 2
- If any ❌ → Stop, report error to user
- If warnings but not critical → Proceed with warning
- If user input needed → Block, wait for user
```

**Example:**

```typescript
// After Phase 1 completes
const phase1Results = await runPhase1();

// Decision gate checks
const decisionGate = {
  analysisComplete: phase1Results.filesAnalyzed > 0,
  noCriticalErrors: phase1Results.criticalErrors.length === 0,
  dataCollected: phase1Results.data !== null,
  prerequisitesMet: phase1Results.dependencies.every(d => d.available)
};

// Make decision
if (!decisionGate.analysisComplete) {
  return {
    status: 'failed',
    error: 'No files were analyzed',
    recommendation: 'Check that target directory contains files'
  };
}

if (!decisionGate.noCriticalErrors) {
  return {
    status: 'failed',
    error: `Found ${phase1Results.criticalErrors.length} critical errors`,
    errors: phase1Results.criticalErrors
  };
}

if (!decisionGate.prerequisitesMet) {
  return {
    status: 'blocked',
    message: 'Missing required dependencies',
    missingDependencies: phase1Results.dependencies.filter(d => !d.available),
    userAction: 'Please install missing dependencies and retry'
  };
}

// All checks passed, proceed to Phase 2
await runPhase2(phase1Results.data);
```

---

## Error Handling Strategies

### Error Categories

| Category | Severity | Example | Recovery Strategy |
|----------|----------|---------|-------------------|
| **Transient** | Low | Network timeout, rate limit | Retry with backoff |
| **Fixable** | Medium | Missing file, invalid config | Provide fix instructions, wait for user |
| **Critical** | High | Target doesn't exist, permission denied | Stop agent, clear error message |
| **Unexpected** | High | Unhandled exception | Stop agent, log full error, request support |

---

### Recovery Patterns

**Pattern 1: Retry with Backoff (Transient Errors)**

```typescript
async function fetchWithRetry(url: string, maxRetries = 3): Promise<Response> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetch(url);
    } catch (error) {
      if (attempt === maxRetries) throw error;

      const backoff = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
      console.log(`Attempt ${attempt} failed, retrying in ${backoff}ms...`);
      await sleep(backoff);
    }
  }
}
```

**Pattern 2: Graceful Degradation (Partial Failure)**

```typescript
// If some files fail to analyze, continue with the rest
const results = await Promise.allSettled(
  files.map(file => analyzeFile(file))
);

const successful = results.filter(r => r.status === 'fulfilled');
const failed = results.filter(r => r.status === 'rejected');

if (failed.length === files.length) {
  // All failed - critical error
  throw new Error('Unable to analyze any files');
}

if (failed.length > 0) {
  // Some failed - continue with warnings
  console.warn(`Failed to analyze ${failed.length}/${files.length} files`);
  return {
    status: 'completed_with_warnings',
    successful: successful.length,
    failed: failed.length,
    results: successful.map(r => r.value)
  };
}

// All succeeded
return {
  status: 'completed',
  results: successful.map(r => r.value)
};
```

**Pattern 3: User-Assisted Recovery (Fixable Errors)**

```typescript
// Missing configuration file
if (!fs.existsSync(configPath)) {
  await updateState({
    status: 'blocked',
    currentPhase: 1,
    blockReason: 'Missing configuration file',
    userAction: {
      required: true,
      message: `Configuration file not found at: ${configPath}`,
      instructions: [
        'Create a configuration file with the following structure:',
        '```json',
        JSON.stringify(defaultConfig, null, 2),
        '```',
        'Then run: /agent resume code-review-agent'
      ]
    }
  });

  return {
    status: 'blocked',
    message: 'Configuration file required. See state file for instructions.'
  };
}
```

---

## Agent Coordination

### Pattern 1: Sequential Chaining

**When to use:** Agent B needs results from Agent A

```typescript
// Agent A completes, triggers Agent B
const agentAResults = await runAgent('research-analyst', {
  target: 'patient-workflows'
});

if (agentAResults.confidence === 'HIGH') {
  // Chain to Agent B
  await runAgent('design-creator', {
    requirements: agentAResults.requirements,
    context: agentAResults.context
  });
}
```

**Example workflow:**
```
Research Agent → Design Agent → Implementation Agent → Test Agent
```

---

### Pattern 2: Parallel Execution

**When to use:** Multiple agents can run independently

```typescript
// Run multiple agents in parallel
const results = await Promise.all([
  runAgent('security-auditor', { target: codebase }),
  runAgent('performance-analyzer', { target: codebase }),
  runAgent('code-simplicity-checker', { target: codebase })
]);

// Consolidate results
const consolidatedReport = consolidateResults(results);
```

**Example workflow:**
```
                    ┌─ Security Agent ─┐
Code Review Agent →├─ Performance Agent ─┤→ Report Consolidator
                    └─ Simplicity Agent ─┘
```

---

### Pattern 3: Conditional Branching

**When to use:** Different agents based on conditions

```typescript
const analysisResults = await runAgent('code-analyzer', { target });

// Branch based on results
if (analysisResults.hasSecurityIssues) {
  await runAgent('security-hardener', {
    issues: analysisResults.securityIssues
  });
}

if (analysisResults.hasPerformanceIssues) {
  await runAgent('performance-optimizer', {
    bottlenecks: analysisResults.performanceBottlenecks
  });
}
```

---

## Agent Communication Protocol

### Input Contract

**Every agent should accept:**
```typescript
interface AgentInput {
  // Primary target (file, directory, feature name, etc.)
  target: string;

  // User's original request (for context)
  userRequest?: string;

  // Parameters specific to this agent
  parameters?: Record<string, any>;

  // Context from previous agents (if chained)
  previousResults?: any;

  // Resume from previous run
  resumeFromState?: string; // run ID
}
```

### Output Contract

**Every agent should return:**
```typescript
interface AgentOutput {
  // Execution status
  status: 'completed' | 'completed_with_warnings' | 'failed' | 'blocked';

  // Run ID for this execution
  runId: string;

  // Summary of what was accomplished
  summary: string;

  // Detailed results
  results: {
    // Key metrics
    metrics: Record<string, number>;

    // Generated artifacts (files, reports, etc.)
    artifacts: Array<{
      type: 'file' | 'report' | 'data';
      path: string;
      description: string;
    }>;

    // Recommendations for user
    recommendations: string[];
  };

  // Errors encountered (if any)
  errors?: Array<{
    phase: number;
    message: string;
    severity: 'warning' | 'error' | 'critical';
  }>;

  // User action required (if blocked)
  userAction?: {
    required: boolean;
    message: string;
    instructions: string[];
  };

  // State file location (for resume)
  stateFile: string;
}
```

---

## Testing Agents

### Testing Checklist

- [ ] **Happy path test:** Agent completes successfully with valid input
- [ ] **Edge case test:** Agent handles unusual but valid inputs
- [ ] **Error recovery test:** Agent handles errors gracefully
- [ ] **Resume test:** Agent can resume from interrupted state
- [ ] **Performance test:** Agent completes within expected time
- [ ] **State persistence test:** State file created and updated correctly
- [ ] **Output validation test:** All expected artifacts are generated
- [ ] **Decision gate test:** All decision gates work correctly

---

### Test Case Template

```markdown
## Test Case: [Name]

**Input:**
- Target: [Test target]
- Parameters: [Test parameters]
- Context: [Test context]

**Expected Behavior:**
1. Phase 1 should [expected behavior]
2. Phase 2 should [expected behavior]
3. Final output should [expected behavior]

**Success Criteria:**
- [ ] Agent status: "completed"
- [ ] All phases complete successfully
- [ ] State file created: `.claude/agents/state/[agent]-[runid].json`
- [ ] Output artifact created: [expected file path]
- [ ] Metrics match expected range: [metric] = [expected value ± tolerance]

**Actual Result:**
- Status: [actual status]
- Phases completed: [X/Y]
- State file: [exists | missing]
- Output artifact: [exists | missing]
- Metrics: [actual values]

**Pass/Fail:** [PASS | FAIL]

**Notes:** [Any observations, issues, improvements]
```

---

## Agent Examples (Real-World)

### Example 1: Code Review Agent (Sequential)

**Purpose:** Comprehensive code review with architecture, security, performance, and simplicity checks

**Phases:**
1. **Phase 1: Code Structure Analysis** (2-3 min)
   - Analyze file structure, dependencies, imports
   - Identify entry points, key modules
   - Map data flow

2. **Phase 2: Multi-Dimensional Review** (5-10 min)
   - **Parallel sub-agents:**
     - Architecture reviewer (patterns, SOLID principles)
     - Security auditor (vulnerabilities, auth issues)
     - Performance analyzer (bottlenecks, optimization opportunities)
     - Simplicity checker (over-engineering, unnecessary complexity)

3. **Phase 3: Consolidation** (1-2 min)
   - Merge findings from all reviewers
   - Prioritize issues (critical → high → medium → low)
   - Generate unified report

4. **Phase 4: Recommendations** (1 min)
   - Suggest specific fixes for each issue
   - Provide code examples where applicable
   - Link to relevant documentation

**Total duration:** 9-16 minutes

**Invocation:**
```bash
/agent code-review --target=src/features/patient-registration/
```

---

### Example 2: Research-Driven Development Agent (Hybrid)

**Purpose:** Evidence-based feature development from research to implementation

**Phases:**
1. **Phase 1: Research Synthesis** (Sequential, 10-15 min)
   - Collect evidence from multiple sources
   - Apply triangulation (data + method + context)
   - Grade confidence (HIGH/MEDIUM/LOW)
   - Extract functional and non-functional requirements

2. **Phase 2: Validation** (Parallel, 5-10 min if MEDIUM confidence)
   - **If HIGH confidence:** Skip to Phase 3
   - **If MEDIUM confidence:** Run parallel validation:
     - Additional user interviews
     - Competitor analysis
     - Technical feasibility check
   - **If LOW confidence:** Stop, recommend more research

3. **Phase 3: Design** (Sequential, 15-20 min)
   - Create design brief with requirements
   - Apply MYCURE brand standards
   - Validate WCAG 2.2 Level AA compliance
   - Generate wireframes/mockups

4. **Phase 4: Implementation Planning** (Sequential, 10-15 min)
   - Break down requirements into tasks
   - Estimate effort for each task
   - Identify dependencies and risks
   - Create implementation roadmap

**Total duration:** 40-60 minutes (varies by confidence level)

**Invocation:**
```bash
/agent research-driven-dev --feature="multi-location stock transfer"
```

---

## Agent Best Practices

### ✅ DO

1. **Always track state**
   - Why: Enables resume after interruption
   - Example: Write state file after each phase

2. **Implement decision gates**
   - Why: Prevents wasted work on bad data
   - Example: Check prerequisites before starting expensive operations

3. **Handle errors gracefully**
   - Why: Partial success is better than complete failure
   - Example: Continue analyzing remaining files if one file fails

4. **Provide clear user feedback**
   - Why: Users need to know what's happening and why
   - Example: "Phase 2/4: Analyzing security vulnerabilities (3 files remaining)..."

5. **Make agents resumable**
   - Why: Long-running agents may be interrupted
   - Example: Store enough state to resume from any phase

6. **Write modular phases**
   - Why: Easier to test, debug, and modify
   - Example: Each phase should be independently testable

---

### ❌ DON'T

1. **Don't create agents for simple tasks**
   - Why not: Overhead of state management not worth it
   - Instead: Use commands or skills for simple tasks

2. **Don't ignore errors and continue blindly**
   - Why not: Garbage in, garbage out - later phases will fail anyway
   - Instead: Stop at decision gates if critical errors found

3. **Don't make agents that require constant user interaction**
   - Why not: Defeats the purpose of autonomous agents
   - Instead: Gather all required input upfront, or make reasonable assumptions

4. **Don't create monolithic agents**
   - Why not: Hard to test, debug, and reuse
   - Instead: Break into smaller, reusable agents that can be chained

5. **Don't skip state management**
   - Why not: Agent can't resume if interrupted
   - Instead: Always write state file, update after each phase

---

## Agent Development Workflow

### Step 1: Define Agent Purpose

**Questions to answer:**
- What problem does this agent solve?
- What are the inputs and outputs?
- What phases are required?
- How long should this agent take?
- What are the success criteria?

---

### Step 2: Design Agent Workflow

**Map out phases:**
1. [Phase 1 name] - [What it does] - [Duration]
2. [Phase 2 name] - [What it does] - [Duration]
3. [Phase 3 name] - [What it does] - [Duration]

**Identify decision gates:**
- After [Phase 1]: Check [criteria]
- After [Phase 2]: Check [criteria]

**Plan error handling:**
- [Error type 1] → [Recovery strategy]
- [Error type 2] → [Recovery strategy]

---

### Step 3: Implement State Management

**Create state schema:**
```json
{
  "agentName": "[name]",
  "runId": "[unique-id]",
  "status": "running | completed | failed | blocked",
  "currentPhase": 1,
  "phases": [...]
}
```

**Add state updates:**
- Agent start → Create state file
- Phase start → Update current phase
- Phase complete → Mark phase completed, add outputs
- Agent complete → Update final status, add results

---

### Step 4: Test Agent

**Run test cases:**
- Happy path (all phases succeed)
- Edge cases (unusual inputs)
- Error cases (invalid inputs, missing files)
- Resume test (interrupt and resume)

**Validate outputs:**
- State file created and updated
- All expected artifacts generated
- Error messages clear and actionable

---

### Step 5: Document Agent

**Create documentation:**
- Purpose and use cases
- Input parameters
- Output artifacts
- Example usage
- Error handling
- Performance metrics

---

## Appendix: Agent State Schema Reference

**Complete state schema with all optional fields:**

```json
{
  // Required fields
  "agentName": "string",
  "runId": "string (format: run_YYYYMMDD_HHMMSS)",
  "status": "string (running | completed | failed | blocked)",
  "currentPhase": "number",
  "totalPhases": "number",
  "startedAt": "string (ISO 8601 timestamp)",

  // Optional fields
  "completedAt": "string (ISO 8601 timestamp)",
  "duration": "string (e.g., '15 minutes')",

  // Context
  "context": {
    "userRequest": "string (original user request)",
    "target": "string (primary target: file, directory, feature)",
    "parameters": {
      "key1": "value1",
      "key2": "value2"
    },
    "previousResults": {} // If chained from another agent
  },

  // Phases
  "phases": [
    {
      "phaseNumber": "number",
      "name": "string",
      "status": "string (pending | in_progress | completed | failed | blocked)",
      "startedAt": "string (ISO 8601 timestamp)",
      "completedAt": "string (ISO 8601 timestamp)",
      "duration": "string (e.g., '5 minutes')",
      "outputs": [
        {
          "type": "string (file | report | data)",
          "path": "string (file path)",
          "description": "string"
        }
      ],
      "errors": [
        {
          "message": "string",
          "severity": "string (warning | error | critical)",
          "timestamp": "string (ISO 8601 timestamp)"
        }
      ],
      "metrics": {
        "filesProcessed": "number",
        "issuesFound": "number",
        "customMetric": "any"
      }
    }
  ],

  // Final results (when completed)
  "results": {
    "summary": "string (brief summary)",
    "metrics": {
      "totalFilesAnalyzed": "number",
      "totalIssuesFound": "number",
      "criticalIssues": "number",
      "customMetric": "any"
    },
    "artifacts": [
      {
        "type": "string (file | report | data)",
        "path": "string",
        "description": "string"
      }
    ],
    "recommendations": [
      "string (recommendation 1)",
      "string (recommendation 2)"
    ]
  },

  // If blocked (waiting for user action)
  "userAction": {
    "required": "boolean",
    "message": "string",
    "instructions": [
      "string (step 1)",
      "string (step 2)"
    ]
  },

  // Error tracking
  "errors": [
    {
      "phase": "number",
      "message": "string",
      "severity": "string (warning | error | critical)",
      "timestamp": "string (ISO 8601 timestamp)",
      "stackTrace": "string (optional)"
    }
  ]
}
```

---

## Related Resources

- [Agent Template](agent-template.md) - Copy-paste agent structure
- [Agent State Template](agent-state-template.json) - State file template
- [Skill Documentation](SKILL_DOCUMENTATION.md) - For domain knowledge (not task execution)
- [Command Templates](../commands/_TEMPLATE.md) - For simple shortcuts

**Example Agents:**
- [Multi-Agent Code Review](.claude/agents/_examples/multi-agent-code-review.md)
- [Research-Driven Development](.claude/agents/_examples/research-driven-development.md)
- [Healthcare Validation](.claude/agents/_examples/healthcare-validation.md)
- [Documentation Pipeline](.claude/agents/_examples/documentation-pipeline.md)
