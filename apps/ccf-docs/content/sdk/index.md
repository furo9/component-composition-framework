# SDK

The SDK gives components a single, explicit component loop.

- requests enter through a named port
- a port can carry several request actions
- the component behind that port implements all of those actions
- state and requests are treated as immutable by convention
- responses are emitted explicitly
- async work returns through the same system

Use the API page for the type shapes and the scenarios page for concrete examples.
The split package page shows how a port contract package and a component package work together.
