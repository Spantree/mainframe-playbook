// @ts-nocheck
import { defineConfig } from "unocss";
import presetWind from "@unocss/preset-wind";

export default defineConfig({
  presets: [presetWind()],
  theme: {
    colors: {
      brand: {
        primary: "#2C3A41",
        accent: "#e87722",
        "accent-dark": "#cc6415",
        "bg-start": "#E5E5E5",
        "bg-end": "#D2E2EA",
        text: "#2C3A41",
        "text-light": "#6B7280",
        "text-muted": "#9CA3AF",
        gray: "#F9FAFB",
        "gray-light": "#FFFFFF",
      },
    },
    fontFamily: {
      "poppins":
        `"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif`,
    },
    animation: {
      fadein: "fadeIn 0.5s ease-in-out",
      slideinleft: "slideInLeft 0.6s ease-out",
      slideinright: "slideInRight 0.6s ease-out",
      float: "float 3s ease-in-out infinite",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "1" },
      },
      slideInLeft: {
        "0%": { transform: "translateX(-30px)", opacity: "0" },
        "100%": { transform: "translateX(0)", opacity: "1" },
      },
      slideInRight: {
        "0%": { transform: "translateX(30px)", opacity: "0" },
        "100%": { transform: "translateX(0)", opacity: "1" },
      },
      float: {
        "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
        "50%": { transform: "translateY(-10px) rotate(5deg)" },
      },
    },
    backgroundImage: {
      "radial-blur":
        "radial-gradient(ellipse at top left, #E5E5E5 0%, #D2E2EA 100%)",
    },
  },
  shortcuts: {
    "brand-card":
      "bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200",
    "brand-button":
      "bg-brand-accent hover:bg-brand-accent-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:transform hover:-translate-y-0.5",
    "brand-badge":
      "bg-brand-accent text-white px-3 py-1 rounded-lg text-sm font-semibold",
    "brand-header-tag":
      "text-brand-accent text-sm font-semibold uppercase tracking-wide",
    "slide-content": "flex-1 flex flex-col justify-center px-16 py-12",
    "slide-grid": "grid grid-cols-3 gap-6",
    "slide-two-cols": "grid grid-cols-2 gap-16 items-center",
    "gradient-bg": "bg-gradient-to-br from-brand-bg-start to-brand-bg-end",
  },
});
