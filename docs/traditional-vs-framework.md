# Traditional Development vs Component Composition Framework

This document contrasts two approaches at a high level.

## Traditional Development

- Dependencies are often spread across source files.
- Responsibilities and boundaries can be implicit.
- Integration is frequently handled through direct code relationships.
- Changes can ripple through the codebase in hard-to-predict ways.

## With Component Composition Framework

- Components are explicit units.
- Dependencies are declared through ports and connectors.
- Components run inside hosts.
- The project is described by a manifest of installed components, hosts, and connectors.
- Boundaries are explicit and inspectable.
- AI-assisted changes can be kept within narrower limits.
- AI can work with component metadata instead of scanning the whole source tree.
