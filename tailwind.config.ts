import type { Config } from 'tailwindcss';

const headerHeight = 140;
const subheaderHeight = 60;
const footerHeight = 120;
const headerPhotoSize = 60;

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      spacing: {
        'header-height': `${headerHeight}px`,
        'subheader-height': `${subheaderHeight}px`
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      height: {
        'header-nav': `${headerHeight}px`,
        'footer-nav': `${footerHeight}px`,
        'subheader': `${subheaderHeight}px`,
        'header-photo': `${headerPhotoSize}px`
      },
      width: {
        'header-photo': `${headerPhotoSize}px`
      },
      padding: {
        'x-pad-footer': '20px',
      },
      colors: {
        'brand-bg': {
          'DEFAULT': 'hsl(175, 33%, 45%)',
          '50': 'hsl(168, 29%, 97%)',
          '100': 'hsl(171, 35%, 89%)',
          '200': 'hsl(169, 35%, 78%)',
          '300': 'hsl(173, 32%, 64%)',
          '400': 'hsl(174, 27%, 50%)',
          '500': 'hsl(175, 33%, 45%)',
          '600': 'hsl(177, 34%, 32%)',
          '700': 'hsl(176, 32%, 26%)',
          '800': 'hsl(178, 28%, 22%)',
          '900': 'hsl(178, 26%, 19%)',
          '950': 'hsl(184, 33%, 10%)',
        },
        'brand-fg': {
          'DEFAULT': 'hsl(30, 100%, 97%)',
          '50': 'hsl(30, 100%, 97%)',
          '100': 'hsl(31, 100%, 91%)',
          '200': 'hsl(29, 98%, 83%)',
          '300': 'hsl(28, 97%, 72%)',
          '400': 'hsl(24, 96%, 61%)',
          '500': 'hsl(22, 95%, 53%)',
          '600': 'hsl(18, 90%, 48%)',
          '700': 'hsl(15, 88%, 40%)',
          '800': 'hsl(12, 79%, 34%)',
          '900': 'hsl(12, 75%, 28%)',
          '950': 'hsl(10, 81%, 15%)',
        },
        'brand-cta': {
          'DEFAULT': 'hsl(204, 44%, 12%)',
          '50': 'hsl(191, 58%, 96%)',
          '100': 'hsl(193, 55%, 90%)',
          '200': 'hsl(193, 53%, 82%)',
          '300': 'hsl(195, 52%, 69%)',
          '400': 'hsl(195, 48%, 53%)',
          '500': 'hsl(196, 53%, 43%)',
          '600': 'hsl(199, 52%, 36%)',
          '700': 'hsl(200, 46%, 31%)',
          '800': 'hsl(202, 39%, 27%)',
          '900': 'hsl(204, 36%, 24%)',
          '950': 'hsl(204, 44%, 12%)',
        }
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
