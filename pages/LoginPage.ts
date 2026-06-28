import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signupEmailInput: Locator;
  readonly signupPasswordInput: Locator;
  readonly signupButton: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.locator("[data-qa='login-email']");
    this.passwordInput = this.page.locator("[data-qa='login-password']");
    this.loginButton = this.page.locator("[data-qa='login-button']");
    this.signupEmailInput = this.page.locator("[data-qa='signup-email']");
    this.signupPasswordInput = this.page.locator("[data-qa='signup-password]");
    this.signupButton = this.page.locator("[data-qa='signup-button']");
  }

  async goto() {
    await this.page.goto("https://automationexercise.com/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(email: string, password: string) {
    this.signupEmailInput.fill(email);
    this.signupPasswordInput.fill(password);
    this.signupButton.click();
  }
}
