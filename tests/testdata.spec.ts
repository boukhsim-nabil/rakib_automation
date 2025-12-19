import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

// partie cas negatif 
const scenariosNegatifs = [
  {
    titre: " Format Email Incorrect",
    email: "wjnrhihwrp",
    pass: "superadmin@krihani@2024",
    messageAttendu: "Désolé, il semble qu'il y ait des erreurs détectées"
  },
  {
    titre: " Email Non Valide ",
    email: "nabil@gmail.com",
    pass: "superadmin@krihani@2024",
    messageAttendu: "Le email sélectionné n'est pas valide"
  },
  {
    titre: " Email Vide",
    email: "", // Vide
    pass: "superadmin@krihani@2024",
    messageAttendu: "Désolé, il semble qu'il y ait des erreurs détectées"
  },
  {
    titre: " Mauvais Mot de Passe",
    email: "superadmin@krihani.com",
    pass: "FauxMotDePasse",
    messageAttendu: "auth.failed"
  },
  {
    titre: " Mot de Passe Vide",
    email: "superadmin@krihani.com",
    pass: "", 
    messageAttendu: "Le champ password est obligatoire"
  }
];


test.describe(' Tests de Validation Login', () => {

  for (const cas of scenariosNegatifs) {
    test(`Scenario: ${cas.titre}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      await loginPage.navigateTo();
      await loginPage.fillCredentials(cas.email, cas.pass);
      await loginPage.clickSubmit();

      // Vérification du message dans la popup
      console.log(`Test "${cas.titre}" -> On attend le message : "${cas.messageAttendu}"`);
      
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(cas.messageAttendu);

      // Fermeture de la popup "D'accord, j'ai compris"
      await loginPage.closePopup();
    });
  }
});



// Le Bug 
test.skip(' Reproduction du Bug CSRF ', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // 1. Connexion réussie
  await loginPage.navigateTo();
  await loginPage.fillCredentials("superadmin@krihani.com", "superadmin@krihani@2024");
  await loginPage.clickSubmit();

  // 2. Vérification du succès
  await expect(loginPage.errorMessage).toContainText("Vous vous êtes connecté avec succès !");

  // 3. Action de l'utilisateur : On ne clique PAS sur "J'ai compris".
  // On clique ailleurs pour simuler une interaction
  await loginPage.successIcon.click();

  // 4. ACTION CRITIQUE : On reclique sur le bouton "S'identifier"
  // (C'est souvent là que les utilisateurs impatients provoquent des bugs)
  
  // On force le click même si la popup est devant (force: true)
  await loginPage.submitButton.click({ force: true });
  
  await expect(loginPage.errorMessage).toContainText("CSRF token mismatch", { timeout: 5000 });

});