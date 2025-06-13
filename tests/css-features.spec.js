// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Modern HTML & CSS Showcase - CSS Features Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('/index.html');

    // Ensure the page is fully loaded
    await page.waitForSelector('main#main-content');
  });

  test('dark mode toggle should work correctly', async ({ page }) => {
    // Scroll to the dark mode section
    await page.locator('#dark-mode').scrollIntoViewIfNeeded();

    // Find the theme demo container and theme switch
    const themeDemo = page.locator('.theme-demo');
    const themeSwitch = page.locator('#theme-switch');

    // Make sure we start in light mode by checking the background color
    const currentBgColor = await themeDemo.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue('--bg-color').trim();
    });

    // If the background color is dark, click the label to switch to light mode
    const isDarkMode = await page.evaluate((color) => {
      // Create a temporary element to get the RGB values
      const tempEl = document.createElement('div');
      tempEl.style.color = color;
      document.body.appendChild(tempEl);
      const rgb = window.getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);

      // Extract RGB values
      const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const [r, g, b] = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        // Check if color is dark (simple formula)
        return (r + g + b) / 3 < 128;
      }
      return false;
    }, currentBgColor);

    if (isDarkMode) {
      await page.locator('label[for="theme-switch"]').click();
      // Wait for the transition to complete
      await page.waitForTimeout(300);
    }

    // Get initial background color
    const initialBgColor = await themeDemo.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue('--bg-color').trim();
    });

    // Toggle dark mode by clicking the label instead of the checkbox
    await page.locator('label[for="theme-switch"]').click();

    // Wait for the transition to complete
    await page.waitForTimeout(300);

    // Get updated background color
    const updatedBgColor = await themeDemo.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue('--bg-color').trim();
    });

    // Verify theme changed
    expect(initialBgColor).not.toBe(updatedBgColor);

    // Check if the color is dark (could be #222222 or similar)
    const isDarkColor = await page.evaluate(() => {
      const el = document.querySelector('.theme-demo');
      const bgColor = window.getComputedStyle(el).getPropertyValue('--bg-color').trim();
      // Convert to RGB and check if it's dark
      const tempEl = document.createElement('div');
      tempEl.style.color = bgColor;
      document.body.appendChild(tempEl);
      const rgb = window.getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);

      // Extract RGB values
      const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const [r, g, b] = [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        // Check if color is dark (simple formula)
        return (r + g + b) / 3 < 128;
      }
      return false;
    });

    expect(isDarkColor).toBe(true);

    // Toggle back to light mode by clicking the label again
    await page.locator('label[for="theme-switch"]').click();

    // Wait for the transition to complete
    await page.waitForTimeout(300);

    // Get final background color
    const finalBgColor = await themeDemo.evaluate(el => {
      return window.getComputedStyle(el).getPropertyValue('--bg-color').trim();
    });

    // Verify theme changed back
    expect(finalBgColor).toBe(initialBgColor);
  });

  test('CSS animations should be applied correctly', async ({ page }) => {
    // Scroll to the CSS animations section
    await page.locator('#css-animations').scrollIntoViewIfNeeded();

    // Find the expand box
    const expandBox = page.locator('.expand-box');

    // Get initial height
    const initialHeight = await expandBox.evaluate(el => {
      return window.getComputedStyle(el).height;
    });

    // Hover over the box
    await expandBox.hover();

    // Wait for animation to complete
    await page.waitForTimeout(600);

    // Get expanded height
    const expandedHeight = await expandBox.evaluate(el => {
      return window.getComputedStyle(el).height;
    });

    // Verify height changed
    expect(initialHeight).not.toBe(expandedHeight);
    expect(parseInt(expandedHeight)).toBeGreaterThan(parseInt(initialHeight));

    // Test keyframe animations are applied
    const animatedElement = page.locator('#css-animations div[style*="animation: pulse"]');
    const hasAnimation = await animatedElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.animationName !== 'none';
    });

    expect(hasAnimation).toBe(true);
  });

  test('responsive design should adapt to different viewport sizes', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667 },  // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1440, height: 900 }  // Desktop
    ];

    for (const viewport of viewports) {
      // Set viewport size
      await page.setViewportSize(viewport);

      // Scroll to the responsive design section
      await page.locator('#responsive-design').scrollIntoViewIfNeeded();

      // Take screenshot for visual comparison
      await page.screenshot({
        path: `responsive-${viewport.width}x${viewport.height}.png`,
        clip: {
          x: 0,
          y: await page.locator('#responsive-design').evaluate(el => {
            const rect = el.getBoundingClientRect();
            return rect.top;
          }),
          width: viewport.width,
          height: 500
        }
      });

      // Test responsive typography using clamp()
      const responsiveHeading = page.locator('#responsive-design h4[style*="clamp"]');
      const fontSize = await responsiveHeading.evaluate(el => {
        return window.getComputedStyle(el).fontSize;
      });

      // Verify font size is calculated (not the literal clamp value)
      expect(fontSize).not.toContain('clamp');
      expect(parseInt(fontSize)).toBeGreaterThan(0);
    }
  });

  test('print styles should be applied correctly', async ({ page }) => {
    // Scroll to the print styles section
    await page.locator('#print-styles').scrollIntoViewIfNeeded();

    // Emulate print media
    await page.emulateMedia({ media: 'print' });

    // Check if print-specific styles are applied
    const isPrintStyleApplied = await page.locator('.print-sidebar').evaluate(el => {
      return window.getComputedStyle(el).display === 'none';
    });

    expect(isPrintStyleApplied).toBe(true);

    // Take a screenshot in print mode for visual verification
    await page.screenshot({ path: 'print-mode.png' });

    // Reset media
    await page.emulateMedia({ media: 'screen' });
  });
});
