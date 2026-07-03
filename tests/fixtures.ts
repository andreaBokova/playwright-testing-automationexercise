import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Block common ad providers
    await page.route('**/*', async route => {
      const url = route.request().url();

      const blocked = [
        'googlesyndication.com',
        'doubleclick.net',
        'googleadservices.com',
        'adservice.google.com',
        'pagead2.googlesyndication.com',
      ];

      if (blocked.some(domain => url.includes(domain))) {
        await route.abort();
      } else {
        await route.continue();
      }
    });

    await use(page);
  },
});

export { expect } from '@playwright/test';