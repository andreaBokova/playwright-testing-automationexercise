# Playwright Testing - Automation Exercise

This is a learning project built to practice Playwright automation testing using the demo site: https://automationexercise.com

The goal is to apply core automation concepts such as:
- UI test automation
- API testing
- Test structuring
- Request/response validation
- Assertions
- Test organization and tagging

## Test Coverage

### UI Tests

Critical flows to ensure the application works:

- Valid login / logout
- User registration
- View product details
- Search product
- Add product to cart
- Place order (various flows)
  - Login before checkout
  - Register before checkout
  - Register during checkout
- Contact form submission

Regression and edge cases:

- Invalid login
- Register existing user
- Remove product from cart
- Verify cart quantity updates


### API Tests

API automation coverage using Playwright's APIRequestContext.

Covered scenarios include:

#### Products API
- Get all products list
- Search product with valid parameter
- Search product without required parameter
- Validate unsupported HTTP methods

#### Brands API
- Get all brands list
- Validate unsupported HTTP methods

#### User Account API
- Create/register user account
- Verify user account details
- Update user account
- Delete user account
- User account lifecycle flow:
  - Create user
  - Retrieve user details
  - Update user
  - Verify changes
  - Delete user
  - Verify deletion

API tests validate:
- HTTP response status codes
- API response codes
- Response messages
- Response structure/schema
- CRUD operations

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
