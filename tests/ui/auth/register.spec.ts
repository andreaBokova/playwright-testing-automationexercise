import { expect, test } from "../../../fixtures/pages.fixture.js";
import { createUser, existingUser } from "../../../data/users.js";

let newUser = createUser();

test.describe("Register tests", () => {
  test("valid register user @smoke", async ({
    page,
    homePage,
    loginPage,
    signupPage,
    accountCreatedPage,
    deleteAccountPage,
    header,
  }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await loginPage.goto();
    await expect(page).toHaveURL(/login/);

    await expect(page.locator(".signup-form")).toBeVisible();
    console.log(`new user's email> ${newUser.email}`);
    await loginPage.signup(newUser.username, newUser.email);

    await expect(page).toHaveURL(/signup/);

    await signupPage.fillAccountInfo(newUser);

    await expect(accountCreatedPage.successHeading).toBeVisible();

    await accountCreatedPage.continueToHomepage();

    await expect(page.getByText(/Logged in as/)).toBeVisible();

    await header.deleteAccount();

    await expect(deleteAccountPage.accountDeletedHeading).toBeVisible();

    await deleteAccountPage.continueToHomepage();
  });

  test("register existing user @regression", async ({
    page,
    homePage,
    loginPage,
  }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await loginPage.goto();
    await expect(page).toHaveURL(/login/);

    await loginPage.signup("username", existingUser.email);
    await expect(page.getByText(/Email Address already exist/)).toBeVisible();
  });
});
