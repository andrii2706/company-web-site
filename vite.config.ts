import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// Адреса локального WordPress (той самий бекенд, який ви піднімаєте окремо).
// Змініть тут, якщо ваш WP живе на іншому хості/порту.
const WP_DEV_TARGET = "http://localhost/pav-it-be";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Все, що React запитує як "/wp-json/...", піде на WP,
      // але для браузера це виглядає як один і той самий origin —
      // тому CORS-заголовки на стороні WordPress не потрібні.
      "/wp-json": {
        target: WP_DEV_TARGET,
        changeOrigin: true,
      },
    },
  },
});
