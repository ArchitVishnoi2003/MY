# Deploy to Vercel

Your project is ready for Vercel. No extra dependencies are required.

## Option A: Deploy via GitHub (recommended)

1. **Push your code to GitHub** (if you haven’t already)
   ```bash
   git add .
   git commit -m "Ready for Vercel"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in (use “Continue with GitHub” if you use GitHub).

3. **Import your repo**
   - Click **Add New…** → **Project**
   - Select your GitHub account and choose this repository
   - Click **Import**

4. **Configure the project**
   - **Framework Preset:** Next.js (should be auto-detected)
   - **Root Directory:** leave as `.` (or set if the app is in a subfolder)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** leave default
   - **Install Command:** `npm install` (default)

5. **Environment variables**
   - You don’t need any for this app unless you add an API or secrets later. If you do, add them under **Environment Variables** (e.g. `NEXT_PUBLIC_*` for client, others for server).

6. **Deploy**
   - Click **Deploy**. Vercel will run `npm install` and `npm run build`, then deploy. Each push to `main` will trigger a new deployment.

---

## Option B: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **From your project folder**
   ```bash
   cd "c:\Users\avarc\OneDrive\Desktop\New folder"
   vercel
   ```

3. Follow the prompts (login, link to existing project or create new one). Use `vercel --prod` when you’re ready for production.

---

## What’s already set

- **Node:** `engines.node": ">=18"` in `package.json` so Vercel uses a compatible Node version.
- **Next.js:** Standard `next build` / `next start`; no extra config needed.
- **Images:** `next.config.mjs` has `images.unoptimized: true`; Vercel will serve images from `public/` as-is.
- **No env vars** are required for the current app.

## After deploy

- You’ll get a URL like `your-project.vercel.app`.
- You can add a custom domain in the Vercel project **Settings → Domains**.
- Pushing to `main` (or your production branch) will auto-deploy.
