export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        snapYellow: '#ffd400',
        snapDark: '#111827',
        snapGray: '#f5f6f8',
        snapMuted: '#6b7280'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(17, 24, 39, 0.08)'
      },
      animation: {
        float: 'float 5s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    }
  },
  plugins: []
};
