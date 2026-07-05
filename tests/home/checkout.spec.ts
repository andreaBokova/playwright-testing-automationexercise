import { expect, test } from "../fixtures.js";
import { HomePage } from "../../pages/HomePage.js";
import { Header } from "../../pages/Header.js";
import { ProductsPage } from "../../pages/ProductsPage.js";
import { ProductDetailsPage } from "../../pages/ProductDetailsPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { LoginPage } from "../../pages/LoginPage.js";
import { createUser, existingUser } from "../data/users.js";
import { SignupPage } from "../../pages/SignupPage.js";
import { AccountCreatedPage } from "../../pages/AccountCreatedPage.js";
import { CheckoutPage } from "../../pages/CheckoutPage.js";
import { PaymentPage } from "../../pages/PaymentPage.js";
import { DeleteAccountPage } from "../../pages/DeleteAccountPage.js";

let homePage: HomePage;
let header: Header;
let productsPage: ProductsPage;
let cartPage: CartPage;
let loginPage: LoginPage;
let signupPage: SignupPage;
let accountCreatedPage: AccountCreatedPage;
let checkoutPage: CheckoutPage;
let paymentPage: PaymentPage;
let deleteAccountPage: DeleteAccountPage;
let newUser = createUser();
test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }

  homePage = new HomePage(page);
  header = new Header(page);
  productsPage = new ProductsPage(page);
  cartPage = new CartPage(page);
  loginPage = new LoginPage(page);
  signupPage = new SignupPage(page);
  accountCreatedPage = new AccountCreatedPage(page);
  paymentPage = new PaymentPage(page);
  deleteAccountPage = new DeleteAccountPage(page);
  checkoutPage = new CheckoutPage(page);
});

test.describe("checkout tests", () => {
  test("place order - register while checkout", async ({ page }) => {
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
  test("place order - register before checkout", async ({ page }) => {
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

  test("place order - login before checkout", async ({ page }) => {
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
