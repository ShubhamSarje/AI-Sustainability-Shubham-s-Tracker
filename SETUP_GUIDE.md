# AI Sustainability Dashboard — Setup & Deployment Guide
## For Shubham · Next.js from Scratch

---

## WHAT YOU'LL NEED BEFORE STARTING
- A computer (Mac, Windows, or Linux)
- Internet connection
- A free GitHub account → github.com
- A free Vercel account → vercel.com (sign up with your GitHub)

---

## STEP 1 — Install Node.js

Node.js is the engine that runs Next.js on your computer.

1. Go to → https://nodejs.org
2. Download the **LTS version** (the green button)
3. Install it like any normal app
4. To confirm it worked, open **Terminal** (Mac) or **Command Prompt** (Windows) and type:

```
node -v
```

You should see something like: `v20.11.0` ✅

---

## STEP 2 — Set Up Your Project Folder

1. On your computer, create a new folder called:
   ```
   ai-sustainability
   ```
   (You can put it anywhere — Desktop is fine)

2. Inside that folder, create these folders:
   ```
   ai-sustainability/
   ├── app/
   └── components/
   ```

---

## STEP 3 — Add the Project Files

Copy each file from the downloaded project into the correct location:

```
ai-sustainability/
├── app/
│   ├── globals.css        ← paste globals.css here
│   ├── layout.jsx         ← paste layout.jsx here
│   └── page.jsx           ← paste page.jsx here
├── components/
│   ├── Header.jsx         ← paste Header.jsx here
│   ├── Hero.jsx           ← paste Hero.jsx here
│   ├── KpiStrip.jsx       ← paste KpiStrip.jsx here
│   ├── ChartCard.jsx      ← paste ChartCard.jsx here
│   ├── Dashboard.jsx      ← paste Dashboard.jsx here
│   ├── Footer.jsx         ← paste Footer.jsx here
│   └── chartData.js       ← paste chartData.js here
├── next.config.js         ← paste next.config.js here
└── package.json           ← paste package.json here
```

---

## STEP 4 — Install Dependencies

1. Open **Terminal** (Mac) or **Command Prompt** (Windows)
2. Navigate to your project folder:

```bash
cd Desktop/ai-sustainability
```

3. Run this command to install everything:

```bash
npm install
```

Wait for it to finish — it will create a `node_modules` folder automatically. ✅

---

## STEP 5 — Run It Locally (Preview on Your Computer)

Still in the terminal, run:

```bash
npm run dev
```

Now open your browser and go to:
```
http://localhost:3000
```

🎉 Your dashboard is running! This is your local preview.

To stop it, press `Ctrl + C` in the terminal.

---

## STEP 6 — Push to GitHub

This puts your code online so Vercel can deploy it.

### First time only — install Git
- Mac: Git is usually pre-installed. Type `git --version` to check.
- Windows: Download from https://git-scm.com

### Create a GitHub repository
1. Go to github.com → click **"New"** (green button, top left)
2. Name it: `ai-sustainability-tracker`
3. Set it to **Public**
4. Click **"Create repository"**

### Push your code
In your terminal (inside the project folder):

```bash
git init
git add .
git commit -m "Initial commit — AI Sustainability Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-sustainability-tracker.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

✅ Your code is now on GitHub!

---

## STEP 7 — Deploy on Vercel (Go Live!)

Vercel will give you a real public URL in about 60 seconds.

1. Go to → https://vercel.com
2. Click **"Add New Project"**
3. Click **"Import"** next to your `ai-sustainability-tracker` repo
4. Leave all settings as default
5. Click **"Deploy"**

⏳ Wait about 60 seconds...

🎉 **Your dashboard is live!** You'll get a URL like:
```
https://ai-sustainability-tracker.vercel.app
```

Share this link on LinkedIn!

---

## STEP 8 — Every Time You Make Changes

Whenever you update the dashboard and want the live site to update too:

```bash
git add .
git commit -m "Updated dashboard"
git push
```

Vercel automatically re-deploys every time you push. ✅

---

## QUICK REFERENCE — Common Commands

| What you want to do          | Command              |
|------------------------------|----------------------|
| Start local preview          | `npm run dev`        |
| Stop local preview           | `Ctrl + C`           |
| Save + push changes to GitHub| `git add . && git commit -m "update" && git push` |
| Install new packages         | `npm install`        |

---

## TROUBLESHOOTING

**"npm not found"** → Node.js didn't install correctly. Re-download from nodejs.org.

**"Module not found" error** → Run `npm install` again inside the project folder.

**Charts not showing** → Make sure you're on `http://localhost:3000` not opening the HTML file directly.

**Vercel build failed** → Check that all files are in the right folders (Step 3).

---

## YOUR FILE STRUCTURE (Final Check)

```
ai-sustainability/
├── app/
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── ChartCard.jsx
│   ├── Dashboard.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── KpiStrip.jsx
│   └── chartData.js
├── node_modules/        ← auto-created by npm install
├── .next/               ← auto-created when you run dev
├── next.config.js
└── package.json
```

---

Built by Shubham · AI Sustainability Tracker · 2025
