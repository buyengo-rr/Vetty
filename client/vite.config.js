import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  optimizeDeps: {
    include: [
      "@headlessui/react",
      "@heroicons/react/24/outline",
      "@reduxjs/toolkit",
      "@stripe/react-stripe-js",
      "@stripe/stripe-js",
      "axios",
      "date-fns",
      "lucide-react",
      "react-datepicker",
      "react-hot-toast",
      "react-icons",
      "react-image-gallery",
      "react-redux",
      "react-router-dom",
      "styled-components",
      "swiper"
    ]
  }
});
