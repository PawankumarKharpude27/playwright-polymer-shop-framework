import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';
import products from '../../data/products.json';

test.describe('HTTP contract checks', () => {
  test('returns a successful HTML response for the home page', async () => {
    const apiClient = new ApiClient();
    const response = await apiClient.get<string>('/');

    expect(response.status).toBe(200);
    expect(response.body).toContain('<html');
    expect(response.headers['content-type']).toContain('text/html');
  });

  test('returns the configured product detail page', async () => {
    const apiClient = new ApiClient();
    const response = await apiClient.get<string>(products.categories[0].item.route);

    expect(response.status).toBe(200);
    expect(response.body).toContain('<shop-app');
    expect(response.headers['content-type']).toContain('text/html');
  });
});
