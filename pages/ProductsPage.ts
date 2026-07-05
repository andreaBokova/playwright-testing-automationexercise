import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly productsList: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartButton: Locator;

  constructor(private page: Page) {
    this.productsList = this.page.locator(".features_items");
    this.searchInput = this.page.locator("#search_product");
    this.searchButton = this.page.locator("#submit_search");
    this.searchedProductsHeading = this.page.locator(
      "h2:has-text('Searched Products')",
    );
    this.continueShoppingButton = this.page.locator(".btn-success");
    this.viewCartButton = this.page.locator("#cartModal a[href='/view_cart']");
  }

async addProductToCart(name: string) {
  const product = this.page
    .locator('.product-image-wrapper')
    .filter({
      has: this.page.locator('p', { hasText: name })
    });

  await product.scrollIntoViewIfNeeded();
  await product.hover();

  const addBtn = product.locator('.product-overlay a.add-to-cart');

  await expect(addBtn).toBeVisible();
  await addBtn.click();
}
  async getDisplayedProductNames() {
    return this.page.locator(".productinfo p").allTextContents();
  }

  async getDisplayedProducts() {
    const displayedProducts = await this.productsList
      .locator("a[href^='/product_details/']")
      .all();
    return displayedProducts;
  }
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async viewCart() {
    await this.viewCartButton.click();
  }

  async filterProductsByCategory(category: string) {}

  async filterProductsByBrand(brand: string) {}

  async viewNthProductDetail(n: number) {
    const allProducts = await this.getDisplayedProducts();
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
