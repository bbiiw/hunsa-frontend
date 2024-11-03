/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), // Include DaisyUI as a plugin
  ],
  daisyui: {
    themes: [
      {
        beauty: {
          primary: "#D4A5A5", // Soft muted pink
          secondary: "#E3C8B0", // Muted peach
          accent: "#D9AFCF", // Dusky pink for accents
          neutral: "#EAE7E2", // Soft grayish beige for backgrounds
          "base-100": "#F5F2ED", // Off-white with a touch of beige
          info: "#8C9CB3", // Muted blue-gray
          success: "#A3C9A8", // Muted green for freshness
          warning: "#D8A976", // Warm muted orange
          error: "#C98282", // Soft muted red for alerts
        },
      },
      "retro", // Default retro theme in case
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
