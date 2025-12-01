# Project Overview

This project is a data-driven confession web application built with TypeScript, React, and Styled-Components. Traditional confessions often rely on generic phrases such as “I like you.” or “Will you go out with me?”. Since these expressions lack uniqueness, this service instead delivers sincerity through measurable physical responses. By visualizing real-time heart rate and body temperature, users express a “data-proven confession.”

The project contains three main pages:

- Home
- Destiny Finder
- Compatibility

---

# Figma MCP Server Rules

Figma MCP Server rules define standardized structures for UI construction, interaction behavior, and naming conventions. These rules ensure consistency between design and implementation through the following:

- Standard naming conventions for UI components
- Defined structure for component communication schemas
- Consistent spacing, layout, and sizing guidelines
- Fixed behavior patterns for hover, press, focus, and transitions
- Unified animation rules for visual consistency

These rules function as the foundation for all development.

---

# Tech Stack

- Language: TypeScript
- Framework: React
- Styling: Styled-Components
- Animation: CSS transitions and keyframes
- Build System: Vite or CRA

---

# Implementation

## Home Page

- Create a clear hero section explaining the core concept.
- Apply light entrance animations such as fade-in, slide, or scale.
- All interactive components must follow the unified hover rule:  
  `filter: brightness(0.9);`
- Use responsive Flex/Grid layouts using the MCP spacing scale (8 / 12 / 16 px).
- Provide a clear call-to-action linking to Destiny Finder or Compatibility.

---

## Destiny Finder Page

- Implement input fields for user identifiers.
- After submission, compute the destiny matching result and present it with keyframe animations.
- Use reusable UI components such as cards or result containers.
- Follow MCP spacing and avoid arbitrary pixel values.
- Ensure transition effects are consistent across elements.

---

## Compatibility Page

- Compute compatibility data or retrieve measured values.
- If real-time metrics are required, visualize heart rate or temperature through animated charts.
- Handle state transitions (idle → measuring → result) without layout shifts.
- Pre-allocate chart areas to prevent visual jumping.
- Apply brightness-based hover interactions on all interactive UI.
- Reuse components defined in the design system for consistency.

---

# Avoid Patterns

### 1. Using `any` Type

The `any` type reduces type safety and should not be used.  
Use strict types, generics, or `unknown` instead.

// Bad
let value: any;

2. Inline Styling

Do not use inline CSS styles.
Use Styled-Components for all styling definitions.
// Bad
`<div style={{ background: 'red' }}>Example</div>`

3. Arbitrary Spacing
   Spacing must follow the defined MCP spacing scale.

4. Animation Logic Inside Components
   Do not apply transitions directly to DOM elements within components.
   Implement animations through Styled-Components keyframes.

5. Inconsistent Hover Effects
   All hover states must consistently use:
   `filter: brightness(0.9);`

6. Deeply Nested Component Structures

Break UI into:
• Page components
• Layout components
• Reusable components

Avoid unnecessary nesting within component trees.

⸻

Summary

This document outlines the implementation guidelines for the project using TypeScript, React, and Styled-Components while following MCP rules. Avoid unsafe typing, inline styles, arbitrary spacing, and inconsistent animation logic. Use structured, reusable components and unified interaction behaviors to maintain code quality and visual consistency.
