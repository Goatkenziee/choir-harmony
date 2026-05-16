import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kid-friendly vibrant palette
        primary: {
          50: '#f3e8ff',
          100: '#e9d5ff',
          300: '#d8b4fe',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          900: '#4c0a99',
        },
        accent: {
          50: '#fef3c7',
          100: '#fde68a',
          300: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        success: {
          50: '#dcfce7',
          100: '#bbf7d0',
          300: '#86efac',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        sky: {
          50: '#e0f2fe',
          100: '#bae6fd',
          300: '#7dd3fc',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        rose: {
          50: '#ffe4e6',
          100: '#fecdd3',
          300: '#fda4af',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be185d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-gentle': 'bounce 2s infinite',
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
