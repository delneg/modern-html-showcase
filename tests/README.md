# Browser Tests for Modern HTML & CSS Showcase

This directory contains browser tests for the Modern HTML & CSS Showcase page using Playwright. These tests verify that all HTML and CSS features function correctly across different browsers and devices without relying on JavaScript.

## Test Structure

The tests are organized into several files, each focusing on a specific aspect of the page:

1. **basic.spec.js**: Tests for basic page structure and navigation
   - Page load and title verification
   - Main structural elements presence
   - Navigation link functionality

2. **interactive.spec.js**: Tests for interactive elements
   - Details/summary elements expand/collapse
   - CSS-only modal dialog
   - Native popovers (Chromium only)

3. **forms.spec.js**: Tests for form elements
   - Form validation (required fields, patterns)
   - Form controls (range, color, select, checkbox, radio)
   - Password strength meter

4. **accessibility.spec.js**: Tests for accessibility features
   - Skip navigation link
   - ARIA attributes
   - Focus styles
   - Semantic structure

5. **css-features.spec.js**: Tests for CSS features
   - Dark mode toggle
   - CSS animations
   - Responsive design
   - Print styles

6. **minimal-js.spec.js**: Tests for minimal JavaScript features
   - Clipboard API
   - Lazy loading images
   - Scroll animations
   - CSS variables manipulation

## Running the Tests

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

The project uses Playwright for browser testing. All dependencies are listed in package.json and can be installed with:

```bash
npm install
```

After installing dependencies, you need to install the Playwright browsers:

```bash
npx playwright install
```

### Running Tests

To run all tests in headless mode:

```bash
npm test
```

To run tests with UI mode for debugging:

```bash
npm run test:ui
```

To view the HTML report after running tests:

```bash
npm run test:report
```

To run a specific test file:

```bash
npx playwright test tests/basic.spec.js
```

To run tests in a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Configuration

The tests are configured in `playwright.config.js` in the root directory. Key configuration options:

- Tests run on three browsers: Chromium, Firefox, and WebKit
- A local HTTP server is started on port 8000 to serve the HTML files
- Screenshots are saved for visual verification
- Tests run in parallel for faster execution

## Visual Testing

Some tests take screenshots for visual verification. These screenshots are saved in the project root directory and can be used for manual visual comparison or integrated with a visual testing tool.

## Accessibility Testing

The accessibility tests verify basic accessibility features, but for a comprehensive accessibility audit, consider using a dedicated tool like axe-core or Pa11y.

## Continuous Integration

These tests can be integrated into a CI/CD pipeline. The configuration is set up to work well in CI environments, with options for retries and parallel execution.
