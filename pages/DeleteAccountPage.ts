import { Page, Locator } from "@playwright/test";

export class DeleteAccountPage {
  readonly accountDeletedHeading: Locator;
  readonly continueButton: Locator;

  constructor(private page: Page) {
    this.accountDeletedHeading = this.page.locator("[data-qa='account-deleted']"),
    this.continueButton = this.page.locator("[data-qa='continue-button']")
  }

  async continueToHomepage(){
    await this.continueButton.click();
  }
}
