import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (id.includes("node_modules/lucide-react")) return "icons";
          if (id.includes("node_modules/react") || id.includes("node_modules/scheduler")) return "react-vendor";
          const course = id.match(/src[\\/]data[\\/]([^\\/]+)[\\/]course\.js$/);
          if (course) return `course-${course[1]}`;
          if (id.includes("src/data/explore/")) return "explore-data";
          if (id.includes("src/data/immersion/")) return "immersion-data";
        }
      }
    }
  }
});
