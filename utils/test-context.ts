import { Page } from '@playwright/test';

export class TestContextManager {
  constructor(private readonly page: Page) {}

  async captureState(label: string) {
    return {
      label,
      url: this.page.url(),
      title: await this.page.title(),
    };
  }
}
