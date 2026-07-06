import { expect, test } from "../../fixtures/pages.fixture.js";
import { createUser, existingUser } from "../../data/users.js";

let newUser = createUser();
test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
});

test.describe("checkout tests", () => {
  test("place order - register while checkout @smoke", async ({
    homePage,
    header,
    productsPage,
    cartPage,
    loginPage,
    signupPage,
    accountCreatedPage,
    paymentPage,
    deleteAccountPage,
    checkoutPage,
    page,
  }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoProducts();
    await expect(productsPage.productsList).toBeVisible();

    await productsPage.addProductToCart("Men Tshirt");

    await productsPage.viewCart();
    await expect(cartPage.cartInfoDiv).toBeVisible();

    await cartPage.proceedToCheckout();

    await cartPage.registerOrLoginButton.click();

    await expect(loginPage.signupForm).toBeVisible();
    await loginPage.signup(newUser.username, newUser.email);

    await expect(signupPage.signupForm).toBeVisible();

    await signupPage.fillAccountInfo(newUser);

    await expect(accountCreatedPage.successHeading).toBeVisible();

    await header.openCart();

    await cartPage.proceedToCheckout();

    await checkoutPage.placeOrder();

    await paymentPage.enterPaymentDetails();

    await paymentPage.payAndConfirmOrderButton.click();

    await expect(paymentPage.orderPlacedHeading).toBeVisible();

    await paymentPage.continueButton.click();

    await header.deleteAccount();

    await expect(page.getByText("ACCOUNT DELETED!")).toBeVisible();

    await expect(deleteAccountPage.accountDeletedHeading).toBeVisible();
  });
  test("place order - register before checkout @smoke", async ({
    homePage,
    header,
    productsPage,
    cartPage,
    loginPage,
    signupPage,
    accountCreatedPage,
    paymentPage,
    deleteAccountPage,
    checkoutPage,
    page,
  }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    header.gotoLogin();

    await expect(loginPage.signupForm).toBeVisible();
    await loginPage.signup(newUser.username, newUser.email);

    await expect(signupPage.signupForm).toBeVisible();

    await signupPage.fillAccountInfo(newUser);

    await expect(accountCreatedPage.successHeading).toBeVisible();

    await accountCreatedPage.continueToHomepage();

    await expect(page.getByText("Logged in as")).toBeVisible();

    await header.gotoProducts();
    await expect(productsPage.productsList).toBeVisible();

    await productsPage.addProductToCart("Men Tshirt");

    await productsPage.viewCart();
    await expect(cartPage.cartInfoDiv).toBeVisible();

    await cartPage.proceedToCheckout();

    await checkoutPage.placeOrder();

    await paymentPage.enterPaymentDetails();

    await paymentPage.payAndConfirmOrderButton.click();

    await expect(paymentPage.orderPlacedHeading).toBeVisible();

    await paymentPage.continueButton.click();

    await header.deleteAccount();

    await expect(page.getByText("ACCOUNT DELETED!")).toBeVisible();

    await expect(deleteAccountPage.accountDeletedHeading).toBeVisible();
  });

  test("place order - login before checkout @smoke", async ({
    homePage,
    header,
    productsPage,
    cartPage,
    loginPage,
    paymentPage,
    checkoutPage,
    page,
  }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    header.gotoLogin();

    await expect(loginPage.signupForm).toBeVisible();
    await loginPage.login(existingUser.email, existingUser.password);

    await header.gotoProducts();

    await expect(page.getByText("Logged in as")).toBeVisible();

    await expect(productsPage.productsList).toBeVisible();

    await productsPage.addProductToCart("Men Tshirt");

    await productsPage.viewCart();
    await expect(cartPage.cartInfoDiv).toBeVisible();

    await cartPage.proceedToCheckout();

    await checkoutPage.placeOrder();

    await paymentPage.enterPaymentDetails();

    await paymentPage.payAndConfirmOrderButton.click();

    await expect(paymentPage.orderPlacedHeading).toBeVisible();

    await paymentPage.continueButton.click();
  });
});
