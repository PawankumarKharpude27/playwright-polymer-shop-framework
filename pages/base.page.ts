import { Page } from '@playwright/test';
import { environment } from '../config/environment';
import { WaitUtils } from '../utils/waits';
import { CustomAssertions } from '../utils/assertions';
import { ScreenshotUtils } from '../utils/screenshot';

export abstract class BasePage {
  readonly waits: WaitUtils;
  readonly assertions: CustomAssertions;
  readonly screenshots: ScreenshotUtils;

  constructor(protected readonly page: Page) {
    this.waits = new WaitUtils(page);
    this.assertions = new CustomAssertions(page);
    this.screenshots = new ScreenshotUtils(page);
  }

  async open(path: string = '/') {
    await this.page.setViewportSize({ width: 1440, height: 900 });
    await this.page.goto(`${environment.baseUrl}${path}`);
    await this.waits.waitForStableDom();
  }

  async verifyLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.waits.pauseForObservation();
  }

  async captureScreenshot(name: string) {
    return this.screenshots.capture(name);
  }
}
