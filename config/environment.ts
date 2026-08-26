import path from 'path';
import dotenv from 'dotenv';

const envName = process.env.ENV_NAME ?? 'dev';
const envFilePath = path.resolve(__dirname, '..', 'env', `.env.${envName}`);

dotenv.config({ path: envFilePath });

export interface EnvironmentConfig {
  baseUrl: string;
}

export const environment: EnvironmentConfig = {
  baseUrl: process.env.BASE_URL ?? 'https://shop.polymer-project.org',
};
