# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The public Symphony Messaging developer documentation, authored as Markdown and published via **GitBook** to developers.symphony.com. There is no build, test, or lint pipeline — content is consumed as-is by GitBook. Commits land here through the GitBook ↔ GitHub sync (note the `GITBOOK-NNNN:` prefix on every commit), so most day-to-day edits happen in the GitBook UI; direct git edits are typically used for bulk changes, restructuring, or AI-assisted authoring.

## Structure that matters

- **`SUMMARY.md`** is the source of truth for site navigation. Adding a new page without adding it to `SUMMARY.md` means the page exists in git but is **not reachable on the published site**. Removing/renaming a page without updating `SUMMARY.md` produces broken links (those `{% content-ref url="/broken/pages/..." %}` blocks you'll see scattered around are exactly this).
- **`README.md`** is the landing page ("Start Your Developer Journey") — not a project readme. Don't treat it as developer-facing meta-docs.
- **`.gitbook/assets/`** holds every image referenced from docs. New images go here.
- **Section landing pages** are `<section>/README.md` (e.g. `bots/planning-your-bot/README.md`). GitBook renders these as the section index.

### Live vs. legacy directories

The tree contains both current and legacy versions of several sections:

| Current (in SUMMARY.md) | Legacy (still on disk, not in nav) |
|---|---|
| `bots/` | `building-bots-on-symphony/` |
| `ext-apps/` | `building-extension-applications-on-symphony/` |
| `dev-tools/` | `developer-tools/` |

When making content changes, **edit the current path** (the one referenced from `SUMMARY.md`). The legacy directories are retained for URL/redirect compatibility — don't migrate content into them.

## GitBook markdown conventions

Pages use GitBook-flavored Markdown, not plain CommonMark. Common constructs:

- **Frontmatter**: pages often start with a YAML block containing `description:` (used as the page's meta description and subtitle).
- **Hints**: `{% hint style="info" %}…{% endhint %}` (also `warning`, `danger`, `success`).
- **Content refs**: `{% content-ref url="path/to/file.md" %}…{% endcontent-ref %}` renders as a card link. Broken refs use synthetic `/broken/pages/<id>` URLs.
- **Tabs**: `{% tabs %}{% tab title="…" %}…{% endtab %}{% endtabs %}`.
- **Code blocks** accept a `title=` attribute: ` ```java title="Example.java" `.
- **Heading anchors**: `## Heading <a href="#slug" id="slug"></a>` — preserve these when editing headings, since other pages link to them.
- **HTML entities** like `&#x20;` show up after GitBook auto-formatting; leave them alone unless cleaning up.

Stick to these — GitBook will preserve them on round-trip, but custom Markdown extensions may be stripped or reformatted on the next sync.

## When adding a new page

1. Create the `.md` file in the appropriate section directory (use the current, not legacy, path).
2. Add a `description:` frontmatter block.
3. Add the page to `SUMMARY.md` at the correct nesting level — indentation in `SUMMARY.md` defines the nav hierarchy.
4. If it's a section landing page, name it `README.md` inside a new subdirectory.
5. Reference images by relative path into `.gitbook/assets/`.

## When renaming or moving a page

GitBook URLs are derived from filenames. Renames will break external links unless GitBook's redirect system is updated through its UI — flag this to the user before doing structural renames.

## Cross-references between sections

The product surface is split across several areas that frequently cross-link:

- **`bots/`** — server-side bots using the BDK (Java/Python), REST API, datafeed, MessageML.
- **`ext-apps/`** — in-client extension apps using the ADK and Extension API (browser-side JS).
- **`embedded-modules/`** — embedding Symphony chat into third-party apps (Embedded Mode, URI scheme, FDC3 interop, Universal Webhook).
- **`ai/`** — Symphony's MCP server and AI integrations; depends conceptually on `ext-apps/app-authentication/` (OBO).
- **`admin-guide/`** — Agent / SBE / Client 2.0 / Universal Webhook change logs and Agent operational docs.
- **`dev-tools/`** — BDK-Java, BDK-Python, ADK, generator, Postman, UI style guide.

When writing or reviewing content that touches authentication, message formatting (MessageML/PresentationML/ExtensionML), or the Extension API services, expect to link across these sections rather than duplicate.

## What NOT to do

- Don't add a `package.json`, build script, linter config, or CI workflow — this isn't that kind of repo.
- Don't bulk-reformat existing pages (line wrapping, list style, etc.) unless asked; the diff churn fights the GitBook sync.
- Don't delete the legacy `building-*` / `developer-tools/` directories.
- Don't invent commit messages that don't follow the `GITBOOK-NNNN:` pattern when the user is committing through the normal GitBook flow — those numbers are issued by GitBook. For local commits the user makes manually, follow whatever style they specify.
