# Playwright Testing - Automation Exercise

This is a learning project built to practice Playwright end-to-end testing using the demo site: https://automationexercise.com

The goal is to apply core automation concepts such as test structuring, UI interactions, and assertions.

## Test Coverage

Critical flows to ensure the application works:

Valid login / logout
User registration
View product details
Search product
Add product to cart
Place order (various flows)
Contact form submission
Regression Tests

Edge cases and validations:

Invalid login
Register existing user
Remove product from cart
Verify cart quantity updates

## Running Tests
```bash
npm install
```

```bash
npx playwright test
```

OR

```bash
npx playwright test --trace on
```

OR

```bash
npx playwright test --grep "@smoke"
```


### Reports

Open the Playwright HTML report:

```bash
npx playwright show-report
```
