import { Page } from '@playwright/test';
import { WaitUtils } from '../utils/waits';
import { CustomAssertions } from '../utils/assertions';
import { ScreenshotUtils } from '../utils/screenshot';

export abstract class BasePage {
  readonly waits: WaitUtils;
  readonly assertions: CustomAssertions;
  readonly screenshots: ScreenshotUtils;

  constructor(public readonly page: Page) {
    this.waits = new WaitUtils(page);
    this.assertions = new CustomAssertions(page);
    this.screenshots = new ScreenshotUtils(page);
  }

  async open(path: string = '/') {
    await this.page.goto(path);
    await this.waits.waitForStableDom();
  }

  async verifyLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async captureScreenshot(name: string) {
    return this.screenshots.capture(name);
  }
}
