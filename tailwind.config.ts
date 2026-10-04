import type { Config } from 'tailwindcss';

// Farben als CSS-Variablen (app/globals.css), Werte aus dem Markenpaket.
const kanal = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    container: { center: true, padding: '1rem', screens: { '2xl': '1200px' } },
    extend: {
      colors: {
        canvas: kanal('--c-canvas'),
        surface: kanal('--c-surface'),
        'surface-2': kanal('--c-surface-2'),
        line: kanal('--c-line'),
        content: kanal('--c-text'),
        muted: kanal('--c-muted'),
        primary: kanal('--c-primary'),
        'primary-hover': kanal('--c-primary-hover'),
        'on-primary': kanal('--c-on-primary'),
        akzent: kanal('--c-akzent'),
        danger: kanal('--c-danger'),
        success: kanal('--c-success'),
        nacht: { DEFAULT: '#0F4C4F', 600: '#0B3B3D', hell: '#8FD3CB' },
        spaet: '#2F8F86',
        frueh: '#E3A33B'
      },
      fontFamily: {
        brand: ['var(--font-brand)', 'system-ui', 'sans-serif']
      },
      borderRadius: { token: '10px', 'token-lg': '14px' }
    }
  },
  plugins: []
};

export default config;
