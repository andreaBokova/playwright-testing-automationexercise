import { Page, Locator } from "@playwright/test";

export class Header {
  readonly cartLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly loginLink: Locator;

  constructor(private page: Page) {
    this.cartLink = this.page.locator("a[href='/view_cart']");
    this.logoutLink = this.page.locator("a[href='/logout']");
    this.deleteAccountLink = this.page.locator("a[href='/delete_account']")
    this.loginLink = this.page.locator("a[href='/login']");
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

  async gotoLogin(){
    await this.loginLink.click();
  }
}
