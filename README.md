# vue-sandbox

A Vue component for securely rendering untrusted HTML, CSS, and JavaScript inside an isolated `iframe`. `vue-sandbox` automatically adjusts the height of the iframe to fit its content by using a `MutationObserver` internally, ensuring a seamless integration into your application layout.

## Features

- **Secure by default**: Uses an `iframe` with `sandbox="allow-scripts"` to execute untrusted code securely.
- **Auto-resizing**: Automatically adjusts the `iframe` height to match the rendered content, up to a configurable maximum height.
- **Dynamic updates**: Uses a `MutationObserver` to detect DOM changes inside the sandbox and resizes the `iframe` dynamically via `postMessage`.
- **Blob URLs**: Creates a local Blob URL for the `iframe` source to avoid external requests or base64 decoding overhead.

## Installation

You can install the package via your preferred package manager:

```bash
npm install vue-sandbox
# or
pnpm add vue-sandbox
# or
yarn add vue-sandbox
```

## Usage

```vue
<script setup>
import { ref } from "vue";
import VueSandbox from "vue-sandbox";

const htmlCode = ref(`
  <style>
    body { background: #f0f0f0; padding: 20px; text-align: center; }
    button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
  </style>
  <h1>Hello from the Sandbox!</h1>
  <button onclick="document.body.innerHTML += '<p>Clicked!</p>'">Click Me</button>
`);
</script>

<template>
  <VueSandbox
    :code="htmlCode"
    :max-height="800"
    style="width: 100%; border: 1px solid #ccc; border-radius: 8px;"
  />
</template>
```

## Props

| Prop        | Type                      | Default      | Description                                                      |
| ----------- | ------------------------- | ------------ | ---------------------------------------------------------------- |
| `code`      | `string`                  | **Required** | The raw HTML/CSS/JS code to render inside the sandbox.           |
| `maxHeight` | `number`                  | `2000`       | The maximum height (in pixels) the iframe is allowed to grow to. |
| `style`     | `HTMLAttributes["style"]` | `undefined`  | Optional inline styles applied to the iframe element.            |

---

## Contributing

We welcome contributions! Please follow the steps below to set up your local development environment.

### Development Setup

1. **Clone the repository** and install dependencies (using `pnpm` is recommended):

   ```bash
   pnpm install
   ```

2. **Start the development server**: This runs `tsdown` in watch mode to automatically rebuild the library on changes.

   ```bash
   pnpm run dev
   ```

3. **Run the playground**: Start the Vitepress documentation server to test the component interactively.
   ```bash
   pnpm run docs:dev
   ```

### Testing

The project uses `vitest` and `vitest-browser-vue` for testing.

- Run unit and browser tests:
  ```bash
  pnpm run test
  ```

### Building & Publishing

- **Typecheck**: Verify TypeScript types using `vue-tsc`:
  ```bash
  pnpm run typecheck
  ```
- **Build the library**: Bundle the component into `dist/` using `tsdown`:
  ```bash
  pnpm run build
  ```
- **Release**: Automatically bumps the version and publishes to npm.
  ```bash
  pnpm run release
  ```

## License

[MIT](LICENSE)
