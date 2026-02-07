/**
 * Инициализация сессии администратора при загрузке приложения.
 *
 * Пытается восстановить сессию используя refresh token из httpOnly cookie.
 * Если refresh token валиден — получает новый access token.
 * Если нет — пользователь останется неавторизованным (router guard перенаправит на /login).
 */

import { defineBoot } from '#q-app/wrappers';
import { useAuthStore } from 'stores/auth';

export default defineBoot(async () => {
  const authStore = useAuthStore();
  await authStore.tryRestoreSession();
});
