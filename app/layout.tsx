import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://kantimitsu.com'),
  title: { default: 'Kantimitsu — Custom Streaming Software', template: '%s // Kantimitsu' },
  description: 'Custom Windows streaming automation, diagnostics, integrations, and performance work built around the machine you actually own.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://kantimitsu.com',
    title: 'Kantimitsu — Custom Streaming Software',
    description: 'Custom streaming software built around your actual setup.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Kantimitsu field terminal' }],
  },
  twitter: { card: 'summary_large_image', title: 'Kantimitsu — Custom Streaming Software', description: 'Custom streaming software built around your actual setup.', images: ['/og.png'] },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Kantimitsu',
  url: 'https://kantimitsu.com',
  email: 'hello@kantimitsu.com',
  areaServed: 'Worldwide',
  address: { '@type': 'PostalAddress', addressLocality: 'Christchurch', addressCountry: 'NZ' },
  description: 'Custom Windows streaming automation, diagnostics, integrations, and performance work.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      </body>
    </html>
  );
}
