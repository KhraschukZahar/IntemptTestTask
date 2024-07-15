import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ page, baseURL }) => {
  // Determine the credentials and authFile based on the baseURL
  const email = process.env.INTEMPT_EMAIL;
  const password = process.env.INTEMPT_PASSWORD;
  const authFile = "playwright/.auth/user.json";

  if (!email || !password) {
    throw new Error("Username or password environment variables are not set.");
  }

  await page.goto(`https://${baseURL}`);

  const emailField = page.locator('input#email1').first();
  await emailField.fill(email);
  const passwordField = page.locator('input#password').first();
  await passwordField.fill(password);
  
  const loginButton = page.locator('button#login').first();
  await loginButton.click();

  await expect(page).toHaveTitle("Growth OS | Intempt");

  await page.context().storageState({ path: authFile });
});
