import { test, expect } from "@playwright/test";

test.describe("Modification des informations d'une agence", () => {

  test("Modifier une agence", async ({ page }) => {

    await page.goto("https://api.kryati.com/login");
    await page.locator('input[name="email"]').fill('superadmin@krihani.com');
    await page.locator('input[name="password"]').fill('superadmin@krihani@2024');
    await page.getByRole('button', { name: "S'identifier" }).click();
    await expect(page.locator("#swal2-html-container")).toContainText("Vous vous êtes connecté avec succès");
    await page.getByRole('button', { name: "D'accord, j'ai compris!" }).click();
    await expect(page.locator('.page-heading')).toContainText("Bienvenue");

    await page.getByRole('link', { name: 'Gestion des Agences' }).click();
    await expect(page.locator('.page-heading')).toContainText("liste des agences");
    await page.locator('input[type="search"]').fill('ButCar');
    await expect(page.locator('#user-table')).toContainText('ButCar');
    await page.locator('a[href="https://api.kryati.com/admin/agences/edit/25"]').click();
    await expect(page.locator('.page-heading')).toContainText("modifier agence");

    await page.locator('input[name="avatar"]').setInputFiles('C:/Users/samii/OneDrive/Desktop/but car.png');
    await page.locator('input[name="first_name"]').fill('Sofiane');
    await page.locator('input[name="last_name"]').fill('KOUDALI');
    await page.locator('input[name="nom_agence"]').fill('ButCar');
    await page.locator('input[name="ice"]').fill('soufianeelkou');
    await page.locator('input[name="phone_prefix"]').fill('12');
    await page.locator('input[name="phone_suffix"]').fill('635288177');
    await page.locator('input[name="adresse"]').fill('hay salam');
    await page.locator('input[name="ville"]').fill('Sale');
    await page.locator('select[name="nationalite"] + .select2').click();
    await page.locator('.select2-search__field').fill('Bahamienne');
    await page.getByRole('option', { name: 'Bahamienne' }).click();
    await page.locator('input[name="date_naissance"]').fill('1995-08-21');


    await page.locator('input[name="numero_permis"]').fill('p-3456789');
    await page.locator('input[name="numero_identite"]').fill('Ca-9876543');

    const saveBtn = page.locator('button[name="save"]');
    await saveBtn.scrollIntoViewIfNeeded();
    await saveBtn.click();

    await page.waitForTimeout(2000); 
    await expect(page.locator(".alert.alert-success"))
      .toContainText("Mise à jour effectuée");


    await page.locator('input[type="search"]').fill('ButCar');
    await expect(page.locator('#user-table')).toContainText('ButCar');

  });

});