import { Locator, Page } from '@playwright/test';
import { SELECTORS } from '../constants/selectors';
import { WaitUtils } from '../utils/waits';

export class HeaderComponent {
  readonly logoLink: Locator;
  readonly cartLink: Locator;
  readonly categoryLinks: Locator;

  constructor(private readonly page: Page) {
    this.logoLink = page.locator('a[aria-label="SHOP Home"]');
    this.cartLink = page.locator(SELECTORS.cartLink);
    this.categoryLinks = page.locator(SELECTORS.categoryLinks);
  }

  async verifyVisible() {
    const waits = new WaitUtils(this.page);
    await waits.waitForVisible(this.logoLink);
    await waits.waitForVisible(this.cartLink);
  }

  async openHome() {
    await this.logoLink.click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async getCategoryNames() {
    return this.categoryLinks.allTextContents();
  }

  async openCategory(categoryName: string) {
    await this.categoryLinks.filter({ hasText: categoryName }).first().click();
  }

  async openRandomCategory() {
    const categoryNames = (await this.getCategoryNames())
      .map((name) => name.trim())
      .filter(Boolean);

    if (categoryNames.length === 0) {
      throw new Error('No categories were found in the header.');
    }

    const randomCategory = categoryNames[Math.floor(Math.random() * categoryNames.length)];
    await this.openCategory(randomCategory);
    return randomCategory;
  }
}
