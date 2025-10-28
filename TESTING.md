# 🧪 Team Balancer — Manual Test Checklist

This file tracks the core functionality and responsiveness verification before deployment.

---

## 🧱 Functional Tests

| Feature | Steps | Expected Result | Status |
|----------|--------|-----------------|--------|
| Add player | Enter name + score, click "Add" | Player appears in list immediately | ☐ |
| Score validation | Enter invalid score (<0 or >10) | Score defaults to 0 or clamped within limits | ☐ |
| Generate teams | Add multiple players, set N teams, click "Generate Teams" | Teams are displayed with players distributed and total scores shown | ☐ |
| Balanced teams | Compare team total scores | Score differences small (balanced) | ☐ |
| Animation | Generate teams again | Teams fade/slide smoothly into view | ☐ |
| Clear all | Click “Clear All” | Players, teams, and team count reset | ☐ |
| Persistence | Refresh the page | Data persists (players and teams reappear) | ☐ |
| Data reset | After “Clear All”, refresh | App loads empty state | ☐ |

---

## 📱 Responsiveness Tests

| Device | Expected Layout | Status |
|---------|-----------------|--------|
| **Mobile (≤640px)** | 1 team card per row, buttons full width, inputs stacked | ☐ |
| **Tablet (641–1024px)** | 2–3 team cards per row, balanced spacing | ☐ |
| **Desktop (≥1025px)** | 3–5 team cards per row, wide layout | ☐ |
| **Landscape mobile** | Team cards wrap neatly without overflow | ☐ |
| **Resize test** | Resizing window dynamically reflows grid | ☐ |

---

## 🎨 UI/UX Tests

| Feature | Behavior | Status |
|----------|-----------|--------|
| Balance indicator | Animates on generation, color matches balance quality | ☐ |
| Buttons | Click feedback visible, hover states work | ☐ |
| Inputs | Clear placeholder text, accessible contrast | ☐ |
| Scroll behavior | Long player lists scroll smoothly | ☐ |
| Empty state | Shows no errors when no players exist | ☐ |
| Performance | Animation smooth, no lag on re-generation | ☐ |

---

## 🌍 Deployment Checklist

| Step | Expected Result | Status |
|------|-----------------|--------|
| Local run (`npm run dev`) | Works correctly on localhost | ☐ |
| Build (`npm run build`) | Generates production bundle in `/dist` | ☐ |
| Vercel/Netlify deploy | Deployed site matches local version | ☐ |
| Mobile install (PWA test) | “Install App” option visible on Chrome mobile | ☐ |

---

✅ Once all boxes are ticked — your web app is ready for production deployment.
