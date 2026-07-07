import { test, expect } from "@playwright/test";

test("get all products list @api", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/productsList",
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(200);
  expect(body).toHaveProperty("products");
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);
  expect(body.products[0]).toHaveProperty("id");
  expect(body.products[0]).toHaveProperty("name");
  expect(body.products[0]).toHaveProperty("price");
  expect(body.products[0]).toHaveProperty("brand");
  expect(body.products[0]).toHaveProperty("category");
});

test("post to all products list (method not allowed) @api", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/productsList",
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(405);
  expect(body.message).toBe("This request method is not supported.");
});

test("search product with valid parameter @api", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/searchProduct",
    {
      form: {
        search_product: "tshirt",
      },
    }
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(200);
  expect(body).toHaveProperty("products");
  expect(Array.isArray(body.products)).toBe(true);
});

test("search product without parameter (bad request) @api", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/searchProduct",
    {
      form: {},
    },
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);
  
  expect(body.responseCode).toBe(400);
  expect(body.message).toBe("Bad request, search_product parameter is missing in POST request.");
});
