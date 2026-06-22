# Component Composition Framework

## 1. Summary

Component Composition Framework is a development framework for building projects made of independent components.

Each component has a clear boundary, is dependency-agnostic, does not share state directly with other components, keeps inter-component communication stateless, exposes ports, and is hosted by a host. Components connect to other components through connectors declared in the manifest. The project is mainly described by a manifest: which components are installed, what ports they provide, what ports they require, how they are connected, and what configuration each component uses.

The goal is not to make software development simpler by hiding complexity. The goal is to make software complexity more explicit, controllable, observable, replaceable, and safe for AI-assisted development, especially in large codebases where AI struggles when the territory is not restrained.

## 2. Core idea

Component Composition Framework treats a project as a set of component instances hosted by hosts and connected through connectors declared in a manifest, with each instance carrying its own configuration.

A component can provide behavior, data, storage, UI, integration, or any other responsibility. What matters is that its external relationship with the rest of the project is explicit.

## 3. Components

A component is an independent unit of the project.

It has:

- ports that define how other components can interact with it;
- internal state or implementation details that are private to the component;
- no direct shared state with other components;
- if a component has state, that state stays internal but remains observable by the framework;
- no mutable state across component boundaries;
- ports it exposes;
- ports it depends on;
- configuration specific to its use inside a project.

A component may be small and focused, or it may wrap a larger internal system. The important point is that the rest of the project interacts with it through its declared boundary, not through its internals.

These constraints are a prerequisite for replayability, testing, and debugging. Without them, the framework cannot provide those features on its own and would have to rely on vendor-specific solutions.

One of the main goals of the framework is to uniformize how components are connected, configured, tested, and debugged.

## 4. Ports and connectors

A port is the endpoint a component exposes or requires.

A port describes what one component exposes and what another component may rely on. A component can then be replaced by another one if the replacement respects the same port requirements.

A connector is the manifest-level link that binds compatible ports together.

Communication flows through connectors in practice.

Ports are the only way one component may reach another component.

Component implementations declare ports, but they do not choose their own dependencies.

The project selects which components satisfy the required ports. A component repository can provide alternative compatible choices, but the manifest records only the chosen providers and the connectors between them.

For example, several components could provide user data in different ways, while exposing the same user-data port to the rest of the project.

Ports are the main mechanism for interchangeability, validation, and controlled composition.

## 5. Hosts

A host is the active runtime wrapper around a component instance.

It owns the component lifecycle, including creation, activation, suspension, and disposal. It carries host configuration as well as component configuration, and invokes the component when the framework activates it.

The component itself owns the behavior and implements its own logic. The host does not decide that behavior; it runs the component inside the framework constraints.

If a component has state, the host can expose that state to the framework in a controlled way.

When configured to do so, the host can log relevant state and execution information for replayability, logging, or debugging.

Host observability is optional and controlled by host configuration, like the other logging and tracing features.

Host configuration is usually internal to the framework, but it can be exposed when deeper control is needed.

Connectors and hosts have different responsibilities: connectors handle message flow between ports, while hosts handle lifecycle and runtime wrapping around a component instance.

Hosts make replayability, debugging, and testing practical because they can record how a component reacted to messages.

In the board analogy, the framework provides the circuitry, connectors move messages, and hosts are the supports that hold components in place and make them operational.

## 6. Manifest

A project is described by a manifest of components, hosts, and connectors.

The manifest defines:

- which components are installed;
- the configuration of each component;
- the configuration of each host;
- the ports each component exposes;
- the ports each component requires;
- which component satisfies each required port;
- the connectors between compatible ports;
- the hosts that run each component instance.

The project manifest only references components, hosts, and connectors. It does not host their source code or implementation.

It only stores the chosen providers for the components currently used in the project.

Other compatible components can be discovered and selected from a component repository when needed, but they are not stored in the project manifest unless they are actively used.

The manifest is the only place where components are wired together.

Connectors bind exposed ports to required ports.

This manifest is not meant to replace all code. It makes the project structure explicit and inspectable, similar to a lockfile for installed components.

## 7. Runtime

The runtime is responsible for turning the manifest into a working project.

It instantiates hosts, attaches components to them, and activates the connectors declared in the manifest.

Connector settings control whether traffic is logged, traced, or kept silent.

In development, connectors can log all requests so flows can be debugged and replayed.

The runtime gives the framework a stable place to observe and control the project through hosts and connectors.

## 8. Observability

The framework should make the project understandable through its component, host, and connector structure.

For each component, it should be possible to inspect:

- its configuration;
- what it exposes;
- what it depends on;
- which host it runs in;
- which connectors it participates in;
- requests it receives;
- responses it emits;
- errors and performance information.

The aim is to make the logical structure of the project visible, instead of leaving it hidden inside source files.

## 9. Validation

Ports can be associated with reusable checks.

When a component claims to expose a port, the framework can verify that its observable behavior matches what that port requires.

This does not guarantee that a component is perfect internally. It verifies that the component behaves correctly from the outside, at the boundary where other components depend on it.

If a component is stateful, the host can expose snapshots or checkpoints of its internal state to support replay, testing, and debugging.

At a high level, replay can use connector logs, and host-captured state when stateful components are involved and observability is enabled.

## 10. AI-assisted development

The framework is designed so AI can work inside clearer limits.

AI should not need to freely modify an entire codebase to make architectural changes. It can instead work on specific components, ports, connectors, or the manifest.

This makes AI-assisted development more inspectable and reversible.

It also keeps the observed context focused on component metadata such as configuration, dependencies, ports, and connectors instead of source code.

The exact way this is enforced can vary, including changes limited to the manifest or to version-controlled project configuration.

The main AI use case is building and modifying projects, not developing the internal implementation of components.

Component implementation remains a separate package-level concern and can be handled independently by developers.

AI can help generate components, suggest replacements, connect compatible ports, explain the manifest, and modify project configuration while preserving explicit boundaries.

## 11. Human navigation

The framework should help developers understand a project by navigating its components and their connectors as much as possible.

The useful view is not necessarily a large global graph. A better model is focused navigation: start from one component, inspect its direct relationships and connectors, then move through the manifest step by step.

The specific ways to explain, document, and quickly grasp a project structure are still to be designed.

This supports understanding without requiring the developer to read the whole codebase at once.

## 12. Vision

Component Composition Framework focuses on component boundaries and AI-assisted project building.

Component boundaries are intended to support robustness, observability, and uncoupling.

AI-assisted project building shifts AI work toward fundamental project entities to configure, while keeping component source code out of the project-building workflow.

The framework is not mainly about reducing the amount of code. It is about making software complexity explicit enough to inspect, validate, replace, and safely manipulate, while keeping project composition separate from component implementation.
