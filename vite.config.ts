import { defineConfig } from 'vite'
import path from "path"

// vite.config.ts
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  /* enable sw on development */
  devOptions: {
    enabled: false
    /* other options */
  },
  registerType: "prompt",
  // add this to cache all the imports
  workbox: {
    globPatterns: ["**/*"],
  },
  // add this to cache all the
  // static assets in the public folder
  includeAssets: [
    "**/*",
  ], manifest: {
    name: "Weather Ups",
    short_name: "Weathe Ups",
    description: "An app that can show weather forecast for your city.",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "/maskable_icon.png",
        sizes: "225x225",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#e8ebf2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

