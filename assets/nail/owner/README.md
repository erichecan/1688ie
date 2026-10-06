# Lumi owner UI

The existing `nail-owner-demo.html` entry loads native ES modules. No framework, bundler, CDN, or production backend is required. Serve the repository over HTTP; ES modules cannot reliably run by double-clicking a `file://` URL.

## Component boundaries

| Module | Responsibility |
| --- | --- |
| `components.js` | Button, IconButton, Icon, Avatar, Badge, SearchInput, Select, Field, SectionHeader, Step, PersonRow, ServiceCard, Drawer, Modal, EmptyState, original-artwork viewport |
| `data.js` | Fictional fixtures, staff/services, date/time formatting, original artwork coordinates |
| `store.js` | The single appointment/customer state, availability, booking, rescheduling, lifecycle, local persistence |
| `calendar.js` | AppointmentCard, OpeningCard, day controls, minute-positioned calendar and mobile Timeline |
| `customers.js` | Filters, CustomerTable, CustomerSidebar, CustomerProfile, SummaryMetric, history, notes/preferences/tags |
| `drawers.js` | Shared appointment summary, date strip, available times, progressive booking and rescheduling, details |
| `i18n.js` | Shared English/Chinese UI dictionary |
| `app.js` | Shell, routing between views, delegated events, modal/edit flows, focus management |
| `owner.css` | Shared tokens and components, reference desktop layout, iPad overlay and mobile recomposition |

Views are pure render functions. Buttons use delegated `data-action` handlers, never cloned business logic. Every booking operation updates `store.js`; history and statistics read the same state. Date-specific fixture durations reflect the reference cards; newly created appointments use the selected service's configured duration.

## Original artwork

`art-today.png`, `art-customers.png`, `art-customer-detail.png`, and `art-new.png` are unchanged copies of the supplied design PNGs. Inline SVG image viewports reuse only the Logo, portraits and service photographs. All other content, including headings, notes, table rows, buttons and inputs, is real HTML. The complete reference images are not used as page backgrounds.

Artwork coordinates live centrally in `data.js` and the shell wordmark. Replace these viewport assets with separate high-resolution originals when those become available. Existing stock photographs remain the fallback for additional fictional records; new customers use initials.

Inter is hosted locally at four weights. Its license is included in `fonts/OFL.txt`. `logo.svg` is a native vector fallback used as the favicon.

## Review URLs

Use `nail-owner-demo.html?preview=today`, `detail`, `new`, `reschedule`, `cancel`, `no-show`, `customers`, or `customer`. Preview mode pins fixtures, visible labels and scroll positions and does not write to local storage. Preview controls remain interactive.

The plain URL reads and writes `lumi-owner-demo-v1` in localStorage. Profile → Reset demo data resets only this demo's local records. The default date and clock are fictional demo values, not the host machine's current time. The profile menu identifies the data as fictional.

The reference contains 13 appointment cards while its header says 12, 12 visible customer rows while its header says 128, and an incorrect weekday for October 5, 2024. Preview mode retains the picture labels; live demo counters use the actual fixture records and correct weekdays. A reference reschedule time overlaps an existing appointment; the snapshot retains the chosen visual time, but submission requires conflict resolution or an explicit overbook confirmation.

## Hosting

The existing Dockerfile copies `assets/`, so these modules and fonts are included automatically. The old owner-page link is unchanged. The customer-facing and service landing pages retain their own existing UI.

## Validation

Browser screenshots and results live under `output/nail-owner/`. The validation runner uses Playwright with installed Chrome; its import points to the local review installation under `/tmp/lumi-browser-check`. Run:

```sh
python3 -m http.server 8768 --bind 127.0.0.1
node output/nail-owner/verify.mjs
node output/nail-owner/verify.mjs --flows
```

Production SMS, authentication and payment connections are outside this static demo. Drawer-based rescheduling is implemented; drag-and-drop is intentionally not added without corresponding interaction artwork.
