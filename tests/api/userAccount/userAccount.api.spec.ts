import { test, expect } from "@playwright/test";
import { existingUser } from "../../../data/users.js";
import { createUser } from "../../../data/users.js";

let newUser = createUser();
test("POST to create/register user account @api", async ({ request }) => {
  // Create user
  const createResponse = await request.post(
    "https://automationexercise.com/api/createAccount",
    {
      form: {
        name: newUser.username,
        email: newUser.email,
        password: newUser.password,
        title: "Mr",
        birth_date: newUser.day,
        birth_month: newUser.month,
        birth_year: newUser.year,
        firstname: newUser.firstName,
        lastname: newUser.lastName,
        company: newUser.company,
        address1: newUser.address,
        country: newUser.country,
        zipcode: newUser.zipCode,
        state: newUser.state,
        city: newUser.city,
        mobile_number: newUser.mobile,
      },
    },
  );

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();

  expect(createBody.responseCode).toBe(201);
  expect(createBody.message).toBe("User created!");

  // Verify user exists
  const getResponse = await request.get(
    "https://automationexercise.com/api/getUserDetailByEmail",
    {
      params: {
        email: newUser.email,
      },
    },
  );

  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();

  expect(getBody.responseCode).toBe(200);
  expect(getBody).toHaveProperty("user");

  expect(getBody.user.email).toBe(newUser.email);
  expect(getBody.user.name).toBe(newUser.username);
});

test("PUT to update user account @api", async ({ request }) => {
  const updatedName = "UpdatedUser";

  // Update user
  const updateResponse = await request.put(
    "https://automationexercise.com/api/updateAccount",
    {
      form: {
        name: updatedName,
        email: existingUser.email,
        password: existingUser.password,
        title: "Mr",
        birth_date: existingUser.day,
        birth_month: existingUser.month,
        birth_year: existingUser.year,
        firstname: existingUser.firstName,
        lastname: existingUser.lastName,
        company: existingUser.company,
        address1: existingUser.address,
        country: existingUser.country,
        zipcode: existingUser.zipCode,
        state: existingUser.state,
        city: existingUser.city,
        mobile_number: existingUser.mobile,
      },
    },
  );

  expect(updateResponse.status()).toBe(200);

  const updateBody = await updateResponse.json();

  expect(updateBody.responseCode).toBe(200);
  expect(updateBody.message).toBe("User updated!");

  // Verify update
  const getResponse = await request.get(
    "https://automationexercise.com/api/getUserDetailByEmail",
    {
      params: {
        email: existingUser.email,
      },
    },
  );

  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();

  expect(getBody.responseCode).toBe(200);
  expect(getBody.user.name).toBe(updatedName);
});

test("DELETE user account @api @regression", async ({ request }) => {
  // 1. Create user
  const createResponse = await request.post(
    "https://automationexercise.com/api/createAccount",
    {
      form: newUser,
    },
  );

  const createBody = await createResponse.json();

  expect(createBody.responseCode).toBe(201);

  // 2. Delete user
  const deleteResponse = await request.delete(
    "https://automationexercise.com/api/deleteAccount",
    {
      form: {
        email: newUser.email,
        password: newUser.password,
      },
    },
  );

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();

  expect(deleteBody.responseCode).toBe(200);
  expect(deleteBody.message).toBe("Account deleted!");

  // 3. Verify user is deleted
  const getResponse = await request.get(
    "https://automationexercise.com/api/getUserDetailByEmail",
    {
      params: {
        email: newUser.email,
      },
    },
  );

  const getBody = await getResponse.json();

  expect(getBody.responseCode).toBe(404);
});

test("GET user account detail by email @api", async ({ request }) => {
  const response = await request.get(
    `https://automationexercise.com/api/getUserDetailByEmail?email=${existingUser.email}`,
  );
  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);

  expect(body.responseCode).toBe(200);
  expect(body).toHaveProperty("user");

  expect(body.user).toHaveProperty("id");
  expect(body.user).toHaveProperty("name");
  expect(body.user).toHaveProperty("email");
  expect(body.user).toHaveProperty("title");
  expect(body.user).toHaveProperty("birth_day");
  expect(body.user).toHaveProperty("birth_month");
  expect(body.user).toHaveProperty("birth_year");
  expect(body.user).toHaveProperty("first_name");
  expect(body.user).toHaveProperty("last_name");
  expect(body.user).toHaveProperty("company");
  expect(body.user).toHaveProperty("address1");
  expect(body.user).toHaveProperty("address2");
  expect(body.user).toHaveProperty("country");
  expect(body.user).toHaveProperty("state");
  expect(body.user).toHaveProperty("city");
  expect(body.user).toHaveProperty("zipcode");
});

test("User account lifecycle - create, get, update, delete @api @regression", async ({
  request,
}) => {
  const user = {
    name: `testuser${Date.now()}`,
    email: `test${Date.now()}@gmail.com`,
    password: "Password123",
    title: "Mr",
    birth_date: "6",
    birth_month: "October",
    birth_year: "2000",
    firstname: "John",
    lastname: "Doe",
    company: "TestCo",
    address1: "Street 1",
    country: "Canada",
    zipcode: "12345",
    state: "State",
    city: "City",
    mobile_number: "1234567890",
  };

  // 1. CREATE USER
  const createResponse = await request.post(
    "https://automationexercise.com/api/createAccount",
    {
      form: user,
    },
  );

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();

  expect(createBody.responseCode).toBe(201);
  expect(createBody.message).toBe("User created!");

  // 2. GET USER DETAILS
  const getResponse = await request.get(
    "https://automationexercise.com/api/getUserDetailByEmail",
    {
      params: {
        email: user.email,
      },
    },
  );

  expect(getResponse.status()).toBe(200);

  const getBody = await getResponse.json();

  expect(getBody.responseCode).toBe(200);
  expect(getBody.user.email).toBe(user.email);

  // 3. UPDATE USER
  const updateResponse = await request.put(
    "https://automationexercise.com/api/updateAccount",
    {
      form: {
        ...user,
        name: "updatedUser",
      },
    },
  );

  expect(updateResponse.status()).toBe(200);

  const updateBody = await updateResponse.json();

  expect(updateBody.responseCode).toBe(200);
  expect(updateBody.message).toBe("User updated!");

  // 4. VERIFY UPDATE
  const updatedUserResponse = await request.get(
    "https://automationexercise.com/api/getUserDetailByEmail",
    {
      params: {
        email: user.email,
      },
    },
  );

  const updatedUserBody = await updatedUserResponse.json();

  expect(updatedUserBody.user.name).toBe("updatedUser");

  // 5. DELETE USER
  const deleteResponse = await request.delete(
    "https://automationexercise.com/api/deleteAccount",
    {
      form: {
        email: user.email,
        password: user.password,
      },
    },
  );

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();

  expect(deleteBody.responseCode).toBe(200);
  expect(deleteBody.message).toBe("Account deleted!");

  // 6. VERIFY DELETION
  const deletedUserResponse = await request.get(
    "https://automationexercise.com/api/getUserDetailByEmail",
    {
      params: {
        email: user.email,
      },
    },
  );

  const deletedUserBody = await deletedUserResponse.json();

  expect(deletedUserBody.responseCode).toBe(404);
});
