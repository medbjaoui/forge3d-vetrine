/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forge: {
          orange: '#f97316',
          'orange-dark': '#ea6c0a',
          'orange-light': '#fb923c',
          'orange-50': '#fff7ed',
          dark: '#0d0f16',
          'dark-800': '#13161f',
          'dark-700': '#1a1f2e',
          'dark-600': '#222840',
          gray: '#f8fafc',
          text: '#1e293b',
          'text-muted': '#64748b',
        },
      },
      fontFamily: {
        display: ['Rajdhani', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'forge-grid': `
          linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)
        `,
        'hero-gradient': 'linear-gradient(135deg, #0d0f16 0%, #13161f 50%, #1a1f2e 100%)',
        'orange-gradient': 'linear-gradient(135deg, #f97316 0%, #ea6c0a 100%)',
        'card-gradient': 'linear-gradient(135deg, #13161f 0%, #1a1f2e 100%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      boxShadow: {
        'forge-glow': '0 0 30px rgba(249,115,22,0.3)',
        'forge-glow-sm': '0 0 15px rgba(249,115,22,0.2)',
        'forge-card': '0 4px 24px rgba(0,0,0,0.12)',
        'forge-card-hover': '0 8px 40px rgba(249,115,22,0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
