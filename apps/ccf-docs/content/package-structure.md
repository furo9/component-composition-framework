# Package structure

This repository is organized around a small set of packages and apps.

## Packages and apps

- `packages/ccf-project` handles project loading, saving, editing, validation, graph navigation, and build preparation
- `packages/ccf-sdk` provides the component authoring API used to define ports, handle requests, and schedule follow-up work
- `packages/ccf-runtime` runs a composed project, activates components, and routes requests between them
- `packages/ccf-cli` exposes terminal commands for creating projects, validating structure, and building output
- `apps/web` provides a browser-based project builder, inspector, and editor experience
- `apps/ccf-docs` contains the documentation site for the framework and its packages

## Supporting material

- `examples/counter-port` shows the port contract package
- `examples/counter-component` shows the component package built with the SDK
- `apps/ccf-docs/content/sdk/` contains the SDK API docs and scenario walkthroughs
