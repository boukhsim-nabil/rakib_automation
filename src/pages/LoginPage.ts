import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly popupConfirm: Locator;
  readonly errorMessage: Locator;
  readonly successIcon: Locator;


  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('#kt_sign_in_submit');
    this.popupConfirm = page.locator('.swal2-confirm');
    this.errorMessage = page.locator('#swal2-html-container')
    this.successIcon = page.locator('.swal2-success');;  

  }

  async navigateTo() {
    await this.page.goto('https://api.kryati.com/login');
  }

  async fillCredentials(email: string, password: string) {
    await this.emailInput.clear();
    await this.passwordInput.clear();

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }








  async clickSubmit() {
    await this.submitButton.click();
  }

  async waitAndConfirmPopup() {
    await this.popupConfirm.waitFor({ state: 'visible', timeout: 10000 });
    await this.popupConfirm.click();
  }


    async closePopup() {
    if (await this.popupConfirm.isVisible()) {
      await this.popupConfirm.click();
    }
  }

  async login(email: string, password: string) {
    await this.navigateTo();
    await this.fillCredentials(email, password);
    await this.clickSubmit();
    await this.waitAndConfirmPopup();
  }
}




/*
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  
  // La Popup (Le conteneur de texte unique)
  readonly popupMessage: Locator;
  
  // Le bouton "D'accord, j'ai compris!"
  readonly confirmButton: Locator;

  // L'icône de succès (pour le cas CSRF)
  readonly successIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('#kt_sign_in_submit');

    // C'est l'ID unique que tu m'as donné pour tous les messages
    this.popupMessage = page.locator('#swal2-html-container');
    
    this.confirmButton = page.locator('.swal2-confirm');
    this.successIcon = page.locator('.swal2-success');
  }

  async navigateTo() { 
    await this.page.goto('https://api.kryati.com/login'); 
  }

  async fillCredentials(email: string, password: string) {
    await this.emailInput.clear();
    // Si l'email n'est pas vide, on le remplit
    if (email) await this.emailInput.fill(email);
    
    await this.passwordInput.clear();
    // Si le mot de passe n'est pas vide, on le remplit
    if (password) await this.passwordInput.fill(password);
  }

  async clickSubmit() { 
    await this.submitButton.click(); 
  }

  async closePopup() {
    if (await this.confirmButton.isVisible()) {
      await this.confirmButton.click();
    }
  }
}*/