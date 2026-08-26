import { expect, Locator, Page } from '@playwright/test';

export class CustomAssertions {
  constructor(private readonly page: Page) {}

  async expectUrlToContain(fragment: string) {
    await expect(this.page).toHaveURL(new RegExp(fragment));
  }

  async expectLocatorVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectText(locator: Locator, text: string | RegExp) {
    await expect(locator).toContainText(text);
  }

  async expectCountGreaterThan(locator: Locator, minimum: number) {
    await expect.poll(() => locator.count()).toBeGreaterThan(minimum);
  }
}
