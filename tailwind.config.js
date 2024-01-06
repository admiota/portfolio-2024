/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        linkedinColor: '#0A66C2'
      }    
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

