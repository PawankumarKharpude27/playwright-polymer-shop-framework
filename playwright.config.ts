import path from 'path';
import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

const envName = process.env.ENV_NAME ?? 'dev';
const envFile = path.resolve(__dirname, 'env', `.env.${envName}`);

dotenv.config({ path: envFile });

const baseURL = process.env.BASE_URL ?? 'https://shop.polymer-project.org';
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: !isCI,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 3 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }],
  ],
  outputDir: 'reports/test-results',
  use: {
    baseURL,
    headless: true,
    viewport: { width: 1440, height: 1200 },
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 5'] },
    },
  ],
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
});
