import { Locator, Page } from '@playwright/test';
import { WaitUtils } from '../utils/waits';

export class FooterComponent {
  readonly footer: Locator;
  readonly madeByLink: Locator;

  constructor(private readonly page: Page) {
    this.footer = page.locator('footer');
    this.madeByLink = page.locator('footer a');
  }

  async verifyVisible() {
    const waits = new WaitUtils(this.page);
    await waits.waitForVisible(this.footer);
    await waits.waitForVisible(this.madeByLink);
  }
}
