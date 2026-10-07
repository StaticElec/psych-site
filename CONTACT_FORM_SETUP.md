# Contact form setup

The existing four-field form (`name`, `phone`, `email`, `message`) sends JSON to a separate Cloudflare Worker at `POST /api/contact`. The Worker sends HTML and plain-text email through Resend. The visitor's address is the email `Reply-To`; the configured sender remains the `From` address.

## 1. Resend

1. Create or sign in to a Resend account and create an API key with sending access.
2. For production, add and verify a sending domain in Resend, including the DNS records Resend provides.
3. Choose an address on that verified domain for `CONTACT_FROM_EMAIL`. Do not use the visitor's address as the sender.
4. For a development test, `onboarding@resend.dev` can be used as `CONTACT_FROM_EMAIL`; Resend's test sender is restricted, so set `CONTACT_TO_EMAIL` to an address your Resend account is allowed to test with. Replace the test sender before production.

The site discusses psychotherapy and the message field may contain sensitive health information. Before enabling real submissions, confirm directly with Resend and your compliance adviser that the intended account/agreement permits this content. Resend's [general guidance](https://resend.com/security/gdpr) says it cannot sign a BAA, while its [enterprise terms](https://resend.com/legal/enterprise-terms) describe a possible signed BAA under an Order Form. The form code itself does not establish HIPAA compliance. Avoid sending real patient information during testing.

## 2. Cloudflare Worker configuration

The standalone Worker configuration is [`worker/wrangler.jsonc`](worker/wrangler.jsonc). It intentionally contains no email addresses or API key. Create the Worker, then set these bindings on that Worker in Cloudflare **Workers & Pages → psych-site-contact → Settings → Variables and Secrets**:

| Binding | Type | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | **Secret** | Your Resend API key. Never add it as a plain variable. |
| `CONTACT_TO_EMAIL` | Text variable | Destination inbox. Change this value in Cloudflare whenever the client changes inboxes; no code change or rebuild is needed. |
| `CONTACT_FROM_EMAIL` | Text variable | Sender address on the verified Resend domain. |
| `CONTACT_FROM_NAME` | Text variable | Display name, such as `Website Contact Form`. |
| `CONTACT_SUBJECT_PREFIX` | Text variable | Subject prefix, such as `Website Inquiry`. |
| `ALLOWED_ORIGIN` | Text variable | Comma-separated website origins, without trailing slashes or paths (for example, `https://example.com,https://www.example.com`). |

The Wrangler config uses `keep_vars: true` so future Worker deployments retain changes made to text variables in the Cloudflare dashboard. The API key remains a Cloudflare secret. To enter it from the terminal instead of the dashboard, run the interactive command below after creating the Worker; do not paste the key into a shell command:

```sh
./node_modules/.bin/wrangler secret put RESEND_API_KEY --config worker/wrangler.jsonc
```

Use a separate Cloudflare Worker and separate bindings for a persistent staging environment if needed. Local development settings live only in the ignored `.dev.vars` file.

## 3. Local development

From the repository root:

```sh
npm run install:ci
cp worker/.dev.vars.example worker/.dev.vars
```

Edit `worker/.dev.vars` with a real **test** API key, a permitted test recipient, and `ALLOWED_ORIGIN=http://localhost:5173`. This file is ignored by Git. Multiple allowed origins can be separated with commas. Create an ignored `.env.local` in the repository root containing:

```dotenv
NEXT_PUBLIC_CONTACT_API_URL=http://127.0.0.1:8787/api/contact
```

Run the two servers in separate terminals:

```sh
npm run worker:dev
npm run dev
```

Open `http://localhost:5173/contact`. Keep the host in `ALLOWED_ORIGIN` exactly equal to the site URL in the browser; `localhost` and `127.0.0.1` count as different origins. Run `npm run worker:test` for the contact API tests. Local testing with a real API key sends a real email or consumes a Resend test send.

## 4. Deployment

Sign in to Cloudflare, then deploy or update the contact Worker from the repository root:

```sh
./node_modules/.bin/wrangler login
npm run worker:deploy
```

The first deploy creates `psych-site-contact` and prints its `workers.dev` URL. Then add the six Worker bindings above (including the secret). The Worker returns a generic failure until all bindings are valid. For a production custom domain, you may attach a Cloudflare route or custom domain to this Worker; keep `/api/contact` as the path. `ALLOWED_ORIGIN` must contain the **frontend website** origin or origins, not the Worker origin.

This frontend is a Vinext/Vite site published through the existing Sites workflow, not through this contact Worker's Wrangler config. Set the frontend build variable `NEXT_PUBLIC_CONTACT_API_URL` to the deployed Worker URL plus `/api/contact`, then rebuild and republish the Site through its existing Sites workflow. Do not publish a build that still points to the local Worker. `npm run build` checks the frontend build locally; it does not publish the Site.

If a Cloudflare route makes `/api/contact` available on the **same origin** as the website, the frontend can omit `NEXT_PUBLIC_CONTACT_API_URL` and use the default `/api/contact`. The existing Sites hosting arrangement does not create this route automatically, so the separate Worker URL is the straightforward default.

## 5. Frontend endpoint

[`lib/contact-config.ts`](lib/contact-config.ts) is the single place that selects the endpoint. It reads the public, build-time `NEXT_PUBLIC_CONTACT_API_URL` setting and otherwise uses `/api/contact`. This URL is public; never place `RESEND_API_KEY` or any other secret in a `NEXT_PUBLIC_` variable. Changing the frontend endpoint requires a frontend rebuild and republish. Changing `CONTACT_TO_EMAIL` does not.

## 6. Email formatting

[`worker/src/contact-email.ts`](worker/src/contact-email.ts) controls the email subject, HTML layout, and plain-text layout. Edit that file to change how contact emails look. [`worker/src/index.ts`](worker/src/index.ts) handles routing, validation, CORS, and sending.

The current protection is a honeypot plus strict input and origin checks. CORS is a browser rule, not authentication, and these checks do not provide rate limiting. If spam becomes persistent, add Cloudflare rate limiting or Turnstile verification in the Worker before the Resend call.
