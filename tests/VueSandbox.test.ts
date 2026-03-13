import { expect, test } from "vitest";
import { render } from "vitest-browser-vue";
import VueSandbox from "../src/VueSandbox.vue";

test("renders iframe with correct object URL", async () => {
  const page = render(VueSandbox, {
    props: {
      code: "<h1>Hello Sandbox</h1>",
      style: { border: "none" },
    },
  });

  // Wait for the iframe to appear
  const iframe = page.container.querySelector<HTMLIFrameElement>("iframe");

  if (!iframe) throw new Error("Iframe not found");

  // The src should be a blob URL
  expect(iframe.getAttribute("src")).toMatch(/^blob:/);

  // Style should contain the height (default 150) and our custom border
  const style = iframe.getAttribute("style") || "";
  expect(style).toContain("height: 150px;");
  expect(style).toContain("border: none;");
});

test("updates height when receiving resize message", async () => {
  const page = render(VueSandbox, {
    props: {
      code: '<div style="height: 400px;">Content</div>',
      style: {},
    },
  });

  const iframe = page.container.querySelector<HTMLIFrameElement>("iframe");

  if (!iframe) throw new Error("Iframe not found");

  let isResized = false;
  for (let i = 0; i < 50; i++) {
    if (iframe.getAttribute("style")?.includes("height: 400px;")) {
      isResized = true;
      break;
    }
    await new Promise((r) => setTimeout(r, 20));
  }

  expect(isResized).toBe(true);
  expect(iframe.getAttribute("style")).toContain("height: 400px;");
});

test("respects max-height property", async () => {
  const page = render(VueSandbox, {
    props: {
      code: '<div style="height: 9999px;">Too Tall</div>',
      maxHeight: 500,
      style: {},
    },
  });

  const iframe = page.container.querySelector<HTMLIFrameElement>("iframe");

  if (!iframe) throw new Error("Iframe not found");

  let isCapped = false;
  for (let i = 0; i < 50; i++) {
    if (iframe.getAttribute("style")?.includes("height: 500px;")) {
      isCapped = true;
      break;
    }
    await new Promise((r) => setTimeout(r, 20));
  }

  expect(isCapped).toBe(true);
  expect(iframe.getAttribute("style")).toContain("height: 500px;");
});

test("ignores invalid messages", async () => {
  const page = render(VueSandbox, {
    props: {
      code: "<p>Content</p>",
      style: {},
    },
  });

  const iframe = page.container.querySelector<HTMLIFrameElement>("iframe");

  if (!iframe) throw new Error("Iframe not found");

  // Wait for initial resize logic to finish before sending tests
  await new Promise((resolve) => setTimeout(resolve, 100));
  const initialHeight = iframe.style.height;

  // Send invalid type
  window.postMessage({ type: "other", height: 300 }, "*");
  await new Promise((resolve) => setTimeout(resolve, 300));
  expect(iframe.style.height).toBe(initialHeight); // Remains at initial

  // Send invalid height
  window.postMessage({ type: "resize", height: "invalid" }, "*");
  await new Promise((resolve) => setTimeout(resolve, 300));
  expect(iframe.style.height).toBe(initialHeight); // Remains at initial
});
