import { Page, Locator } from "@playwright/test";

export class Header {
  readonly cartLink: Locator;
  constructor(private page: Page) {
    this.cartLink = this.page.locator("a[href='/view_cart']");
  }

  async openCart() {
    await this.cartLink.click();
  }
}
