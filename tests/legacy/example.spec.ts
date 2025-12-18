import { test, expect } from '@playwright/test';

test('Mise à jour', async ({ page }) => {

  const loginEmail = "superadmin@krihani.com"; 
  const loginPass = "superadmin@krihani@2024";
  const newPrenom = "nabil";
  const newNom = "boukhsim";
  const imagePath = 'D:/visual_code/playwright_rakib/rakib_dashboard/image/2.jpg';
  const newNomAgence = "Agence Alami & Co";
  const newIce = "123123123456";
  const newAgenceEmail = "youssef.alami@agence.com";
  const newPrefix = "212";
  const newTelephone = "600000000";
  const newAdresse = "123 Boulevard Mohamed V";
  const newVille = "rabat";
  const newNationalite = "mexicaine"; 
  const newDateNaissance = "1990-05-08"; 
  const newPermis = "B-123456";
  const newIdentite = "A123456";


  await page.goto('https://api.kryati.com/login'); 


  await page.fill('input[name="email"]', loginEmail);
  await page.fill('input[name="password"]', loginPass);
  
  await page.click('#kt_sign_in_submit');

  await page.click('.swal2-confirm');


  await page.click('text=Gestion des agences');


  // le bon selecteur pour edit mon profile
  await page.click('a[href*="/admin/agences/edit/23"]');

  await page.locator('input[name="avatar"]').setInputFiles(imagePath);

  //await page.locator('input[name="avatar"]').setInputFiles(imagePath);
  await page.fill('input[name="first_name"]', newPrenom);

  await page.fill('input[placeholder="Nom"]', newNom);

  await page.fill('input[name="nom_agence"]', newNomAgence);

  await page.fill('input[name="ice"]', newIce);
  await page.fill('input[name="email"]', newAgenceEmail);


  await page.locator('input[name="phone_prefix"]').fill(newPrefix);
  await page.locator('input[name="phone_suffix"]').fill(newTelephone);

  await page.locator('select[name="nationalite"] + .select2').click();
  await page.locator('.select2-search__field').fill(newNationalite);
  await page.getByRole('option', { name: newNationalite }).click();
  




  await page.fill('input[name="adresse"]', newAdresse);

  await page.fill('input[name="ville"]', newVille);

  

  await page.click('.select2-selection'); 
  

  await page.keyboard.type(newNationalite);

  await page.keyboard.press('Enter');

  await page.fill('input[name="date_naissance"]', newDateNaissance);

  await page.fill('input[name="numero_permis"]', newPermis);

  await page.fill('input[name="numero_identite"]', newIdentite);


  

  await page.click('button[name="save"]');


  const successMessage = page.locator('.alert-success');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Mise à jour effectuée');


});



/*







  const phoneInput = page.locator('input[name="phone"]').or(page.locator('input[name="phone_prefix"]').nth(1));
  await phoneInput.fill(newTelephone);

  await page.fill('input[name="adresse"]', newAdresse);

  await page.fill('input[name="ville"]', newVille);


  

  await page.click('.select2-selection'); 
  

  await page.keyboard.type(newNationalite);
  
  await page.keyboard.press('Enter');

  await page.fill('input[name="date_naissance"]', newDateNaissance);

  await page.fill('input[name="numero_permis"]', newPermis);
*/

