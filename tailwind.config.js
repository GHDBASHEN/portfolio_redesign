/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: { 950: '#05060A', 900: '#0A0C12', 800: '#11141C', 700: '#1A1E29' },
        accent: { DEFAULT: 'rgb(var(--accent) / <alpha-value>)' },
        signal: { DEFAULT: 'rgb(var(--accent-2) / <alpha-value>)' },
        magenta: { DEFAULT: 'rgb(var(--accent-3) / <alpha-value>)' },
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--accent) / 0.25), 0 10px 40px -10px rgb(var(--accent) / 0.6)',
        glass: '0 8px 32px -8px rgb(0 0 0 / 0.25)',
      },
    },
  },
  plugins: [],
};
