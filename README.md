# Amit's Portfolio

This repository contains a React/Vite portfolio frontend and a small Express API
used by the contact form. Project and profile content is stored in the frontend;
the backend sends contact notifications through Nodemailer. There is no MongoDB
connection or database-backed feature in the current codebase.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

From the repository root:

```powershell
npm install
npm run install:all
if (-not (Test-Path server\.env)) { Copy-Item server\.env.example server\.env }
npm run dev
```

Edit `server\.env` with your mail settings; this command preserves an existing
file.

Open the Vite URL printed in the terminal (normally `http://localhost:5173`).
The Express API listens on `http://localhost:5000`; Vite proxies `/api` requests
to it during development.

Set `MAIL_USER` and `MAIL_PASS` in `server/.env` to enable contact-form email.
For Gmail, `MAIL_PASS` must be an App Password. The site can be viewed without
mail credentials, but contact submissions will fail until mail is configured.

## Deployment (Vercel + Render)

The frontend is a Vite single-page app and the contact form uses a separate
Express API. Deployment configuration is provided in
[client/vercel.json](./client/vercel.json) and [render.yaml](./render.yaml).

### 1. Deploy the frontend to Vercel

1. Import this repository into Vercel.
2. Set the project **Root Directory** to `client`.
3. Add `VITE_API_URL` as an environment variable. For the first deployment,
   leave it empty if the Render API is not deployed yet.
4. Deploy. Vercel uses `client/vercel.json` to build into `dist` and route
   client-side URLs (such as `/projects`) to the React app.

Copy the deployed frontend origin, for example `https://your-site.vercel.app`.

### 2. Deploy the API to Render

1. In Render, create a **Blueprint** from this repository and use
   [render.yaml](./render.yaml).
2. Set `CLIENT_URL` to the exact deployed Vercel origin (no trailing slash).
3. Enter `MAIL_USER`, `MAIL_PASS`, and `CONTACT_TO_EMAIL` when Render prompts
   for the values. Use a Gmail App Password for `MAIL_PASS`; do not put real
   credentials in this repository.
4. Deploy the service and copy its public origin, for example
   `https://amit-portfolio-api.onrender.com`.

Render uses `/api/contact/health` as the service health check. The service
receives its listening `PORT` from Render.

### 3. Connect and redeploy the frontend

In Vercel project settings, set `VITE_API_URL` to the Render API origin
(without a trailing slash), then redeploy so the value is included in the
frontend build.

After both deployments finish, verify the API health URL and test the website's
direct project-page URLs, project images, resume download, and contact form.
The Vercel rewrite configuration supports direct navigation and refreshes on
React Router pages. Render's free web services may sleep when idle, making the
first request after inactivity slower.

### Local production build

Run `npm run build` from the repository root. The static frontend output is
written to `client/dist`.

See [server/.env.example](./server/.env.example) and
[client/.env.example](./client/.env.example) for placeholder configuration.
