import { Page, Locator } from "@playwright/test";

export class Header {
  readonly cartLink: Locator;
  readonly logoutLink: Locator;
  constructor(private page: Page) {
    this.cartLink = this.page.locator("a[href='/view_cart']");
    this.logoutLink = this.page.locator("a[href='/logout']")
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
