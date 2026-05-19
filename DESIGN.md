---
name: JiraClone
description: Minimal project management tool — workspaces, projects, issues, Kanban board.
colors:
  accent: "#7c3aed"
  accent-hover: "#6d28d9"
  accent-muted: "#ede9fe"
  accent-muted-dark: "#2e1065"
  accent-text: "#6d28d9"
  accent-text-dark: "#a78bfa"
  surface-light: "#ffffff"
  surface-sidebar: "#f9fafb"
  surface-elevated: "#f3f4f6"
  surface-dark: "#0a0a0a"
  surface-sidebar-dark: "#111827"
  surface-elevated-dark: "#1f2937"
  border-light: "#e5e7eb"
  border-dark: "#374151"
  foreground-primary: "#111827"
  foreground-secondary: "#4b5563"
  foreground-muted: "#9ca3af"
  foreground-primary-dark: "#f3f4f6"
  foreground-secondary-dark: "#9ca3af"
  foreground-muted-dark: "#6b7280"
  danger: "#dc2626"
  danger-hover: "#b91c1c"
  priority-lowest: "#9ca3af"
  priority-low: "#0284c7"
  priority-medium: "#d97706"
  priority-high: "#ea580c"
  priority-highest: "#dc2626"
typography:
  display:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "normal"
  body:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.03em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  button-secondary:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.foreground-primary}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground-secondary}"
    rounded: "{rounded.md}"
    padding: "0 10px"
    height: "36px"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  button-sm:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0 10px"
    height: "28px"
  input-default:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.foreground-primary}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "36px"
---

# Design System: JiraClone

## 1. Overview

**Creative North Star: "The Instrument Panel"**

Every pixel earns its place the same way a gauge does: by telling you something true about the state of the system. The JiraClone interface is a cockpit in daylight — every element is functional, nothing is decorative chrome. When you land on the Kanban board, you see work, not the product's marketing. The sidebar carries wayfinding; the board carries signal; the accent color fires only when something demands attention.

The typography is tight and unbranded (Geist Sans, a workhorse not a personality), the surfaces are near-white and near-black with thin, honest borders. The violet accent is restrained to ≤10% of any screen: active nav states, primary buttons, issue drag handles, focus rings. Its rarity is the point.

This system explicitly rejects: Monday.com/ClickUp colorful overload (pastel-rainbow columns, feature-badge sidebars, marketing-UI disguised as a tool) and Jira's nested modal hell. There is one depth at a time. State is communicated by color; structure is communicated by space.

**Key Characteristics:**
- Dual-mode (light/dark) with near-white and near-black surfaces, not gray-gradient theater
- One accent (violet-600 / #7c3aed) used sparingly and consistently
- Priority and status indicators are the only multi-color elements
- Borders are always single-weight, never accent-colored stripes
- Typography scale compressed into 4 sizes; weight carries the hierarchy
- Spacing varies for rhythm; same padding everywhere is monotony

## 2. Colors: The Instrument Palette

A restrained two-mode palette: tinted neutrals carry 90%+ of the surface area; violet fires precisely where action or state demands it.

### Primary
- **Instrument Violet** (`#7c3aed` / `oklch(51% 0.22 292)`): The sole accent. Used on primary buttons, active nav items (as a soft tint bg + text), issue drag-ring highlight, focus rings, and workspace avatar backgrounds. Never used as a background fill on content surfaces.
- **Instrument Violet Hover** (`#6d28d9`): The 10% darker step applied to hover states of primary buttons and accent links.

### Secondary
- **Accent Muted Light** (`#ede9fe`): Low-saturation violet tint used as the active nav item background in light mode. Never used for informational content.
- **Accent Muted Dark** (`#2e1065`): Dark-mode equivalent of the above for active nav item backgrounds.

### Neutral
- **Canvas White** (`#ffffff`): Content surfaces in light mode: issue cards, input backgrounds, modal bodies.
- **Sidebar Ash** (`#f9fafb`): Sidebar and secondary panel backgrounds in light mode. Warmer step above pure white.
- **Lifted Gray** (`#f3f4f6`): Secondary button background, draggable column backgrounds at rest, chip/badge tray.
- **Canvas Dark** (`#0a0a0a`): Root background in dark mode.
- **Sidebar Charcoal** (`#111827`): Sidebar background in dark mode.
- **Elevated Charcoal** (`#1f2937`): Issue cards, inputs, and elevated surfaces in dark mode.
- **Line Light** (`#e5e7eb`): Border color in light mode — dividers, card borders, input strokes.
- **Line Dark** (`#374151`): Border color in dark mode.
- **Ink Primary** (`#111827` light / `#f3f4f6` dark): Primary text.
- **Ink Secondary** (`#4b5563` light / `#9ca3af` dark): Supporting text, labels, field values.
- **Ink Muted** (`#9ca3af` light / `#6b7280` dark): Placeholders, timestamps, issue keys.

### Priority Colors
These are the only colors outside the violet/neutral palette. Each maps to exactly one priority level and appears only in the priority icon on issue cards and the priority selector.

- **Priority Lowest** (`#9ca3af`): gray-400. Muted; recedes into the background.
- **Priority Low** (`#0284c7`): sky-600 (dark: sky-500). Mid-saturation blue; readable, not alarming.
- **Priority Medium** (`#d97706`): amber-600 (dark: amber-500). Warm amber, not neon yellow.
- **Priority High** (`#ea580c`): orange-600 (dark: orange-500). Distinct from medium; elevated urgency.
- **Priority Highest** (`#dc2626`): red-600 (dark: red-500). Full urgency, same hue as the danger token.

### Named Rules
**The One Instrument Rule.** Violet is used on ≤10% of any screen. It marks where to act, not what the product looks like. Adding violet to a new element is not styling — it is a claim that this element is the most important action on the screen. Make that claim deliberately.

**The State-First Rule.** Color communicates status, priority, or interactive state. It never communicates personality or decoration. If a color has no functional meaning, remove it.

## 3. Typography

**Display / Body / Label Font:** Geist Sans (Next.js default; with `system-ui, sans-serif` fallback)
**Mono Font:** Geist Mono (with `ui-monospace, monospace` fallback) — used exclusively for issue keys (e.g. `PROJ-14`)

**Character:** A single workhorse sans that earns trust through consistency, not personality. The pairing has no display/serif contrast: weight and size carry the entire hierarchy. Issue keys appear in mono to signal machine-generated identifiers, not prose.

### Hierarchy
- **Display** (700 weight, 1.5rem / 24px, line-height 1.25, tracking -0.01em): Page titles, modal headings.
- **Headline** (600 weight, 1.125rem / 18px, line-height 1.4, tracking -0.005em): Section headings, workspace/project names in dashboard.
- **Title** (600 weight, 0.875rem / 14px, line-height 1.5): Card headings, sidebar section labels, sidebar nav items (active state).
- **Body** (400 weight, 0.875rem / 14px, line-height 1.5): Issue titles, descriptions, comment text. Max line length 65ch.
- **Label** (500 weight, 0.75rem / 12px, line-height 1.4, tracking 0.03em): Field labels, section headers in uppercase (e.g. "STATUS", "PRIORITY"). All-caps when used as section headers.
- **Mono** (400 weight, 0.75rem / 12px, Geist Mono): Issue keys only (`PROJ-1`, `BUG-42`). Never used for general labels or UI copy.

### Named Rules
**The Two-Size Rule.** Nearly all UI text is either 14px (body/title) or 12px (label/mono). The hierarchy lives in weight and color, not scale. Only page-level headings break to 18px or 24px. If you're reaching for a font size between 13px and 17px, stop and use weight instead.

## 4. Elevation

This system is flat by default. Surfaces are distinguished by background tint and border, not shadow. The only exceptions are modals and dragging issue cards.

**The Flat-by-Default Rule.** Surfaces rest at their tonal level: sidebar is one step warmer than the canvas; cards sit on top with a 1px border. No ambient shadows at rest. Shadows appear only as a response to state.

### Shadow Vocabulary
- **Drag Lifted** (`box-shadow: 0 10px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.10)` + `ring-2 ring-violet-400`): Applied to an issue card being dragged. The violet ring is the key signal; the shadow provides lift. Together they are unmistakable: this card is in motion.
- **Modal Overlay** (`box-shadow: 0 25px 60px rgba(0,0,0,0.20), 0 8px 20px rgba(0,0,0,0.12)`): Modal dialogs only. Substantial depth to separate them from the page. Paired with a `bg-black/50 backdrop-blur-sm` overlay.

## 5. Components

### Buttons
Functional but warm: enough padding to be comfortable, no decorative chrome.

- **Shape:** Gently rounded (6px radius)
- **Primary:** Instrument Violet fill (`#7c3aed`), white text, 14px 500-weight. Sizes: sm (28px h, 10px x-padding), md (36px h, 16px x-padding), lg (44px h, 24px x-padding).
- **Hover:** Deepens to `#6d28d9`. Transition 150ms ease-out on `background-color`.
- **Focus:** `ring-2 ring-violet-500 ring-offset-2`. Visible in both modes.
- **Disabled / Loading:** 50% opacity, pointer-events none. Loading state shows a 16px spinning circle inline before the label.
- **Secondary:** `#f3f4f6` fill (`#1f2937` dark), `#111827` / `#f3f4f6` text. Hover lightens/darkens one step.
- **Ghost:** Transparent fill. Used for icon-adjacent actions (close, sort, nav icons). Hover reveals a subtle background tint.
- **Danger:** `#dc2626` fill, white text. Used only for destructive confirmation (delete issue, delete workspace). Hover `#b91c1c`.

### Chips / Badges (Status)
- **Style:** Pill shape (`border-radius: 9999px`), background is the status color at 12% opacity (`color + "20"` hex alpha), text is the status color at full. No border. 12px label-weight text with a small dot icon alongside.
- **Usage:** Issue status only. Never used for priority (priority uses the icon-color system in the card).

### Cards (Issue Cards)
The issue card is the most important component. It must read at a glance.

- **Corner Style:** 8px radius
- **Background:** White in light mode (`#ffffff`); `#111827` in dark mode (one step above the board column bg)
- **Border:** 1px `#e5e7eb` (light) / `#374151` (dark). No shadow at rest.
- **Internal Padding:** 12px all sides
- **Content layout:** Priority icon + issue title on one row; issue key (mono, muted) + due date (muted) on a second row 10px below
- **Dragging state:** `box-shadow: 0 10px 40px rgba(0,0,0,0.15)` + `ring-2 ring-violet-400` + 1deg clockwise rotation. The tilt is a micro-signal, not an animation.
- **Title hover:** Issue title text transitions from `foreground-primary` to `accent-text` on hover, signaling that it is a link.

### Kanban Column
- **Background at rest:** `#f3f4f6` at 50% opacity (light); `#111827` at 50% opacity (dark). Visually recessed behind the cards.
- **Background on drag-over:** Subtle violet tint (`#ede9fe` / `#1e1b4b` dark) + `ring-2 ring-violet-300 dark:ring-violet-700`. The ring confirms the drop target, not just the bg.
- **Min-height:** 120px, so empty columns remain droppable.
- **Header:** Status dot (project-defined hex color) + status name (title weight) + count pill (12px, muted bg).

### Inputs / Text Fields
- **Style:** 1px border (`#e5e7eb` / `#374151` dark), white (`#ffffff` light) / `#111827` dark background, 6px radius, 36px height, 12px x-padding.
- **Focus:** `ring-2 ring-violet-500`, border becomes transparent. The ring is the signal; the border does not compete.
- **Placeholder:** Ink Muted color.
- **Error state:** Border and focus ring shift to `#ef4444`. Error message appears below in 12px red.
- **Disabled:** 50% opacity.

### Sidebar Navigation
- **Width:** 224px (fixed, sticky)
- **Background:** Sidebar Ash / Sidebar Charcoal
- **Nav item default:** 14px, `#4b5563` / `#9ca3af` text, transparent bg. Hover: one-step bg tint.
- **Nav item active:** Accent Muted bg (`#ede9fe` / `#2e1065` dark), Instrument Violet text (`#6d28d9` / `#a78bfa` dark), 600 weight.
- **Section labels:** 11px, uppercase, 0.06em tracking, Ink Muted color, 16px top margin.
- **Bottom bar:** Avatar + truncated email/name + theme toggle + sign-out icon. Compact; 32px icon touch targets.

### Modal
- **Overlay:** `bg-black/50 backdrop-blur-sm`. Click-outside closes. Escape key closes.
- **Panel:** 12px radius, white (`#111827` dark), 1px border, large drop shadow. Sizes: sm 384px, md 448px, lg 512px, xl 672px.
- **Header:** 16px 600-weight title + 20px close icon (muted, hover darkens). 24px x-padding, 16px y-padding, 1px divider below.
- **Body:** 24px padding.

## 6. Do's and Don'ts

### Do:
- **Do** use `#7c3aed` (Instrument Violet) as the sole accent. One button variant, one active-nav tint, focus rings. Nothing else.
- **Do** use weight contrast (400 vs 600) to establish hierarchy within the 14px size. Don't reach for a new font size when weight difference will do.
- **Do** let the status color (set per project) live in the badge background tint and the column header dot. Status color is project-defined and variable; treat it as data, not brand.
- **Do** keep issue cards flat at rest. The drag shadow and ring are the only lift. At rest, a card earns its place through content, not shadow.
- **Do** use 1px borders at the canonical colors. A border is a structural signal, not decoration.
- **Do** respect `prefers-reduced-motion`. Card drag tilt, focus ring transitions, and hover bg transitions should be suppressed at the OS level.
- **Do** use Geist Mono only for machine-generated identifiers (issue keys). All other 12px text uses Geist Sans.

### Don't:
- **Don't** add `border-left` or `border-right` wider than 1px as a colored accent stripe on cards, list items, or sidebar items. This is explicitly forbidden. Rewrite as a background tint or remove it.
- **Don't** use violet as a background fill on content surfaces (boards, list rows, settings panels). Violet is an action signal, not a fill.
- **Don't** add a second accent color. The priority system already uses 5 colors (slate/blue/yellow/orange/red). Adding another "secondary brand color" would push the system past its complexity budget.
- **Don't** use gradient text (`background-clip: text` with a gradient). Use a single solid `#7c3aed` or the foreground color. Emphasis through weight or size, not gradient.
- **Don't** add glassmorphism (backdrop-blur + translucent bg) to cards, sidebar, or navigation. The only blur in the system is the modal overlay backdrop. Blur on chrome is decoration; blur on modal is structural depth separation.
- **Don't** add celebration animations, empty-state mascots, confetti, or "success" color flashes. The tool communicates state (done/not done), not sentiment.
- **Don't** build a hero-metric template anywhere in the product (big number, small label, gradient accent). This is the Monday.com / ClickUp reflex the product explicitly rejects.
- **Don't** nest cards. Issue cards live inside column containers. Neither should have its own border-radius container nested inside another.
- **Don't** use Tailwind's default purple (`purple-600`, `#9333ea`). The project's violet is `#7c3aed` (violet-600 in Tailwind's scale). These are close but different. Be explicit.
