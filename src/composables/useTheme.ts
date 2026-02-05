import { ref, computed, watch, onMounted } from 'vue';
import { Dark } from 'quasar';

export type ThemeMode = 'dark' | 'light' | 'system';

const STORAGE_KEY = 'lila-admin-theme-mode';

const themeMode = ref<ThemeMode>('system');
const systemPrefersDark = ref(true);

function initSystemThemeDetection(): void {
  if (typeof window === 'undefined') return;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  systemPrefersDark.value = mediaQuery.matches;

  mediaQuery.addEventListener('change', (e) => {
    systemPrefersDark.value = e.matches;
  });
}

function getSavedTheme(): ThemeMode {
  if (typeof localStorage === 'undefined') return 'system';

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light' || saved === 'system') {
    return saved as ThemeMode;
  }
  return 'system';
}

function saveTheme(mode: ThemeMode): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, mode);
  }
}

function applyTheme(isDark: boolean): void {
  Dark.set(isDark);
  if (typeof document !== 'undefined') {
    document.body.classList.toggle('body--light', !isDark);
    document.body.classList.toggle('body--dark', isDark);
  }
}

export function useTheme() {
  const isDark = computed(() => {
    if (themeMode.value === 'system') {
      return systemPrefersDark.value;
    }
    return themeMode.value === 'dark';
  });

  const isLight = computed(() => !isDark.value);

  function setTheme(mode: ThemeMode): void {
    themeMode.value = mode;
    saveTheme(mode);
    applyTheme(isDark.value);
  }

  function toggleTheme(): void {
    const newMode: ThemeMode = isDark.value ? 'light' : 'dark';
    setTheme(newMode);
  }

  function initTheme(): void {
    initSystemThemeDetection();
    themeMode.value = getSavedTheme();
    applyTheme(isDark.value);
  }

  watch(isDark, (newIsDark) => {
    applyTheme(newIsDark);
  });

  onMounted(() => {
    initTheme();
  });

  return {
    themeMode,
    isDark,
    isLight,
    setTheme,
    toggleTheme,
    initTheme,
  };
}

export default useTheme;
