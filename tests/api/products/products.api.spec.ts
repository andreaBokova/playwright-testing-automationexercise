import { test, expect } from "@playwright/test";

test("get all products list", async ({ request }) => {
  const response = await request.get(
    "https://automationexercise.com/api/productsList",
  );

  expect(response.status()).toBe(200);


  const body = await response.json();


  expect(body.responseCode).toBe(200);

  console.log(body);

  expect(body).toBeTruthy();
});

test("post to all products list (invalid method)", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/productsList"
  );

  expect(response.status()).toBe(200); 
  // ⚠️ important: this API STILL returns 200 HTTP, even for errors

  const body = await response.json();

  console.log(body);

  expect(body.responseCode).toBe(405);
  expect(body.message).toBe("This request method is not supported.");
});

test("search product with valid parameter", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/searchProduct",
    {
      form: {
        search_product: "tshirt",
      },
    },
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(200);

  console.log(body);

  expect(body).toBeTruthy();
});

test("search product without parameter", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/searchProduct",
    {
      form: {},
    },
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.responseCode).toBe(400);

  console.log(body);

  expect(body.message).toBe("Bad request, search_product parameter is missing in POST request.");

});
