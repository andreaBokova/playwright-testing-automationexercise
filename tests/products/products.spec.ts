import { expect, test } from "../../fixtures/pages.fixture.js";

test.beforeEach(async ({ page }) => {
  await page.goto("https://automationexercise.com");

  const consentBtn = page.locator('button:has-text("Consent")');
  if (await consentBtn.isVisible()) {
    await consentBtn.click();
  }
});

test.describe("products tests", () => {
  test("view product details @smoke", async ({
    page,
    homePage,
    header,
    productsPage,
    productDetailsPage,
  }) => {
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
  test("search product by name @regression", async ({
    page,
    homePage,
    header,
    productsPage,
  }) => {
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

  test("add product to cart @smoke", async ({
    page,
    homePage,
    header,
    productsPage,
  }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoProducts();
    await expect(page).toHaveURL(/products/);

    await productsPage.addProductToCart("Blue Top");

    await productsPage.continueShopping();

    await productsPage.addProductToCart("Men Tshirt");

    await productsPage.viewCartButton.click();
    await expect(page).toHaveURL(/view_cart/);

    await page.getByText("Blue Top").isVisible();
    await page.getByText("Men Tshirt").isVisible();
  });

  test("add product to cart and verify quantity @regression", async ({
    page,
    homePage,
    header,
    productsPage,
    productDetailsPage,
  }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoProducts();
    await expect(page).toHaveURL(/products/);

    await productsPage.viewNthProductDetail(1);
    await expect(page).toHaveURL(/product_details/);

    await productDetailsPage.setProductQuantity(4);
    await productDetailsPage.addToCart();

    await productsPage.viewCartButton.click();

    const quantity = await page.locator("#product-1 button").textContent();
    expect(quantity).toBe("4");
  });

  test("remove product from cart @regression", async ({
    page,
    homePage,
    header,
    productsPage,
  }) => {
    await homePage.goto();
    await expect(page).toHaveURL("https://automationexercise.com/");

    await header.gotoProducts();
    await expect(page).toHaveURL(/products/);

    await productsPage.addProductToCart("Blue Top");

    await productsPage.viewCartButton.click();
    await expect(page).toHaveURL(/view_cart/);

    const row = page.locator("tr", { hasText: "Blue Top" });

    const deleteButton = row.locator(".cart_quantity_delete");

    await deleteButton.scrollIntoViewIfNeeded();

    await deleteButton.hover();

    await deleteButton.click();

    await expect(row).not.toBeVisible();
  });
});
