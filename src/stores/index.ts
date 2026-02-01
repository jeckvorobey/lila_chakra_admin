import { defineStore } from '#q-app/wrappers';
import { createPinia } from 'pinia';

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface PiniaCustomProperties {
    // Add your custom properties here
  }
}

export default defineStore((/* { ssrContext } */) => {
  const pinia = createPinia();
  return pinia;
});
