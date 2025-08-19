// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "animate-in-up",
    "animate-out-down",
    "animate-fade-in",
    "animate-fade-out",
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-in-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-out-down": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "fade-out": { "0%": { opacity: "1" }, "100%": { opacity: "0" } },
      },
      animation: {
        "in-up": "slide-in-up 300ms cubic-bezier(0.16,1,0.3,1) forwards",
        "out-down": "slide-out-down 250ms cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fade-in 200ms ease-out forwards",
        "fade-out": "fade-out 200ms ease-in forwards",
      },
    },
  },
  plugins: [],
};
