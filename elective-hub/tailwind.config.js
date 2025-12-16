/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Space theme palette
        'space-blue': '#003153',
        'space-indigo': '#1E2952',
        'cosmic-purple': '#8B5CF6',
        'nebula-blue': '#3B82F6',
        'nebula-pink': '#EC4899',
        'cosmic-cyan': '#06B6D4',
        'deep-space': '#000000',
        'space-dark': '#0a0a1a',
        'space-darker': '#0d0d1f',
        'star-white': '#ffffff',
        'nebula-light': '#e0e7ff',
      },
      fontFamily: {
        'space': ['Inter', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'nebula-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 50%, #EC4899 100%)',
        'space-gradient': 'radial-gradient(ellipse at top, #1E2952 0%, #000000 100%)',
      },
      boxShadow: {
        'planet': '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)',
        'orbit': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit-reverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'nebula-drift': 'nebula-drift 30s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        'nebula-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
}