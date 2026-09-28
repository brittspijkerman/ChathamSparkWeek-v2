# Access ai-tooling — no plugin installation

These are agent instructions. Read the shared skills directly from disk; they do not need to appear in Codex's skill selector.

Keep the analyst handoff brief: locate the local folder yourself, ask only for a missing path/access choice, and carry out technical setup. Reuse successful preflight results from the current conversation unless access, files or environment changed; do not rerun full setup at every stage. The two-minute target covers opening the kit and giving the prompt after preparation, not downloading dependencies or provisioning an app. If blocked, report the one actionable issue rather than presenting a long setup checklist.

## Locate once

Use the analyst's supplied local path first. Otherwise check their OneDrive location for `AI Enablement - ai-tooling`. A common Windows location is `C:\Users\<username>\OneDrive - Chatham Financial Corp\AI Enablement - ai-tooling`; macOS locations vary. Do not assume the facilitator's username or scan the entire disk.

If the folder is missing, open [ai-tooling in SharePoint](https://chathamfinancial1.sharepoint.com/:f:/r/teams/AIEnablement/Shared%20Documents/General/ai-tooling?csf=1&web=1) using an available authenticated browser or connector. Obtain the complete folders for the Vibes build skill and Chatham deck-builder skill, including their referenced scripts, assets and resources, plus the Vibes CLI for this computer. Preserve relative paths when extracting into a local ai-tooling folder. Reuse existing files; do not overwrite a user's modified copy.

If sign-in is required, ask the analyst to sign in and resume afterward. Never request passwords or bypass authentication. If the available tools cannot download folders, ask the analyst to download and extract ai-tooling, or add its OneDrive shortcut and select **Always keep on this device**. Ask for the resulting folder only if you cannot locate it. Indexed text or a link alone is not proof that required files are available. Verify the files before proceeding; do not claim that first-time downloads, authentication or dependencies will finish in two minutes.

Resolve these paths relative to that folder:

- Vibes: `plugins/chatham-vibes/skills/build/SKILL.md`
- Chatham PowerPoint: `plugins/chatham-presentations/skills/deck-builder/SKILL.md`

Read the relevant SKILL.md completely before doing that work, then follow its linked references. Resolve its scripts, references and assets relative to its own directory, not the workshop kit. A SharePoint webpage or isolated SKILL.md is not the full tool package.

Do not install plugins, create marketplace entries or change Codex settings for this workshop. Do not modify the shared ai-tooling files. Keep app code and deck outputs in the team's project folder. In a new Codex conversation, give the agent this kit and the same local ai-tooling path again.

## Check access during setup (preferably before the workshop)

1. Confirm both skill files and their referenced resources are readable. Confirm the PowerPoint scripts and assets are downloaded, not just placeholders.
2. Follow the Vibes skill's CLI discovery and authentication check using the analyst's own account on the office network/VPN. Reading its instructions does not provide credentials or app access. Do not create an app during this preflight.
3. Read the deck-builder instructions and run its documented `scripts/preflight.py` with the available Python runtime. Follow its permission instructions if dependencies need installation. Do this before the presentation timebox, not during the final 20 minutes.
4. Report the resolved folder and any missing access or dependencies. Do not claim readiness until those checks pass, and do not start a pricing, extraction or research run merely to check file access.

During app building, load only the needed Vibes references. During presentation work, follow the deck-builder build/render/review procedure using its full local resources. Referencing `$deck-builder` in workshop material names that workflow; it does not require an installed plugin.
