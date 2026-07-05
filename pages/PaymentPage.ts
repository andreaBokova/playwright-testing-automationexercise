import { Page, Locator } from "@playwright/test";

export class PaymentPage {
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expirationMonthInput: Locator;
  readonly expirationYearInput: Locator;
  readonly payAndConfirmOrderButton: Locator;
  readonly orderPlacedHeading: Locator;
  readonly continueButton: Locator;
  
  constructor(private page: Page) {
    this.nameOnCardInput = this.page.locator("[data-qa='name-on-card']");
    this.cardNumberInput = this.page.locator("[data-qa='card-number']");
    this.cvcInput = this.page.locator("[data-qa='cvc']");
    this.expirationMonthInput = this.page.locator("[data-qa='expiry-month']");
    this.expirationYearInput = this.page.locator("[data-qa='expiry-year']");
    this.payAndConfirmOrderButton = this.page.locator("[data-qa='pay-button']");
    this.orderPlacedHeading = this.page.locator("[data-qa='order-placed']");
    this.continueButton = this.page.locator("[data-qa='continue-button']");
  }

  async enterPaymentDetails() {
    await this.nameOnCardInput.fill("John Doe");
    await this.cardNumberInput.fill("1234 5678 9012 3456");
    await this.cvcInput.fill("123");
    await this.expirationMonthInput.fill("12");
    await this.expirationYearInput.fill("2025");
  }
  


  
}
