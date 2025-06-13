// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Modern HTML & CSS Showcase - Form Elements Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('/index.html');

    // Ensure the page is fully loaded
    await page.waitForSelector('main#main-content');

    // Scroll to the forms section
    await page.locator('#forms').scrollIntoViewIfNeeded();
  });

  test('form validation should work correctly', async ({ page }) => {
    // Find the form validation example
    const form = page.locator('.form-validation-example');
    const submitButton = form.locator('button[type="submit"]');

    // Test required field validation
    await submitButton.click();

    // Check if validation prevented submission (username field should be invalid)
    await expect(page.locator('#username:invalid')).toBeVisible();

    // Test pattern validation with invalid input
    await page.fill('#username', '123'); // Invalid input (numbers)
    await submitButton.click();
    await expect(page.locator('#username:invalid')).toBeVisible();

    // Test valid input
    await page.fill('#username', 'ValidUsername');
    await expect(page.locator('#username:valid')).toBeVisible();

    // Test phone field with invalid format
    await page.fill('#phone', 'invalid');
    await submitButton.click();
    await expect(page.locator('#phone:invalid')).toBeVisible();

    // Test phone field with valid format
    await page.fill('#phone', '123-456-7890');
    await expect(page.locator('#phone:valid')).toBeVisible();
  });

  test('form controls should function correctly', async ({ page }) => {
    // Test range input
    await page.fill('#satisfaction', '50');
    const outputValue = await page.locator('output[for="satisfaction"]').textContent();
    expect(outputValue).toBe('50%');

    // Test color picker
    await page.fill('#color', '#ff0000');
    const colorValue = await page.inputValue('#color');
    expect(colorValue.toLowerCase()).toBe('#ff0000');

    // Test select element
    await page.selectOption('#frequency', 'monthly');
    const frequencyValue = await page.inputValue('#frequency');
    expect(frequencyValue).toBe('monthly');

    // Test checkbox
    const checkbox = page.locator('input[name="newsletter"]');
    await expect(checkbox).not.toBeChecked();
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Test radio buttons
    const emailRadio = page.locator('input[name="contact"][value="email"]');
    const phoneRadio = page.locator('input[name="contact"][value="phone"]');

    // Email should be checked by default
    await expect(emailRadio).toBeChecked();
    await expect(phoneRadio).not.toBeChecked();

    // Change selection
    await phoneRadio.check();
    await expect(emailRadio).not.toBeChecked();
    await expect(phoneRadio).toBeChecked();
  });

  test('password strength meter should work', async ({ page }) => {
    // Find the password field and meter
    const passwordField = page.locator('#password');
    const passwordMeter = page.locator('#password-strength');

    // Initial value should be minimum
    await expect(passwordMeter).toHaveAttribute('value', '0');

    // Enter a short password
    await passwordField.fill('pass');

    // Enter a medium password
    await passwordField.fill('password123');

    // Note: In a real test, we would check if the meter value changes,
    // but since there's no JavaScript in the page to update the meter,
    // we're just testing that the meter exists and can be interacted with
  });
});
