# E2E Tests

This directory contains end-to-end tests using Playwright.

## Running Tests

### Prerequisites

Install Playwright browsers:

```bash
npx playwright install chromium
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in UI mode (interactive)
npm run test:ui
```

## Test Coverage

### Detail Page Tests (`detail-page.spec.ts`)

1. **Navigation from home to detail page**: Verifies clicking a destination card navigates to the detail page
2. **Detail page sections**: Verifies all sections are displayed (hero, description, images, features, booking CTA)
3. **Booking navigation**: Verifies clicking "立即预定" button navigates to booking page
4. **Back navigation**: Verifies back button returns to home page
5. **Not found handling**: Verifies invalid destination IDs show error message
6. **Direct booking from card**: Verifies clicking "立即预定" on a card goes directly to booking page (not detail page)

## Notes

- Tests automatically start the dev server before running
- If the dev server is already running, it will be reused
- In CI environments, a fresh server is always started
