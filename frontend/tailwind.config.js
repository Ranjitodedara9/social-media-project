/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 2px 8px 0px rgba(99, 99, 99, 0.2)",
        "4xl": "0px 7px 29px 0px rgba(100, 100, 111, 0.2)",
      },
      colors: {
        "bg-color": "#3D2627",
        "box-color": "#37292C",
        "box2-color": "#403A3B",
        "btn-color": "#E3694A",
        "form-color": "#322C30",
      },
    },
  },
  plugins: [],
};

