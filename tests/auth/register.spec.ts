import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage.js";
import { LoginPage } from "../../pages/LoginPage.js";
import { SignupPage } from "../../pages/SignupPage.js";


test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
});

test.describe("Register tests", () => {
  test("Valid register user @smoke", async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);

    const newUser = {
      username: "testuser",
      email: `test${Date.now()}@gmail.com`,
      gender: "male",
      password: "Test123!",
      day: "6",
      month: "October",
      year: "2000",
      firstName: "John",
      lastName: "Doe",
      company: "TestCo",
      address: "Street 1",
      country: "India",
      state: "State",
      city: "City",
      zipCode: "12345",
      mobile: "9999999999",
      newsletter: true,
    };

    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await loginPage.goto();
    await expect(page).toHaveURL(/login/);

    await expect(page.locator(".signup-form")).toBeVisible();
    const email = newUser.email;
    console.log(`new user's email> ${email}`)
    await loginPage.signup(newUser.username, email);


    await signupPage.fillAccountInfo(newUser);

   await page.waitForTimeout(1000000)
  });
});
