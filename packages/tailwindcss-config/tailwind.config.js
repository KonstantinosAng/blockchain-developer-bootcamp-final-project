/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    '../../packages/ui/components/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/pages/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        200: "200px",
        250: "250px",
        300: "300px",
        350: "350px",
        400: "400px",
        450: "450px",
        500: "500px",
        550: "550px",
        600: "600px",
        650: "650px",
        700: "700px",
        750: "750px",
        800: "800px",
        850: "850px",
        900: "900px",
				1000: "1000px",
        1100: "1100px",
        1200: "1200px",
				1300: "1300px",
        1400: "1400px",
        1500: "1500px",
				1800: "1800px",
        2000: "2000px",
        "3xl": "2600px",
        smHeight: { raw: "(max-height: 736px)" },
        xsHeight: { raw: "(max-height: 500px)" },
      },
      fontSize: {
        "2xs": [
          "0.65rem",
          {
            lineHeight: "1rem",
          },
        ],
      },
      colors: {
        basicBackground: "#0d082d",
        headerBackground: "#222050"
      }
    },
  },
  plugins: [],
}
