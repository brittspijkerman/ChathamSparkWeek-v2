# Create your team's Vibes app

Follow [ai-tooling-access.md](ai-tooling-access.md) to read the shared Vibes build skill directly from the local folder for authentication, current CLI/API syntax and branding. No plugin installation is required. The agent performs setup; analysts should not need to copy commands.

1. Check the team's existing app URL or local `team-app.json` receipt first. If one exists, verify project key, host and maintainer access and inspect its source/jobs. Do not create a second app or overwrite team work. Otherwise create a production app from `frontend/app.jsx` (or the team's first supported JSX), with `client_record_access: none`. Use the project name unless the team chooses another. The creator automatically becomes a maintainer.
2. Record the returned app ID/URL, project key and kit version in local `team-app.json` immediately. If creation returns an uncertain result, inspect the creator's apps before retrying. This receipt contains no credentials and is not a browser runtime dependency.
3. Configure required libraries: **none**. Optional libraries: **none specified**. Configure connectors: **none**. Follow current platform guidance; stop on missing access rather than guessing or using outside services.
4. Install the required jobs below from bundled source. Set `enabled: true` and the exact type/client/concurrency settings. On resume, list jobs and retrieve matching source: unchanged jobs need no redeploy. Do not overwrite team-modified jobs without resolving the difference. Preserve unrelated jobs and frontend libraries. Do not seed or recreate records on every setup.
5. No managed web-research setup is required. If the team later chooses public research, follow the current shared Vibes guidance and explicitly configure it.
6. Run [smoke-tests.md](smoke-tests.md). Check returned data, not just transport success. Record results beside the app ID. Stop and report a failed dependency clearly; do not repeatedly retry side-effecting or failed calls automatically.
7. Add teammates as maintainers through the supported app settings, using their confirmed emails and preserving the creator. Do not copy facilitator credentials or grant unrelated access. Submit the app URL in the portal. This is one app per team, not one competing deployment per analyst.

## Required jobs

| Job | Source | Type | Client callable | Concurrency |
|---|---|---|---|---|
| `calculate_itinerary` | `jobs/calculate_itinerary.js` | sync | yes | parallel |

## Optional jobs — install only if used

| Job | Source | Type | Client callable | Concurrency |
|---|---|---|---|---|
| None required | — | — | — | — |



The itinerary job contains the synthetic pack. The documented local helper is an alternative, not an additional required installation.



## Data and frontend hookup

Read the project technical guide for its shortest path. Inline supplied browser helpers into the single JSX source, removing ES module/CommonJS exports as documented. Do not deploy frontend helpers as jobs or assume local JSON is served by Vibes. Keep small immutable seed data inline or use a supplied self-contained job. Editable tasks, templates, observations, votes and meeting records require team-built save/load jobs; no generic notes job implements them.

The listed capabilities are a starting configuration, not a ceiling on product design. Other platform-approved tools may be used when justified. No master-app service, app-to-app API, copied data-share permission or new external key is needed.


## Bring the selected prototype

Follow [Local React prototypes](react-prototyping.md) to adapt the selected JSX into frontend/app.jsx. The prototype preview and Node build tools stay local. Check the current Vibes JSX guide, wire real capabilities, and verify hosted behavior; local preview success alone is not a platform test.
