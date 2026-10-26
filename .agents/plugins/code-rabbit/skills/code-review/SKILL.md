---
name: code-review
description: Performs an automated CodeRabbit-style deep architectural and code quality audit across HTML, CSS, and JavaScript files, providing detailed findings and direct remediation.
---

# CodeRabbit Code Review Workflow

1. **Static Analysis & Syntax Audit**:
   - Inspect all source files for syntax issues, unused variables, and unhandled promises/exceptions.

2. **Quality Checklist**:
   - [ ] WebGL / Three.js lifecycle: Check resize handling, device pixel ratio clamping, and resource cleanup.
   - [ ] DOM & CSS: Check responsive breakpoints, typography hierarchies, and mobile navigation states.
   - [ ] Accessibility: Check image `alt` texts, button labels, contrast, and focus outlines.
   - [ ] Security: Verify external links have `rel="noopener noreferrer"`.

3. **Remediation & Report**:
   - Apply fixes directly to any detected issues.
   - Summarize findings in a clean CodeRabbit Review Summary format.
