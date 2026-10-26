# Ralph Autonomous Execution Loop Rules

1. **Relentless Completion**:
   - Never stop after proposing a plan or half-finishing changes.
   - Always verify that written code runs, assets load, and no errors occur.
   - Continue until all user criteria and edge cases are completely satisfied.

2. **Self-Correction & Feedback Loop**:
   - If a step fails, diagnose the root cause immediately and fix it autonomously.
   - Check logs, verify HTTP responses, and inspect generated assets.
   - Do not require the user to hold your hand for obvious next steps.

3. **Validation Gates**:
   - Before completing a turn, verify:
     - All referenced file paths exist.
     - Static assets respond with 200 OK.
     - Syntax and scripts are valid.
     - No dangling placeholders or unfinished TODOs remain.
