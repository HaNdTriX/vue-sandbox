import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue-sandbox",
  description: "Secure Vue Sandbox Component",
  // Base URL for GitHub Pages deployment (matches the repository name)
  base: "/vue-sandbox/",
  themeConfig: {
    logo: "/logo.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Documentation", link: "/api-examples" },
      { text: "Playground", link: "/playground" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/api-examples" },
          { text: "Playground", link: "/playground" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/handtrix/vue-sandbox" }],
  },
});
