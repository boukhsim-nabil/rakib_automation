import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { AgencesPage } from '../src/pages/AgencesPage';
import { AgenceFormPage } from '../src/pages/AgenceFormPage';

import donnees from '../data/testData.json';

test('Mise à jour', async ({ page }) => {
  // Données de test
 /* const loginEmail = "superadmin@krihani.com";
  const loginPass = "superadmin@krihani@2024";

  const agenceData = {
    imagePath: 'data/2.jpg',
    //imagePath: 'D:/visual_code/playwright_rakib/rakib_dashboard/data/2.jpg',
    prenom: "nabil",
    nom: "boukhsim",
    nomAgence: "Agence Alami & Co",
    ice: "123123123456",
    email: "youssef.alami@agence.com",
    prefix: "212",
    telephone: "600000000",
    adresse: "123 Boulevard Mohamed V",
    ville: "rabat", 
    nationalite: "mexicaine",
    dateNaissance: "2050-01-01", // ici il yq un bug
    permis: "B-123456",
    identite: "skjgrighriughsri" // ici il y a un bug
  };
*/
  // Initialisation des pages
  const loginPage = new LoginPage(page);
  const agencesPage = new AgencesPage(page);
  const agenceFormPage = new AgenceFormPage(page);

  // Login
  await loginPage.login(donnees.login.email, donnees.login.password);
  // Navigation vers les agences
  await agencesPage.navigateToAgences();

  // Cliquer sur le bouton Edit de mon profile
  await agencesPage.clickEditAgence('23');

  // Remplir tout
  await agenceFormPage.fillCompleteForm(donnees.agenceModification);
  // Sauvegarder
  await agenceFormPage.clickSave();

  // Validation
  await expect(agencesPage.successMessage).toBeVisible({ timeout: 10000 });
  await expect(agencesPage.successMessage).toContainText('Mise à jour effectuée');
});