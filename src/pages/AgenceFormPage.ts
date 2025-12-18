import { Page, Locator } from '@playwright/test';

export class AgenceFormPage {
  readonly page: Page;
  readonly avatarInput: Locator;
  readonly prenomInput: Locator;
  readonly nomInput: Locator;
  readonly nomAgenceInput: Locator;
  readonly iceInput: Locator;
  readonly emailInput: Locator;
  readonly phonePrefixInput: Locator;
  readonly phoneSuffixInput: Locator;
  readonly adresseInput: Locator;
  readonly villeInput: Locator;
  readonly nationaliteDropdown: Locator;
  readonly nationaliteSearchBox: Locator;
  readonly dateNaissanceInput: Locator;
  readonly numeroPermisInput: Locator;
  readonly numeroIdentiteInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.avatarInput = page.locator('input[name="avatar"]');
    this.prenomInput = page.locator('input[name="first_name"]');
    this.nomInput = page.locator('input[placeholder="Nom"]');
    this.nomAgenceInput = page.locator('input[name="nom_agence"]');
    this.iceInput = page.locator('input[name="ice"]');
    this.emailInput = page.locator('input[name="email"][type="email"]');
    this.phonePrefixInput = page.locator('input[name="phone_prefix"]');
    this.phoneSuffixInput = page.locator('input[name="phone_suffix"]');
    this.adresseInput = page.locator('input[name="adresse"]');
    this.villeInput = page.locator('input[name="ville"]');
    this.nationaliteDropdown = page.locator('select[name="nationalite"] + .select2');
    this.nationaliteSearchBox = page.locator('.select2-search__field');
    this.dateNaissanceInput = page.locator('input[name="date_naissance"]');
    this.numeroPermisInput = page.locator('input[name="numero_permis"]');
    this.numeroIdentiteInput = page.locator('input[name="numero_identite"]');
    this.saveButton = page.locator('button[name="save"]');
  }

  async uploadAvatar(imagePath: string) {
    await this.avatarInput.setInputFiles(imagePath);
  }

  async fillPrenom(prenom: string) {
    await this.prenomInput.fill(prenom);
  }

  async fillNom(nom: string) {
    await this.nomInput.fill(nom);
  }

  async fillNomAgence(nomAgence: string) {
    await this.nomAgenceInput.fill(nomAgence);
  }

  async fillIce(ice: string) {
    await this.iceInput.fill(ice);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPhone(prefix: string, telephone: string) {
    await this.phonePrefixInput.fill(prefix);
    await this.phoneSuffixInput.fill(telephone);
  }

  async fillAdresse(adresse: string) {
    await this.adresseInput.fill(adresse);
  }

  async fillVille(ville: string) {
    await this.villeInput.fill(ville);
  }

  async selectNationalite(nationalite: string) {
    await this.nationaliteDropdown.click();
    await this.nationaliteSearchBox.waitFor({ state: 'visible' });
    await this.nationaliteSearchBox.fill(nationalite);
    await this.page.getByRole('option', { name: nationalite }).click();
  }

  async fillDateNaissance(date: string) {
    await this.dateNaissanceInput.fill(date);
  }

  async fillNumeroPermis(permis: string) {
    await this.numeroPermisInput.fill(permis);
  }

  async fillNumeroIdentite(identite: string) {
    await this.numeroIdentiteInput.fill(identite);
  }

  async clickSave() {
    await this.saveButton.click();
    await this.page.waitForURL('**/admin/agences', { timeout: 15000 });
  }

  async fillCompleteForm(data: {
    imagePath: string;
    prenom: string;
    nom: string;
    nomAgence: string;
    ice: string;
    email: string;
    prefix: string;
    telephone: string;
    adresse: string;
    ville: string;
    nationalite: string;
    dateNaissance: string;
    permis: string;
    identite: string;
  }) {
    await this.uploadAvatar(data.imagePath);
    await this.fillPrenom(data.prenom);
    await this.fillNom(data.nom);
    await this.fillNomAgence(data.nomAgence);
    await this.fillIce(data.ice);
    await this.fillEmail(data.email);
    await this.fillPhone(data.prefix, data.telephone);
    await this.fillAdresse(data.adresse);
    await this.fillVille(data.ville);
    await this.selectNationalite(data.nationalite);
    await this.fillDateNaissance(data.dateNaissance);
    await this.fillNumeroPermis(data.permis);
    await this.fillNumeroIdentite(data.identite);
  }
}
