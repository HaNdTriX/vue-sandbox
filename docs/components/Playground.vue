<script setup lang="ts">
import { ref, onMounted, shallowRef } from "vue";
import VueSandbox from "../../src/VueSandbox.vue";
import { defaultCode } from "./defaultCode";

// CodeMirror dependencies
import { Codemirror } from "vue-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";

const code = ref(defaultCode);
const extensions = [html(), oneDark];

// Small client-only hack for Vitepress SSR rendering
const isClient = ref(false);
onMounted(() => {
  isClient.value = true;
});
</script>

<template>
  <div class="playground-layout">
    <main class="main-content">
      <div class="panel editor-panel">
        <div class="panel-header">
          <h2>💻 Code Editor</h2>
          <span class="badge">Live</span>
        </div>
        <div class="editor-container">
          <Codemirror
            v-if="isClient"
            v-model="code"
            :extensions="extensions"
            :autofocus="true"
            :indent-with-tab="true"
            :tab-size="2"
            class="cm-editor-override"
          />
        </div>
      </div>

      <div class="panel preview-panel">
        <div class="panel-header">
          <h2>👁 Preview</h2>
          <span class="badge auto-height">Auto-resizing</span>
        </div>
        <div class="preview-container">
          <!-- Only render sandbox on Client since it relies on browser DOM/Blob -->
          <VueSandbox v-if="isClient" :code="code" class="sandbox-frame" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code&display=swap");

.playground-layout {
  /* Vitepress nav bar is ~64px */
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.main-content {
  display: flex;
  flex: 1;
  gap: 1rem;
  padding: 1.5rem;
  overflow: hidden; /* Prevent body scroll */
}

.panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.panel-header {
  padding: 1rem 1.5rem;
  background: var(--vp-c-bg-mute);
  border-bottom: 1px solid var(--vp-c-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h2 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.badge {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge.auto-height {
  background: #8b5cf6;
}

.editor-container,
.preview-container {
  flex: 1;
  position: relative;
  overflow: hidden; /* Keep content contained */
}

/* Override vue-codemirror default height to fill the flex container */
.cm-editor-override {
  height: 100%;
}
:deep(.cm-editor) {
  height: 100%;
  font-family: "Fira Code", "JetBrains Mono", monospace;
  font-size: 0.9rem;
}

/* Custom scrollbars for the editor */
:deep(.cm-scroller::-webkit-scrollbar) {
  width: 8px;
  height: 8px;
}
:deep(.cm-scroller::-webkit-scrollbar-track) {
  background: var(--vp-c-bg-mute);
}
:deep(.cm-scroller::-webkit-scrollbar-thumb) {
  background: var(--vp-c-text-3);
  border-radius: 4px;
}

.preview-container {
  padding: 2rem;
  background: repeating-linear-gradient(
    45deg,
    var(--vp-c-bg-soft),
    var(--vp-c-bg-soft) 10px,
    var(--vp-c-bg) 10px,
    var(--vp-c-bg) 20px
  );
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto; /* Allow scrolling if sandbox gets too big */
}

.sandbox-frame {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: height 0.3s ease-out;
}

@media (max-width: 1024px) {
  .playground-layout {
    height: auto;
    min-height: calc(100vh - 64px);
  }

  .main-content {
    flex-direction: column;
    overflow-y: auto;
  }

  .panel {
    min-height: 400px;
  }

  .preview-container {
    min-height: 600px;
  }
}
</style>
