import { Page, Locator } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://automationexercise.com/");

    const consentBtn = this.page.locator('button:has-text("Consent")');
    if (await consentBtn.isVisible()) {
      await consentBtn.click();
    }
  }

  async addToCart() {
    await this.page.click(".add-to-cart");
  }
}
