# Project 9 — Meeting and Trip Mapper

This fictional pack supports two workflows: choosing and arranging meetings for a new Denver trip, and coordinating an existing Charlotte itinerary. Your team chooses the planning experience, map and schedule design, overrides, sharing workflow, and degree of optimization.

## Files

- `trip-planning-pack.json` contains two trip scenarios, 12 meetings, availability, nine locations, and deterministic travel times.
- `travel-feasibility-helpers.cjs` evaluates consecutive meetings and can propose a lowest-travel feasible order for up to eight selected meetings.
- `data-dictionary.md` documents the records and calculation contract.
- `maps/` supplies real OpenStreetMap city extracts, provenance and licensing. Your team designs the map experience. Only the geographic basemap is real; the meeting pack and travel estimates remain synthetic.

The helper is intentionally narrow. It checks whether an entire meeting fits its availability and whether consecutive meetings leave enough travel time. Missing availability is a conflict, and duplicate meeting IDs are rejected. Its bounded exhaustive search can minimize supplied travel minutes while respecting meeting availability, a start location/time, and optional end constraints. It does not choose which clients matter or prescribe the app's interface, and users should be able to adjust its proposal.

Two verification cases are included so teams can confirm that their app recognizes one feasible route and one known conflict.
