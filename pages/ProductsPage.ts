import { Page, Locator } from "@playwright/test";

export class ProductsPage {
  readonly productsList: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;

  constructor(private page: Page) {
    this.productsList = this.page.locator(".features_items");
    this.searchInput = this.page.locator("#search_product");
    this.searchButton = this.page.locator("#submit_search");
    this.searchedProductsHeading = this.page.locator(
      "h2:has-text('Searched Products')",
    );
  }

  async addToCart(productName: string) {}

  async getDisplayedProductNames() {
    return this.page.locator(".productinfo p").allTextContents();
  }

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

  async searchProductByName(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}
