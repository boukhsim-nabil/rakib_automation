import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/LoginPage';

type MyFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export const expect = base.expect;
















//https://github.com/boukhsim-nabil/rakib_automation.git