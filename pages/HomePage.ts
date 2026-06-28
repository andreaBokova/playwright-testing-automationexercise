import { Page, Locator } from "@playwright/test";

export class HomePage {
  constructor(private page: Page) {}

//   getItem(itemName: string): Locator {
//     return this.page.locator(".cart-item").filter({ hasText: itemName });
//   }
async addToCart() {
    this.page.click(".add-to-cart")
}

}
