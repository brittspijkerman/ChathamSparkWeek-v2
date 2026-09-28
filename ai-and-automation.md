# AI and automation

AI and automation can work together, but they play different roles. Automation executes a defined process. Model-based AI helps interpret variable inputs or generate suggestions. A workflow can use either or both; not every repeated task needs a model call.

| Role | Example | What to check |
|---|---|---|
| AI helps build an automation | Codex helps write and test a script. | Inspect the code and test actual behavior. |
| Automation runs explicit rules | Export data, validate columns, calculate totals and import records. | Expected results, missing inputs, duplicates and failures. |
| AI runs inside the workflow | Summarize narrative comments or propose classifications. | Source support, omissions and unsupported additions. |
| People own consequential decisions | Approve data use and review a recommendation. | Who reviews, what they see and what they may approve. |

An AI-written script may run without AI afterward. A browser agent that uses a model to decide each next action does use AI during execution. Both need appropriate access, testing and clear stopping conditions. Use code for specified calculations and validation; use AI where interpretation adds value.

## Example: Power BI data in a Vibes app

This is an illustrative workflow, not a supplied integration, tested end-to-end connection or additional project requirement.

1. A person signs in and selects an approved Power BI report and its intended filters.
2. A browser automation script exports permitted data and waits for the correct download.
3. Code checks required columns, reporting date, row count and duplicate identifiers. Unexpected or incomplete data stops the import.
4. The script uploads the file to a Vibes app with an implemented import workflow. The app validates it and reports accepted and rejected rows without silently creating duplicates.
5. The app displays the refreshed data and its source date. Optionally, AI drafts a summary of changes for a person to review against the data.

The browser script runs on an approved machine outside the Vibes frontend and job sandbox. Start with an attended test and synthetic data. Power BI export depends on permissions, report configuration and export limits; active filters affect what is exported. Access to a report does not itself authorize copying its data elsewhere. Confirm destination permissions and sensitivity requirements. Stop for expired login, MFA, unexpected screens, changed columns or an uncertain upload result. Check the import result before retrying.

Prefer an approved API or connector when available. If an external system will push directly to Vibes, have Codex read the current Vibes inbound-trigger guidance; use its supported app-bound authorization, not credentials embedded in frontend code. An upload confirmation or accepted request is not proof that processing completed. Scheduling, unattended operation and live data transfer require separate setup and verification.

Sources: [Power BI export guidance](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-export-data) and [Microsoft browser automation guidance](https://learn.microsoft.com/en-us/power-automate/desktop-flows/automation-web). Consult current Vibes guidance for the destination workflow.

## Apply this during Design and Plan

Ask: **Which steps need interpretation, which follow explicit rules, and where should a person review the result?** Record only decisions that matter to the next capability. This is a design lens, not a requirement to add AI, browser automation or another submission. Existing assigned minimum requirements still apply.
