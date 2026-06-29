import { Page, Locator } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://automationexercise.com/");
  }

  async addToCart() {
    await this.page.click(".add-to-cart");
  }
}
