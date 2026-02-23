import type { Metadata } from 'next';
import '@/styles/index.css';

export const metadata: Metadata = {
  title: 'Deepanshu Sharma - Full Stack Developer & AI Innovator',
  description:
    'Full Stack Developer with expertise in React, Node.js, and AI technologies. Building scalable web applications and innovative solutions.',
  keywords: [
    'Deepanshu Sharma',
    'Full Stack Developer',
    'React Developer',
    'Web Developer',
    'Portfolio',
    'AI',
    'Machine Learning',
  ],
  authors: [{ name: 'Deepanshu Sharma' }],
  openGraph: {
    type: 'website',
    title: 'Deepanshu Sharma - Full Stack Developer',
    description:
      'Building scalable web applications with React, Node.js, and AI technologies.',
    images: ['/portfolio.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deepanshu Sharma - Full Stack Developer',
    description:
      'Building scalable web applications with React, Node.js, and AI technologies.',
  },
  icons: {
    icon: '/portfolio.png',
  },
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
