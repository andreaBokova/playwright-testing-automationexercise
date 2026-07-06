import { test as base } from "./adblock.fixture.js";
import { HomePage } from "../pages/HomePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { CartPage } from "../pages/CartPage.js";
import { AccountCreatedPage } from "../pages/AccountCreatedPage.js";
import { CheckoutPage } from "../pages/CheckoutPage.js";
import { ContactPage } from "../pages/ContactPage.js";
import { DeleteAccountPage } from "../pages/DeleteAccountPage.js";
import { Header } from "../pages/Header.js";
import { PaymentDonePage } from "../pages/PaymentDonePage.js";
import { PaymentPage } from "../pages/PaymentPage.js";
import { ProductDetailsPage } from "../pages/ProductDetailsPage.js";
import { ProductsPage } from "../pages/ProductsPage.js";
import { SignupPage } from "../pages/SignupPage.js";

type MyFixtures = {
  accountCreatedPage: AccountCreatedPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  contactPage: ContactPage;
  deleteAccountPage: DeleteAccountPage;
  header: Header;
  homePage: HomePage;
  loginPage: LoginPage;
  paymentDonePage: PaymentDonePage;
  paymentPage: PaymentPage;
  productDetailsPage: ProductDetailsPage;
  productsPage: ProductsPage;
  signupPage: SignupPage;
};

export const test = base.extend<MyFixtures>({
  accountCreatedPage: async ({ page }, use) => {
    const accountCreatedPage = new AccountCreatedPage(page);
    await use(accountCreatedPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await use(contactPage)
  },
  deleteAccountPage: async ({ page }, use) => {
    const deleteAccountPage = new DeleteAccountPage(page);
    await use(deleteAccountPage)
  },
  header: async ({ page }, use) => {
    const header = new Header(page);
    await use(header);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  paymentDonePage: async ({ page }, use) => {
    const paymentDonePage = new PaymentDonePage(page);
    await use(paymentDonePage);
  },
  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },
  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },
});

export { expect } from "@playwright/test";
