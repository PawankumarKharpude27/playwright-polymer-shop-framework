import { chromium, FullConfig } from '@playwright/test';
import logger from './helpers/logger';

async function globalSetup(config: FullConfig) {
  logger.info(`Starting Playwright suite with ${config.projects.length} project(s).`);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://shop.polymer-project.org');
  await page.waitForLoadState('networkidle');
  await browser.close();
}

export default globalSetup;
