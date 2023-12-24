import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    mainFields: ["browser", "module", "main", "jsnext:main", "jsnext"],
  },
  plugins: [vue()],
});
