import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly proceedToCheckoutButton: Locator;
  constructor(private page: Page) {
    this.proceedToCheckoutButton = this.page.locator("a.check_out");
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async checkItemIsInsideCart(itemName: string) {}

  async checkCartItemQuantity() {
    
  }
}
