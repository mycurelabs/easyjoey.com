---
name: code-simplicity-guidelines
description: Enforces simple, readable code patterns and identifies unnecessary complexity
category: Development
mode: AUTO
author: Development Team
created: 2025-11-24
last_updated: 2025-11-24
---

# Code Simplicity Guidelines

<purpose>
**What this skill does:**
This skill helps Claude identify unnecessary complexity in code and suggest simpler, more maintainable alternatives. It enforces the principle: "The right amount of complexity is the minimum needed for the current task."

**When to use this skill:**
- During code reviews
- When refactoring existing code
- When implementing new features
- When seeing over-engineered solutions

**Target users:**
Developers who want to write simple, maintainable code that's easy to understand and modify.
</purpose>

---

## Auto-Activation Triggers

<activation_triggers>
**This skill auto-activates when:**

1. **User mentions keywords:** "simplify", "refactor", "over-engineered", "too complex", "hard to understand", "maintainable"
2. **User asks questions like:**
   - "How can I simplify this code?"
   - "Is this over-engineered?"
   - "Can this be made more readable?"
   - "What's a simpler way to do this?"
3. **User requests tasks like:**
   - "Review this code for complexity"
   - "Refactor this to be simpler"
   - "Make this more maintainable"
   - "Remove unnecessary abstractions"
4. **Context detected:** During code reviews, refactoring tasks, or when user shares code snippets
</activation_triggers>

---

## Core Principles

<reference>
### The Simplicity Hierarchy

**From simplest (prefer) to most complex (avoid unless necessary):**

1. **Inline code** - No abstraction
2. **Named function** - Single-purpose function
3. **Helper function** - Reusable utility
4. **Class/Module** - Multiple related functions
5. **Framework/Library** - Complex abstraction layer

**Rule:** Don't jump to #5 when #1 or #2 would suffice.

---

### Common Complexity Smells

| Smell | Example | Simpler Alternative |
|-------|---------|---------------------|
| Premature abstraction | Helper function used once | Inline the code |
| Over-generalization | Configurable class with 10 options | Hard-code for current need |
| Unnecessary indirection | `getUserName() { return this.user.name }` | Just use `user.name` |
| Feature flags for code | `if (useNewAPI) { ... } else { ... }` | Delete the old code |
| Backwards compatibility hacks | Unused `_oldVar` or `// removed` comments | Delete completely |

---

### Simplicity Rules

### ✅ DO

1. **Inline one-time operations**
   ```typescript
   // ✅ Simple
   const total = items.reduce((sum, item) => sum + item.price, 0);

   // ❌ Over-engineered (for one-time use)
   const calculateTotal = (items: Item[]) =>
     items.reduce((sum, item) => sum + item.price, 0);
   const total = calculateTotal(items);
   ```

2. **Delete unused code completely**
   ```typescript
   // ✅ Simple
   function processUser(user: User) {
     return user.name;
   }

   // ❌ Unnecessary backward compatibility
   function processUser(user: User, _legacyFormat?: boolean) {
     return user.name;
   }
   ```

3. **Use three similar lines instead of abstraction**
   ```typescript
   // ✅ Simple (repeated 3 times)
   await createUser(data1);
   await createUser(data2);
   await createUser(data3);

   // ❌ Premature abstraction (for 3 uses)
   const userFactory = {
     createMultiple: async (dataArray: UserData[]) =>
       Promise.all(dataArray.map(data => createUser(data)))
   };
   await userFactory.createMultiple([data1, data2, data3]);
   ```

### ❌ DON'T

1. **Don't create helpers for one-time operations**
   ```typescript
   // ❌ Over-engineered
   const formatDate = (date: Date) => date.toISOString();
   console.log(formatDate(new Date()));

   // ✅ Simple
   console.log(new Date().toISOString());
   ```

2. **Don't add error handling for impossible errors**
   ```typescript
   // ❌ Unnecessary validation (userId comes from authenticated session)
   function getUserProfile(userId: string) {
     if (!userId) throw new Error("userId required");
     if (typeof userId !== "string") throw new Error("userId must be string");
     // ... rest of function
   }

   // ✅ Simple (trust internal code)
   function getUserProfile(userId: string) {
     // userId is guaranteed to exist from auth middleware
     return db.users.findById(userId);
   }
   ```

3. **Don't design for hypothetical future requirements**
   ```typescript
   // ❌ Over-engineered (features that don't exist yet)
   interface NotificationConfig {
     type: 'email' | 'sms' | 'push' | 'webhook'; // only email is used
     retryPolicy?: RetryPolicy; // never used
     priority?: 'low' | 'medium' | 'high'; // never used
     customTemplate?: string; // never used
   }

   // ✅ Simple (only what's needed now)
   interface NotificationConfig {
     type: 'email';
     to: string;
     subject: string;
     body: string;
   }
   ```

</reference>

---

## Examples

<examples>
### Example 1: Simplifying Over-Abstracted Code

**User Request:**
> "Review this code for unnecessary complexity"
>
> ```typescript
> class UserNameFormatter {
>   constructor(private user: User) {}
>
>   getFirstName(): string {
>     return this.user.firstName;
>   }
>
>   getLastName(): string {
>     return this.user.lastName;
>   }
>
>   getFullName(): string {
>     return `${this.getFirstName()} ${this.getLastName()}`;
>   }
> }
>
> const formatter = new UserNameFormatter(user);
> console.log(formatter.getFullName());
> ```

**Claude Response (with this skill activated):**

This code is over-abstracted for a simple task. Here's a simplified version:

**Issues identified:**
1. **Unnecessary class** - `UserNameFormatter` adds no value, just wraps property access
2. **Unnecessary methods** - `getFirstName()` and `getLastName()` are just `return this.user.firstName`
3. **Unnecessary indirection** - Three method calls to get a full name

**Simplified version:**
```typescript
// ✅ Simple - inline the logic
console.log(`${user.firstName} ${user.lastName}`);

// If used multiple times, a simple function suffices:
function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
console.log(getFullName(user));
```

**Why this is better:**
- 1 line vs 13 lines
- No class to maintain
- Easy to understand at a glance
- No indirection (direct property access)

---

### Example 2: Identifying Premature Optimization

**User Request:**
> "Is this code over-engineered?"
>
> ```typescript
> const cache = new Map<string, User>();
>
> async function getUser(id: string): Promise<User> {
>   if (cache.has(id)) {
>     return cache.get(id)!;
>   }
>   const user = await db.users.findById(id);
>   cache.set(id, user);
>   return user;
> }
> ```

**Claude Response (with this skill activated):**

Yes, this is premature optimization. Here's why:

**Issues:**
1. **Premature caching** - Do you have evidence of a performance problem?
2. **No cache invalidation** - Stale data when users are updated
3. **Memory leak** - Cache grows indefinitely
4. **Added complexity** - 7 lines instead of 1

**Simplified version:**
```typescript
// ✅ Simple - let the database handle caching
async function getUser(id: string): Promise<User> {
  return db.users.findById(id);
}
```

**When to add caching:**
- AFTER you measure a performance problem
- AFTER you've optimized the database query
- AFTER you've added proper monitoring

**Current recommendation:** Ship the simple version. Add caching only if profiling shows it's needed.

---

### Example 3: Removing Hypothetical Features

**User Request:**
> "Should I add these configuration options?"
>
> ```typescript
> interface EmailConfig {
>   provider: 'sendgrid' | 'mailgun' | 'ses'; // currently only using sendgrid
>   retryAttempts?: number; // might need this later
>   retryDelay?: number; // might need this later
>   fallbackProvider?: 'sendgrid' | 'mailgun' | 'ses'; // might need this later
>   rateLimit?: number; // might need this later
> }
> ```

**Claude Response (with this skill activated):**

No, don't add options for hypothetical future needs. Here's the simple version:

**Issues:**
1. **Hypothetical features** - "might need later" is not a requirement
2. **Increased surface area** - More code to test and maintain
3. **Configuration complexity** - More ways for things to go wrong

**Simplified version:**
```typescript
// ✅ Simple - only what's needed NOW
interface EmailConfig {
  apiKey: string;
  from: string;
}

// Hard-code SendGrid (the only provider we use)
async function sendEmail(to: string, subject: string, body: string) {
  await sendgrid.send({
    to,
    from: config.email.from,
    subject,
    text: body
  });
}
```

**When to add configuration:**
- When you're ACTUALLY adding a second provider (not "might need")
- When retry logic is ACTUALLY needed (not "might need")
- When you have a REAL requirement (not hypothetical)

**Current recommendation:** Ship the simple version. Add options when you have concrete requirements.

</examples>

---

## Best Practices

<best_practices>
### Do's ✅

1. **Start with the simplest solution**
   - Why: Complexity is easy to add, hard to remove
   - Example: Inline code → Named function → Helper → Class (only as needed)

2. **Delete unused code completely**
   - Why: Unused code confuses future developers
   - Example: Remove `_oldVar`, re-exports, `// removed` comments

3. **Trust internal code and framework guarantees**
   - Why: Validation at every layer is redundant
   - Example: No need to validate userId from authenticated middleware

4. **Use repetition over abstraction for <5 uses**
   - Why: Three similar lines are clearer than a premature abstraction
   - Example: `await create(a); await create(b); await create(c);` is fine

---

### Don'ts ❌

1. **Never create abstractions for one-time operations**
   - Why not: Added complexity with no reuse benefit
   - Instead: Inline the code directly

2. **Never design for hypothetical future requirements**
   - Why not: YAGNI (You Ain't Gonna Need It) - most "future" features never materialize
   - Instead: Add features when you have concrete requirements

3. **Never add error handling for impossible errors**
   - Why not: Clutters code and hides real error paths
   - Instead: Only validate at system boundaries (user input, external APIs)

4. **Never use feature flags or backward compatibility for removed features**
   - Why not: Dead code confuses developers and increases test surface
   - Instead: Delete the old code completely when you replace it
</best_practices>

---

## Changelog

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-11-24 | 1.0 | Initial skill creation | Development Team |

---

## Related Resources

**Skills:**
- [Code Architecture Guidelines](../../skills/_development/code-architecture/SKILL.md)
- [Performance Optimization](../../skills/_development/performance/SKILL.md)

**Commands:**
- [/plan-refactor](../../commands/plan-refactor.md) - Plan systematic refactoring
- [/review-code](../../commands/review-code.md) - Comprehensive code review

**Workflows:**
- [Code Review Workflow](../../workflows/code-review-workflow.md) - Multi-agent code review process

**Documentation:**
- [Code Anti-Patterns](../../docs/code-anti-patterns.md) - What NOT to do
