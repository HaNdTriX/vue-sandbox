import { onScopeDispose, readonly, shallowRef, toValue, watch, type MaybeRefOrGetter } from "vue";

/**
 * Reactive URL representing an object.
 */
export function useObjectUrl(object: MaybeRefOrGetter<Blob>) {
  if (typeof URL === "undefined") return;

  const url = shallowRef<string | undefined>();

  const release = () => {
    if (url.value) URL.revokeObjectURL(url.value);
    url.value = undefined;
  };

  watch(
    () => toValue(object),
    (newObject) => {
      release();
      if (newObject) url.value = URL.createObjectURL(newObject);
    },
    { immediate: true },
  );

  onScopeDispose(release, true);

  return readonly(url);
}
