import { Locator, Page, expect } from '@playwright/test';

export class WaitUtils {
  constructor(private readonly page: Page) {}

  async waitForStableDom() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async pauseForObservation(durationMs: number = 2000) {
    await this.page.waitForTimeout(durationMs);
  }

  async waitForVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 15_000 });
  }

  async waitForHidden(locator: Locator) {
    await locator.waitFor({ state: 'hidden', timeout: 15_000 });
  }

  async expectText(locator: Locator, expected: string | RegExp) {
    await expect(locator).toContainText(expected);
  }
}
