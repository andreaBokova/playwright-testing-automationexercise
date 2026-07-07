import { Page, Locator } from "@playwright/test";

export interface User {
  name: string;
  email: string;
  gender: string;
  password: string;
  day: string;
  month: string;
  year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile_number: string;
  newsletter: boolean;
}

export class SignupPage {
  readonly maleRadioButton: Locator;
  readonly femaleRadioButton: Locator;
  readonly passwordInput: Locator;
  readonly dayDropdown: Locator;
  readonly monthDropdown: Locator;
  readonly yearDropdown: Locator;
  readonly newsletterCheckbox: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly countryDropdown: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipCodeInput: Locator;
  readonly mobileInput: Locator;
  readonly createAccountButton: Locator;
  readonly signupForm: Locator;

  constructor(private page: Page) {
    this.maleRadioButton = this.page.locator("#id_gender1");
    this.femaleRadioButton = this.page.locator("#id_gender2");
    this.passwordInput = this.page.locator("#password");
    this.dayDropdown = this.page.locator("#days");
    this.monthDropdown = this.page.locator("#months");
    this.yearDropdown = this.page.locator("#years");
    this.newsletterCheckbox = this.page.locator("#newsletter");
    this.firstNameInput = this.page.locator("#first_name");
    this.lastNameInput = this.page.locator("#last_name");
    this.companyInput = this.page.locator("#company");
    this.addressInput = this.page.locator("#address1");
    this.countryDropdown = this.page.locator("#country");
    this.stateInput = this.page.locator("#state");
    this.cityInput = this.page.locator("#city");
    this.zipCodeInput = this.page.locator("#zipcode");
    this.mobileInput = this.page.locator("#mobile_number");
    this.createAccountButton = this.page.locator("[data-qa='create-account']");
    this.signupForm = this.page.locator("form[action='/signup']");
  }

  async fillAccountInfo(newUser: User) {
    if (newUser.gender === "male") {
      await this.maleRadioButton.check();
    } else {
      await this.femaleRadioButton.check();
    }

    await this.passwordInput.fill(newUser.password);

    await this.dayDropdown.selectOption(newUser.day);
    await this.monthDropdown.selectOption(newUser.month);
    await this.yearDropdown.selectOption(newUser.year);

    if (newUser.newsletter) {
      await this.newsletterCheckbox.check();
    }

    await this.firstNameInput.fill(newUser.firstname);
    await this.lastNameInput.fill(newUser.lastname);
    await this.companyInput.fill(newUser.company);
    await this.addressInput.fill(newUser.address1);
    await this.countryDropdown.selectOption(newUser.country);
    await this.stateInput.fill(newUser.state);
    await this.cityInput.fill(newUser.city);
    await this.zipCodeInput.fill(newUser.zipcode);
    await this.mobileInput.fill(newUser.mobile_number);

    await this.createAccountButton.click();
  }
}
