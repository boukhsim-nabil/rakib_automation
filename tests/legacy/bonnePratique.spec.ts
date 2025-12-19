/*import { test, expect } from '@playwright/test';

test('Test de Sécurité & Logique (Bug Hunting)', async ({ page }) => {

  const loginEmail = "superadmin@krihani.com"; 
  const loginPass = "superadmin@krihani@2024";
  const imagePath = 'D:/visual_code/playwright_rakib/rakib_dashboard/image/2.jpg';

  const randomId = Math.floor(Math.random() * 90000000); 
  const newAgenceEmail = `email.${randomId}@agence.com`;
  const newTelephone = `60${randomId}`; 
  const newIce = `ICE${randomId}`;

  
  // A. TEST XSS : On injecte du HTML. Si le nom apparait en GRAS dans la liste, c'est une faille.
  const newNomAgence = "<b>AGENCE HACKED</b>"; 
  
  // bug ici une date pas logique
  const newDateNaissance = "2050-01-01"; 
  

  const newNom = "Boukhsim"
  const newPrenom = "Nabil";
  const newPrefix = "212";
  const newAdresse = "123 mohameed V";
  const newVille = "rabat";
  const newNationalite = "mexicaine"; 
  const newPermis = "B-999999";

  /// bug ici ne respect pas le format
  const newIdentite = "vrvdgfvgdfgvdfgfgdsgd";

  // --- LOGIN ---
  await page.goto('https://api.kryati.com/login'); 
  await page.fill('input[name="email"]', loginEmail);
  await page.fill('input[name="password"]', loginPass);
  await page.click('#kt_sign_in_submit');

  // Gestion Popup 
  try {
    const popup = page.locator('.swal2-confirm');
    await popup.waitFor({ state: 'visible', timeout: 3000 });
    await popup.click();
  } catch (e) {
    // On continue si pas de popup
  }

  // --- NAVIGATION ---
  await page.click('text=Gestion des agences');
  
  // On attend que la page soit chargée
  await page.waitForURL('**//*admin/agences'); 

  // On clique sur la PREMIÈRE agence (plus sûr que l'ID 23)
  const boutonEdit = page.locator('a[href*="/admin/agences/edit/23"]');
  await boutonEdit.waitFor({ state: 'visible' });
  await boutonEdit.click();

  // --- REMPLISSAGE MALVEILLANT ---
  await page.locator('input[name="avatar"]').setInputFiles(imagePath);
  await page.fill('input[name="first_name"]', newPrenom);
  await page.fill('input[placeholder="Nom"]', newNom);
  
  // Ici on injecte le code HTML
  await page.fill('input[name="nom_agence"]', newNomAgence);
  
  await page.fill('input[name="ice"]', newIce);
  await page.fill('input[name="email"]', newAgenceEmail);

  await page.fill('input[name="phone_prefix"]', newPrefix);
  await page.fill('input[name="phone_suffix"]', newTelephone);

  await page.fill('input[name="adresse"]', newAdresse);
  await page.fill('input[name="ville"]', newVille);

  // Select2
  await page.locator('select[name="nationalite"] + .select2').click();
  const searchBox = page.locator('.select2-search__field');
  await searchBox.waitFor({ state: 'visible' }); 
  await searchBox.fill(newNationalite);
  await page.getByRole('option', { name: newNationalite }).click();

  // Ici on met la date futuriste
  await page.fill('input[name="date_naissance"]', newDateNaissance);
  
  await page.fill('input[name="numero_permis"]', newPermis);
  await page.fill('input[name="numero_identite"]', newIdentite);

  // --- SAUVEGARDE ROBUSTE ---
  // On utilise Promise.all pour ne pas rater la redirection
  await Promise.all([
    page.waitForURL('**//*admin/agences', { timeout: 15000 }),
    page.click('button[name="save"]', { force: true })
  ]);

  // --- ANALYSE DU RÉSULTAT ---
  const successMessage = page.locator('.alert-success');
  
  // Si ce message s'affiche, c'est que le site a ACCEPTÉ nos données pirates
  if (await successMessage.isVisible()) {
      console.log("⚠️ ALERTE : Le système a accepté la date 2050 et le code HTML ! -> BUG TROUVÉ");
  } else {
      console.log("✅ BRAVO : Le système a bloqué les données incorrectes.");
  }

  await expect(successMessage).toBeVisible({ timeout: 10000 });
});*/