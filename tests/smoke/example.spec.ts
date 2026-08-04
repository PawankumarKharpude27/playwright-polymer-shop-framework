import { test, expect } from '@playwright/test';

// Use BASE_URL from env if available, otherwise fall back to the Polymer Shop demo site.
const BASE_URL = process.env.BASE_URL || 'https://shop.polymer-project.org';

test('smoke: homepage loads and shows expected title', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/Polymer Shop/i);
});
