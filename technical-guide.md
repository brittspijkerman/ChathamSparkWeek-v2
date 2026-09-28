# Meeting and Trip Itinerary Planner: agent technical reference

Read [workshop-guide.md](workshop-guide.md) for the required outcome and team-owned choices. Use [vibes-setup.md](vibes-setup.md) to create or resume your team’s own app and install its required tools.

## Supplied support and exact boundary

Read `data/project-09-meeting-trip-mapper/trip-planning-pack.json` and its dictionary. It supplies two trip scenarios, 12 meetings, availability, nine locations and a synthetic travel matrix. These are fictional logistics examples, not road directions or actual appointments.

Use either the local helper (inline it without `module.exports`) or the supplied `calculate_itinerary` job:

- Local `evaluateItinerary(pack, stops)` accepts `[{ meeting_id, start_at }]` and returns ordered stops, travel segments and conflicts. It checks duplicate meeting selection, entire-meeting availability, overlap and inter-meeting travel. Missing availability is a conflict, not assumed permission to schedule.
- Local `optimizeItinerary(pack, { meeting_ids, start_location_id, start_at, end_location_id?, end_by? })` proposes a feasible order minimizing matrix travel minutes for at most eight meetings. It does not optimize client value or guarantee real-world travel.
- The Vibes job uses camelCase request options: `{ action: "optimize", meetingIds, startLocationId, startAt, endLocationId?, endBy? }`, or `{ stops }` for evaluation. Check outer success and `response.result.success`, then use `response.result.itinerary`.

The manual evaluator checks travel between meetings; it does not separately check travel from a hotel/start point or to an end point. The optimizer does account for those optional route constraints. If the team lets users change a proposed itinerary, recheck all constraints the UI claims to enforce. Do not label a partial check “fully feasible.”

Use explicit time-zone offsets in stored start times and display the trip's time zone. A datetime input without an offset must be converted intentionally, not interpreted as the viewer's local clock. Preserve meeting duration when testing availability. The supplied matrix has no live traffic, and omitted routes must fail clearly rather than default to zero minutes.

## Map data

Include a map showing meeting locations. [OpenStreetMap](https://www.openstreetmap.org) is a source of map data; real Denver and Charlotte extracts are also included in `data/project-09-meeting-trip-mapper/maps/`. That folder's README covers provenance and attribution. Your team chooses the map's design and interactions.

Real routing and travel times are optional explorations. Check any provider's access, terms and Vibes compatibility. The bundled geography is a snapshot, not a routing service; meeting details and travel estimates remain synthetic. Label illustrative connecting lines honestly and preserve data attribution.
