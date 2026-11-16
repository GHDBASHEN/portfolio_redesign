import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import { Geist, Geist_Mono } from 'next/font/google';
import SmoothScroll from '@/components/scroll/SmoothScroll';
import Cursor from '@/components/ui/Cursor';
import ClickSpark from '@/components/ui/ClickSpark';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <div className={`${sans.variable} ${mono.variable} font-sans`}>
            <Component {...pageProps} />
            <Cursor />
            <ClickSpark />
            {/* Modals portal here so they keep the fonts and escape section transforms */}
            <div id="portal-root" />
          </div>
        </SmoothScroll>
      </MotionConfig>
    </ThemeProvider>
  );
}
