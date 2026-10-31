import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FestaFlow | फेस्टाफ्लो — Celebration Planning & Budget Intelligence',
  description:
    'GenAI-powered celebration and event planning assistant with budget intelligence. Plan weddings, milestone birthdays, cultural festivals, and community gatherings with deterministic financial modeling.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Rozha+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="app-wrapper">{children}</div>
      </body>
    </html>
  );
}
