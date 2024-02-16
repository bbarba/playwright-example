import { test } from '@playwright/test';

test('can successfully view notifications', async ({ page }) => {
  await page.goto('/notifications');

  await page.locator('button:has-text("Refresh Notifications")').click();
  // If the db is configured successfully, we can add specific assertions here on new notifications.
  // This is to check for a new notification regardless.
  await page.waitForSelector('div.notification.new');
});