// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Modern HTML & CSS Showcase - Basic Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('/index.html');

    // Ensure the page is fully loaded
    await page.waitForSelector('main#main-content');
  });

  test('should load the page with correct title and structure', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle('Modern HTML & CSS Showcase - May 2025');

    // Verify main structural elements exist
    await expect(page.locator('header h1')).toHaveText('Modern HTML & CSS Showcase');
    await expect(page.locator('nav')).toBeVisible();

    // Scroll to footer to ensure it's in view
    await page.evaluate(() => {
      document.querySelector('footer').scrollIntoView();
    });
    await expect(page.locator('footer').first()).toBeVisible();

    // Verify all main sections are present by scrolling to each one
    const sections = [
      '#semantic-structure',
      '#text-formatting',
      '#interactive-elements',
      '#forms',
      '#advanced-features',
      '#accessibility',
      '#css-animations',
      '#responsive-design',
      '#advanced-layouts',
      '#modern-selectors',
      '#dark-mode',
      '#print-styles',
      '#minimal-js-features'
    ];

    for (const selector of sections) {
      // Scroll to the section to ensure it's in view
      await page.locator(selector).scrollIntoViewIfNeeded();
      await expect(page.locator(selector)).toBeVisible();
    }
  });

  test('navigation links should scroll to correct sections', async ({ page }) => {
    // Test each navigation link
    const navLinks = await page.locator('nav a').all();

    for (const link of navLinks) {
      const href = await link.getAttribute('href');
      const targetId = href.replace('#', '');

      // Make sure the link is visible before clicking
      await link.scrollIntoViewIfNeeded();

      // Click the link
      await link.click();

      // Wait for scrolling to complete
      await page.waitForTimeout(500);

      // Verify the target section is at least partially in viewport
      const isInViewport = await page.evaluate((id) => {
        const element = document.getElementById(id);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        // Consider element in viewport if it's at least partially visible
        return (
          (rect.top >= 0 && rect.top <= window.innerHeight) ||
          (rect.bottom >= 0 && rect.bottom <= window.innerHeight) ||
          (rect.top < 0 && rect.bottom > window.innerHeight)
        );
      }, targetId);

      expect(isInViewport).toBeTruthy();
    }
  });
});
