---
name: analyst-build-lab-project-09
description: Create or refine a team-owned Meeting and Trip Itinerary Planner in Chatham Vibes using this workshop kit, supplied tools and synthetic data. Prepare the project submission files or ZIP when asked.
---

# Meeting and Trip Itinerary Planner

Preserve the team's ownership of the user, workflow, interface and design. The minimum outcomes are requirements; suggestions are not a backlog.

## Use the framework

Read [references/project-framework.md](references/project-framework.md) before implementation. Run the bundled [grill-me-workshop](skills/grill-me-workshop/SKILL.md) once with the team during Explore; keep it to roughly five minutes and at most two rounds. Preserve the assigned requirements, let people make product decisions, and record evidence for Q1–Q6 as you work.

## Start

- Read [references/workshop-start.md](references/workshop-start.md) and [references/workshop-guide.md](references/workshop-guide.md). During the individual exercise, build local simulated React prototypes using [references/react-prototyping.md](references/react-prototyping.md).
- Read [references/ai-tooling-access.md](references/ai-tooling-access.md). Locate or obtain ai-tooling using that guide and read its Chatham Vibes build SKILL.md directly; no plugin installation is required. Check access/authentication before setup; do not invent platform APIs.
- Read `bundle-manifest.json` and [references/vibes-setup.md](references/vibes-setup.md). Create one new production app for the team, or resume its recorded app. Use only the team's recorded app as the deployment target.
- Read [references/technical-guide.md](references/technical-guide.md) when wiring the supplied tools. Use [references/smoke-tests.md](references/smoke-tests.md) to check setup before building the product.

## Work with Codex throughout

Use Codex for the shared Grill, individual prototypes, comparison and design, implementation, tests, critique and iteration. Keep the team in control of consequential choices. Before platform work, read the current Chatham Vibes build skill and the references relevant to the capability; do not copy an API pattern without checking its runtime and access requirements. After each small slice, report what changed, evidence actually observed, limitations and the next decision.

## Visual direction

During Explore and individual prototyping, read [references/visual-design.md](references/visual-design.md). With the team, research relevant product conventions and 2–3 strong examples, compare distinct compositions, and choose a coherent direction. During iteration, inspect the rendered app for hierarchy, consistency, accessibility and small-screen usability. Keep this within the existing exercise; do not prescribe a theme or add a deliverable.

## Build



- Adapt the team's chosen React prototype using [references/react-prototyping.md](references/react-prototyping.md); `frontend/app.jsx` is only a blank fallback. Do not make the master portal or another Vibes app a runtime dependency.
- Respect supplied calculation/validation contracts and reuse helpers where applicable; project-specific requirements take precedence. Do not mistake browser utilities for server jobs.
- Files under `data/` are source inputs, not automatically hosted data. The meeting pack is synthetic; the optional `maps/` extracts are real OpenStreetMap geography under ODbL. Follow their README, preserve attribution, and never present synthetic venues or travel times as real. Inline immutable inputs or use the supplied job; create app-local jobs for editable records. Import once using stable IDs and never reset user edits on reload.
- Keep record access `none`; put business persistence behind authenticated, validated jobs. The team designs its own focused data model. No prebuilt business CRUD backend is implied.
- Preserve sources, units, assumptions and timestamps. Never replace failed live tools with made-up results; label synthetic examples. Treat AI output as a proposal until reviewed.
- Work in small tested slices, with one coordinated deployment at a time and rotating responsibilities for integration, checks, and the next decision. Leave layout, prioritization and optional features to the team.

## Share

With about 20 minutes remaining, even if the app is unfinished, read [references/presentation-deliverable.md](references/presentation-deliverable.md) and read the shared Chatham `$deck-builder` instructions directly from the local folder using the tooling-access guide. Submit the team app URL, editable presentation and reviewed project log/feedback through the hub team submission form. Do not invent demo evidence.

## Technical hookup

Read [references/technical-guide.md](references/technical-guide.md) when connecting supplied data and capabilities. The short workshop guide defines outcomes; technical references do not prescribe the team's interface.


## Prototype handoff and automation decisions

Read [references/react-prototyping.md](references/react-prototyping.md) before local prototyping. Prepare its preview before Explore, preserve the selected JSX and design for the team build, and verify the hosted result separately. During Design and Plan, use [references/ai-and-automation.md](references/ai-and-automation.md) to distinguish interpretation, explicit rules and human review where relevant. Do not add AI or automation requirements beyond the assigned brief.


## Project record and final submission

At the start, read [references/project-log-guidance.md](references/project-log-guidance.md). Keep timing, expressed decisions, sources and verification evidence as you work; ask for a brief team reflection and export a reviewed log for facilitator review. Use the existing team card rather than duplicate note-taking. The presentation is three slides, with all Q1–Q6 answers written on the final slide (not required in the live talk). Use [references/presentation-deliverable.md](references/presentation-deliverable.md) for submission and confirmation.


## Prepare my submission

When asked for submission items, a final handoff or a ZIP, read [references/submission-package.md](references/submission-package.md). Gather the current deliverables into a dated folder and ZIP under `submission/`, flag missing evidence and provide clickable file links. Do not restart the workshop or submit automatically.
