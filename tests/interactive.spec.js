// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Modern HTML & CSS Showcase - Interactive Elements Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('/index.html');

    // Ensure the page is fully loaded
    await page.waitForSelector('main#main-content');

    // Scroll to the interactive elements section
    await page.locator('#interactive-elements').scrollIntoViewIfNeeded();
  });

  test('details/summary elements should expand and collapse', async ({ page }) => {
    // Find the details/summary in the interactive elements section
    const summary = page.locator('#interactive-elements details summary').first();
    const details = page.locator('#interactive-elements details').first();

    // Initially closed
    await expect(details).not.toHaveAttribute('open', '');

    // Click to open
    await summary.click();
    await expect(details).toHaveAttribute('open', '');

    // Click to close
    await summary.click();
    await expect(details).not.toHaveAttribute('open', '');
  });

  test('CSS-only modal should open and close', async ({ page }) => {
    // Find the modal link and modal dialog
    const modalLink = page.locator('a[href="#modal-dialog"]');
    const modalDialog = page.locator('#modal-dialog');

    // Initially hidden
    await expect(modalDialog).not.toBeVisible();

    // Click to open
    await modalLink.click();
    await expect(modalDialog).toBeVisible();

    // Click to close
    await page.locator('#modal-dialog a[href="#modal-dialog-top"]').click();
    await expect(modalDialog).not.toBeVisible();
  });

  test('native popover should function correctly', async ({ browserName, page }) => {
    // Skip this test for browsers that don't support native popovers
    test.skip(browserName !== 'chromium', 'Native popovers are only fully supported in Chromium-based browsers');

    // Find the popover button and popover element
    const popoverButton = page.locator('button[popovertarget="myPopover"]');
    const popover = page.locator('#myPopover');

    // Initially hidden
    await expect(popover).not.toBeVisible();

    // Click to open
    await popoverButton.click();
    await expect(popover).toBeVisible();

    // Click elsewhere to close
    await page.mouse.click(10, 10);
    await expect(popover).not.toBeVisible();
  });
});
