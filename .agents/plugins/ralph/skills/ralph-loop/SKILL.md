---
name: ralph-loop
description: Executes a persistent, autonomous task resolution loop that iteratively tests, fixes, and refines work until all acceptance criteria are met.
---

# Ralph Loop Workflow

Use this workflow to achieve autonomous goal convergence:

1. **State Assessment**:
   - Inspect the current workspace state.
   - Enumerate all requirements and open tasks.

2. **Iterative Execution Loop**:
   - Select the next incomplete task.
   - Make the required file changes or code enhancements.
   - Run verification commands (HTTP status checks, script runs, lints).
   - If errors arise, inspect the error output and remediate immediately.
   - Repeat until 100% of tasks pass verification.

3. **Final Hardening**:
   - Confirm all links, assets, and UI states work seamlessly.
   - Present a concise, verified summary of completed work to the user.
