# Package structure

This repository is organized around a small set of packages and apps.

## Packages and apps

- `packages/ccf-project` handles project loading, saving, editing, validation, graph navigation, and build preparation
- `packages/ccf-sdk` provides the component authoring API used to define ports, register handlers, and integrate with the framework
- `packages/ccf-runtime` runs a composed project, activates components, and routes requests between them
- `packages/ccf-cli` exposes terminal commands for creating projects, validating structure, and building output
- `apps/web` provides a browser-based project builder, inspector, and editor experience
- `apps/ccf-docs` contains the documentation site for the framework and its packages
