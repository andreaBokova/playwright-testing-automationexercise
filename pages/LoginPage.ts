import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signupUsernameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(private page: Page) {
    this.emailInput = this.page.locator("[data-qa='login-email']");
    this.passwordInput = this.page.locator("[data-qa='login-password']");
    this.loginButton = this.page.locator("[data-qa='login-button']");
    this.signupUsernameInput = this.page.locator("[data-qa='signup-name']");
    this.signupEmailInput = this.page.locator("[data-qa='signup-email']");
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

  async signup(username: string, email: string) {
    await this.signupUsernameInput.fill(username);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }
}
