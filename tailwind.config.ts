import type { Config } from 'tailwindcss'

const customColors = {
  forest: {
    50: '#0A5137',
    100: '#0E6445',
    200: '#137752',
    300: '#18895F',
    400: '#1D9A6C',
    500: '#3FAC84',
    600: '#62BE9C',
    700: '#86CEB4',
    800: '#AADECB',
    900: '#CFEDE2',
    DEFAULT: '#3FAC84',
  },
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: customColors.forest,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
