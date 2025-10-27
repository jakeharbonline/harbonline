import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#000000',
        'bg-secondary': '#000000',
        'bg-tertiary': '#000000',

        // Text colors
        'text-primary': '#F5F5F5',
        'text-secondary': '#A1A1A1',
        'text-tertiary': '#737373',

        // Accent colors (blue + purple gradient)
        'accent-primary': '#3B82F6',
        'accent-primary-hover': '#2563EB',
        'accent-primary-light': '#60A5FA',
        'accent-secondary': '#8B5CF6',
        'accent-secondary-hover': '#7C3AED',

        // Status colors
        'success': '#10B981',
        'success-hover': '#059669',
        'warning': '#F59E0B',
        'warning-hover': '#D97706',
        'error': '#EF4444',
        'error-hover': '#DC2626',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        'gradient-mesh': 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(178, 76, 255, 0.15) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
