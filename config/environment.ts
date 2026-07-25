import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export interface EnvironmentConfig {
  baseUrl: string;
  browser: string;
  headless: boolean;
}

export const environment: EnvironmentConfig = {
  baseUrl: process.env.BASE_URL ?? 'https://shop.polymer-project.org',
  browser: process.env.BROWSER ?? 'chromium',
  headless: process.env.HEADLESS?.toLowerCase() !== 'false',
};
