export function createUser() {
  return {
    username: "testuser",
    email: `test${Date.now()}@gmail.com`,
    gender: "male",
    password: "Test123!",
    day: "6",
    month: "October",
    year: "2000",
    firstName: "John",
    lastName: "Doe",
    company: "TestCo",
    address: "Street 1",
    country: "India",
    state: "State",
    city: "City",
    zipCode: "12345",
    mobile: "9999999999",
    newsletter: true,
  };
}

export const existingUser = {
  email: "test1782839977029@gmail.com",
  password: "Test123!",
};