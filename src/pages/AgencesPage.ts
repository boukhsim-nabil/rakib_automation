import { Page, Locator } from '@playwright/test';

export class AgencesPage {
  readonly page: Page;
  readonly menuGestionAgences: Locator;
  readonly successMessage: Locator;
  readonly sidebarToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuGestionAgences = page.locator('text=Gestion des agences');
    this.successMessage = page.locator('.alert-success');
    this.sidebarToggle = page.locator('#kt_app_sidebar_mobile_toggle');
  }

  async navigateToAgences() {
if (await this.sidebarToggle.isVisible()) {
        await this.sidebarToggle.click();
    }

    await this.menuGestionAgences.click();
    await this.page.waitForURL('**/admin/agences');
  }

  async clickEditAgence(agenceId: string) {
    const editButton = this.page.locator(`a[href*="/admin/agences/edit/${agenceId}"]`);
    await editButton.waitFor({ state: 'visible' });
    await editButton.click();
  }
}