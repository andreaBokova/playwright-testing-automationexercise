import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  readonly checkoutInfoDiv: Locator;
  readonly addressInvoiceUl: Locator;
  readonly placeOrderButton: Locator;

  constructor(private page: Page) {
    this.checkoutInfoDiv = this.page.locator("[data-qa='checkout-info']");
    this.addressInvoiceUl = this.page.locator("[data-qa='address-invoice']");
    this.placeOrderButton = this.page.locator("a.check_out");
  }

  async proceedToCheckout() {
    await this.checkoutInfoDiv.scrollIntoViewIfNeeded();
  }

  async placeOrder() {
    await this.placeOrderButton.scrollIntoViewIfNeeded();
    await this.placeOrderButton.hover();
    await this.placeOrderButton.click();
  }
}
