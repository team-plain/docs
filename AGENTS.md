# Webhook Documentation Update Guide

This document describes how to update webhook snippet examples and the versions page when a new webhook schema version is released.

## Overview

- Webhook example payloads live in `_snippets/webhooks/*.mdx`. Each file contains a single JSON code block with an example payload for one webhook event type.
- The webhook versions changelog lives in `webhooks/versions.mdx`.
- Snippets are validated against the **latest** schema at `https://core-api.uk.plain.com/webhooks/schema/latest.json` using the `pnpm lint:snippets` command (which runs `scripts/validateWebhookSnippets.ts`).
- Versioned schemas are available at `https://core-api.uk.plain.com/webhooks/schema/<version>.json` (e.g. `2026-02-11.json`).

## Typical prompt

> Please update the documentation for webhook version `<version>`

## Step-by-step process

### 1. Fetch the new and previous schemas

Fetch the JSON schemas for the new version and the previous version to diff them:

- New: `https://core-api.uk.plain.com/webhooks/schema/<new-version>.json`
- Previous: the most recent version listed in `webhooks/versions.mdx`

### 2. Identify changes between versions

Compare the two schemas and note:

- **New fields added** to existing definitions (e.g. a new field on `threadField`, `thread`, `customer`, `labelType`, etc.)
- **Fields removed** from existing definitions
- **Type changes** (e.g. `internalActor` → `actor`, new enum values)
- **New event types** added to the `type` enum or new payload definitions
- **Removed event types**

### 3. Run the snippet linter

```bash
pnpm lint:snippets
```

This validates every file in `_snippets/webhooks/` against the latest schema. Any failing snippets will be reported with the specific validation error (e.g. missing required field, wrong type).

Fix **all** reported errors before proceeding.

### 4. Fix failing snippets

For each failing snippet in `_snippets/webhooks/`:

- Open the file and find the JSON payload inside the `` ```json `` code block.
- Cross-reference with the schema definition for that event type. The `eventType` field in the payload tells you which schema definition to look at.
- Common fixes:
  - **Missing required field**: Add the field with an appropriate example value (use `null` for nullable fields that don't apply to the example).
  - **Wrong field names**: Always check the schema for the correct field names. For example, each actor type has its own ID field — look up the relevant actor definition in the schema.
  - **New enum value**: If a type enum was expanded, no snippet changes are usually needed unless an existing value was removed.
- When in doubt, fetch the schema and look up the `required` array for the relevant definition.

### 5. Re-run the linter

```bash
pnpm lint:snippets
```

Confirm all snippets pass. If any still fail, repeat step 4.

### 6. Update `webhooks/versions.mdx`

Add a new `### \`<version>\` (Latest)` section **above** the previous latest version. Remove the `(Latest)` label from the old one.

Each version entry should include:

- A concise bulleted list of what changed (fields added/removed, type changes, new events)
- A link to the JSON schema: `[View JSON Schema](https://core-api.uk.plain.com/webhooks/schema/<version>.json)`

Keep the descriptions brief — a few bullet points on fields/events added, removed, or changed.

### 7. Final check

Run the full linter one more time to make sure nothing is broken:

```bash
pnpm lint:snippets
```
