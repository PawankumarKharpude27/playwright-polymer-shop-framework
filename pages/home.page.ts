import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { ROUTES } from '../constants/routes';
import { SELECTORS } from '../constants/selectors';

export class HomePage extends BasePage {
  readonly heroLinks: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.heroLinks = page.locator('main a');
    this.title = page.locator('h1, h2');
  }

  async open() {
    await super.open(ROUTES.home);
  }

  async verifyLoaded() {
    await super.verifyLoaded();
    await this.page.locator(SELECTORS.appShell).waitFor({ state: 'visible' });
  }

  async getCategoryLinks() {
    return this.heroLinks.allTextContents();
  }
}
