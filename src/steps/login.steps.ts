import { createBdd } from 'playwright-bdd';
import { expect, test } from '../support/fixtures'; 

const { Given, When, Then } = createBdd(test);

Given('je suis sur la page de connexion', async ({ loginPage }) => {
    await loginPage.navigateTo();
});

When('je me connecte avec l\'email {string} et le mot de passe {string}', async ({ loginPage }, email, password) => {
    // Si la chaîne est vide dans le Gherkin, on passe une chaîne vide au POM
    await loginPage.fillCredentials(email, password);
    await loginPage.clickSubmit();
});

// 3. Vérification des messages d'erreur (Scenario Outline)
Then('je vois le message d\'erreur {string}', async ({ loginPage }, messageAttendu) => {
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(messageAttendu);
    await loginPage.closePopup();
});

// --- ÉTAPES SPÉCIFIQUES AU BUG CSRF ---

Then('je vois le message de succès {string}', async ({ loginPage }, messageSucces) => {
    await expect(loginPage.errorMessage).toContainText(messageSucces);
});

When('je clique sur l\'icone de succès pour interagir', async ({ loginPage }) => {
    await loginPage.successIcon.click();
});

When('je force un nouveau clic sur le bouton S\'identifier', async ({ loginPage }) => {
    // On utilise force: true comme dans ton test original
    await loginPage.submitButton.click({ force: true });
});