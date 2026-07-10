# Initial Prompt: SUYA'S ROOM Personal Website

Build a personal portfolio website called **SUYA'S ROOM** from the Figma design and local assets in this repository. The site should feel like entering Jessica/Suya's illustrated room, then exploring objects inside it. Use **React + Vite + TypeScript** with CSS modules or plain CSS. Match the supplied 1440 x 793 Figma frames visually first, then make the layout responsive.

## Source Materials

- Figma file: `https://www.figma.com/design/BnMStHtfpnvslyveQzK8t5/Untitled?node-id=1-2`
- Requirement sketch: `需求文档/prd.png`
- Original notes: `需求文档/PRD.txt`
- Screen references: `UI-design/*.png`
- Main illustrated assets: `resources/pictures/paintings/*`
- Door assets: `resources/pictures/UI picture/door-closed.png`, `resources/pictures/UI picture/door-opem.png`
- Door animation frames: `resources/animation/door-closed 1.png`, `resources/animation/Group 14.png`
- Animatic videos: `resources/animatic/1.mp4`, `2.mp4`, `3.mp4`
- Icon assets: `resources/icons/EN.png`, `中.png`, `sun.png`, `moon.png`, `volume.png`
- Spline model URL: `https://prod.spline.design/ubbXrPbOmVZ0LfJ9/scene.splinecode`
- External links in `resources/notion-url.txt`:
  - Design: `https://lumbar-jacket-5e6.notion.site/3970f05b94a28095a205d75d7e526acd?v=3970f05b94a2801482e8000c41ffef9b&source=copy_link`
  - Blogs: `https://app.notion.com/p/3970f05b94a280368da5c7fea81c03d0?v=3970f05b94a280388869000c84360447&source=copy_link`
  - Research: `https://app.notion.com/p/3980f05b94a280549f30d1ff12ac22ca?v=3980f05b94a280379ce4000c40761ac7&source=copy_link`
  - Toys: `https://app.notion.com/p/3980f05b94a2806caa81eb092d5e0053?v=3980f05b94a280569f6a000ca9d1985b&source=copy_link`

## Global Product Requirements

- The website supports English and Chinese through the bottom control bar. Default language is English. Toggle labels and main copy through a dictionary.
- The website supports light and dark mode. Default is light. When navigating between routes, preserve the current mode.
- The bottom control bar appears on every designed page. It contains language toggle, theme toggle, and volume toggle. Each button has a hover effect.
- The volume toggle controls background music/audio state. When volume is on, the music player object on the home page shows animated floating music notes. When volume is off, notes disappear.
- Use a custom cursor: default is a purple filled circle using `#9277C2`; on interactive elements it becomes a larger purple ring.
- Every interactive object has a hover state. Use transform/opacity/shadow motion that feels soft and magical, not sharp or mechanical.
- Keep visual proportions close to the Figma frames at desktop size: 1440 x 793 reference, room content centered, bottom control bar centered.
- For smaller screens, scale the whole room scene proportionally inside the viewport instead of rearranging every object independently.

## Routes And Page Flow

- `/` renders the landing page with the closed door scene.
- Clicking the door plays the door-opening animation, then navigates to `/home`.
- `/home` renders the illustrated room.
- The black triangle on the left opens the sidebar menu as an overlay state on `/home`.
- The sidebar triangle closes the sidebar and returns to the normal `/home` state.
- Sidebar links:
  - `Projects` navigates to `/`.
  - `Blogs` opens the Blogs Notion URL in a new tab.
  - `About` navigates to `/about`.
- Landing page category links:
  - `Design` opens the Design Notion URL.
  - `Research` opens the Research Notion URL.
  - `Toys` opens the Toys Notion URL.
- Object cards use `/card/:category`, where category is one of `paintings`, `readings`, `plants`, `animatics`, or `guitar`.

## Landing Page

- Match `UI-design/landpage-light.png` and `UI-design/landpage-dark.png`.
- Background uses the door/room scene from the design. Place the door in the center-right and the text/menu on the left.
- Main text: "Check out what Jessica has done inside." Use Roboto Medium, 48px on desktop, black in light mode and `#EEE6FA` in dark mode.
- Category links: "Design", "Research", "Toys". Use Roboto Slab Regular, 28px, underlined. Text is black in light mode and `#EEE6FA` in dark mode. On hover, slightly raise/fade and use the large ring cursor.
- Door interaction: clicking the door swaps/animates from closed to open using the available door assets, then routes to `/home`.
- Dark mode adds an overlay above the background: `#0F0F0F`, 55% opacity, luminosity-style visual treatment. Keep text readable.

## Home Page

- Match `UI-design/homepage-light.png` and `UI-design/homepage-dark.png`.
- Use `resources/pictures/paintings/background.png` as the room background and layer these objects in the positions shown in the Figma:
  - `computer.png`
  - `desk.png`
  - `bookshelf.png`
  - `books.png`
  - `plant.png`
  - `photo.png`
  - `music-player.png`
  - `guitar.png`
- The title "SUYA'S ROOM" is a button. Clicking it routes to `/home`.
- The left black triangle opens the sidebar overlay.
- Object interactions:
  - Computer: hover floats upward and shows tooltip "Portfolio"; click routes to `/`.
  - Desk: clicking the first drawer opens it and reveals small images; clicking revealed images routes to `/card/paintings`. Other drawers may open but show empty state.
  - Books: hover floats upward and shows tooltip "Readings"; click routes to `/card/readings`.
  - Plant: hover floats upward and shows tooltip "Relax your eyes"; click routes to `/card/plants`.
  - Photo: hover floats upward and shows tooltip "I love making animatic"; click routes to `/card/animatics`.
  - Guitar: hover floats upward; click routes to `/card/guitar`.
  - Music player: default state is playing; animated notes float around it while volume is on.
- Dark mode adds a black overlay above the room art at 71% opacity while preserving the same object positions and interactions.

## Sidebar Overlay

- Match `UI-design/sidebar-light.png` and `UI-design/sidebar-dark.png`.
- The overlay appears over the home page and darkens the room. The sidebar slides/extends from the left wall.
- Light sidebar overlay uses `#010101` at 80% opacity.
- Dark sidebar overlay uses the dark home cover plus a second black overlay at 71% opacity.
- Menu links use Roboto Slab, 28px, `#EEE6FA`: Projects, Blogs, About.
- Hover each menu item with subtle text movement/opacity and the custom cursor ring.
- Clicking outside the menu or on the triangle closes the sidebar.

## About Pages

- `/about` starts with the cube scene matching `UI-design/About1-light.png` and `UI-design/About1-dark.png`.
- Light background is `#E1DDE7`. Dark background is `#22201F`.
- Central circle: about 394 x 418px, color `#C8AFF4`, 48% opacity.
- Load the Spline model from `resources/spline-model/viewer.txt` and position it over the character/cube area. If Spline fails, show the static character/cube image from the Figma-derived UI.
- The cube has a twinkling light ring to attract attention.
- Speech text: "The cube is the key to the past......" Use Roboto SemiBold, 24px, `#2D2721`, in a block sized about 256 x 105px with background `#EEE6FA`.
- Add printer/typewriter effect for the speech text. When volume is on, repeat the sentence with a robot-like voice effect. Respect browser autoplay rules by only starting voice after user interaction.
- Clicking the cube fades the Spline model, floats the profile image forward, moves it toward the upper-left direction, and transitions to the profile view.
- The profile view matches `UI-design/About2-light.png` and `UI-design/About2-dark.png`.
- Profile content:
  - Name: "SUYA WU"
  - English copy: "Hi, I'm Jessica! I'm from China. For all the years I have lived, I am always obsessed with art and science. To be honest, I really have no idea of introducing myself. I love all the interesting things, but I'm good at none of them. It's fine, though. Just keep trying and learn more. By the way, I love playing escape games. Want to make friends with me? Connect me at LinkedIn, Github, Ins."
  - Chinese copy should be a faithful translation in the language dictionary.

## Card Page

- Match `UI-design/Card.png`.
- The card page appears as a modal-like gallery over the dimmed home scene.
- Layout:
  - Center panel about 660 x 689px on desktop.
  - Top status text: "ONGOING".
  - Main preview area about 539 x 359px.
  - Bottom thumbnail strip with three visible thumbnail slots.
  - Left/right arrow buttons switch the active item.
  - Top-right close icon returns to `/home`.
- Category content:
  - `paintings`: use `painting1.jpg`, `painting2.jpg`, `painting3.jpg`, `painting4.jpg`.
  - `animatics`: use `resources/animatic/1.mp4`, `2.mp4`, `3.mp4`.
  - `readings`, `plants`, `guitar`: implement the same gallery structure with an "ONGOING" placeholder until final assets are added.
- Images and videos should fit inside the preview area without distortion. Use object-fit contain.

## Implementation Notes

- Build reusable components: `RoomScene`, `ControlBar`, `CustomCursor`, `SidebarOverlay`, `CardGallery`, `ThemeProvider`, `LanguageProvider`.
- Store theme, language, and volume in React state and persist them to `localStorage`.
- Use CSS variables for theme colors and overlay values.
- Use React Router for route management.
- Use framer-motion or CSS transitions for hover, sidebar, door, card, and about transitions. Keep animation durations between 200ms and 900ms except for the door/about transition, which may be longer.
- Use semantic buttons for clickable elements even when they are image-based. Add `aria-label` values for icon-only controls and room objects.
- Do not use the `UI-design/*.png` files as full-screen screenshots for the final app except as visual references. Recreate the page from layered assets so interactions work.

## Acceptance Criteria

- The site can be run locally with `npm install` and `npm run dev`.
- `/`, `/home`, `/about`, and `/card/paintings` render without console errors.
- Light/dark mode changes the visual treatment on every page and persists across navigation.
- EN/CN toggle changes visible page copy and persists across navigation.
- Volume toggle affects both the control bar state and music-player note animation.
- Door click animates before navigating to `/home`.
- Sidebar opens and closes from the home page and matches the Figma visual state.
- Each home object has hover feedback and either navigates to the correct route or shows the specified drawer interaction.
- About cube click performs the transition into the profile view.
- Card gallery supports thumbnails, previous/next buttons, close button, images, videos, and placeholder categories.
- Desktop visual QA compares against the Figma/UI PNG references at 1440 x 793. Mobile QA confirms the room scales without important objects overlapping.
