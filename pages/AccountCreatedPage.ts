import { Page, Locator } from "@playwright/test";

export class AccountCreatedPage {
  readonly successHeading: Locator;
  readonly continueButton: Locator;

  constructor(private page: Page) {
    this.successHeading = this.page.locator("[data-qa='account-created']");
    this.continueButton = this.page.locator("[data-qa='continue-button']");
  }

  async continueToHomepage() {
    this.continueButton.click();
  }
}
