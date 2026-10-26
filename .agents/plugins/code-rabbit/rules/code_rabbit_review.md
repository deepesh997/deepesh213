# CodeRabbit Quality Review Rules

1. **Comprehensive Review Dimensions**:
   - **Correctness & Logic**: Ensure all event listeners, callbacks, and data structures handle edge cases and null/undefined values gracefully.
   - **Performance**: Prevent memory leaks (Three.js geometries/materials disposal, animation frame cancellation), minimize reflows, and optimize asset loading.
   - **Accessibility (a11y)**: Enforce semantic HTML5 tags, descriptive `aria-label` attributes, keyboard navigation support, and sufficient color contrast.
   - **Security**: Sanitize inputs, prevent XSS in dynamic HTML injections, use `rel="noopener noreferrer"` on all external links.
   - **Cross-Device & Responsive**: Validate layouts across mobile (<768px), tablet (<1024px), and desktop viewports.

2. **Actionable Suggestions & Automated Fixes**:
   - Every critique must be accompanied by a concrete, drop-in code improvement.
   - Proactively apply approved optimizations directly to the codebase.
