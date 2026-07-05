import { Page, Locator } from "@playwright/test";

export class PaymentDonePage {
  readonly orderPlacedHeading: Locator;
  readonly downloadInvoiceButton: Locator;
  readonly continueButton: Locator;

  constructor(private page: Page) {
    this.orderPlacedHeading = this.page.locator("[data-qa='order-placed']");
    this.downloadInvoiceButton = this.page.locator("a[href='/download_invoice/400']");
    this.continueButton = this.page.locator("[data-qa='continue-button']");
  }
}
