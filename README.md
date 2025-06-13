# Modern HTML & CSS Showcase

A showcase of modern HTML and CSS capabilities as of May 2025, with minimal JavaScript support. This project demonstrates the power of modern web standards without relying heavily on JavaScript frameworks.

**100% of the code & tests is written by AI.**

## Features

- **Semantic Structure**: Proper use of HTML5 semantic elements
- **Text Formatting**: Advanced text formatting capabilities
- **Interactive Elements**: CSS-only interactive components
- **Form Elements**: Rich form validation and input types
- **Advanced Features**: Templates, progress indicators, and more
- **Accessibility Features**: ARIA attributes, skip navigation, and focus management
- **CSS Animations**: Keyframes, transitions, and hover effects
- **Responsive Design**: Viewport adaptations and container queries
- **Advanced Layouts**: Flexbox, Grid, and Subgrid
- **Modern CSS Selectors**: :has(), :is(), and logical properties
- **Dark Mode**: CSS-only theme switching
- **Print Styles**: Optimized printing experience
- **Minimal JS Features**: Essential JavaScript enhancements

## Browser Testing

This project includes comprehensive browser tests using Playwright to verify that all HTML and CSS features function correctly across different browsers and devices.

### Test Coverage

The tests cover all major aspects of the showcase:

- Basic page structure and navigation
- Interactive elements
- Form validation and controls
- Accessibility features
- CSS features (animations, responsive design, dark mode, print styles)
- Minimal JavaScript features

### Running Tests

To run the browser tests:

1. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```

2. Run the tests:
   ```bash
   npm test
   ```

For more detailed information about the tests, see the [tests/README.md](tests/README.md) file.

## Development

### Local Development

To run the project locally:

```bash
npx http-server -p 8000
```

Then open http://localhost:8000 in your browser.

### Browser Compatibility

The showcase is designed to work in all modern browsers, with some features having graceful fallbacks in older browsers. The browser tests verify compatibility across:

- Chromium-based browsers (Chrome, Edge)
- Firefox
- Safari (WebKit)

## License

This project is licensed under the terms of the license included in the repository.

## Acknowledgements

- [Pico CSS](https://picocss.com/) for minimal CSS styling
- [Playwright](https://playwright.dev/) for browser testing
