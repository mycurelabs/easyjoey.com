# MCP Decision Guide: WebFetch vs Built-In Tools vs MCP Servers

**Purpose:** Comprehensive framework for deciding when to use WebFetch, built-in tools, or MCP servers, with token cost analysis and practical examples.

**Target Audience:** Developers, system architects, and teams evaluating whether to build or configure MCP servers.

**Last Updated:** 2025-11-24

---

## Table of Contents

1. [Overview](#overview)
2. [Understanding Your Tool Options](#understanding-your-tool-options)
3. [WebFetch Self-Cleaning Cache](#webfetch-self-cleaning-cache)
4. [Token Cost Analysis](#token-cost-analysis)
5. [Decision Framework](#decision-framework)
6. [Use Case Matrix](#use-case-matrix)
7. [Migration Scenarios](#migration-scenarios)
8. [Cost-Benefit Examples](#cost-benefit-examples)
9. [Common Pitfalls](#common-pitfalls)
10. [Quick Reference](#quick-reference)

---

## Overview

### Why This Guide Exists

MCP servers can extend Claude Code's capabilities, but they come with token overhead (~1,200 tokens per server + ~200 tokens per tool call). **This guide helps you make informed decisions about when that overhead is justified and when built-in tools are more efficient.**

### Key Principle

**Start with built-in tools (WebFetch, WebSearch, Bash) and only add MCP servers when:**
1. Built-in tools cannot accomplish the task
2. Operations will be repeated frequently (5+ times per session)
3. Complex workflows require multiple coordinated API calls
4. Token cost is justified by workflow automation value

### Quick Decision Rule

- **One-time operations:** Use WebFetch (500 tokens)
- **Occasional operations (2-4 times):** Use WebFetch with cache (500 tokens total)
- **Frequent operations (5+ times):** Consider MCP (1,200 + 200N tokens justified)
- **Complex workflows:** MCP required (built-in tools can't handle)

---

## Understanding Your Tool Options

### Built-In Tools (Zero Token Overhead)

These tools are built into Claude Code and have no additional token cost:

#### 1. WebFetch
- **Purpose:** Fetch content from URLs (documentation, APIs, web pages)
- **Cache:** 15-minute self-cleaning cache (first call: ~500 tokens, cached calls: ~0 tokens)
- **Best For:** Documentation fetching, one-time API calls, content that will be referenced 1-3 times
- **Limitations:** HTTP GET only, no authentication, no complex workflows

#### 2. WebSearch
- **Purpose:** Search the internet for information
- **Best For:** Research, finding best practices, discovering solutions to problems
- **Limitations:** Search results only, no direct API interaction

#### 3. Bash
- **Purpose:** Execute terminal commands (git, npm, curl, etc.)
- **Best For:** Direct CLI operations, git commands, simple API calls with curl
- **Limitations:** Manual command construction, limited error handling

### MCP Servers (Token Overhead)

MCP servers extend Claude Code with specialized tools:

- **Token Overhead:** ~1,200 tokens (server context) + ~200 tokens per tool call
- **Best For:** Repeated operations (5+), complex workflows, browser automation, stateful interactions
- **Examples:** GitHub MCP (create issues, manage PRs), Browser Tools MCP (screenshots, automation), Slack MCP (messaging)

---

## WebFetch Self-Cleaning Cache

### How the Cache Works

WebFetch includes a **15-minute self-cleaning cache** that makes it highly efficient for documentation fetching:

**Cache Behavior:**
1. **First call to a URL:** Fetches content from the internet (~500 tokens)
2. **Subsequent calls (< 15 minutes):** Returns cached content (~0 additional tokens)
3. **After 15 minutes:** Cache expires, fetches fresh content (~500 tokens)

**Example Session:**
```
Time 0:00 - WebFetch("https://example.com/docs") → 500 tokens (fetch)
Time 0:05 - WebFetch("https://example.com/docs") → 0 tokens (cached)
Time 0:10 - WebFetch("https://example.com/docs") → 0 tokens (cached)
Time 0:16 - WebFetch("https://example.com/docs") → 500 tokens (cache expired, refetch)
```

### Token Efficiency Implications

**For a typical documentation lookup session:**
- **Scenario:** Fetch MCP protocol documentation 3 times in 10 minutes
- **WebFetch:** 500 tokens total (first call cached for subsequent calls)
- **MCP:** 1,200 + (200 × 3) = 1,800 tokens total
- **Savings:** 1,300 tokens (72% more efficient with WebFetch)

**When cache is less beneficial:**
- Operations spanning > 15 minutes between calls
- Fetching many unique URLs (each URL cached separately)
- Real-time data requiring fresh fetches

---

## Token Cost Analysis

### Token Overhead Breakdown

#### WebFetch (Built-In)
- **Initialization:** 0 tokens (built-in)
- **Per Call:** ~500 tokens (first call), ~0 tokens (cached calls < 15 min)
- **Total for 3 calls (< 15 min):** 500 tokens

#### MCP Server
- **Initialization (One-Time per Server):**
  - Server context: ~400 tokens
  - Available tools listing: ~600 tokens
  - Schema definitions: ~200 tokens
  - **Total:** ~1,200 tokens

- **Per Tool Call:**
  - Tool invocation: ~100 tokens
  - Input parameters: ~50-100 tokens
  - Response formatting: ~50-100 tokens
  - **Total:** ~200-300 tokens per call

- **Total for 3 calls:** 1,200 + (200 × 3) = 1,800 tokens

### Cost Comparison Table

| Scenario | WebFetch | MCP | Winner |
|----------|----------|-----|--------|
| **1 call** | 500 tokens | 1,400 tokens | WebFetch (64% savings) |
| **2 calls (< 15 min)** | 500 tokens | 1,600 tokens | WebFetch (69% savings) |
| **3 calls (< 15 min)** | 500 tokens | 1,800 tokens | WebFetch (72% savings) |
| **5 calls (mixed, some cached)** | 1,000-1,500 tokens | 2,200 tokens | WebFetch (32-55% savings) |
| **10 calls (all unique URLs)** | 5,000 tokens | 3,200 tokens | MCP (36% savings) |
| **20 calls (complex workflow)** | N/A (not possible) | 5,200 tokens | MCP (enables workflow) |

### Break-Even Analysis

**Break-even point:** When is MCP more efficient than WebFetch?

**Formula:**
- MCP Total Cost = 1,200 + (200 × N)
- WebFetch Total Cost = 500 × U (where U = unique URLs)

**Break-even scenarios:**
1. **All unique URLs:** N ≥ 6 calls (MCP becomes more efficient at 6+ unique URL fetches)
2. **50% cached calls:** N ≥ 10 calls (MCP becomes more efficient at 10+ calls with 50% cache hit rate)
3. **90% cached calls (documentation lookup):** N ≥ 20 calls (MCP becomes more efficient at 20+ calls with 90% cache hit rate)

**Conclusion:** For typical documentation lookup (high cache hit rate), WebFetch is more efficient for up to 20 calls per session.

---

## Decision Framework

### Step 1: Can Built-In Tools Accomplish the Task?

**Questions to ask:**

- [ ] **Is it a one-time HTTP GET request?**
  - ✅ Yes → Use **WebFetch**
  - ❌ No → Continue to next question

- [ ] **Is it searching for information or research?**
  - ✅ Yes → Use **WebSearch**
  - ❌ No → Continue to next question

- [ ] **Is it a terminal command (git, npm, curl)?**
  - ✅ Yes → Use **Bash**
  - ❌ No → Continue to Step 2

### Step 2: How Frequently Will This Operation Occur?

**Frequency analysis:**

- **1-2 times per session:**
  - Use WebFetch (500 tokens) or Bash
  - MCP overhead (1,400-1,600 tokens) not justified

- **3-4 times per session:**
  - Use WebFetch with cache (500 tokens) or Bash
  - MCP overhead (1,800-2,000 tokens) still not justified

- **5-9 times per session:**
  - **Evaluation needed:** Consider workflow complexity
  - If simple calls: WebFetch or Bash may still be better
  - If complex workflow: MCP may be justified

- **10+ times per session:**
  - **MCP likely justified** if workflow automation provides value
  - Break-even point reached for token efficiency

### Step 3: Is This a Complex Workflow?

**Workflow complexity indicators:**

- [ ] **Requires multiple coordinated API calls**
  - Example: Create GitHub issue → Add labels → Assign users → Post comment
  - Built-in tools: Requires 4 separate Bash/curl commands with manual coordination
  - MCP: Single workflow tool or sequential tool calls with state management

- [ ] **Requires stateful interactions**
  - Example: Authentication session, transaction management
  - Built-in tools: Cannot maintain state across calls
  - MCP: Maintains state within server process

- [ ] **Requires browser automation**
  - Example: Screenshots, web interaction, form filling
  - Built-in tools: Not possible
  - MCP: Browser Tools MCP required

- [ ] **Requires real-time data processing**
  - Example: Streaming logs, live updates
  - Built-in tools: Not possible
  - MCP: SSE transport enables real-time data

**If you checked any box:** MCP is likely required (built-in tools cannot handle)

### Step 4: Is the Token Cost Justified?

**Cost-benefit analysis:**

Calculate **Workflow Value** vs **MCP Overhead**:

**Workflow Value:**
- Time saved per session (e.g., 30 minutes automated)
- Error reduction (e.g., no manual copy-paste errors)
- Consistency improvement (e.g., standardized processes)
- Team productivity gain (e.g., entire team benefits)

**MCP Overhead:**
- Initial setup: 1,200 tokens
- Per-operation cost: 200 tokens
- Configuration complexity: Time to set up and maintain
- External dependencies: API keys, server process management

**If Workflow Value > MCP Overhead:** Proceed with MCP

**Example:**
- **Workflow:** Automated GitHub issue creation with labels, assignment, and project board addition
- **Manual Process:** 5 minutes per issue × 10 issues/session = 50 minutes
- **MCP Process:** 30 seconds per issue × 10 issues/session = 5 minutes
- **Time Saved:** 45 minutes/session
- **Token Cost:** 1,200 + (200 × 10) = 3,200 tokens
- **Justification:** ✅ 45 minutes saved >> 3,200 tokens overhead

### Step 5: Are External Dependencies Acceptable?

**Consider:**

- [ ] **Can your team install and manage MCP server packages?**
  - Python MCPs: Requires `pip install mcp[fastmcp]`
  - Node MCPs: Requires `npm install @modelcontextprotocol/sdk`

- [ ] **Can API keys and credentials be managed securely?**
  - Environment variables: `GITHUB_TOKEN`, `SLACK_BOT_TOKEN`, etc.
  - Team access: All developers need credentials configured

- [ ] **Can server processes run reliably?**
  - Stdio transport: Subprocess management
  - HTTP/SSE transport: Network configuration, firewall rules

- [ ] **Is configuration documented for team replication?**
  - `.claude/settings.json` configuration
  - Troubleshooting steps for common issues

**If you checked all boxes:** External dependencies are acceptable

---

## Use Case Matrix

### Documentation and Reference Material

| Use Case | Frequency | Recommended Tool | Reasoning |
|----------|-----------|-----------------|-----------|
| Fetch API documentation | 1 time | **WebFetch** | 500 tokens, cached for 15 min |
| Fetch API documentation | 2-3 times (< 15 min) | **WebFetch** | 500 tokens total (cached) |
| Fetch API documentation | 10+ times (> 15 min) | **WebFetch** (still) | Unless unique URLs (then consider MCP) |
| Fetch multiple API docs (10+ unique URLs) | 1 session | **MCP** (if repeated) | Break-even at ~6 unique URLs |

### Code and Development Operations

| Use Case | Frequency | Recommended Tool | Reasoning |
|----------|-----------|-----------------|-----------|
| Run git commands | Any | **Bash** | Built-in, no overhead |
| Search for code examples | Any | **WebSearch** | Built-in, no overhead |
| Create GitHub issue | 1-2 times | **Bash** + `gh` CLI | Simpler than MCP |
| Create GitHub issues | 10+ times/session | **GitHub MCP** | Workflow automation justified |
| Manage PRs (create, label, assign, merge) | Regular | **GitHub MCP** | Complex workflow, state management |

### Browser and Web Automation

| Use Case | Frequency | Recommended Tool | Reasoning |
|----------|-----------|-----------------|-----------|
| Take screenshot | 1-2 times | **Manual** | Not worth MCP overhead |
| Take screenshots | 5+ times/session | **Browser Tools MCP** | Automation justified |
| Web scraping | One-time | **WebFetch** + parsing | Simple GET request |
| Web interaction (forms, clicks) | Any | **Browser Tools MCP** | Built-in tools cannot handle |
| Visual regression testing | Automated | **Browser Tools MCP** | Complex workflow required |

### Communication and Collaboration

| Use Case | Frequency | Recommended Tool | Reasoning |
|----------|-----------|-----------------|-----------|
| Send Slack message | 1 time | **Bash** + `curl` | Simpler than MCP |
| Send Slack messages | 10+ times/session | **Slack MCP** | Persistent context justified |
| Post to multiple channels | Regular | **Slack MCP** | Workflow automation |
| Create Slack channels, manage permissions | Regular | **Slack MCP** | Complex workflow |

### Data and APIs

| Use Case | Frequency | Recommended Tool | Reasoning |
|----------|-----------|-----------------|-----------|
| Query public API (no auth) | 1 time | **WebFetch** | 500 tokens, cached |
| Query authenticated API | 1-4 times | **Bash** + `curl` | Simple, no MCP overhead |
| Query authenticated API | 10+ times/session | **MCP** (if workflow complex) | State management, automation |
| Database queries | Regular | **Database MCP** | Structured data access, security |
| Real-time data streaming | Any | **MCP** (SSE transport) | Built-in tools cannot handle |

---

## Migration Scenarios

### When to Migrate from WebFetch to MCP

**Scenario 1: Increasing Frequency**

**Initial State:**
- Using WebFetch for occasional API documentation lookups (1-2 times/session)
- Cost: 500 tokens/session

**Trigger for Migration:**
- Frequency increases to 10+ API calls per session
- Different endpoints require unique URLs (cache not helpful)
- Cost: 5,000 tokens/session with WebFetch

**Migration Decision:**
- MCP Cost: 1,200 + (200 × 10) = 3,200 tokens/session
- Savings: 1,800 tokens/session (36% reduction)
- **Action:** Migrate to MCP

---

**Scenario 2: Workflow Complexity**

**Initial State:**
- Using Bash + `gh` CLI for GitHub issue creation
- Manual steps: Create issue → Add labels → Assign → Add to project
- Time: 2-3 minutes per issue

**Trigger for Migration:**
- Team creates 15+ issues per week
- Errors from manual label/assignment mistakes
- Inconsistent issue formatting

**Migration Decision:**
- GitHub MCP enables single-tool workflow automation
- Time saved: 30-45 minutes/week
- Error reduction: Standardized process
- **Action:** Migrate to GitHub MCP

---

### When to Migrate from MCP to WebFetch

**Scenario 1: Decreasing Frequency**

**Initial State:**
- Using GitHub MCP for frequent issue creation (20+ times/session)
- Cost: 1,200 + (200 × 20) = 5,200 tokens/session

**Trigger for Migration:**
- Project stabilizes, issue creation drops to 1-2 times/session
- Cost: 1,200 + (200 × 2) = 1,600 tokens/session

**Migration Decision:**
- Bash + `gh` CLI Cost: 0 tokens overhead (built-in)
- Savings: 1,600 tokens/session
- **Action:** Remove MCP, use Bash + `gh` CLI

---

**Scenario 2: Simple Operations**

**Initial State:**
- Using custom MCP for API documentation fetching
- Cost: 1,200 + (200 × 3) = 1,800 tokens/session

**Trigger for Migration:**
- Realized operations are simple HTTP GET requests
- No complex workflow needed
- 90% of calls are to the same documentation pages

**Migration Decision:**
- WebFetch Cost: 500 tokens/session (cached)
- Savings: 1,300 tokens/session (72% reduction)
- **Action:** Remove MCP, use WebFetch

---

## Cost-Benefit Examples

### Example 1: Documentation Lookup (WebFetch Wins)

**Task:** Fetch TypeScript handbook, Next.js docs, and React docs during implementation

**Option A: WebFetch**
```
Time 0:00 - WebFetch("https://typescriptlang.org/docs") → 500 tokens
Time 0:05 - WebFetch("https://typescriptlang.org/docs") → 0 tokens (cached)
Time 0:08 - WebFetch("https://nextjs.org/docs") → 500 tokens
Time 0:12 - WebFetch("https://reactjs.org/docs") → 500 tokens
Time 0:15 - WebFetch("https://typescriptlang.org/docs") → 0 tokens (cached)

Total: 1,500 tokens
```

**Option B: Documentation MCP**
```
MCP Initialization: 1,200 tokens
Call 1 (TypeScript): 200 tokens
Call 2 (TypeScript): 200 tokens
Call 3 (Next.js): 200 tokens
Call 4 (React): 200 tokens
Call 5 (TypeScript): 200 tokens

Total: 2,200 tokens
```

**Winner:** WebFetch (1,500 tokens vs 2,200 tokens = 32% savings)

---

### Example 2: GitHub Workflow Automation (MCP Wins)

**Task:** Create 10 GitHub issues with labels, assignment, and project board addition

**Option A: Bash + `gh` CLI**
```
For each issue (10 times):
  1. gh issue create --title "..." --body "..."
  2. gh issue edit --add-label "bug,priority:high"
  3. gh issue edit --add-assignee @username
  4. gh project item-add --project-id X --issue-id Y

Manual coordination required (no automation)
Time: 3-5 minutes per issue = 30-50 minutes total
Token cost: 0 overhead (built-in)
Error risk: High (manual label/assignment mistakes)
```

**Option B: GitHub MCP**
```
MCP Initialization: 1,200 tokens

For each issue (10 times):
  create_github_issue_with_workflow(
    title, body, labels, assignees, project_id
  ) → 200 tokens

Total: 1,200 + (200 × 10) = 3,200 tokens
Time: 30 seconds per issue = 5 minutes total
Error risk: Low (automated, consistent)
```

**Winner:** GitHub MCP (25-45 minutes time savings, error reduction, 3,200 token cost justified)

---

### Example 3: Browser Automation (MCP Required)

**Task:** Take screenshots of 5 different pages for visual regression testing

**Option A: Manual Screenshots**
```
For each page (5 times):
  1. Open browser
  2. Navigate to page
  3. Take screenshot
  4. Save to file
  5. Rename and organize

Time: 2-3 minutes per page = 10-15 minutes total
Token cost: 0 (manual process)
Reproducibility: Low (manual steps)
```

**Option B: Browser Tools MCP**
```
MCP Initialization: 1,500 tokens

For each page (5 times):
  takeScreenshot(url, filename) → 300 tokens

Total: 1,500 + (300 × 5) = 3,000 tokens
Time: 1 minute total (automated)
Reproducibility: High (scripted, consistent)
```

**Winner:** Browser Tools MCP (10-14 minutes time savings, reproducibility, built-in tools cannot accomplish task)

---

### Example 4: One-Time API Call (WebFetch Wins)

**Task:** Fetch OpenAPI specification from public API for schema analysis

**Option A: WebFetch**
```
WebFetch("https://api.example.com/openapi.json") → 500 tokens

Total: 500 tokens
Time: Instant
```

**Option B: Custom MCP**
```
MCP Initialization: 1,200 tokens
fetch_openapi_spec() → 200 tokens

Total: 1,400 tokens
Time: Instant + setup time
```

**Winner:** WebFetch (500 tokens vs 1,400 tokens = 64% savings, no setup required)

---

## Common Pitfalls

### Pitfall 1: Building MCP for One-Time Operations

**Mistake:**
User builds a custom MCP for a task they'll only do once (e.g., one-time data migration, initial API exploration).

**Why It's Wrong:**
- MCP overhead: 1,200 tokens + development time
- WebFetch/Bash cost: 500 tokens, immediate use
- No repeated operations to justify overhead

**Fix:**
Use WebFetch for one-time HTTP GET requests, Bash + curl for one-time API calls. Only build MCP if operation will repeat 5+ times.

---

### Pitfall 2: Ignoring WebFetch Cache Benefits

**Mistake:**
User assumes WebFetch fetches content every time and decides to build MCP for "efficiency."

**Why It's Wrong:**
- WebFetch has 15-minute self-cleaning cache
- First call: 500 tokens, subsequent calls (< 15 min): ~0 tokens
- For typical documentation lookups, WebFetch is 72% more efficient than MCP

**Fix:**
Understand cache behavior before making decision. WebFetch is highly efficient for repeated documentation access within 15-minute windows.

---

### Pitfall 3: Using MCP for Simple Terminal Commands

**Mistake:**
User configures MCP to wrap simple CLI operations (git status, npm install, ls).

**Why It's Wrong:**
- Bash tool is built-in (0 token overhead)
- MCP adds 1,200 + 200N tokens overhead
- No workflow complexity to justify MCP

**Fix:**
Use Bash tool directly for terminal commands. Reserve MCPs for complex workflows or operations that built-in tools cannot handle.

---

### Pitfall 4: Premature MCP Optimization

**Mistake:**
User builds MCP "for future scalability" before understanding actual usage patterns.

**Why It's Wrong:**
- Don't know if operation will be frequent enough to justify overhead
- Don't know if workflow will require complex coordination
- Premature optimization wastes development time

**Fix:**
Start with built-in tools (WebFetch, Bash, WebSearch). Monitor usage patterns for 1-2 weeks. Migrate to MCP only when data shows:
- Frequency ≥ 5 operations/session
- Complex workflows emerge
- Token cost justification is clear

---

### Pitfall 5: Not Considering Maintenance Burden

**Mistake:**
User builds custom MCP without considering long-term maintenance (API changes, SDK updates, bug fixes).

**Why It's Wrong:**
- MCPs require ongoing maintenance
- API changes break MCP functionality
- Team needs to manage dependencies, credentials, troubleshooting

**Fix:**
Evaluate maintenance burden before building MCP:
- Will API remain stable?
- Can team maintain custom code?
- Are official MCPs available (e.g., GitHub MCP)?
- Is built-in tool "good enough" even if less elegant?

---

## Quick Reference

### Decision Cheat Sheet

```
┌─────────────────────────────────────────────────────────┐
│              MCP DECISION FLOWCHART                     │
└─────────────────────────────────────────────────────────┘

START: I need to [accomplish task]

├─ Can WebFetch accomplish this? (HTTP GET, public URL)
│  ├─ YES, and I'll do it 1-4 times
│  │  └─ ✅ USE WEBFETCH (500 tokens, cached)
│  └─ NO or I'll do it 10+ times with unique URLs
│     └─ Continue...

├─ Can WebSearch accomplish this? (Research, find info)
│  ├─ YES
│  │  └─ ✅ USE WEBSEARCH (built-in, no overhead)
│  └─ NO
│     └─ Continue...

├─ Can Bash accomplish this? (Terminal commands, git)
│  ├─ YES
│  │  └─ ✅ USE BASH (built-in, no overhead)
│  └─ NO
│     └─ Continue...

├─ Is this a complex workflow? (Multiple coordinated calls)
│  ├─ YES
│  │  └─ ✅ BUILD OR CONFIGURE MCP (required)
│  └─ NO
│     └─ Continue...

├─ Will I do this 5+ times per session?
│  ├─ YES
│  │  └─ Calculate token break-even
│  │     ├─ MCP more efficient → ✅ USE MCP
│  │     └─ WebFetch more efficient → ✅ USE WEBFETCH
│  └─ NO
│     └─ ✅ USE BUILT-IN TOOLS (MCP overhead not justified)
```

### Token Cost Quick Reference

| Operation | Tool | Token Cost |
|-----------|------|------------|
| **Fetch documentation once** | WebFetch | 500 |
| **Fetch documentation 3x (< 15 min)** | WebFetch | 500 (cached) |
| **Fetch 10 unique URLs** | WebFetch | 5,000 |
| **Fetch 10 unique URLs** | MCP | 3,200 |
| **Search internet** | WebSearch | 0 overhead |
| **Git commands** | Bash | 0 overhead |
| **Create 1 GitHub issue** | Bash + gh | 0 overhead |
| **Create 10 GitHub issues** | GitHub MCP | 3,200 |
| **Browser automation** | Browser Tools MCP | 1,500 + 300N |

### When to Use Each Tool

| Scenario | Use This | Not This |
|----------|----------|----------|
| Fetch API docs once | WebFetch (500 tokens) | MCP (1,400 tokens) |
| Fetch API docs 3x in 10 min | WebFetch (500 cached) | MCP (1,800 tokens) |
| Research best practices | WebSearch (0 overhead) | MCP (1,200+ tokens) |
| Run git commands | Bash (0 overhead) | MCP (1,200+ tokens) |
| Create 1-2 GitHub issues | Bash + gh (0 overhead) | GitHub MCP (1,400+ tokens) |
| Create 10+ GitHub issues | GitHub MCP (3,200 tokens) | Bash (manual, error-prone) |
| Take 1 screenshot | Manual (0 tokens) | Browser MCP (1,800 tokens) |
| Take 5+ screenshots | Browser MCP (3,000 tokens) | Manual (10-15 min) |
| Browser automation | Browser MCP (required) | Not possible otherwise |
| Send 1 Slack message | Bash + curl (0 overhead) | Slack MCP (1,400 tokens) |
| Send 10+ Slack messages | Slack MCP (3,200 tokens) | Bash (manual, tedious) |

---

## Related Documentation

- [MCP_CONFIGURATION.md](MCP_CONFIGURATION.md) - MCP server configuration guide
- [PERMISSIONS_GUIDE.md](PERMISSIONS_GUIDE.md) - MCP permission configuration
- [mcp-builder skill](../.claude/skills/_development/mcp-builder/) - Build custom MCPs

---

## Official Resources

- **MCP Protocol:** https://modelcontextprotocol.io/
- **Python SDK:** https://github.com/modelcontextprotocol/python-sdk
- **TypeScript SDK:** https://github.com/modelcontextprotocol/typescript-sdk
- **Official Servers:** https://github.com/modelcontextprotocol/

---

## Changelog

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-11-24 | 1.0 | Initial MCP decision framework guide | Repository Team |
