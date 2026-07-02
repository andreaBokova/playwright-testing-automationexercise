import { Page, Locator } from "@playwright/test";

export class ProductsPage {
  readonly productsList: Locator;
  constructor(private page: Page) {
    this.productsList = this.page.locator(".features_items");
  }

  async addToCart(productName: string) {}

  async viewProduct(productName: string) {}

  async continueShopping() {}

  async filterProductsByCategory(category: string) {}

  async filterProductsByBrand(brand: string) {}

  async searchProduct(productName: string) {}

  async viewNthProductDetail(n: number) {
    const allProducts = await this.productsList
      .locator("a[href^='/product_details/']")
      .all();

    if (n > 0 && n <= allProducts.length) {
      const nthProductLink = this.productsList.locator(
        `a[href='/product_details/${n}']`,
      );
      await nthProductLink.click();
    }
  }
}
