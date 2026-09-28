# Local React prototypes

Use Codex to make a small, interactive React prototype with synthetic or kit-permitted public data. Each person explores an approach; the team compares the interactions and visual direction, then carries the selected React source into its Vibes build. A prototype tests an idea, not the reliability of an integration.

## Ready before Explore

Ask Codex to check the kit's `prototype/` folder before the workshop. It contains a minimal React preview, not a prescribed app layout. `node prototype/serve.cjs` opens a loopback-only server; follow the printed URL. The included preview runs without installing packages or fetching runtime code. Stop the server with Ctrl+C.

To edit and rebuild, use the available approved Node.js runtime and pnpm with the included lockfile: from `prototype/`, run `pnpm install --frozen-lockfile --ignore-scripts`, then `pnpm run build` and `pnpm start`. Codex can locate the bundled runtime/package manager when available. Dependency setup belongs before the timed exercise. If it is unavailable or blocked, tell the facilitator; do not bypass machine controls or fetch a CDN substitute.

## Explore an interaction

Ask Codex to read the current Vibes build skill and its JSX guidance through `ai-tooling-access.md`. Edit `prototype/App.jsx`; rebuild and refresh after changes. Use React state for local simulated behavior. The small preview shell and its build files are local development tools, not Vibes app source.

Investigate one meaningful task and a relevant edge case. Research product conventions and strong examples using `visual-design.md`, then choose your own composition. Keep data synthetic or explicitly permitted. No credentials, backend calls, live services or external scripts/fonts in the prototype. Do not add arbitrary dependencies; use current Vibes-supported capabilities when the team moves to the platform. Label what is simulated, including any apparent saving or AI output. Reload resets the sample state.

> Read our brief and shared Grill decisions. Help me investigate [uncertain decision] with a local React prototype in prototype/App.jsx. Use permitted sample data and demonstrate [interaction] plus [edge case]. Follow current Vibes JSX guidance, keep the UI portable, and label simulated behavior. Show me the rendered result and explain what remains untested. Do not deploy yet.

## Carry the selected design into Vibes

Have Codex compare the team's observations, preserve the useful interaction and design choices, and adapt the chosen JSX into `frontend/app.jsx`. Keep one coordinated team deployment. The fallback frontend is intentionally blank; there is no need to rebuild the selected design from scratch.

Vibes processes a single JSX source with supported imports. Assemble local components/data into that source where needed; do not upload the compiled preview HTML, React runtime, local server or Node build tools. Check optional library enablement and platform-managed assets. Replace simulated behavior with the actual supplied helpers, jobs and records, preserving the kit's access rules. Do not create a fake VibeAppAPI shim or infer a supported API from a local mock.

Check one complete journey in the hosted app, including the relevant failure/correction and save/reload behavior when persistence is required. Local compilation and a good-looking preview do not establish hosted compatibility. Keep the existing team card and decision record; no extra deliverable is required.
