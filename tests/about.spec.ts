import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('should load the About page', async ({ page }) => {
    await page.goto('/about');
    
    // Wait for the page to load
    await expect(page).toHaveTitle(/Travel|TravelSite/i);
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: '关于我们' })).toBeVisible();
  });

  test('should display company story section', async ({ page }) => {
    await page.goto('/about');
    
    // Check for "Our Story" section
    await expect(page.getByRole('heading', { name: '我们的故事' })).toBeVisible();
    
    // Check for content text
    await expect(page.getByText(/TravelSite 成立于 2024 年/)).toBeVisible();
  });

  test('should display three value cards', async ({ page }) => {
    await page.goto('/about');
    
    // Check for value cards
    await expect(page.getByRole('heading', { name: '全球精选' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '贴心服务' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '品质保证' })).toBeVisible();
  });

  test('should display team section', async ({ page }) => {
    await page.goto('/about');
    
    // Check for team section heading
    await expect(page.getByRole('heading', { name: '我们的团队' })).toBeVisible();
    
    // Check for team members
    await expect(page.getByRole('heading', { name: '李明' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '王芳' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '张伟' })).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    await page.goto('/about');
    
    // Check for contact section
    await expect(page.getByRole('heading', { name: '联系我们' })).toBeVisible();
    
    // Check for contact details
    await expect(page.getByText('contact@travelsite.com')).toBeVisible();
    await expect(page.getByText('400-123-4567')).toBeVisible();
    await expect(page.getByText(/北京市朝阳区旅游大厦/)).toBeVisible();
  });

  test('should navigate to About page from navbar', async ({ page }) => {
    await page.goto('/');
    
    // Click on About link in navbar
    await page.getByRole('link', { name: '关于我们' }).click();
    
    // Check if we're on the About page
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: '关于我们' })).toBeVisible();
  });

  test('should navigate back to home from About page', async ({ page }) => {
    await page.goto('/about');
    
    // Click on home link in navbar
    await page.getByRole('link', { name: '首页' }).click();
    
    // Check if we're back on the home page
    await expect(page).toHaveURL('/');
  });
});
