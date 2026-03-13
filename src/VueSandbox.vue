<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import { computed, ref, type HTMLAttributes } from "vue";
import { useObjectUrl } from "./composables/useObjectUrl";
import { useMessage } from "./composables/useMessage";

const props = withDefaults(
  defineProps<{
    code: string;
    maxHeight?: number;
    style?: HTMLAttributes["style"];
    autoHeight?: boolean;
  }>(),
  {
    maxHeight: 2000,
    autoHeight: true,
  },
);

// Default starting height
const iframeHeight = ref(150);

// Create the secure wrapper for the untrusted code
const htmlBlob = computed(() => {
  let template = props.code;
  if (props.autoHeight) {
    template += `
      <script>
        (() => {
          function notify() {
            const height = document.body.offsetHeight;
            window.parent.postMessage({ type: 'resize', height }, '*');
          };
          notify()
          window.addEventListener('load', notify);
          new MutationObserver(notify).observe(document.body, {
            subtree: true, childList: true, attributes: true
          });
        })();
      <\/script>
    `;
  }
  return new Blob([template], { type: "text/html" });
});

// Create a html object url
const objectUrl = useObjectUrl(htmlBlob);

// Sync htmlBlob height with iframe height
useMessage((event) => {
  if (event.origin !== window.location.origin && event.origin !== "null")
    return;
  if (event.data?.type !== "resize") return;
  if (typeof event.data.height !== "number") return;
  iframeHeight.value = Math.min(event.data.height, props.maxHeight);
});
</script>

<template>
  <iframe
    v-if="objectUrl"
    :src="objectUrl"
    :style="[props.style, { height: `${iframeHeight}px` }]"
    sandbox="allow-scripts"
    frameborder="0"
  ></iframe>
</template>
