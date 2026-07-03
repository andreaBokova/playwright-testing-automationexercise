import { expect, test } from "../fixtures.js";
import { HomePage } from "../../pages/HomePage.js";
import { Header } from "../../pages/Header.js";
import { ProductsPage } from "../../pages/ProductsPage.js";
import { ProductDetailsPage } from "../../pages/ProductDetailsPage.js";

let homePage: HomePage;
let header: Header;
let productsPage: ProductsPage;
let productDetailsPage: ProductDetailsPage;

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }

  homePage = new HomePage(page);
  header = new Header(page);
  productsPage = new ProductsPage(page);
  productDetailsPage = new ProductDetailsPage(page);
});

test.describe("products tests", () => {
  test("view product details", async ({ page }) => {
    // const homePage = new HomePage(page);
    // const header = new Header(page);
    // const productsPage = new ProductsPage(page);
    // const productDetailsPage = new ProductDetailsPage(page);

    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoProducts();

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
  test("search product by name", async ({ page }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoProducts();
    await expect(page).toHaveURL(/products/);

    await productsPage.searchProductByName("tshirt");
    await expect(productsPage.searchedProductsHeading).toBeVisible();

    let displayedProductNames = await productsPage.getDisplayedProductNames();
    for (let productName of displayedProductNames) {
      productName = productName.toLowerCase();
      productName = productName.replace(/-/g, ""); // Remove hyphens
      productName = productName.replace(/\s+/g, ""); // Remove spaces
      expect(productName).toContain("tshirt");
    }
  });
});
