import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage.js";
import { Header } from "../../pages/Header.js";
import { ProductsPage } from "../../pages/ProductsPage.js";
import { ProductDetailsPage } from "../../pages/ProductDetailsPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
});

test.describe("products tests", () => {
  test("view product details", async ({ page }) => {
    const homePage = new HomePage(page);
    const header = new Header(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoProducts();

    const closeButton = page.getByText("Close");

    if (await closeButton.isVisible({ timeout: 3000 })
      .catch(() => false)) {
      await closeButton.click();
    }
    await expect(page).toHaveURL(/products/);

    await expect(productsPage.productsList).toBeVisible();
    await productsPage.viewNthProductDetail(1);

    await expect(page).toHaveURL(/product_details/);

    await expect(productDetailsPage.productName).toBeVisible();
    await expect(productDetailsPage.productCategory).toBeVisible();
    await expect(productDetailsPage.productPrice).toBeVisible();
    await expect(productDetailsPage.productAvailability).toBeVisible();
    await expect(productDetailsPage.productCondition).toBeVisible();
    await expect(productDetailsPage.productBrand).toBeVisible();
  });
});
