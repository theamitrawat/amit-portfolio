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

## Deployment (Vercel + AWS Elastic Beanstalk)

The frontend is a Vite single-page app and the contact form uses a separate
Express API. The frontend uses
[client/vercel.json](./client/vercel.json) for Vercel builds and SPA routing.
The API is a Node.js 22 application prepared for AWS Elastic Beanstalk.

### 1. Deploy the frontend to Vercel

1. Import this repository into Vercel.
2. Set the project **Root Directory** to `client`.
3. Deploy. Vercel builds into `dist`, routes client-side URLs (such as
   `/projects`) to the React app, and proxies `/api/*` requests using the
   external rewrite in `client/vercel.json`. Leave `VITE_API_URL` unset while
   using this same-origin proxy.

Copy your Vercel production origin, for example
`https://your-site.vercel.app`. Use the production domain, not a temporary
preview deployment URL.

### 2. Deploy the API to AWS Elastic Beanstalk

1. In the AWS Console, open **Elastic Beanstalk** and create an application.
   Create a web server environment using the **Node.js** platform on
   **Amazon Linux 2023**. Choose a Node.js 22 platform version. The API source
   is in the `server` directory.
2. From the repository root, create a source ZIP from the *contents* of
   `server` (so `package.json` and `Procfile` are at the ZIP root):

   ```powershell
   .\server\create-eb-bundle.ps1
   ```

   The script includes `.ebextensions/01-healthcheck.config` and excludes
   dependencies and environment files. Upload the generated `portfolio-api.zip`.
3. Upload the source bundle and create the environment. The `Procfile` starts
   the API with `npm start`; `.ebextensions/01-healthcheck.config` sets the
   `/api/contact/health` health-check path. Elastic Beanstalk installs the
   dependencies from the package manifest and lockfile.
4. For HTTPS termination in AWS, use a load-balanced environment, configure
   its HTTPS listener with an ACM certificate for your API domain, and point
   the API DNS name (for example, `api.example.com`) to the environment's load
   balancer. Request the certificate in the same AWS Region as the environment.
   The Vercel rewrite must target this HTTPS API domain; do not use the default
   HTTP Elastic Beanstalk URL for production contact submissions. Update the
   `destination` for `/api/:path*` in `client/vercel.json` to
   `https://api.example.com/api/:path*`, then redeploy Vercel. A load balancer
   adds cost; review the estimate before creating the environment.
5. In **Configuration → Updates, monitoring, and logging → Software →
   Environment properties** (or the environment variables section shown in
   your console), set:

   ```text
   CLIENT_URL=https://your-site.vercel.app
   MAIL_USER=your-email@gmail.com
   MAIL_PASS=your-gmail-app-password
   CONTACT_TO_EMAIL=your-email@gmail.com
   ```

   `CLIENT_URL` must exactly match the Vercel production origin, with no path
   or trailing slash. Multiple origins can be comma-separated. Use a Gmail App
   Password for `MAIL_PASS`. Set these as Elastic Beanstalk environment
   properties, not in the source bundle or repository.
6. Apply the configuration and wait for the environment health to show **OK**.
   Test `https://api.example.com/api/contact/health`.

### 3. Connect and verify deployments

Ensure the `/api/:path*` rewrite in `client/vercel.json` targets the API HTTPS
origin, and leave `VITE_API_URL` unset so the browser calls the same-origin
Vercel proxy. Redeploy Vercel after changing the rewrite. Then test direct
project page loads, project images, resume download, and the contact form.

For each API release, create a fresh source bundle from the `server` directory
and upload it to Elastic Beanstalk. Do not include `.env` files or
`node_modules`.

### Local production build

Run `npm run build` from the repository root. The static frontend output is
written to `client/dist`.

See [server/.env.example](./server/.env.example) and
[client/.env.example](./client/.env.example) for local placeholder configuration.
