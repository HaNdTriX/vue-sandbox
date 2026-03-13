---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "vue-sandbox"
  text: "Secure, auto-resizing iframe component for Vue 3"
  tagline: Run untrusted HTML/CSS/JS with confidence.
  image:
    src: /logo.png
    alt: Vue Sandbox Logo
  actions:
    - theme: brand
      text: Get Started
      link: /api-examples
    - theme: alt
      text: View on GitHub
      link: https://github.com/handtrix/vue-sandbox

features:
  - title: Secure by default
    details: Uses an iframe with sandbox="allow-scripts" to execute untrusted code securely.
  - title: Auto-resizing
    details: Automatically adjusts the iframe height to match the rendered content, up to a configurable maximum.
  - title: Dynamic updates
    details: Uses a MutationObserver to detect DOM changes inside the sandbox and resizes dynamically.
---
