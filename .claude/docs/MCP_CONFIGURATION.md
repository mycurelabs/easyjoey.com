# MCP Configuration Guide

**Purpose:** Comprehensive guide to MCP (Model Context Protocol) server configuration, available servers, and implementation examples.

**Current Repository Status:** No MCP servers are configured (MCP-free by design)

**Last Updated:** 2025-11-24

---

## Table of Contents

1. [Overview](#overview)
2. [Current Status](#current-status)
3. [Available MCP Servers](#available-mcp-servers)
4. [Configuration Examples](#configuration-examples)
5. [Installation Requirements](#installation-requirements)
6. [Testing Your Configuration](#testing-your-configuration)
7. [Token Cost Analysis](#token-cost-analysis)
8. [When to Add an MCP](#when-to-add-an-mcp)
9. [Troubleshooting](#troubleshooting)

---

## Overview

### What Are MCP Servers?

**MCP (Model Context Protocol)** is a protocol that allows Claude Code to interact with external services through specialized tools. MCP servers extend Claude's capabilities beyond built-in tools like WebFetch, WebSearch, and Bash.

**Key Characteristics:**
- Tools prefixed with `mcp__` (e.g., `mcp__github__createIssue`)
- Run as separate processes communicating via stdio, HTTP, or SSE
- Provide structured, validated tool interfaces
- Enable complex workflows beyond simple API calls

**Example Use Cases:**
- Browser automation (screenshots, web interaction)
- GitHub operations (create issues, manage PRs)
- Slack messaging (send DMs, post to channels)
- Database queries (structured data access)
- Custom business logic (internal API integration)

---

## Current Status

### This Repository: MCP-Free by Design

**Status:** ✅ Zero MCP servers configured

**Rationale:**
1. **Token Efficiency:** Built-in tools (WebFetch, WebSearch, Bash) handle most tasks without MCP overhead
2. **Simplicity:** No external dependencies or server process management
3. **Flexibility:** Works across all environments without configuration
4. **Context Budget:** 200k token budget optimized for skills, agents, and documentation

**Built-In Tools Used:**
- **WebFetch:** Fetch documentation, API responses (15-minute cache)
- **WebSearch:** Internet search for research and best practices
- **Bash:** Terminal commands, git operations, file management
- **Read/Write/Edit:** Direct file operations

**When This Changes:** If repeated operations (e.g., frequent GitHub API calls, browser automation) justify the token cost and configuration complexity.

---

## Available MCP Servers

### Official MCPs (Anthropic/Model Context Protocol)

#### 1. GitHub MCP
- **Package:** `@modelcontextprotocol/server-github`
- **Language:** Node/TypeScript
- **Transport:** Stdio
- **Tools:** Create issues, manage PRs, search repositories, list commits
- **Authentication:** GitHub Personal Access Token
- **Use Case:** Automated GitHub workflows, issue management

#### 2. Browser Tools MCP
- **Package:** `mcp_servers.browser_tools` (Python)
- **Language:** Python
- **Transport:** Stdio
- **Tools:** `takeScreenshot`, navigate pages, interact with elements
- **Use Case:** Browser automation, visual testing, web scraping

#### 3. Filesystem MCP
- **Package:** `@modelcontextprotocol/server-filesystem`
- **Language:** Node/TypeScript
- **Transport:** Stdio
- **Tools:** Read/write files with enhanced permissions
- **Use Case:** Restricted file system access beyond built-in tools

---

### Community/Buildable MCPs

These can be built using Python (FastMCP) or Node (MCP SDK):

#### Communication
- **Slack MCP:** Send messages, create channels, manage workspace
- **Discord MCP:** Bot commands, channel management
- **Email MCP:** Send emails via SMTP/API

#### Development Tools
- **GitLab MCP:** GitLab API operations
- **Jira MCP:** Issue tracking, project management
- **Linear MCP:** Task management

#### Business/SaaS
- **Stripe MCP:** Payment processing, subscription management
- **Asana MCP:** Task and project management
- **Salesforce MCP:** CRM operations

#### Data/Search
- **Rube MCP:** HackerNews search, Slack integration (referenced in developer-growth-analysis skill)
- **Context7 MCP:** Documentation search and context retrieval
- **PostgreSQL MCP:** Database queries and operations
- **MongoDB MCP:** NoSQL database operations

#### Custom MCPs
Any service with an API can be wrapped as an MCP using the official SDKs.

---

## Configuration Examples

### Basic Configuration Structure

Add an `mcp` section to `.claude/settings.json`:

```json
{
  "permissions": {
    "read": ["/path/to/project/**"],
    "write": ["/path/to/project/src/**"]
  },
  "mcp": {
    "servers": {
      "server-name": {
        "transport": "stdio",
        "command": "python",
        "args": ["-m", "mcp_servers.server_name"],
        "env": {
          "API_KEY": "your-api-key-here"
        }
      }
    }
  }
}
```

---

### Example 1: GitHub MCP (Node/TypeScript)

```json
{
  "mcp": {
    "servers": {
      "github": {
        "transport": "stdio",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"],
        "env": {
          "GITHUB_TOKEN": "${GITHUB_TOKEN}"
        }
      }
    }
  }
}
```

**Environment Variable Setup:**
```bash
export GITHUB_TOKEN="ghp_your_token_here"
```

**Available Tools:**
- `mcp__github__createIssue`
- `mcp__github__createPullRequest`
- `mcp__github__searchRepositories`
- `mcp__github__listCommits`

---

### Example 2: Browser Tools MCP (Python)

```json
{
  "mcp": {
    "servers": {
      "browser-tools": {
        "transport": "stdio",
        "command": "python",
        "args": ["-m", "mcp_servers.browser_tools"]
      }
    }
  }
}
```

**Installation:**
```bash
pip install mcp-server-browser-tools
```

**Available Tools:**
- `mcp__browser-tools__takeScreenshot`
- `mcp__browser-tools__navigate`
- `mcp__browser-tools__clickElement`
- `mcp__browser-tools__fillForm`

---

### Example 3: Custom Slack MCP (Python with FastMCP)

```json
{
  "mcp": {
    "servers": {
      "slack": {
        "transport": "stdio",
        "command": "python",
        "args": ["-m", "my_mcps.slack_mcp"],
        "env": {
          "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
          "SLACK_SIGNING_SECRET": "${SLACK_SIGNING_SECRET}"
        }
      }
    }
  }
}
```

**Implementation (slack_mcp.py):**
```python
from mcp import FastMCP
from slack_sdk import WebClient

mcp = FastMCP("slack")
client = WebClient(token=os.environ["SLACK_BOT_TOKEN"])

@mcp.tool()
def send_message(channel: str, text: str) -> str:
    """Send a message to a Slack channel."""
    result = client.chat_postMessage(channel=channel, text=text)
    return f"Message sent to {channel}"

if __name__ == "__main__":
    mcp.run()
```

---

### Example 4: HTTP Transport (Remote MCP)

```json
{
  "mcp": {
    "servers": {
      "remote-service": {
        "transport": "http",
        "url": "https://api.example.com/mcp",
        "headers": {
          "Authorization": "Bearer ${API_TOKEN}"
        }
      }
    }
  }
}
```

---

### Example 5: SSE Transport (Real-Time Updates)

```json
{
  "mcp": {
    "servers": {
      "realtime-data": {
        "transport": "sse",
        "url": "https://stream.example.com/mcp/events",
        "headers": {
          "Authorization": "Bearer ${API_TOKEN}"
        }
      }
    }
  }
}
```

---

## Installation Requirements

### For Python MCPs

**Install Python SDK:**
```bash
pip install mcp>=1.1.0 anthropic>=0.39.0
```

**Install FastMCP (High-Level Framework):**
```bash
pip install mcp[fastmcp]
```

**Create Custom MCP:**
```python
# my_mcp.py
from mcp import FastMCP

mcp = FastMCP("my-service")

@mcp.tool()
def my_tool(param: str) -> str:
    """Tool description for Claude."""
    return f"Result: {param}"

if __name__ == "__main__":
    mcp.run()
```

**Naming Convention:** `{service}_mcp` (lowercase with underscores)

---

### For Node/TypeScript MCPs

**Install TypeScript SDK:**
```bash
npm install @modelcontextprotocol/sdk
```

**Package Version:**
```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.6.1"
  }
}
```

**Create Custom MCP:**
```typescript
// my-mcp-server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({
  name: "my-service",
  version: "1.0.0"
});

server.setRequestHandler("tools/call", async (request) => {
  // Handle tool calls
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

**Naming Convention:** `{service}-mcp-server` (lowercase with hyphens)

---

## Testing Your Configuration

### Step 1: Verify MCP Section Exists

```bash
cat .claude/settings.json | grep -A 10 "mcp"
```

Expected output:
```json
"mcp": {
  "servers": {
    "github": {
      ...
    }
  }
}
```

### Step 2: Check MCP Server Process

When Claude Code starts, it launches MCP server processes. Check logs:

```bash
# Claude Code should show MCP initialization
claude-code --verbose
```

### Step 3: List Available Tools

In Claude Code, check if MCP tools are available:

```
List all available mcp__ tools
```

Expected response:
```
Available MCP tools:
- mcp__github__createIssue
- mcp__github__createPullRequest
- mcp__browser-tools__takeScreenshot
...
```

### Step 4: Test a Simple Tool Call

Try using an MCP tool:

```
Use mcp__github__searchRepositories to find repositories with "mcp" in the name
```

If successful, the MCP is properly configured.

---

### Common Configuration Issues

| Issue | Symptom | Solution |
|-------|---------|----------|
| **MCP not found** | `Error: Cannot find module 'mcp_servers.github'` | Install MCP package: `pip install mcp-server-github` |
| **Authentication failed** | `Error: 401 Unauthorized` | Set environment variable: `export GITHUB_TOKEN="..."` |
| **Transport error** | `Error: Failed to connect to stdio` | Check command path: `which python` or `which npx` |
| **Tool not available** | MCP tool doesn't appear in tool list | Restart Claude Code to reload MCP configuration |
| **Permission denied** | `Error: Permission denied` | Add MCP tool to allowed tools in `.claude/settings.json` |

---

## Token Cost Analysis

### WebFetch vs MCP: Token Comparison

| Operation | WebFetch Cost | MCP Cost | Notes |
|-----------|--------------|----------|-------|
| **One-time doc fetch** | ~500 tokens | ~1,200 tokens (MCP context + tool call) | WebFetch more efficient |
| **Repeated doc fetch (< 15 min)** | ~500 tokens (cached) | ~1,200 tokens per call | WebFetch better with cache |
| **Repeated doc fetch (> 15 min)** | ~500 tokens × N calls | ~1,200 tokens + 200 per call | MCP better for N > 5 |
| **Complex workflow (10+ API calls)** | N/A (not possible) | ~1,200 tokens + 200 × 10 | MCP enables workflows |
| **Browser automation** | N/A (not possible) | ~1,500 tokens + 300 per action | MCP required |

### Token Overhead Breakdown

**MCP Server Context (One-Time):**
- Server initialization: ~400 tokens
- Available tools listing: ~600 tokens
- Schema definitions: ~200 tokens
- **Total:** ~1,200 tokens per MCP server

**Per Tool Call:**
- Tool invocation: ~100 tokens
- Input parameters: ~50-100 tokens
- Response formatting: ~50-100 tokens
- **Total:** ~200-300 tokens per tool call

**Built-In Tools (No Overhead):**
- WebFetch: ~0 tokens overhead (built-in)
- WebSearch: ~0 tokens overhead (built-in)
- Bash: ~0 tokens overhead (built-in)

---

### Cost Justification Examples

#### ✅ MCP Justified

**Scenario:** Automated GitHub workflow (create issue, add labels, assign, comment)

**Without MCP:**
- Not possible with built-in tools
- Would require manual steps

**With MCP:**
- MCP context: 1,200 tokens
- 4 tool calls: 800 tokens
- **Total:** 2,000 tokens
- **Benefit:** Workflow automation worth the cost

---

#### ❌ MCP Not Justified

**Scenario:** Fetch official documentation once

**WebFetch:**
- Fetch call: 500 tokens
- Cached for 15 minutes
- **Total:** 500 tokens

**With MCP:**
- MCP context: 1,200 tokens
- Tool call: 200 tokens
- **Total:** 1,400 tokens
- **Benefit:** None - WebFetch is 2.8× more efficient

---

## When to Add an MCP

### Decision Checklist

Before adding an MCP server, verify:

- [ ] **Built-in tools cannot accomplish the task**
  - WebFetch cannot fetch the data
  - WebSearch cannot find the information
  - Bash cannot execute the operation

- [ ] **Operation will be repeated frequently**
  - More than 5 calls per session
  - Or complex multi-step workflows

- [ ] **Token cost is justified**
  - Workflow value > ~1,500 token overhead
  - Automation saves significant time

- [ ] **External dependency is acceptable**
  - MCP server process can run reliably
  - API keys/credentials can be managed securely

- [ ] **Configuration is documented**
  - Team members can replicate setup
  - Troubleshooting steps are clear

### Use Case Matrix

| Use Case | Recommended Approach | Why |
|----------|---------------------|-----|
| Fetch API documentation | WebFetch | 15-min cache, no overhead |
| Search for code examples | WebSearch | Built-in, no configuration |
| Run git commands | Bash | Built-in, direct access |
| Create GitHub issues (1-2 times) | Bash + `gh` CLI | Simpler than MCP |
| Create GitHub issues (10+ times/session) | GitHub MCP | Workflow automation justified |
| Browser screenshots (rare) | Manual screenshot | Not worth MCP overhead |
| Browser automation (testing) | Browser Tools MCP | Complex workflows require MCP |
| Send Slack message (once) | Bash + curl | Simpler than MCP |
| Slack integration (frequent) | Slack MCP | Persistent context justified |

---

## Troubleshooting

### Issue 1: MCP Server Won't Start

**Symptom:**
```
Error: MCP server 'github' failed to start
```

**Solutions:**
1. **Check command path:**
   ```bash
   which npx  # For Node MCPs
   which python  # For Python MCPs
   ```

2. **Verify installation:**
   ```bash
   npx @modelcontextprotocol/server-github --version
   # or
   python -m mcp_servers.github --version
   ```

3. **Check permissions:**
   ```bash
   ls -la $(which npx)
   ls -la $(which python)
   ```

---

### Issue 2: Authentication Errors

**Symptom:**
```
Error: 401 Unauthorized
```

**Solutions:**
1. **Verify environment variable:**
   ```bash
   echo $GITHUB_TOKEN  # Should output token
   ```

2. **Set environment variable in settings:**
   ```json
   {
     "mcp": {
       "servers": {
         "github": {
           "env": {
             "GITHUB_TOKEN": "${GITHUB_TOKEN}"
           }
         }
       }
     }
   }
   ```

3. **Use absolute token (not recommended for security):**
   ```json
   "env": {
     "GITHUB_TOKEN": "ghp_your_actual_token"
   }
   ```

---

### Issue 3: Tool Not Found

**Symptom:**
```
Error: Tool 'mcp__github__createIssue' not found
```

**Solutions:**
1. **Restart Claude Code** to reload MCP configuration

2. **Verify MCP server is listed:**
   ```bash
   cat .claude/settings.json | grep -A 5 "github"
   ```

3. **Check MCP server logs** (if available)

---

### Issue 4: High Token Usage

**Symptom:**
Context window fills up quickly after adding MCPs

**Solutions:**
1. **Review necessity:** Do you really need this MCP? Can built-in tools work?

2. **Optimize tool calls:** Batch operations when possible

3. **Remove unused MCPs:** Each MCP adds ~1,200 token overhead

4. **Use WebFetch for one-time calls:** Don't use MCP for single operations

---

## Related Documentation

- [PERMISSIONS_GUIDE.md](PERMISSIONS_GUIDE.md) - MCP permission configuration
- [MCP_DECISION_GUIDE.md](MCP_DECISION_GUIDE.md) - WebFetch vs MCP decision framework
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
| 2025-11-24 | 1.0 | Initial MCP configuration guide | Repository Team |
