import { expect, test } from "../../../fixtures/pages.fixture.js";
import { existingUser } from "../../../data/users.js";

test.describe("Logout tests", () => {
  test("valid logout @smoke", async ({ page, loginPage, header, homePage }) => {
    await homePage.goto();
    expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoLogin();
    expect(page).toHaveURL(/login/);

    await loginPage.login(existingUser.email, existingUser.password);
    await expect(page.getByText(/Logged in as/)).toBeVisible();

    await header.logout();
    await expect(page).toHaveURL(/login/);
  });
});
