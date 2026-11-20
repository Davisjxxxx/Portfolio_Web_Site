# Jason Davis portfolio

## Local preview

Run `python -m http.server 4173 --bind 127.0.0.1 --directory portfolio` from this folder and open <http://127.0.0.1:4173/>. The preview uses static HTML, CSS, JavaScript, local fonts, artwork, and project JSON. It has no build step.

The active local redesign uses a dark navy, cyan and violet palette. The homepage opens the Sources map and a specific event in Nova’s research bulletin and puts six hands-on activities ahead of the project index. Edit the bio in `portfolio/index.html`, case studies in `portfolio/projects.json`, catalog interactions in `portfolio/app.js`, and activities in `portfolio/discovery.js`. Each tab retains its state until the page reloads. The activity progress counter resets on reload.

| Activity | Visitor action | Destination or source |
| --- | --- | --- |
| Deep space | Inspect the pillar in Webb’s release image, then open the live field and select a signal. | [Nova Signals](https://nova-origins.com/signals) and [Cosmic Cliffs image, NASA/ESA/CSA/STScI](https://esawebb.org/images/weic2205a/) |
| Universe theory | Double a model horizon by varying its mass. The sizing uses the classical Schwarzschild relation. | [NASA explanation](https://imagine.gsfc.nasa.gov/science/objects/black_holes2.html) and [Nova research experience](https://nova-origins.com/universe-cinematic/) |
| Ancient worlds | Examine the brow ridge and cranial vault of Skhūl V. The Smithsonian dates it to 80,000–120,000 years ago. This previews the Ancient Civilizations component planned for Nova Origins. | [Smithsonian fossil record](https://humanorigins.si.edu/evidence/human-fossils/fossils/skh%C5%ABl-v) and [photograph by Wapondaponda, cropped by UtaUtaNapishtim](https://commons.wikimedia.org/wiki/File:Skhul.JPG), displayed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| Evidence trail | Trace a fictional corporate summary to a log and filter it by signed reviews. | [GOOCI Receipts](https://goociusa.com/) |
| Workflow lab | Adjust workload and human-review time to estimate savings or additional effort. | [Hire One](https://gethireone.com/) |
| Agent workshop | Assemble a deterministic three-stage handoff, run a ticket, and inspect each stage’s output. | Local example inspired by Agent Forge Academy |

The three owner-supplied domains are canonical in the active preview. GOOCI Receipts describes corporate intelligence and source coverage on its homepage. Hire One’s project README confirms the small-business AI workflow focus and gethireone.com domain. The production site returned a browser challenge during the direct HTTP check. The reference folder preserves the original uncorrected capture for comparison.

## Original site capture

Source <https://jasonda-8862p4t.runable.site/>. The local-only files under `reference/` preserve the published homepage, exact client JavaScript and CSS, favicon, host script, desktop and mobile screenshots, extracted project records, rendered page text, and filter membership. The HTML depends on the original host's asset paths. The new preview is self-contained.

The original site has one home route, section navigation, five project filters and six project-detail dialogs. Its React entry point mounts the “Made with Runable” link independently of the portfolio component. Its HTML also loads a separate host script. The preview loads only local portfolio assets. The six captured records have no live-demo or repository URLs. The source uses `hello@example.com` and `your-handle` social URLs.

The original contact form validates name, email and message and calls the same-origin oRPC procedure `POST /api/rpc/contact/submit`. This is client-side evidence. Server implementation, message delivery, storage and credentials were unavailable. No contact message was submitted. Contact details and a production delivery path are outstanding. Cloudflare, Supabase and Railway have no deployment or integration in this preview.

## Verification

The hero discovery link targets Nova’s [report on GRB 261113A](https://nova-origins.com/research-updates#:~:text=GRB%20261113A%20receives%20rapid%20multi%2Dobservatory%20follow%2Dup) with a text fragment. The report links to the [GCN observing circulars](https://gcn.nasa.gov/circulars/events/grb-261113a). It is an externally reported event covered by Nova. Chromium followed the hero link and scrolled the named event into view. The second hero link opens [Sources](https://nova-origins.com/sources), and the Deep space activity opens [Signals](https://nova-origins.com/signals).

The local browser checks exercised all six activities, retry and completion feedback, the workload break-even logic’s negative case, keyboard slider input, catalog filters, case-study dialogs, canonical domain links, and all stations at 320, 390, 768 and 1024 pixels.

## Artwork brief

The built-in image generator produced the asset at `portfolio/assets/nova.webp` from this prompt.

> A widescreen cinematic astronomical artist impression, one imposing black hole seen almost edge-on, centered in frame, photorealistic thin layered turbulent copper and pale-gold accretion disk lit against extremely dark ink-black space. The disk rises on a shallow diagonal from lower left to upper right, wraps into a clearly defined luminous arc over the black circular shadow, with luminous threadlike filaments sweeping far out on both sides; restrained scattered pinprick stars, subtle analog grain. Deep silence, editorial astronomy plate. No letters, words, numbers, grids, diagrams, frames or UI. Wide landscape composition with generous dark room around the main body.
