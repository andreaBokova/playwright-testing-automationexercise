import { expect, test } from "@playwright/test";
import path from "path";
import { HomePage } from "../../pages/HomePage.js";
import { Header } from "../../pages/Header.js";
import { ContactPage } from "../../pages/ContactPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
});

test.describe("contact tests", () => {
  test("contact via form", async ({ page }) => {
    const homePage = new HomePage(page);
    const header = new Header(page);
    const contactPage = new ContactPage(page);

    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoContact();
    await expect(page).toHaveURL(/contact_us/);

    // Handle dialog BEFORE submission (important)
    page.once("dialog", async (dialog) => {
      console.log("Dialog message:", dialog.message());
      await dialog.accept();
    });

    // converts a relative file path into an absolute file path based on cwd
    const filePath = path.resolve("tests/fixtures/test-image.jpg");

    await contactPage.fillContactForm(
      "John Doe",
      "john@example.com",
      "Test subject",
      "Hello!",
      filePath,
    );

    await contactPage.submitButton.click();
    console.log("form submitted");

    await expect(page.locator(".btn-success")).toBeVisible();
  });
});
