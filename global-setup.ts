import { chromium, FullConfig } from '@playwright/test';
import logger from './helpers/logger';

async function globalSetup(config: FullConfig) {
  logger.info(`Starting Playwright suite with ${config.projects.length} project(s).`);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const baseURL = config.projects[0]?.use.baseURL;
  if (typeof baseURL !== 'string') {
    throw new Error('Playwright baseURL is not configured.');
  }
  await page.goto(baseURL);
  await page.waitForLoadState('networkidle');
  await browser.close();
}

export default globalSetup;
