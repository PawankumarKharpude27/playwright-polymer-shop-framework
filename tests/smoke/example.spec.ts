import { test, expect } from '@playwright/test';

test('smoke: homepage loads and shows expected title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Home - SHOP/i);
});
