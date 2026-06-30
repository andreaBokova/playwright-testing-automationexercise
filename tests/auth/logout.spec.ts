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

test.describe("Logout tests", () => {
  test("valid logout", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const header = new Header(page);
    const email = "test1782828661000@gmail.com";
    const password = "Test123!";

    await loginPage.goto();
    await loginPage.login(email, password);
    await header.logout();
  });
});
