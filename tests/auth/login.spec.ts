import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { Header } from "../../pages/Header.js";
import { HomePage } from "../../pages/HomePage.js";

let loginPage: LoginPage;
let header: Header;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }

  loginPage = new LoginPage(page);
  header = new Header(page);
  homePage = new HomePage(page);
});

test.describe("Login tests", () => {
  test("valid login", async ({ page }) => {
    const email = "test1782839977029@gmail.com";
    const password = "Test123!";

    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoLogin();
    await expect(page).toHaveURL(/login/);
    await loginPage.login(email, password);
    await expect(page.getByText(/Logged in as/)).toBeVisible();
  });
  test("invalid login", async ({ page }) => {
    const email = "test1782839977029@gmail.com";
    const password = "Incorrect123!";

    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoLogin();
    await expect(page).toHaveURL(/login/);
    await loginPage.login(email, password);
    await expect(
      page.getByText(/email or password is incorrect/),
    ).toBeVisible();
  });
});
