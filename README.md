# kantimitsu.com

Production portfolio and early-stage service site for Kantimitsu: custom Windows streaming automation, diagnostics, integrations and performance-constrained software.

The visual system is an original field terminal, not a Fallout asset pack or replica. Buckimitsu appears as garnish. The public text is deliberately factual: no invented clients, testimonials, performance numbers or company details.

## Local development

Requirements: Node.js 22.13+ and npm.

```text
npm install
npm run dev
npm run check
```

The contact endpoint requires Resend and Cloudflare Turnstile values in production. Without them it fails honestly and directs people to `hello@kantimitsu.com`; it never pretends an enquiry was delivered.

## Windows collector

Source lives in `apps/collector-windows`. It targets .NET 10 WPF and is designed around explicit consent, local preview, and manual save. The collector has no report-upload feature. See `docs/data-dictionary.md` and the public JSON schema before changing its contract.

## Deployment boundaries

`infrastructure/docker-compose.yml` creates a dedicated application and tunnel network with no published host ports. It must be deployed as its own Compose project. It does not reference, join, restart or modify the existing chore-app API, its Caddy service, networks, volumes, ports or source tree.

Formal owner details are intentionally not fabricated. Privacy/terms/footer details require owner review before commercial launch.

## Rights

No licence is granted by the absence of a licence file. Code and artwork remain copyright their respective owners. See `ASSET_PROVENANCE.md`.
