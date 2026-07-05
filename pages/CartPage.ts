import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly proceedToCheckoutButton: Locator;
  readonly cartInfoDiv: Locator;
  readonly registerOrLoginButton: Locator;

  constructor(private page: Page) {
    this.proceedToCheckoutButton = this.page.locator("a.check_out");
    this.cartInfoDiv = this.page.locator("#cart_info");
    this.registerOrLoginButton = this.page.locator("#checkoutModal a[href='/login']");
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.scrollIntoViewIfNeeded();
    await this.proceedToCheckoutButton.hover();
    await this.proceedToCheckoutButton.click();
  }
}
