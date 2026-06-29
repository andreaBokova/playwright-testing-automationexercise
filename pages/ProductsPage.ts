import { Page } from "@playwright/test";

export class ProductsPage {
  constructor(private page: Page) {}

  async addToCart(productName: string) {}

  async viewProduct(productName: string) {}

  async continueShopping() {}

  async filterProductsByCategory(category: string) {}

  async filterProductsByBrand(brand: string) {}

  async searchProduct(productName: string) {

  }
}
