**Source Visual Truth**
- `C:\Users\wusuy\AppData\Local\Temp\codex-clipboard-a4570ac3-877f-47ba-b958-343a193b30ab.png`

**Implementation Screenshot**
- `D:\projects\myWeb\design-qa-card-overlay.png`

**Viewport**
- In-app browser, narrow desktop panel: 599 x 898.

**State**
- `/card/paintings`, light mode, card overlay over the room scene.

**Full-View Comparison Evidence**
- The implementation now keeps the room scene visible underneath a dim overlay and centers a white card on top, matching the reference's modal-over-page structure.
- The card includes the reference hierarchy: close control, dotted kicker, ONGOING label, large artwork preview, thumbnail strip, and category label.

**Focused Region Comparison Evidence**
- Preview image region checked with a portrait artwork (`painting3.jpg`, 1080 x 1546). The preview media uses absolute positioning inside the preview box with `object-fit: contain`, so artwork content is not cropped.
- Thumbnail strip checked in the same viewport. Thumbnails remain visible inside a muted strip and use `object-fit: contain` so different artwork ratios remain recognizable.

**Findings**
- No P0/P1/P2 issues remain for the requested card overlay format and artwork aspect-ratio behavior.

**Patches Made**
- Restored card page to an overlay on top of the room background instead of a standalone white page.
- Added route-specific card layout so the overlay fills the current viewport without page scrollbars.
- Updated the gallery card to match the reference hierarchy and white-card spacing.
- Ensured preview media is constrained to the preview frame and uses `object-fit: contain` for full artwork display.
- Preserved the custom cursor above video/card layers.

**Follow-up Polish**
- P3: Tune the exact desktop card width after seeing the card in the user's preferred full browser width.

**Final Result**
- final result: passed

---

**Latest Spline Interaction QA**
- `npm.cmd run build`: passed.
- Restored Spline viewer pointer interaction with `pointer-events: auto`.
- Enlarged and recentered the Spline stage and purple circle together so the model sits centered in the circular frame.
- Increased Spline viewer scale from `0.42` to `0.48`.
- Removed the `.spline-shell::after` purple rounded rectangle overlay under the model.
- Kept the cube ring as a separate hotspot overlay above the interactive model.

**Final Result**
- final result: passed

---

**Latest Spline / About Layout QA**
- `npm.cmd run build`: passed.
- Confirmed Spline URL remains `https://prod.spline.design/ubbXrPbOmVZ0LfJ9/scene.splinecode` in both `src/App.tsx` and `resources/spline-model/viewer.txt`.
- Removed About1 wheel zoom state and handlers; the Spline viewer now has `pointer-events: none`, so mouse wheel/drag/key interaction cannot change the model size or position.
- Fixed About1 model scale to a static CSS transform and adjusted the cube hotspot/ring position so the blinking ring targets the cube area.
- Tightened About2 typography and column gap to match the more compact reference layout.
- Removed custom black fullscreen controls; video now relies on native controls with the fullscreen icon beside the sound icon.
- Added a slow `sidebarTrianglePulse` animation to the black sidebar-open triangle.

**Final Result**
- final result: passed

---

**Latest About / Video Control QA**
- `npm.cmd run build`: passed.
- About1 dark now sets the actual inner `.scene` background to `#22201F`, with the `SUYA'S ROOM` button inheriting the dark color rule `#EEE6FA`.
- About light brand color is explicitly `#2D2721`.
- About1 model zoom is controlled by `onWheelCapture` on `.cube-stage` and clamped in React from `0.86` to `1.16`, so wheel zoom stays bounded.
- The Spline model initial CSS scale is driven by `--model-zoom`; the cube hotspot/ring remains a separate overlay so the ring follows the cube target instead of the whole model.
- The custom black fullscreen button and viewport overlay were removed. Animatics video now only renders native video controls with `controlsList="nodownload noremoteplayback"`, keeping the fullscreen icon beside the sound control.

**Final Result**
- final result: passed

---

**Latest Interaction QA**
- `npm.cmd run build`: passed.
- `SUYA'S ROOM` now performs a soft home refresh, preserving the running background music instead of reloading the document.
- Sidebar open state no longer renders `.side-open`, so the dark triangle cannot appear under the light close triangle.
- Control bar buttons have no hover transform, opacity change, button background, or button border; only the icon/text changes on click.
- About1 uses a dedicated `.cube-hotspot`; the Spline character area is not the navigation target. Clicking the profile photo on About2 returns to About1.
- About2 dark profile styles verified in browser: profile border `#EEE6FA`, text `#EEE6FA`, links `#B78DFF` with underline.
- Animatics fullscreen uses a viewport-level `.video-fullscreen-overlay` and lucide expand/collapse icons; the video element has `controlsList="nofullscreen nodownload noremoteplayback"`.

**Final Result**
- final result: passed

---

**Source Visual Truth**
- `C:\Users\wusuy\AppData\Local\Temp\codex-clipboard-e9e4c31e-b554-4230-a375-1758dfc346de.png`
- `C:\Users\wusuy\AppData\Local\Temp\codex-clipboard-b7d5a3ee-05ef-4ce3-85ee-09bde77942f3.png`
- `C:\Users\wusuy\AppData\Local\Temp\codex-clipboard-7c58d020-b0dd-4cae-b484-dd6695e7e341.png`
- `C:\Users\wusuy\AppData\Local\Temp\codex-clipboard-fb4f2801-c2fd-4d4d-b306-f620423a83f3.png`
- `C:\Users\wusuy\AppData\Local\Temp\codex-clipboard-81605b67-cfb7-4404-9dc4-249cdc0db79e.png`

**Verification**
- `npm.cmd run build`: passed.
- In-app browser `/home`: control bar uses lucide SVG icons; music notes are closer to the player.
- In-app browser sidebar: close control aligns with the original open-control position; overlay z-index covers the black open triangle.
- In-app browser `/about`: `spline-viewer` is visible, fallback image opacity is `0`, and the speech bubble repeatedly clears and retypes the sentence.

**Patches Made**
- Replaced local control-bar image icons with `lucide-react`.
- Restyled the control bar with clearer icon buttons and active states.
- Repositioned music notes closer to the player.
- Moved the sidebar close button to the overlay layer so the light triangle replaces the black control.
- Restored the Spline model as the visible About-page character.
- Added looping typewriter text and repeated robot-style speech when browser speech synthesis is available.
- Added a hover lift/glow effect to the landing headline.

**Final Result**
- final result: passed
