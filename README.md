# ⚖️ Team Balancer

**Team Balancer** is a modern, responsive web application built with **React + TypeScript + Tailwind CSS + Vite**.  
It helps you **create balanced teams** automatically based on player importance scores, with full local persistence, animations, and a clean, accessible UI.

---

## ✨ Overview

Tired of arguments over who should be on which team?  
Team Balancer makes it easy to add players, assign each one a skill or importance score (out of 10), and automatically generate **well-balanced teams** using an intelligent distribution algorithm.

Built with a strong focus on **usability**, **aesthetic design**, and **developer experience**, this app demonstrates a production-grade React setup — including dark mode, responsive layouts, and persistent state.

---

## 🧠 Features

### 🧩 Core Functionality
- ➕ **Add Players** — Enter each player's name and optional importance score (1–10).  
- 🧾 **Player List** — View all players with inline **edit** and **delete** options.  
- 🎯 **Generate Teams** — Automatically distribute players evenly across N teams based on their scores, keeping team totals balanced.
- ⚖️ **Balance Indicator** — Displays how evenly matched the generated teams are (percentage-based).
- 🧹 **Clear All** — Reset everything with one click.

---

### 🌓 UI & Experience
- 💾 **Persistent Storage** — Data is saved automatically using `localStorage` (players, teams, and preferences).
- 🌗 **Dark Mode Toggle** — Beautiful light/dark themes with smooth transitions and system preference detection.
- 🪄 **Animated Interactions** — Uses `framer-motion` for subtle fade, slide, and scale animations across UI components.
- 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop.  
  - Key elements are always visible above the fold.  
  - Layout automatically adapts from centered view to two-column layout when teams are generated.
- 💬 **Validation & UX**  
  - “Add Player” disabled until a valid name is entered.  
  - Minimum 2 teams and at least 4 players required to generate teams.  
  - Clear hints guide the user (e.g., *“Add at least 4 players to generate teams.”*).

---

### 🛠️ Technical Highlights
- ⚙️ **Framework:** React 18 + Vite (TypeScript)
- 💅 **Styling:** Tailwind CSS (v4 via `@tailwindcss/vite`)
- ⚡ **Forms:** React Hook Form — lightweight, type-safe form handling.
- 🎨 **Animations:** Framer Motion — used for list transitions and theme toggle effects.
- 🌓 **Icons:** Lucide React — lightweight, consistent icon system.
- 🗃️ **Persistence:** Custom `useLocalStorage` hook for data saving and retrieval.
- 🧮 **Algorithm:** Greedy balancing algorithm — distributes players by assigning the next strongest player to the team with the lowest total score.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/team-balancer.git
cd team-balancer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧱 Project Structure

```
src/
 ├── components/
 │   ├── BalanceIndicator.tsx
 │   ├── PlayerForm.tsx
 │   ├── PlayerList.tsx
 │   ├── TeamCard.tsx
 │   ├── TeamGrid.tsx
 │   └── ThemeToggle.tsx
 ├── hooks/
 │   ├── useLocalStorage.ts
 │   ├── useTeamBalancer.ts
 │   └── useTheme.ts
 ├── types/
 │   └── index.ts
 ├── App.tsx
 ├── main.tsx
 └── index.css
```

---

## 🎨 UI/UX Flow

| Screen | Description |
|--------|--------------|
| **Home / Input View** | Centered layout showing player list, player form, team count, and buttons. |
| **Teams Generated** | Responsive two-column layout — controls on left, teams on right. |
| **Dark Mode** | Activated via floating toggle (top-right). All components adapt to theme colors. |
| **Animations** | Subtle slide-in and fade effects on lists, modals, and toggles. |

---

## 🧠 Algorithm Explanation

The team balancing uses a **greedy distribution algorithm**:
1. Sort players by score (descending).
2. Initialize N empty teams.
3. Iteratively assign the next highest player to the team with the **lowest current total score**.
4. This keeps team totals as close as possible (within ~10–15% difference).

This approach is efficient (O(N log N)) and provides visually fair team groupings.

---

## 💡 Design Principles

- **Clarity first:** Key controls always visible, never hidden behind scroll.  
- **Frictionless UX:** Inline validation, disabled states, visual feedback.  
- **Delightful microinteractions:** Motion and transitions subtly reinforce feedback.  
- **Dark-mode native:** Both palettes are balanced and easy on the eyes.  

---

## 🧪 Testing Checklist

- [ ] Add players (name required, score optional)
- [ ] Edit and delete players inline
- [ ] Verify “Generate Teams” only works with ≥4 players
- [ ] Check 2-team minimum constraint
- [ ] Test light/dark mode toggle
- [ ] Confirm localStorage persistence after refresh
- [ ] Responsive test (mobile, tablet, desktop)
- [ ] Smooth animations (player list, teams, toggle)

---

## 🌍 Deployment

You can easily deploy this app using **Vercel** or **Netlify**.

### **Vercel:**
1. Push your code to GitHub.  
2. Go to [vercel.com](https://vercel.com).  
3. Import the repository → Click “Deploy”.

Your app will be live within seconds (e.g., `https://team-balancer.vercel.app`).

---

## 🔮 Future Enhancements

- ✅ Confirmation popups for deletions  
- ✅ Toast notifications for edits and updates  
- 🌍 PWA support (installable on mobile/desktop)  
- 📱 App Store / Play Store publishing (via TWA / Capacitor)
- 🧭 Player skill randomizer or CSV import/export  
- 🧑‍🤝‍🧑 Team name generator (fun random names like *The Debuggers*, *Syntax Squad*, etc.)  

---

## 💚 Credits

Built with ❤️ by [Your Name]  
Made possible by:  
- [React](https://reactjs.org/)  
- [Vite](https://vitejs.dev/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Framer Motion](https://www.framer.com/motion/)  
- [React Hook Form](https://react-hook-form.com/)  

---

## 📜 License

This project is licensed under the **MIT License**.  
You’re free to use, modify, and distribute this project for personal or commercial purposes — just give credit where it’s due. 😄

---
