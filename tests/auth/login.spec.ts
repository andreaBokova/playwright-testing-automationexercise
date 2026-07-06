import { expect, test } from "../../fixtures/pages.fixture.js";
import { existingUser } from "../../data/users.js";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
});

test.describe("Login tests", () => {
  test("valid login", async ({ homePage, header, loginPage, page }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoLogin();
    await expect(page).toHaveURL(/login/);
    await loginPage.login(existingUser.email, existingUser.password);
    await expect(page.getByText(/Logged in as/)).toBeVisible();
  });
  test("invalid login", async ({ homePage, header, loginPage, page }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoLogin();
    await expect(page).toHaveURL(/login/);
    await loginPage.login(existingUser.email, "Incorrect123!");
    await expect(
      page.getByText(/email or password is incorrect/),
    ).toBeVisible();
  });
});
