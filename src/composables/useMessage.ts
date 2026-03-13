import { onScopeDispose } from "vue";

/**
 * Listen to messages from the window.
 */
export function useMessage(callback: (message: MessageEvent) => void) {
  if (typeof window === "undefined") return;
  window.addEventListener("message", callback);
  onScopeDispose(() => {
    window.removeEventListener("message", callback);
  });
}
