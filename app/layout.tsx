import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Sidebar } from '@/components/sidebar';
import { ScrollToTop } from '@/components/scroll-to-top';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Deepanshu Sharma | Web Developer',
  description: 'Personal portfolio website of Deepanshu Sharma, Web Developer',
  icons: {
    icon: '/boy.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 md:ml-20">
              {children}
              <Footer />
            </main>
            <ScrollToTop />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}