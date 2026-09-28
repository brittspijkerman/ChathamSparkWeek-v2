# Meeting and Trip Itinerary Planner

Start with [the shared mockup and team-build exercise](workshop-start.md). Everyone explores a local React approach before the team builds its chosen direction in Vibes.

Client trips are often assembled across disconnected calendars, contact lists, maps, emails, and notes. The organizer must choose meetings, understand where clients and colleagues are located, sequence stops, estimate travel, identify conflicts, and keep logistical and preparation details together as plans change.

## Minimum requirements

1. Let users create a trip from candidate meetings and organize an existing trip in an editable planning experience.
2. Show meeting locations on a map alongside the schedule, flag relevant availability/travel conflicts, and allow users to adjust a suggested meeting order.
3. Start with a few meetings in one city. Explain time zones, synthetic travel estimates and the boundaries of the checks you provide.

## Ideas and suggestions

These are options, not additional requirements. Choose what helps your intended user; another approach can be equally valid.

- Optional context includes contacts, attendees and preparation notes. Follow the technical guide's documented endpoint-check boundary.
- Let users see geography and time together so a route that looks short on a map cannot hide an impossible schedule.
- Consider how overrides, buffers, time zones, preparation notes, or attendee coordination might improve the workflow without expanding the scope too far.
- Make conflicts actionable by identifying the meetings and travel segment involved rather than showing a generic warning.
- Use the supplied bounded optimizer for up to eight selected meetings, explain its travel-time objective, and keep the proposed order editable rather than presenting it as the only valid plan.

## Tools and getting started

Include a map showing meeting locations. Map data is available from [OpenStreetMap](https://www.openstreetmap.org); real Denver and Charlotte extracts are also included in the kit's maps folder. Your team chooses how the map supports planning. Real routing and travel times are optional areas to explore; the supplied meeting locations and travel estimates remain synthetic.

Give your agent this guide and [technical-guide.md](technical-guide.md), and have it load the shared Chatham Vibes build skill from ai-tooling. [vibes-setup.md](vibes-setup.md) guides your agent through creating the app and installing its tools. The frontend is intentionally blank: your team owns the product decisions.

## Use Codex and the framework

Use Codex throughout the [seven-phase framework](project-framework.md): run the bundled Grill to clarify the problem, prototype and compare approaches, design the chosen workflow, build in small slices, verify and iterate, then prepare the release and reflect on what to improve. Your team owns decisions and acceptance. Have Codex read the current Chatham Vibes build skill and relevant references before platform work.

## Build, test and share

Aim for a small working journey within the two-hour session, reserving about 20 minutes for the presentation. Timing is a target, not a guarantee. Use Codex to implement; all team members can shape examples, decisions, tests and explanations without assigned roles. Check a useful success case and a relevant failure/correction, not every possible edge case.

Use [presentation-deliverable.md](presentation-deliverable.md) and the shared $deck-builder skill to explain the problem, show what works, and share what you learned. Keep confidential data out of demos and distinguish synthetic examples from approved live data.

## Design research

During Explore and individual prototyping, use [Design with intent](visual-design.md): study relevant product conventions and 2–3 strong examples, compare distinct compositions, then choose your own direction. Ask Codex to critique the rendered app during iteration. No additional deliverable is required.


## React handoff and workflow choices

Use [Local React prototypes](react-prototyping.md) to prepare the preview before Explore, compare approaches, and carry the selected source into Vibes. During Design and Plan, ask which steps need interpretation, explicit rules or human review; [AI and automation](ai-and-automation.md) offers an optional example. Keep the existing requirements and team record; no new deliverable is required.
