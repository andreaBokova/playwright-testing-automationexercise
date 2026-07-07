import { test, expect } from "@playwright/test";
import { existingUser } from "../../../data/users.js";

test("POST to verify login with valid details @api @smoke", async ({ request }) => {
  const response = await request.post(
    "https://automationexercise.com/api/verifyLogin",
    {
      form: {
        email: existingUser.email,
        password: existingUser.password,
      },
    },
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(200);
  expect(body.message).toBe("User exists!");
});

test("POST to verify login without email parameter (bad request) @api @regression", async ({
  request,
}) => {
  const response = await request.post(
    "https://automationexercise.com/api/verifyLogin",
    {
      form: {
        password: existingUser.password,
      },
    },
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(400);
  expect(body.message).toBe(
    "Bad request, email or password parameter is missing in POST request.",
  );
});

test("DELETE to verify login (method not allowed) @api @regression", async ({
  request,
}) => {
  const response = await request.delete(
    "https://automationexercise.com/api/verifyLogin",
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(405);
  expect(body.message).toBe("This request method is not supported.");
});

test("POST to verify login with invalid details (resource not found) @api @regression", async ({
  request,
}) => {
  const response = await request.post(
    "https://automationexercise.com/api/verifyLogin",
    {
      form: {
        email: "invalidmail@test.com",
        password: "invalidpassTest123",
      },
    },
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(404);
  expect(body.message).toBe("User not found!");
});
