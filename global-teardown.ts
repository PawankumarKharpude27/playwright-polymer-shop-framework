import logger from './helpers/logger';

async function globalTeardown() {
  logger.info('Playwright suite completed.');
}

export default globalTeardown;
