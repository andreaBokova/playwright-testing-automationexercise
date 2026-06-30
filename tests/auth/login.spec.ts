import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { Header } from "../../pages/Header.js";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
});

test.describe("Login tests", () => {
  test("valid login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const email = "test1782839977029@gmail.com";
    const password = "Test123!";
    const header = new Header(page);

    await page.goto("https://automationexercise.com/");
    await header.gotoLogin();
    await expect(page).toHaveURL(/login/);
    await loginPage.login(email, password);
    await expect(page.getByText(/Logged in as/)).toBeVisible();
  });
});
