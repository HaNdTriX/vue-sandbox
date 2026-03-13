# Introduction

`vue-sandbox` is a Vue 3 component for securely rendering untrusted HTML, CSS, and JavaScript inside an isolated `iframe`. It automatically adjusts the height of the iframe to fit its content by using a `MutationObserver` internally, ensuring a seamless integration into your application layout.

## Installation

You can install the package via your preferred package manager:

```bash
npm install vue-sandbox
# or
pnpm add vue-sandbox
# or
yarn add vue-sandbox
```

## Basic Usage

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

| Prop         | Type                      | Default      | Description                                                      |
| ------------ | ------------------------- | ------------ | ---------------------------------------------------------------- |
| `code`       | `string`                  | **Required** | The raw HTML/CSS/JS code to render inside the sandbox.           |
| `maxHeight`  | `number`                  | `2000`       | The maximum height (in pixels) the iframe is allowed to grow to. |
| `autoHeight` | `boolean`                 | `true`       | Whether to automatically resize the iframe based on content.     |
| `style`      | `HTMLAttributes["style"]` | `undefined`  | Optional inline styles applied to the iframe element.            |
