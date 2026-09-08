# Viral Ad Engagement Animation Prompts for `vid-14.mp4`

Tailored prompts and specs for creating high-performing **social media video ad engagement overlays** (TikTok Ads / Instagram Reels Ads) over [`vid-14.mp4`](file:///c:/Users/user/Documents/EasilyPromote/Easilypromote-website/src/assets/videos/vid-14.mp4).

### Key Animation Elements:
1. **Views Counter**: Sleek pill badge in the top bar with a view icon and rapidly climbing numbers (`142.8K` views ticking upward with green `+450` pulse indicators).
2. **Rapid Likes & Screen Tapping**: Double-tap shockwave rings and heart bursts appearing across the screen, driving the likes counter up, paired with floating hearts drifting upward on the right.
3. **Pop-Up Ad Comments / Social Proof**: Realistic user comments popping in dynamically like in top-performing TikTok video ads (e.g. *"Wait this is actually 100% free??? 😭"*, *"Downloaded yesterday, saved my semester 🙌"*, etc.).
4. **No live stream/LIVE text**: Pure viral ad aesthetics.

---

## 1. AI Video Generation Prompts (Runway Gen-3 Alpha, Kling 1.5, Sora, Luma Dream Machine)

### Prompt A: Transparent / Green Screen Overlay (Chroma Key `#00FF00`)
```text
Full HD vertical 9:16 motion graphic overlay on a solid pure bright green screen background (#00FF00). Viral TikTok video ad engagement graphics. In the lower-left to mid-left area, sleek translucent rounded comment sticker bubbles dynamically pop up one by one with subtle spring bounce animations, each featuring a user avatar, verified tag, and enthusiastic praise comments with heart reaction counters. In the upper-left corner, a modern frosted glass counter displays a glowing blue eye icon with dynamic bold digital numbers rapidly ticking up from "140K" to "280K" views with green "+XXX" surge indicators. Across the screen, organic finger-tap ripple shockwaves and glowing neon pink heart emojis pop up with elastic bounce physics, simulating users enthusiastically double-tapping their screens. On the lower right, a continuous stream of colorful translucent glossy hearts drifts gently upward with sinusoidal sway. Ultra clean alpha edges, 60fps, no background artifacts, modern mobile ad UI styling.
```

### Prompt B: Video-to-Video Transformation (Directly on `vid-14.mp4`)
```text
Overlaid on the vertical UGC video of the creator speaking, add high-converting viral TikTok ad engagement elements. Sleek, translucent social proof comment bubbles pop up dynamically on the lower-left area with smooth bounce animations (e.g., student reactions like "Saved my semester!", "Is this actually free?!"). Across the creator, frequent translucent double-tap circular shockwaves and heart bursts pop organically as if viewers are tapping the screen. At the top left, an animated view counter counts rapidly upwards with green surge metrics. On the right rail, a heart like button with an escalating like tally and continuous floating pastel hearts rising upwards. High-end social advertising aesthetic, clean typography, sharp UI contrast against the video footage.
```

---

## 2. Motion Design & After Effects Expressions

### Dynamic View Count Odometer (Source Text expression):
```javascript
// Simulates rapid view surge across the video duration
var startViews = 142000;
var endViews = 385000;
var progress = easeOut(time, 0, 30, 0, 1);
var count = Math.floor(linear(progress, 0, 1, startViews, endViews));
(count > 999999 ? (count / 1000000).toFixed(1) + "M" : (count > 999 ? (count / 1000).toFixed(1) + "K" : count)) + " views";
```

### Comment Sticker Spring Pop-In (Scale expression):
```javascript
// Elastic overshoot pop-in for comment bubbles
var t = time - inPoint;
var freq = 3.5;
var decay = 5.0;
var dur = 0.4;
if (t < dur) {
  var s = 100 + 35 * Math.sin(freq * t * 2 * Math.PI) / Math.exp(decay * t);
  [s, s];
} else {
  [100, 100];
}
```

---

## 3. Included Ready-to-Use Assets in this Folder

1. **[`preview.html`](file:///c:/Users/user/Documents/EasilyPromote/Easilypromote-website/live-session-animation/preview.html)**: Standalone browser preview with `vid-14.mp4` playing with surging views, rapid tapping, floating hearts, and popping ad comments.
2. **[`LiveSessionOverlay.tsx`](file:///c:/Users/user/Documents/EasilyPromote/Easilypromote-website/live-session-animation/LiveSessionOverlay.tsx)**: Reusable React + Tailwind component.
