# Claude Code Permissions Guide

**Purpose:** This guide explains Claude Code's permission system, how to configure tool access, and best practices for security in your repository.

**Target Audience:** Repository maintainers, team leads, and developers setting up Claude Code for their team.

---

## Understanding Claude Code Permissions

Claude Code operates with a **permission-based security model** where you explicitly grant or deny access to:
- **File system** (read, write, edit specific files or directories)
- **Terminal commands** (Bash, git, npm, etc.)
- **Web access** (WebFetch, WebSearch)
- **Agent invocation** (Task tool with specific agents)

**Default behavior:** Claude Code asks for permission before accessing files or running commands unless you pre-approve specific patterns.

---

## Permission Types

### 1. File System Permissions

**What they control:**
- Reading files (`Read` tool)
- Writing new files (`Write` tool)
- Editing existing files (`Edit` tool)
- Creating directories (`Bash mkdir`)
- Deleting files (`Bash rm`)

**Permission patterns:**
```json
{
  "permissions": {
    "read": [
      "/Users/username/project/src/**",
      "/Users/username/project/.claude/**",
      "/Users/username/project/README.md"
    ],
    "write": [
      "/Users/username/project/src/**",
      "/Users/username/project/.claude/**"
    ],
    "deny": [
      "/Users/username/project/.env",
      "/Users/username/project/secrets.json",
      "/Users/username/project/credentials/**"
    ]
  }
}
```

---

### 2. Bash Command Permissions

**What they control:**
- Running terminal commands via `Bash` tool
- Git operations (`git add`, `git commit`, `git push`)
- Package management (`npm install`, `bun install`)
- File operations (`cp`, `mv`, `rm`)
- System commands (`ps`, `kill`, `ssh`)

**Permission patterns:**
```json
{
  "permissions": {
    "bash": {
      "allow": [
        "git *",
        "npm *",
        "bun *",
        "ls *",
        "cat *",
        "grep *"
      ],
      "deny": [
        "rm -rf /",
        "sudo *",
        "chmod 777 *"
      ]
    }
  }
}
```

---

### 3. Web Access Permissions

**What they control:**
- Fetching URLs (`WebFetch` tool)
- Searching the web (`WebSearch` tool)
- Accessing external APIs

**Permission patterns:**
```json
{
  "permissions": {
    "web": {
      "allow": [
        "https://api.github.com/*",
        "https://docs.anthropic.com/*",
        "https://*.stackoverflow.com/*"
      ],
      "deny": [
        "http://*",  // Only allow HTTPS
        "https://internal-api.company.com/*"  // Block internal APIs
      ]
    }
  }
}
```

---

### 4. Agent Invocation Permissions

**What they control:**
- Which agents can be invoked via `Task` tool
- Whether agents require approval before running

**Permission patterns:**
```json
{
  "permissions": {
    "agents": {
      "auto_approve": [
        "code-architecture-reviewer",
        "frontend-error-fixer",
        "documentation-architect"
      ],
      "require_approval": [
        "security-sentinel",
        "deployment-engineer"
      ],
      "deny": [
        "dangerous-agent"
      ]
    }
  }
}
```

---

## Pre-Approved Permissions (This Repository)

**The following permissions are pre-approved in this repository:**

### File System (Read)
```
✅ /Users/vjescutin/Downloads/insights-foundry/**
```
Claude can read any file in this repository without asking.

### File System (Write)
```
✅ /Users/vjescutin/Downloads/insights-foundry/.claude/**
✅ /Users/vjescutin/Downloads/insights-foundry/src/**
✅ /Users/vjescutin/Downloads/insights-foundry/docs/**
```
Claude can create/edit files in these directories without asking.

### Bash Commands
```
✅ git config *
✅ git status
✅ git fetch *
✅ git push *
✅ git add *
✅ git rm *
✅ git mv *
✅ ssh *
✅ tree *
✅ find *
✅ xargs *
```
These git operations and system commands are pre-approved.

### Web Access
```
✅ https://docs.anthropic.com/*
✅ https://api.github.com/*
✅ https://*.stackoverflow.com/*
```
Claude can fetch from these domains without asking.

**To modify these permissions, edit:** `.claude/settings.json`

---

## Configuring Permissions

### Method 1: Repository-Level Settings (Recommended)

Create or edit `.claude/settings.json` in your repository root:

```json
{
  "permissions": {
    "read": [
      "/path/to/your/project/**"
    ],
    "write": [
      "/path/to/your/project/src/**",
      "/path/to/your/project/.claude/**"
    ],
    "deny": [
      "/path/to/your/project/.env",
      "/path/to/your/project/secrets.json"
    ],
    "bash": {
      "allow": [
        "git *",
        "npm *",
        "bun *"
      ],
      "deny": [
        "rm -rf /",
        "sudo *"
      ]
    },
    "web": {
      "allow": [
        "https://api.github.com/*",
        "https://docs.anthropic.com/*"
      ],
      "deny": [
        "http://*"
      ]
    },
    "agents": {
      "auto_approve": [
        "code-architecture-reviewer",
        "frontend-error-fixer"
      ],
      "require_approval": [
        "security-sentinel"
      ]
    }
  }
}
```

**Benefits:**
- ✅ Settings apply to entire repository
- ✅ Can be committed to version control
- ✅ Shared across team members
- ✅ Easy to review and audit

---

### Method 2: User-Level Settings

Edit `~/.claude/settings.json` (global settings for your user):

```json
{
  "permissions": {
    "read": [
      "/Users/username/projects/**"
    ],
    "deny": [
      "/Users/username/projects/**/.env",
      "/Users/username/projects/**/secrets.json"
    ]
  }
}
```

**Benefits:**
- ✅ Applies to all repositories for this user
- ✅ Can set personal preferences
- ✅ Private (not committed to version control)

**Note:** Repository-level settings override user-level settings.

---

## Security Best Practices

### ✅ DO

1. **Always deny sensitive files**
   ```json
   "deny": [
     "**/.env",
     "**/secrets.json",
     "**/credentials/**",
     "**/*.pem",
     "**/*.key",
     "**/private_key"
   ]
   ```
   **Why:** Prevents accidental exposure of secrets, API keys, private keys.

2. **Use glob patterns for broad permissions**
   ```json
   "read": ["/path/to/project/**"]
   ```
   **Why:** Easier to maintain than listing every file individually.

3. **Allow only necessary bash commands**
   ```json
   "bash": {
     "allow": ["git *", "npm *", "bun *"],
     "deny": ["rm -rf /", "sudo *", "chmod 777 *"]
   }
   ```
   **Why:** Reduces risk of accidental destructive operations.

4. **Require HTTPS for web access**
   ```json
   "web": {
     "deny": ["http://*"]
   }
   ```
   **Why:** Prevents sending data over unencrypted connections.

5. **Review agent permissions regularly**
   ```json
   "agents": {
     "require_approval": ["deployment-engineer", "security-sentinel"]
   }
   ```
   **Why:** Critical agents should require explicit approval before running.

---

### ❌ DON'T

1. **Don't grant blanket permissions**
   ```json
   // ❌ Bad: Too broad
   "read": ["/**"]  // Grants read access to entire filesystem

   // ✅ Good: Specific to project
   "read": ["/Users/username/project/**"]
   ```

2. **Don't allow destructive commands without safeguards**
   ```json
   // ❌ Bad: Allows dangerous operations
   "bash": {
     "allow": ["rm -rf *", "sudo *"]
   }

   // ✅ Good: Deny dangerous operations
   "bash": {
     "deny": ["rm -rf /", "sudo *"]
   }
   ```

3. **Don't commit sensitive settings**
   ```json
   // ❌ Bad: API keys in settings file
   {
     "apiKeys": {
       "github": "ghp_1234567890abcdefg"
     }
   }

   // ✅ Good: API keys in environment variables
   // Use process.env.GITHUB_TOKEN instead
   ```

4. **Don't auto-approve all agents**
   ```json
   // ❌ Bad: No approval required
   "agents": {
     "auto_approve": ["*"]
   }

   // ✅ Good: Selective auto-approval
   "agents": {
     "auto_approve": ["code-architecture-reviewer"],
     "require_approval": ["deployment-engineer"]
   }
   ```

---

## Permission Patterns by Use Case

### Use Case 1: Open Source Project

**Goal:** Allow broad access for development, protect sensitive config

```json
{
  "permissions": {
    "read": ["/path/to/project/**"],
    "write": ["/path/to/project/**"],
    "deny": [
      "/path/to/project/.env",
      "/path/to/project/**/*.pem"
    ],
    "bash": {
      "allow": ["git *", "npm *", "bun *"],
      "deny": ["rm -rf /"]
    },
    "web": {
      "allow": ["https://*"],
      "deny": ["http://*"]
    }
  }
}
```

---

### Use Case 2: Enterprise Project (Healthcare)

**Goal:** Strict controls, require approval for sensitive operations

```json
{
  "permissions": {
    "read": [
      "/path/to/project/src/**",
      "/path/to/project/.claude/**"
    ],
    "write": [
      "/path/to/project/src/**",
      "/path/to/project/.claude/**"
    ],
    "deny": [
      "/path/to/project/.env",
      "/path/to/project/credentials/**",
      "/path/to/project/secrets/**",
      "/path/to/project/**/patient-data/**"
    ],
    "bash": {
      "allow": ["git status", "git diff", "git add *"],
      "require_approval": ["git push *", "git commit *"],
      "deny": ["rm -rf *", "sudo *", "ssh *"]
    },
    "web": {
      "allow": ["https://docs.anthropic.com/*"],
      "deny": ["https://*"]  // Block all other web access
    },
    "agents": {
      "auto_approve": ["code-architecture-reviewer"],
      "require_approval": [
        "security-sentinel",
        "deployment-engineer",
        "hipaa-compliance-checker"
      ]
    }
  }
}
```

---

### Use Case 3: Personal Project

**Goal:** Minimal restrictions, trust Claude fully

```json
{
  "permissions": {
    "read": ["/Users/username/projects/**"],
    "write": ["/Users/username/projects/**"],
    "deny": [
      "/Users/username/projects/**/.env",
      "/Users/username/projects/**/secrets.json"
    ],
    "bash": {
      "allow": ["*"],
      "deny": ["rm -rf /"]
    },
    "web": {
      "allow": ["https://*", "http://localhost:*"]
    },
    "agents": {
      "auto_approve": ["*"]
    }
  }
}
```

---

## Troubleshooting Permission Issues

### Issue 1: "Permission denied" when reading file

**Symptom:**
```
Error: Permission denied to read /path/to/file.ts
```

**Solution:**
Add file path to `read` permissions in `.claude/settings.json`:
```json
{
  "permissions": {
    "read": [
      "/path/to/**"
    ]
  }
}
```

---

### Issue 2: Claude asks for permission on every file

**Symptom:**
Claude repeatedly asks "Can I read this file?" for every file in the project.

**Solution:**
Use glob patterns to pre-approve entire directories:
```json
{
  "permissions": {
    "read": ["/path/to/project/**"]
  }
}
```

---

### Issue 3: Git commands blocked

**Symptom:**
```
Error: Permission denied to run command: git push
```

**Solution:**
Add git commands to `bash.allow` in settings:
```json
{
  "permissions": {
    "bash": {
      "allow": ["git *"]
    }
  }
}
```

---

### Issue 4: Agent won't run

**Symptom:**
```
Error: Agent 'security-sentinel' requires approval
```

**Solution:**
Either approve manually when prompted, or add to auto-approve list:
```json
{
  "permissions": {
    "agents": {
      "auto_approve": ["security-sentinel"]
    }
  }
}
```

---

## Permission Audit Checklist

Use this checklist to audit your repository's permissions:

- [ ] **Sensitive files are denied**
  - [ ] `.env` files denied
  - [ ] API keys/secrets files denied
  - [ ] Private keys (`.pem`, `.key`) denied
  - [ ] Credentials directories denied

- [ ] **File system permissions are scoped**
  - [ ] Read permissions limited to project directory
  - [ ] Write permissions limited to source directories
  - [ ] No blanket `/` or `/**` permissions

- [ ] **Bash commands are restricted**
  - [ ] Destructive commands (`rm -rf /`) denied
  - [ ] `sudo` denied (unless specifically needed)
  - [ ] Only necessary commands allowed

- [ ] **Web access is controlled**
  - [ ] HTTP (unencrypted) denied
  - [ ] Only trusted domains allowed
  - [ ] Internal APIs protected

- [ ] **Agent permissions are appropriate**
  - [ ] Critical agents require approval
  - [ ] Only safe agents auto-approved
  - [ ] Dangerous agents denied

- [ ] **Settings are version controlled**
  - [ ] `.claude/settings.json` committed to repository
  - [ ] No secrets in settings file
  - [ ] Team members can review settings

---

## Advanced: Conditional Permissions

**Coming soon:** Conditional permissions based on context

```json
{
  "permissions": {
    "conditional": {
      "production_branch": {
        "condition": "git.branch == 'main'",
        "bash": {
          "deny": ["git push *"]
        }
      },
      "test_environment": {
        "condition": "env.NODE_ENV == 'test'",
        "write": ["/path/to/project/test/**"]
      }
    }
  }
}
```

---

## MCP Server Configuration Status

**Current Status:** No MCP servers are configured in this repository.

### What Are MCP Servers?

MCP (Model Context Protocol) servers extend Claude Code's capabilities by providing specialized tools for interacting with external services (e.g., browser automation, API integrations, database access). MCP tools appear with the `mcp__` prefix (e.g., `mcp__browser-tools__takeScreenshot`).

### Why No MCPs Are Configured

This repository is currently **MCP-free by design** for the following reasons:

1. **Token Efficiency:** MCPs can increase token usage if not properly configured
2. **Simplicity:** Core functionality works well with built-in tools (WebFetch, WebSearch, Bash)
3. **Flexibility:** No external dependencies or server configurations required
4. **Context Budget:** 200k token budget optimized for skills, agents, and documentation

### Adding MCP Servers (If Needed)

If you need to add an MCP server, add an `mcp` section to `.claude/settings.json`:

```json
{
  "mcp": {
    "servers": {
      "browser-tools": {
        "transport": "stdio",
        "command": "python",
        "args": ["-m", "mcp_servers.browser_tools"]
      },
      "github": {
        "transport": "stdio",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-github"]
      }
    }
  }
}
```

**Before adding an MCP:**
- Check if built-in tools (WebFetch, WebSearch, Bash) can accomplish the task
- Estimate token cost impact
- Review [MCP_DECISION_GUIDE.md](MCP_DECISION_GUIDE.md) for WebFetch vs MCP trade-offs
- See [MCP_CONFIGURATION.md](MCP_CONFIGURATION.md) for detailed configuration examples

### Files with MCP References (Educational Only)

The following files reference MCPs in their documentation, but these are **hypothetical examples** showing how MCP tools COULD be used if configured:

- `.claude/skills/_development/mcp-builder/` - Guide for building MCP servers (educational)
- `.claude/skills/_analysis/developer-growth-analysis/SKILL.md` - Mentions Rube MCP (optional feature)

**Important:** These references are documentation/examples only. No actual MCP servers are active.

### Checking MCP Status

To verify MCP configuration status:

```bash
# Check if MCP section exists in settings
cat .claude/settings.json | grep -A 10 "mcp"

# Check for mcp__ tool references in skills/agents
grep -r "mcp__" .claude/
```

If you see "No MCP servers configured" or no `mcp` section in settings, then no MCPs are active.

---

## FAQ

### Q: Can I grant permissions per agent?

**A:** Yes, use the `agents` section in settings:
```json
{
  "permissions": {
    "agents": {
      "security-sentinel": {
        "read": ["/path/to/project/**"],
        "bash": {
          "allow": ["npm audit", "bun audit"]
        }
      }
    }
  }
}
```

### Q: Can I require approval for specific directories?

**A:** Yes, use `require_approval` in settings:
```json
{
  "permissions": {
    "write": ["/path/to/project/src/**"],
    "require_approval": ["/path/to/project/src/critical/**"]
  }
}
```

### Q: How do I see what permissions Claude currently has?

**A:** Run the command:
```bash
/permissions status
```

This will show all currently granted permissions.

### Q: Can I temporarily grant permissions?

**A:** Yes, when Claude asks for permission, you can choose:
- **Allow once:** Grant permission for this operation only
- **Allow for session:** Grant permission until Claude Code restarts
- **Allow always:** Grant permission permanently (adds to settings)

---

## Related Resources

- [Claude Code Documentation](https://docs.anthropic.com/claude-code)
- [Security Best Practices](https://docs.anthropic.com/claude-code/security)
- [Agent Quick Reference](agent-quick-reference.md) - Which agents require approval
- [Skill Activation Guide](skill-activation-guide.md) - How skills interact with permissions

---

## Changelog

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-11-24 | 1.0 | Initial permissions guide | Repository Team |
