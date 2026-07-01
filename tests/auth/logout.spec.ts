import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { Header } from "../../pages/Header.js";
import { HomePage } from "../../pages/HomePage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
});

test.describe("Logout tests", () => {
  test("valid logout", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page)
    const header = new Header(page);
    const email = "test1782839977029@gmail.com";
    const password = "Test123!";

    await homePage.goto();
    expect (page).toHaveURL("https://automationexercise.com/")


    await header.gotoLogin()
    expect (page).toHaveURL(/login/)

    await loginPage.login(email, password);
    await expect(page.getByText(/Logged in as/)).toBeVisible();

    await header.logout();
    await expect(page).toHaveURL(/login/)
  });
});


