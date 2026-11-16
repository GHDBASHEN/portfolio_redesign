import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import { Geist, Geist_Mono } from 'next/font/google';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <div className={`${sans.variable} ${mono.variable} font-sans`}>
          <Component {...pageProps} />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
