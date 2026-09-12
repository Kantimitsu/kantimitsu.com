# Security

Please report security problems privately to `hello@kantimitsu.com`. Do not include credentials or personal diagnostic data in a public issue.

The enquiry endpoint accepts only `.json` or `.txt` attachments up to 1 MiB, validates Collector JSON against the published schema, rate-limits by a salted one-way network-address digest, uses Turnstile in production and relays directly by email. It has no enquiry database.

The diagnostic collector intentionally excludes credentials, product keys, usernames, personal paths, serial numbers, arbitrary process lists, file lists, browser history, recordings and screen contents.
