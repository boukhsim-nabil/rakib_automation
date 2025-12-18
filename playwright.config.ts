import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// 1. Config du BDD
const bddDir = defineBddConfig({
  features: 'src/features/*.feature',
  steps: 'src/steps/*.ts',

  importTestFrom: 'src/support/fixtures.ts',
});

export default defineConfig({
  // ⚠️ IMPORTANT : On enlève le testDir global ici pour le définir par projet plus bas
  // testDir: testDir, <--- SUPPRIME OU COMMENTE CETTE LIGNE

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://api.kryati.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // 2. C'est ici qu'on définit les projets distincts
  projects: [
    // --- PROJET 1 : BDD ---
    {
      name: 'bdd-chromium', // Nom du projet
      testDir: bddDir,      // Il utilise le dossier généré par le BDD
      use: { ...devices['Desktop Chrome'] },
    },

    // --- PROJET 2 : CLASSIQUE (Tes anciens tests) ---
    {
      name: 'classic-chromium', // Nom du projet
      testDir: './tests',       // Il regarde dans ton dossier 'tests'
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

































/*
import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd'; // Assure-toi d'avoir fait: npm i -D playwright-bdd

const testDir = defineBddConfig({
  features: 'src/features/*.feature', // Nouveau chemin BDD
  steps: 'src/steps/*.ts',            // Nouveau chemin Steps
});


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
/*export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  /*fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
 /* forbidOnly: !!process.env.CI,
  /* Retry on CI only */
 /* retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
 /* workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
 /* reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
/*use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  /*  trace: 'on-first-retry',

    /* 👇 AJOUTE LES SCREENSHOTS ICI 👇 */
    /*screenshot: 'only-on-failure', 
  },

  /* Configure projects for major browsers */
  /*projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

 /*   {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test against mobile viewports. */
   /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  /*],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
/*});*/
