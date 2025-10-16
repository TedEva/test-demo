import { test, expect } from '@playwright/test';

test.describe('Detail Page', () => {
  test('should navigate to detail page when clicking a destination card', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Wait for destination cards to load
    await page.waitForSelector('.bg-white.rounded-lg.shadow-md');
    
    // Get the first destination card
    const firstCard = page.locator('.bg-white.rounded-lg.shadow-md').first();
    
    // Get the destination name from the card
    const destinationName = await firstCard.locator('h3').textContent();
    
    // Click the card (not the button)
    await firstCard.click();
    
    // Wait for navigation to detail page
    await page.waitForURL(/\/detail\/\d+/);
    
    // Verify we're on the detail page
    expect(page.url()).toMatch(/\/detail\/\d+/);
    
    // Verify the page displays the correct destination name
    const detailPageTitle = await page.locator('h1').first().textContent();
    expect(detailPageTitle).toBe(destinationName);
  });

  test('should display all detail page sections', async ({ page }) => {
    // Navigate directly to a detail page
    await page.goto('/detail/1');
    
    // Check for hero section with destination name
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for back button
    await expect(page.locator('text=← 返回首页')).toBeVisible();
    
    // Check for rating section
    await expect(page.locator('text=/.*评分/')).toBeVisible();
    
    // Check for price display
    await expect(page.locator('text=/¥\\d+/')).toBeVisible();
    
    // Check for description section
    await expect(page.locator('text=目的地介绍')).toBeVisible();
    
    // Check for features section
    await expect(page.locator('text=特色亮点')).toBeVisible();
    
    // Check for booking button
    await expect(page.locator('text=立即预定')).toBeVisible();
  });

  test('should navigate to booking page when clicking "立即预定" button', async ({ page }) => {
    // Navigate to a detail page
    await page.goto('/detail/1');
    
    // Click the booking button
    await page.locator('button:has-text("立即预定")').click();
    
    // Wait for navigation to booking page
    await page.waitForURL(/\/booking\?destination=1/);
    
    // Verify we're on the booking page
    expect(page.url()).toContain('/booking?destination=1');
    
    // Verify booking page content
    await expect(page.locator('h2:has-text("预定信息")')).toBeVisible();
  });

  test('should navigate back to home when clicking back button', async ({ page }) => {
    // Navigate to a detail page
    await page.goto('/detail/1');
    
    // Click the back button
    await page.locator('text=← 返回首页').click();
    
    // Wait for navigation to home page
    await page.waitForURL('/');
    
    // Verify we're on the home page
    expect(page.url()).toBe('http://localhost:5173/');
    
    // Verify home page content
    await expect(page.locator('h1:has-text("发现世界之美")')).toBeVisible();
  });

  test('should show not found message for invalid destination id', async ({ page }) => {
    // Navigate to a non-existent destination
    await page.goto('/detail/999');
    
    // Verify the not found message is displayed
    await expect(page.locator('h2:has-text("未找到目的地")')).toBeVisible();
    
    // Verify back button is available
    await expect(page.locator('button:has-text("返回首页")')).toBeVisible();
  });

  test('should not navigate to detail page when clicking "立即预定" button on card', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Wait for destination cards to load
    await page.waitForSelector('.bg-white.rounded-lg.shadow-md');
    
    // Get the first card's booking button
    const bookingButton = page.locator('.bg-white.rounded-lg.shadow-md').first().locator('button:has-text("立即预定")');
    
    // Click the booking button
    await bookingButton.click();
    
    // Wait for navigation
    await page.waitForURL(/\/booking\?destination=\d+/);
    
    // Verify we went to booking page, not detail page
    expect(page.url()).toMatch(/\/booking\?destination=\d+/);
    expect(page.url()).not.toContain('/detail/');
  });
});
