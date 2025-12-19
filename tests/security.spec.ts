/*import { test, expect } from '@playwright/test';

test('Test de Sécurité : Simulation de Vol de Données (XSS)', async ({ page }) => {

  const loginEmail = "superadmin@krihani.com"; 
  const loginPass = "superadmin@krihani@2024";
  const imagePath = 'D:/visual_code/playwright_rakib/rakib_dashboard/image/2.jpg';

  // --- 1. LE MOUCHARD (Espion) ---
  // On prépare Playwright à intercepter le vol de données
  page.on('dialog', async dialog => {
    console.log(`🚨 ATTENTION ! Code malveillant exécuté.`);
    console.log(`💀 Message du pirate : ${dialog.message()}`);
    console.log(`📝 Type d'alerte : ${dialog.type()}`);
    
    // On accepte l'alerte pour ne pas bloquer le test
    await dialog.accept();
  });

  const randomId = Math.floor(Math.random() * 90000000); 
  const newAgenceEmail = `email.${randomId}@agence.com`;
  const newTelephone = `60${randomId}`; 
  const newIce = `ICE${randomId}`;

  // --- 2. L'ARME DU CRIME (Payload) ---
  // On injecte un script qui essaie de lire les cookies (l'identité de l'admin)
  // Si ce script s'exécute, c'est que la faille est CRITIQUE.
  const newNomAgence = "<script>alert('COOKIE_SESSION=' + document.cookie)</script>"; 
  
  // Alternative si le mot "script" est bloqué (Technique Ninja avec une image) :
  // const newNomAgence = "<img src=x onerror=alert('COOKIE_SESSION=' + document.cookie)>";

  const newDateNaissance = "2050-01-01"; 
  const newNom = "Boukhsim"
  const newPrenom = "Nabil";
  const newPrefix = "212";
  const newAdresse = "123 mohameed V";
  const newVille = "rabat";
  const newNationalite = "mexicaine"; 
  const newPermis = "B-999999";
  const newIdentite = "A123456"; // J'ai remis un format valide pour que le test aille au bout

  // --- LOGIN ---
  await page.goto('https://api.kryati.com/login'); 
  await page.fill('input[name="email"]', loginEmail);
  await page.fill('input[name="password"]', loginPass);
  await page.click('#kt_sign_in_submit');

  try {
    const popup = page.locator('.swal2-confirm');
    await popup.waitFor({ state: 'visible', timeout: 3000 });
    await popup.click();
  } catch (e) {
    // On continue
  }

  // --- NAVIGATION ---
  await page.click('text=Gestion des agences');
  await page.waitForURL('**//*admin/agences'); 

  const boutonEdit = page.locator('a[href*="/admin/agences/edit/23"]');
  await boutonEdit.waitFor({ state: 'visible' });
  await boutonEdit.click();

  // --- INJECTION DE L'ATTAQUE ---
  await page.locator('input[name="avatar"]').setInputFiles(imagePath);
  await page.fill('input[name="first_name"]', newPrenom);
  await page.fill('input[placeholder="Nom"]', newNom);
  
  // C'est ici qu'on plante le piège
  await page.fill('input[name="nom_agence"]', newNomAgence);
  
  await page.fill('input[name="ice"]', newIce);
  await page.fill('input[name="email"]', newAgenceEmail);
  await page.fill('input[name="phone_prefix"]', newPrefix);
  await page.fill('input[name="phone_suffix"]', newTelephone);
  await page.fill('input[name="adresse"]', newAdresse);
  await page.fill('input[name="ville"]', newVille);

  await page.locator('select[name="nationalite"] + .select2').click();
  const searchBox = page.locator('.select2-search__field');
  await searchBox.waitFor({ state: 'visible' }); 
  await searchBox.fill(newNationalite);
  await page.getByRole('option', { name: newNationalite }).click();

  await page.fill('input[name="date_naissance"]', newDateNaissance);
  await page.fill('input[name="numero_permis"]', newPermis);
  await page.fill('input[name="numero_identite"]', newIdentite);

  // --- DÉCLENCHEMENT ---
  console.log("⏳ Sauvegarde en cours... L'attaque va se déclencher au rechargement de la liste.");
  
  await Promise.all([
    page.waitForURL('**//*admin/agences', { timeout: 15000 }),
    page.click('button[name="save"]', { force: true })
  ]);

  // Si l'alerte apparaît ici, le "Mouchard" en haut du script va l'afficher dans la console.
  
  const successMessage = page.locator('.alert-success');
  await expect(successMessage).toBeVisible({ timeout: 10000 });
});
*/