import fs from 'fs';
import path from 'path';
import { Page } from '@playwright/test';

export class ScreenshotUtils {
  constructor(private readonly page: Page) {}

  async capture(name: string) {
    const directory = path.resolve(__dirname, '..', 'screenshots');
    fs.mkdirSync(directory, { recursive: true });
    const filePath = path.join(directory, `${name}.png`);
    await this.page.screenshot({ path: filePath, fullPage: true });
    return filePath;
  }
}
