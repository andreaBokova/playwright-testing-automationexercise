import { Page, Locator } from "@playwright/test";

export class Header {
  readonly cartLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loginLink: Locator;
  readonly contactLink: Locator;

  constructor(private page: Page) {
    this.cartLink = this.page.locator("a[href='/view_cart']");
    this.logoutLink = this.page.locator("a[href='/logout']");
    this.deleteAccountLink = this.page.locator("a[href='/delete_account']");
    this.loginLink = this.page.locator("a[href='/login']");
    this.contactLink = this.page.locator("a[href='/contact_us']");
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }

  async gotoLogin() {
    await this.loginLink.click();
  }

  async gotoContact() {
    await this.contactLink.click();
  }

  async gotoProducts() {
    await this.page.locator("a[href='/products']").click();
  }
}
