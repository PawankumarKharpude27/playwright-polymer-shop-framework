import { test, expect } from '@playwright/test';
import { ApiClient } from '../../helpers/api-client';

test.describe('API helper scaffold', () => {
  test('should fetch the Polymer Shop homepage successfully', async () => {
    const apiClient = new ApiClient();
    const response = await apiClient.get<string>('/');

    expect(response.status).toBe(200);
    expect(response.body).toContain('<html');
    expect(response.headers['content-type']).toContain('text/html');
  });
});
