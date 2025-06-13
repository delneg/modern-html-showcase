// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Modern HTML & CSS Showcase - Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('/index.html');

    // Ensure the page is fully loaded
    await page.waitForSelector('main#main-content');
  });

  test('skip navigation link should work correctly', async ({ page }) => {
    // Scroll to the section with skip link
    await page.locator('#accessibility').scrollIntoViewIfNeeded();

    // Find the skip link
    const skipLink = page.locator('.skip-link');

    // Tab to make the skip link visible (focus it)
    await page.keyboard.press('Tab');

    // Verify the skip link is visible when focused
    await expect(skipLink).toBeVisible();

    // Click the skip link
    await skipLink.click();

    // Verify focus is on main content
    const activeElementId = await page.evaluate(() => document.activeElement.id);
    expect(activeElementId).toBe('main-content');
  });

  test('ARIA attributes should be correctly implemented', async ({ page }) => {
    // Scroll to the accessibility section
    await page.locator('#accessibility').scrollIntoViewIfNeeded();

    // Test aria-live region
    const alertRegion = page.locator('[role="alert"][aria-live="assertive"]');
    await expect(alertRegion).toBeVisible();

    // Test aria-describedby
    const inputElement = page.locator('#accessible-name');
    const describedById = await inputElement.getAttribute('aria-describedby');
    expect(describedById).toBeTruthy();

    // Verify the description element exists
    await expect(page.locator(`#${describedById}`)).toBeVisible();
  });

  test('focus styles should be visible', async ({ page }) => {
    // Scroll to the accessibility section
    await page.locator('#accessibility').scrollIntoViewIfNeeded();

    // Find the buttons in the focus management section
    const buttons = page.locator('#accessibility button');

    // Tab to focus the first button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Take a screenshot to verify focus styles are visible
    // In a real test environment, we would use visual comparison
    await page.screenshot({ path: 'focus-styles.png' });

    // Tab to the next button
    await page.keyboard.press('Tab');

    // Take another screenshot to verify focus styles on the enhanced button
    await page.screenshot({ path: 'enhanced-focus-styles.png' });
  });

  test('semantic structure should be correctly implemented', async ({ page }) => {
    // Scroll to the semantic structure section to ensure elements are in view
    await page.locator('#semantic-structure').scrollIntoViewIfNeeded();

    // Verify semantic elements are used correctly
    await expect(page.locator('article').first()).toBeVisible();
    await expect(page.locator('section').first()).toBeVisible();
    await expect(page.locator('header').first()).toBeVisible();
    await expect(page.locator('footer').first()).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();

    // Scroll to the section with aside element
    await page.locator('#semantic-structure aside').scrollIntoViewIfNeeded();
    await expect(page.locator('aside').first()).toBeVisible();

    // Scroll to the section with time element
    await page.locator('#semantic-structure time[datetime]').scrollIntoViewIfNeeded();
    await expect(page.locator('time[datetime]')).toBeVisible();

    // Scroll to the section with address element
    await page.locator('#semantic-structure address').scrollIntoViewIfNeeded();
    await expect(page.locator('address')).toBeVisible();
  });
});
