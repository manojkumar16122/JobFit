<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
<div align="center">

# 🎯 JobFit AI

**Stop guessing why you're not getting interviews.**

An open-source AI tool that compares your resume against any job description and gives you an instant match score, missing keywords, ATS issues, and a tailored summary.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Groq](https://img.shields.io/badge/Powered%20by-Groq-orange)](https://groq.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/jobfit-ai)

[Live Demo](https://jobfit-ai.vercel.app) · [Report Bug](https://github.com/YOUR_USERNAME/jobfit-ai/issues) · [Request Feature](https://github.com/YOUR_USERNAME/jobfit-ai/issues)

</div>

---

## 📸 Demo

> _Add a GIF here after you record it (Loom / ScreenToGif → drag into README editor on GitHub)_

![JobFit AI Demo](./public/demo.gif)

---

## ✨ Why this exists

I applied to 100+ jobs and got almost no replies. Recruiters spend ~6 seconds on a resume, and ATS filters reject most applications before a human ever sees them.

So I built **JobFit AI** to answer one question honestly:

> _"Does my resume actually match this job — and if not, what exactly is missing?"_

This project is part of my **#BuildInPublic** series: shipping one AI project every week.

---

## 🚀 Features

- 🎯 **Match Score (0–100)** — honest, color-coded, no flattery
- 🔍 **Missing Keywords** — exactly what the ATS is filtering you out for
- ✅ **Strengths** — what's already working in your favor
- ✍️ **Tailored Summary** — copy-paste into your resume header
- 🔒 **Bring Your Own Key (BYOK)** — optional, your key is never stored server-side
- 🌗 **Dark / Light mode** — because we're not animals
- ⚡ **Streaming-fast** — powered by Groq's LPU inference
- 📱 **Fully responsive** — works on mobile

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| LLM Provider | Groq (`openai/gpt-oss-20b`) |
| Validation | Zod |
| Theming | `next-themes` |
| Deployment | Vercel |

---

## 🏗️ Architecture

```
┌─────────────────┐        ┌──────────────────────┐        ┌──────────────┐
│   Browser       │  POST  │  /api/analyze        │  API   │              │
│   (Next.js UI)  ├───────►│  (Vercel Serverless) ├───────►│  Groq LLM    │
│                 │        │  - Zod validation    │        │              │
│  User's API Key ├───────►│  - Prompt assembly   │◄───────┤              │
│  (never stored) │        │  - JSON parsing      │        │              │
└─────────────────┘        └──────────────────────┘        └──────────────┘
```

**Why a serverless API route?** The browser can't call Groq directly without exposing the API key. The route acts as a secure proxy — it uses the user's key if provided, otherwise falls back to a server-side key from environment variables.

---

## 🏃 Getting Started

### Prerequisites

- Node.js 20+
- A free Groq API key → [console.groq.com/keys](https://console.groq.com/keys)

### Installation

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/jobfit-ai.git
cd jobfit-ai

# 2. Install dependencies
npm install

# 3. Set up env vars
cp .env.example .env.local
# Then edit .env.local and add your GROQ_API_KEY

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create `.env.local` in the project root:

```bash
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ Never commit `.env.local`. It's already in `.gitignore`.

---

## ☁️ Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/jobfit-ai)

After deploying, add `GROQ_API_KEY` under **Settings → Environment Variables** and redeploy.

---

## 📁 Project Structure

```
jobfit-ai/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts        # Serverless LLM proxy
│   ├── providers.tsx           # next-themes provider
│   ├── theme-toggle.tsx        # Dark/light toggle
│   ├── page.tsx                # Main UI
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Tailwind + dark variant
├── public/
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

---

## 🧪 How it works

1. User pastes **resume** + **job description** (and optionally their own Groq key).
2. Frontend `POST`s to `/api/analyze`.
3. Route validates the payload with **Zod**.
4. Route calls **Groq** with a system prompt that forces `json_object` output.
5. Response is parsed, validated again, and returned to the UI.
6. UI renders score, strengths, missing keywords, and tailored summary.

---

## 🗺️ Roadmap

- [x] Week 1 — MVP: match score, keywords, summary
- [ ] PDF resume upload + text extraction
- [ ] ATS issue detection (formatting, dates, fonts)
- [ ] Tailored resume bullets (3 per analysis)
- [ ] Cover letter generator
- [ ] Likely interview questions
- [ ] Save analysis history (localStorage)
- [ ] Export analysis as PDF

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or improvements:

1. Fork the repo
2. Create a branch (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

## 🙏 Acknowledgements

- [Groq](https://groq.com) — for blazing-fast free LLM inference
- [Vercel](https://vercel.com) — for zero-config deployment
- [next-themes](https://github.com/pacocoursey/next-themes) — for the dark mode magic

---

<div align="center">

**If this helped you land more interviews, give it a ⭐ — it helps others find it too.**

Built with Next.js, Groq, and ❤️

</div>
>>>>>>> 7ff9205bd5bae4447ae3c1868938a4ace086d3a1
