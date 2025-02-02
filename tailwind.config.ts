import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#23435C",
        red: "#FF0000",
        blue: "#0029FF",
        online: "#00FF0A",
        offline: "#FFF500",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "infinite-scroll-up": {
          from: { transform: "translateY(30%)" },
          to: { transform: "translateY(-100%)" },
        },
        zoomInOut: {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1)", // Zoom in
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "infinite-scroll-up": "infinite-scroll-up 10s linear infinite",
        "zoom-in-out": "zoomInOut 2s infinite ease-in-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
