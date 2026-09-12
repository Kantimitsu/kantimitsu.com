# Isolated Vultr deployment

This deployment is intentionally separate from the existing chore-app API.

1. Clone this repository into a new directory such as `/opt/kantimitsu-site`.
2. Copy `.env.example` to a local `.env` and fill the Turnstile, Resend, destination email, random rate-limit salt and a dedicated Cloudflare Tunnel token. Never commit it.
3. Build only this project: `docker compose -p kantimitsu-site -f infrastructure/docker-compose.yml build`.
4. Start only this project: `docker compose -p kantimitsu-site -f infrastructure/docker-compose.yml up -d`.
5. Configure the dedicated tunnel's public hostnames `kantimitsu.com` and `www.kantimitsu.com` to `http://web:3000`. Redirect `www` to the apex at Cloudflare if preferred.
6. Confirm the site and enquiry test, then independently confirm `https://api.kantimitsu.com/_infra/health` still returns 200.

## Rollback

Check out the previously known-good site commit in `/opt/kantimitsu-site`, rebuild this Compose project, and start it again with the same `-p kantimitsu-site` project name. The site has no database migration or persistent application volume. Re-run the site checks and the independent chore API health check after rollback.

The Compose file publishes no host port and declares only `kantimitsu_site_internal`. Do not add the existing Caddy or chore-app network. Do not reuse their volumes, container names, ports or tunnel token.

Cloudflare Email Routing should forward `hello@kantimitsu.com` to the owner's private Gmail address. That destination belongs in Cloudflare/Resend configuration, never in this repository.
