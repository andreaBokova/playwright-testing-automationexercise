// 9. Verify that detail detail is visible: product name, category, price, availability, condition, brand
import { Page, Locator } from "@playwright/test";

export class ProductDetailsPage {
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(private page: Page) {
    this.productName = this.page.locator(".product-information h2");
    this.productCategory = this.page.locator(
      ".product-information p:has-text('Category')",
    );
    this.productPrice = this.page.locator(".product-information > span > span");
    this.productAvailability = this.page.locator(
      ".product-information p:has-text('Availability')",
    );
    this.productCondition = this.page.locator(
      ".product-information p:has-text('Condition')",
    );
    this.productBrand = this.page.locator(
      ".product-information p:has-text('Brand')",
    );
    this.quantityInput = this.page.locator("#quantity");
    this.addToCartButton = this.page.locator(".product-information button");
  }

  async setProductQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}
