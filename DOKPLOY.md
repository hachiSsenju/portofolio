# Deploying to Dokploy

This app builds as a standalone Next.js Docker image (see `Dockerfile`). Two ways to get it into Dokploy:

## Option A — Git-based "Application" (recommended)

1. Push this `portfolio/` folder to a Git provider (GitHub/GitLab/Gitea) — Dokploy pulls from a repo, it doesn't accept a local folder upload.
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. In Dokploy: **Create Project → Application**, connect the repo, set the **build path** to `portfolio` if the repo root isn't the app itself.
3. Build type: **Dockerfile** (auto-detected). Leave the Dockerfile path as `Dockerfile`.
4. **Environment** tab: add
   ```
   NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
   ```
   (Also settable as a Docker **build arg** with the same name — the Dockerfile reads it either way at build time.)
5. **Domains** tab: add your domain, container port **3000**, enable HTTPS (Dokploy provisions Let's Encrypt automatically).
6. Deploy. Dokploy builds the image from the Dockerfile and runs it.

## Option B — Docker Compose application

Use the included `docker-compose.yml` instead: create a **Compose** application in Dokploy pointing at the same repo/path, and it will build and run the `web` service. Set `NEXT_PUBLIC_SITE_URL` the same way in the Environment tab (it's already wired into the compose file via `${NEXT_PUBLIC_SITE_URL}`).

## Health check

The app exposes `GET /api/health` → `{"status":"ok"}`. Use this as Dokploy's health check path if it asks for one.

## Notes

- The image is multi-stage and uses Next.js `output: "standalone"`, so the final runtime image only ships the traced `node_modules`, `.next/static`, and `public` — no dev dependencies, no source maps bloat.
- Runs as a non-root user (`nextjs`) on port `3000`.
- No database or secrets are required — the only environment variable that matters is `NEXT_PUBLIC_SITE_URL`, used for canonical URLs, Open Graph tags, JSON-LD, and the sitemap. If you skip it, it falls back to `https://mahdi-ibrahim.dev`.
- The GitHub repos section fetches `api.github.com` client-side at runtime — no token needed, but it's subject to GitHub's unauthenticated rate limit (60 req/hr per IP), fine for normal portfolio traffic.
