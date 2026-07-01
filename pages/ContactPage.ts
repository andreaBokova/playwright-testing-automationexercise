import { Page, Locator } from "@playwright/test";

export class ContactPage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly fileInput: Locator;
  readonly submitButton: Locator;

  constructor(private page: Page) {
    this.nameInput = this.page.locator("[data-qa='name']");
    this.emailInput = this.page.locator("[data-qa='email']");
    this.subjectInput = this.page.locator("[data-qa='subject']");
    this.messageInput = this.page.locator("[data-qa='message']");
    this.fileInput = this.page.locator("[name='upload_file']");
    this.submitButton = this.page.locator("[data-qa='submit-button']");
  }

  async fillContactForm(
    name: string,
    email: string,
    subject: string,
    message: string,
    filePath: string,
  ) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageInput.fill(message);
    await this.fileInput.setInputFiles(filePath);
   // await this.submitButton.click();
  }
}
