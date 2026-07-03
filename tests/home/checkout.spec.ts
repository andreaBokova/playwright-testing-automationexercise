// Test Case 14: Place Order: Register while Checkout
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Add products to cart
// 5. Click 'Cart' button
// 6. Verify that cart page is displayed
// 7. Click Proceed To Checkout
// 8. Click 'Register / Login' button
// 9. Fill all details in Signup and create account
// 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
// 11. Verify ' Logged in as username' at top
// 12.Click 'Cart' button
// 13. Click 'Proceed To Checkout' button
// 14. Verify Address Details and Review Your Order
// 15. Enter description in comment text area and click 'Place Order'
// 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
// 17. Click 'Pay and Confirm Order' button
// 18. Verify success message 'Your order has been placed successfully!'
// 19. Click 'Delete Account' button
// 20. Verify 'ACCOUNT DELETED!' and click 'Continue' button

import { expect, test } from "../fixtures.js";
import { HomePage } from "../../pages/HomePage.js";
import { Header } from "../../pages/Header.js";
import { ProductsPage } from "../../pages/ProductsPage.js";
import { ProductDetailsPage } from "../../pages/ProductDetailsPage.js";

let homePage: HomePage;
let header: Header;
let productsPage: ProductsPage;
let productDetailsPage: ProductDetailsPage;

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }

  homePage = new HomePage(page);
  header = new Header(page);
  productsPage = new ProductsPage(page);
  productDetailsPage = new ProductDetailsPage(page);
});

test.describe("checkout tests", () => {
  test("place order - register while checkout", async ({ page }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoProducts();

    await expect(productsPage.productsList).toBeVisible();
    
  });
 
});

