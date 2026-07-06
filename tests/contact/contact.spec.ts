import { expect, test } from "../../fixtures/pages.fixture.js";

import path from "path";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
});

test.describe("contact tests", () => {
  test("contact via form @smoke", async ({
    page,
    homePage,
    header,
    contactPage,
  }) => {
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
    const filePath = path.resolve("test-assets/test-image.jpg");
    await contactPage.fillContactForm(
      "John Doe",
      "john@example.com",
      "Test subject",
      "Hello!",
      filePath,
    );

    console.log("filled in data");

    await contactPage.submitButton.scrollIntoViewIfNeeded();
    await contactPage.submitButton.click();

    await expect(page.locator(".btn-success")).toBeVisible();
  });
});
