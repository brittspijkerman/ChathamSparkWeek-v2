# Meeting and Trip Itinerary Planner

Project key: `project_09`  
Category: Planning and coordination  
Team size: 3

## Business context

Planning meetings across locations means balancing availability, travel time and a changing schedule.

## Challenge

Build an app for creating and adjusting a meeting trip, with a geographic view and an editable itinerary.

## Minimum requirements

1. Let users create a trip from candidate meetings and organize an existing trip in an editable planning experience.
2. Show meeting locations on a map alongside the schedule, flag relevant availability/travel conflicts, and allow users to adjust a suggested meeting order.
3. Start with a few meetings in one city. Explain time zones, synthetic travel estimates and the boundaries of the checks you provide.

## Workshop boundaries

- Start with a few meetings in one city. Try both a new trip and one already planned.
- Demonstrate a travel or availability conflict, inspect a suggested meeting order and adjust it. The supplied travel times are synthetic, not live directions.

## Ideas and suggestions

- Map data is available from OpenStreetMap; the kit includes real Denver and Charlotte extracts. Your team chooses the map experience. Exploring real routing or travel times is optional.
- Explore travel buffers, alternate stops, attendee details or preparation notes.
- Let users compare two itineraries or see the effect of moving a meeting.

## Supplied inputs

- **Trip-planning dataset and feasibility helper.** Two city scenarios, an existing trip, meetings, availability, coordinates, travel times, and deterministic conflict checks. Source: Project 9 Meeting and Trip Mapper data v1. As of: Fixed workshop dataset.

## Supplied tools

- **Locations and travel times.** Sample meeting locations, availability and estimated travel times.
- **Itinerary checks.** Flags conflicts and suggests a low-travel order for up to eight meetings.

## Decisions the team owns

- How should new-trip planning and existing-trip coordination share one model?
- How should users select and sequence meetings?
- Which conflicts need strong warnings versus gentle guidance?
- What map and itinerary interaction is most useful?
