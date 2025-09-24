import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event, {
    filterSerializedResponseHeaders: (name) => {
      // 'x-total-count' ヘッダーをクライアントに渡すことを許可する
      return name.toLowerCase() === 'x-total-count';
    }
  });

  return response;
};
