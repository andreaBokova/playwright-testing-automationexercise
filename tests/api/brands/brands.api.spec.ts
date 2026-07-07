import { test, expect } from "@playwright/test";

test("get all brands list @api @smoke", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/brandsList",
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body)
  expect(body.responseCode).toBe(200);

  expect(body).toHaveProperty("brands");
  expect(Array.isArray(body.brands)).toBe(true);
  expect(body.brands.length).toBeGreaterThan(0);
  expect(body.brands[0]).toHaveProperty("id");
  expect(body.brands[0]).toHaveProperty("brand");
});

test("PUT to all brands list (method not allowed) @api @regression", async ({ request }) => {
  const response = await request.put(
    "https://automationexercise.com/api/brandsList",
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(405);
  expect(body.message).toBe("This request method is not supported.");
});
