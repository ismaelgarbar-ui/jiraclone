# Product

## Register

product

## Users

Builders and developers exploring the project as a demo or internal reference tool. Primary task on any given screen: moving work forward — creating an issue, shifting its status, reviewing what's in progress. No onboarding ceremony; they arrive already knowing what project management is.

## Product Purpose

A minimal Jira alternative that handles the core loop — workspaces → projects → issues — without the feature sprawl. Success looks like: a new user can create a workspace, spin up a project, and start moving cards in under two minutes.

## Brand Personality

Calm, precise, uncluttered. The interface should feel like a well-organized notebook — everything findable without hunting, nothing fighting for attention.

## Anti-references

- Monday.com / ClickUp: pastel-rainbow columns, feature-badge sidebar items, marketing UI dressed up as a tool. This project should read as a working instrument, not a product demo.
- Jira: nested menu hell, icon-soup toolbars, modal-on-modal patterns. Every interaction here should be one layer deep.

## Design Principles

1. **One depth at a time.** Kanban columns, issue lists, detail panels — never more than one level of hierarchy competing for attention on the same screen.
2. **White space is structure.** Breathing room replaces borders and dividers wherever possible. Grouping through proximity, not lines.
3. **Status is the primary signal.** Color exists to communicate state (status, priority, overdue). Not decoration.
4. **Quiet confidence.** No splash screens, no empty-state mascots, no celebration animations. The tool respects that the user already knows what they're doing.
5. **Ship-ready defaults.** Every field, form, and affordance works on the first interaction without configuration. Sensible defaults over configuration prompts.

## Accessibility & Inclusion

WCAG 2.1 AA. All interactive elements keyboard-navigable with visible focus rings. Color is never the sole indicator of state (status badges always carry a text label). Reduced-motion preference respected via `prefers-reduced-motion`.
