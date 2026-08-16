# Agentra — Cinematic Digital Experiences & 3D Interactive Showcase

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18.2-purple?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<p align="center">
  <strong>Agentra</strong> is a premium digital agency website showcasing highly cinematic, motion-driven front-ends integrated with professional database back-ends. The project merges state-of-the-art interactive graphics with scalable server architecture.
</p>

<h4>
  <a href="#-interactive-3d-showcase">Interactive 3D Showcase</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-core-engineering-team">Core Engineering Team</a> •
  <a href="#-getting-started">Getting Started</a>
</h4>

</div>

---

> [!NOTE]  
> This repository features a custom **Interactive 3D Showcase Page** (`public/showcase.html`) that delivers 60FPS fluid particle mechanics and mouse-tilt 3D depth, detailing our core tech stack and development team.

---

## ✨ Interactive 3D Showcase

We have built a dedicated **3D Interactive Showcase** served at `/showcase.html` that visualizes the technical pillars and core values of Agentra:

```
┌────────────────────────────────────────────────────────┐
│                   AGENTRA SHOWCASE                     │
│  [Next-Gen Showcase]              [60 FPS Render]      │
│                                                        │
│               3D TILT TENSION CARD                     │
│                                                        │
│   01 / Cinematic Motion    │  02 / Production Infra    │
│   03 / Responsive Style    │  04 / Agentic Automate    │
│                                                        │
│                 CORE ENGINEERING TEAM                  │
│                                                        │
│   [Varun Patil]  [Kartikeya Yadav]  [Ankit Pandey] ... │
└────────────────────────────────────────────────────────┘
```

### Key Technical Aspects of `showcase.html`:
- **Neural Connection Mesh Background**: Real-time canvas particle system rendering blue, purple, and cyan nodes with interactive hover attraction/repulsion forces and linear connection webs.
- **3D Card Physics**: Relies on CSS perspective mapping and trigonometric mouse coordinates. Elements float at different 3D levels using `translateZ`.
- **Ultra-Light Footprint**: Structured in a self-contained vanilla HTML/CSS/JS architecture for immediate page load speeds.

---

## 🚀 Key Features

*   🌌 **Cinematic Hero Particle Engine**: Real-time dust particles drifting across the main page that dynamically scatter away from the user's mouse.
*   💫 **Smooth Scroll & Reveal Reveals**: Custom React wrappers and Framer Motion triggers that reveal components sequentially.
*   🔮 **Vibrant Glassmorphism & Aesthetics**: Dark mode curated with tailored HSL glow backgrounds, running on a strict design tokens system.
*   📫 **Intelligent SMTP Forms**: Interactive contact module validated client-side with Zod and persistent storage via Prisma Client.
*   💼 **Founders & Team Panel**: Highlighted profiles featuring dynamic tags and custom expertise badges.

---

## 🛠️ Tech Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | Next.js 14 (App Router), React 18, TypeScript | Layouts, Routing, Type safety |
| **Styling & Motion** | TailwindCSS, Framer Motion, Vanilla CSS | Cinematic layout, smooth physics, page transitions |
| **Database & ORM** | Prisma ORM, SQLite / PostgreSQL | Structured persistence of client leads and inquiries |
| **Interactivity** | HTML5 Canvas API, WebGL, 3D CSS Transforms | High-performance interactive background components |
| **Utility Packages** | Zod, React Hook Form, Nodemailer | Form validation, secure automation, notification routing |

---

## 👥 Core Engineering Team

Each founder at Agentra specializes in distinct software engineering domains:

*   **Varun Patil** — *Chief Operating Officer (COO) / Java Backend Developer*
    *   **Expertise**: Java Enterprise Systems, DB Design, Backend Controllers, API Architectures.
*   **Kartikeya Yadav** — *Chief Data Officer (CDO) / Co-Founder*
    *   **Expertise**: Generative AI integrations, AWS Cloud, MongoDB pipelines, NLP chatbot engines.
*   **Ankit Pandey** — *Co-Founder / AI Automation Developer*
    *   **Expertise**: Agentic workflows, ML models, Financial strategies, Excel automatons.
*   **Shivendu Kumar** — *Chief Technology Officer (CTO)*
    *   **Expertise**: C++ core engines, React UI routing, overall system architecture, technology standards.

---

## ⚙️ Getting Started

### 📋 Prerequisites
Ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v18.x or later)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
*   [Git](https://git-scm.com/)

### 🛠️ Local Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/kartikeya2006jay/Agentra-Website.git
    cd Agentra-Website
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables Setup**:
    Copy the sample environment file and set up your variables:
    ```bash
    cp .env.example .env
    ```
    Ensure you specify database connections and mailer credentials.

4.  **Run Database Migrations**:
    Apply the database schema:
    ```bash
    npx prisma db push
    ```

5.  **Start the Local Server**:
    Launch the Next.js development server:
    ```bash
    npm run dev
    ```

    Open your browser and navigate to:
    *   Main platform: `http://localhost:3000`
    *   Interactive 3D Showcase: `http://localhost:3000/showcase.html`

### 🏗️ Build and Production Deployment

To generate a optimized production bundle:
```bash
npm run build
npm run start
```

---

## 📂 Project Structure

```
Agentra-Website/
├── app/                  # Next.js Pages & API routes
│   ├── about/            # Team profile page
│   ├── work/             # Case studies page
│   └── showcase/         # Showcase wrapper (if accessed via path)
├── components/           # Reusable UI components & animations
│   ├── hero/             # Particle and header canvas
│   └── sections/         # Home page segments & Footer modal controls
├── public/               # Static assets
│   ├── showcase.html     # Immersive 3D Showcase Page
│   └── models/           # GLB abstract web assets
└── prisma/               # Database schemas and connections
```

---

<div align="center">
  <p>Engineered with precision & passion by the <strong>Agentra Team</strong>.</p>
</div>
