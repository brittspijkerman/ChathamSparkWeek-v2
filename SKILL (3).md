---
name: grill-me-workshop
description: Run a short decision-focused Grill interview for an Analyst AI Build Lab project before the first prototype or when new evidence changes the plan.
---

# Workshop Grill

Adapt the ai-tooling grilling method to a five-minute workshop discussion. Preserve the team's product decisions; recommendations are proposals, not consent. This is a bounded interview, not an exhaustive review.

1. Read the project brief, minimum requirements, current team decisions, and the project-specific prompts in `../../references/project-framework.md`. Inspect facts available in the kit yourself. Do not ask users to restate supplied rules, choose platform APIs, or guess facts you can inspect.
2. Identify consequential unknowns affecting the next useful capability. Ask at most three short numbered questions whose prerequisites are settled. Include a recommendation, its reason, and the trade-off. Use a question tool when available, otherwise write the questions plainly. Wait for the team's answers; no auto-selected or timed-out answer counts as a decision.
3. Ask at most one follow-up round of up to two questions, only if an answer exposes a consequential dependency. Do not expand into every possible future feature. If a clock is available, respect the roughly five-minute timebox; otherwise use the round limit and honor the team's request to stop.
4. End with a concise decision note: decision + reason; changed requirement; one acceptance example; unresolved questions; next experiment/task. Put it in the existing project record or team card, not a new form. Have the team correct the summary before dependent implementation. The same answer can settle several related decisions; do not ask it again.

At the limit, do not silently settle unknowns or assert shared understanding. Mark an unresolved blocker and identify work that can proceed without it. Prototype with an explicitly labeled assumption only when the user agrees; do not convert that assumption into an accepted product rule. Fixed kit requirements cannot be voted away. A broader review remains available through the regular ai-tooling grilling skill.

Use this once with the team during Explore, share the decisions, then let each person investigate a local mockup. Do not run three duplicate interviews or restart Grill for every implementation task. Reopen only decisions affected by new evidence or changed scope.


When it changes the next capability, investigate which steps need interpretation, which follow explicit rules, and where a person reviews the result. Read [AI and automation](../../references/ai-and-automation.md) if needed. This question stays within the existing round limit; do not require an automation or model call.
