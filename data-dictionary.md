# Trip Planning Data Dictionary

## Collections

| Collection | Purpose |
| --- | --- |
| `trip_scenarios` | A new-trip planning situation and an existing-trip coordination situation. |
| `clients`, `contacts`, `employees` | Canonical relationship records referenced by meetings. |
| `locations` | Fictional addresses, coordinates, city, and IANA timezone. |
| `meetings` | Candidate or scheduled meetings with duration, attendees, location, and preparation notes. |
| `availability_windows` | Times when a candidate meeting can occur. |
| `travel_times` | Directional drive minutes between every distinct pair of locations within the same city. |
| `verification_cases` | Small known inputs and expected conflict counts for smoke testing. |

All identifiers are stable. Client, contact, and employee IDs match the shared relationship pack.

## Meeting scheduling

`scheduled_start_at` is populated for the existing trip and null for the new-trip candidates. Applications may create their own schedule without changing the source records.

Dates use ISO 8601 timestamps with explicit UTC offsets. Meeting duration is stored as integer minutes. Locations also include an IANA timezone for display.

## Travel feasibility

For consecutive meetings A and B:

1. Calculate A's end time from its start and duration.
2. Look up `travel_times` using A's location as `from_location_id` and B's as `to_location_id`.
3. A conflict exists when B starts before A ends plus required travel time.

The helper returns the ordered stops, each travel segment, and specific `meeting_overlap` or `insufficient_travel_time` conflicts. The estimates are fictional workshop values, not live routing data.

## Bounded optimization

`optimizeItinerary` accepts one to eight unique `meeting_ids`, a `start_location_id`, and `start_at`, plus optional `end_location_id` and `end_by` constraints. It evaluates every meeting order, schedules each stop at the earliest feasible point in its supplied availability windows, and returns the feasible result with the fewest supplied travel minutes. Finish time and stable meeting order break ties. The result is a transparent proposal, not an authoritative choice of which meetings should occur.
