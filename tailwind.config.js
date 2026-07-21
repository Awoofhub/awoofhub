/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F6F7F8",
        foreground: "#171717",
        primary: {
          DEFAULT: "#FE4F04",
          light: "#FDBA6B",
        },
        secondary: "#A63A09",
        accent: "#4E260C",
        muted: "#595858",
      },
      fontFamily: {
        'mont': ['Montserrat-Regular'],
        'mont-italic': ['Montserrat-Italic'],
        'mont-bold': ['Montserrat-Bold'],
        'mont-semibold': ['Montserrat-SemiBold'],
        'mont-extrabold': ['Montserrat-ExtraBold'],
        'baloo-bold': ['Baloo2-Bold'],
        'baloo-medium': ['Baloo2-Medium'],
      },
    },
  },
  plugins: [],
}

