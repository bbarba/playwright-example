import { test, expect } from '@playwright/test';

test('can successfully view a user', async ({ page }) => {
  await page.goto('/users');

  await page.locator('a:has-text("Augusta Hahn")').click();
  expect(await page.locator('h2').textContent()).toEqual('Augusta Hahn');
});