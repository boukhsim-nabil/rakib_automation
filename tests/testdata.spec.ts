import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

import donnees from '../data/testData.json';



test.describe('Authentification Scénarios Négatifs', () => {

    test('Cas 1 : Format Email Incorrect', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const scenario = donnees.scenariosNegatifs[0]; 

        await loginPage.navigateTo();
        await loginPage.fillCredentials(scenario.email, scenario.pass);
        await loginPage.clickSubmit();

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(scenario.messageAttendu);
    });

    test('Cas 2 : Email Non Valide (Logique)', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const scenario = donnees.scenariosNegatifs[1];

        await loginPage.navigateTo();
        await loginPage.fillCredentials(scenario.email, scenario.pass);
        await loginPage.clickSubmit();

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(scenario.messageAttendu);
    });

    test('Cas 3 : Email Vide', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const scenario = donnees.scenariosNegatifs[2];

        await loginPage.navigateTo();
        await loginPage.fillCredentials(scenario.email, scenario.pass);
        await loginPage.clickSubmit();

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(scenario.messageAttendu);
    });

    test('Cas 4 : Mauvais Mot de Passe', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const scenario = donnees.scenariosNegatifs[3];

        await loginPage.navigateTo();
        await loginPage.fillCredentials(scenario.email, scenario.pass);
        await loginPage.clickSubmit();

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(scenario.messageAttendu);
    });

    test('Cas 5 : Mot de Passe Vide', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const scenario = donnees.scenariosNegatifs[4];

        await loginPage.navigateTo();
        await loginPage.fillCredentials(scenario.email, scenario.pass);
        await loginPage.clickSubmit();

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(scenario.messageAttendu);
    });

});



// Le Bug 
test.skip(' Reproduction du Bug  ', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateTo();
  await loginPage.fillCredentials(donnees.login.email, donnees.login.password);
  await loginPage.clickSubmit();

  await expect(loginPage.errorMessage).toContainText("Vous vous êtes connecté avec succès !");

  // On clique ailleurs pour simuler une interaction
  await loginPage.successIcon.click();


  await loginPage.submitButton.click();

 // await loginPage.submitButton.click({ force: true });

  
  await expect(loginPage.errorMessage).toContainText("CSRF token mismatch", { timeout: 5000 });

});