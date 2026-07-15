import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'hebrew': ['Noto Sans Hebrew', 'Assistant', 'system-ui', 'sans-serif'],
        'arabic': ['Noto Sans Arabic', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // Brand palette, drawn from the Liga Deals Berlin logo (navy badge + gold type)
        navy: {
          50: '#eef0f7',
          100: '#d6dae9',
          200: '#adb6d3',
          300: '#7d89b3',
          400: '#525e8c',
          500: '#39406b',
          600: '#282f57', // Logo navy
          700: '#1f2545',
          800: '#161a33',
          900: '#0d0f1f',
        },
        gold: {
          50: '#fdf8ec',
          100: '#faf0d3',
          200: '#f3dfa0',
          300: '#eccc6c',
          400: '#e0b34c',
          500: '#d9a441', // Logo gold
          600: '#c08a2e',
          700: '#9c6c24',
          800: '#7a541f',
          900: '#5c3f18',
        },
        cream: {
          DEFAULT: '#fbf8f2',
          50: '#fefdfb',
          100: '#fbf8f2',
          200: '#f5efe0',
        },
        ligadeals: {
          blue: {
            50: '#e3f2fd',
            100: '#bbdefb',
            200: '#90caf9',
            300: '#64b5f6',
            400: '#42a5f5',
            500: '#2196f3', // Main blue
            600: '#1e88e5',
            700: '#1976d2',
            800: '#1565c0',
            900: '#0d47a1',
          },
          purple: {
            50: '#f3e5f5',
            100: '#e1bee7',
            200: '#ce93d8',
            300: '#ba68c8',
            400: '#ab47bc',
            500: '#9c27b0', // Main purple
            600: '#8e24aa',
            700: '#7b1fa2',
            800: '#6a1b9a',
            900: '#4a148c',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config