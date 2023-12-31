/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#16B364',
        'dash':'#F9FAFB'
      },
      fontFamily:{
      mono: ['Roboto Mono', 'monospace'],
      slab: ['Roboto Slab', 'serif']
    },
    },
  },
  plugins: [require('flowbite/plugin')],
}

