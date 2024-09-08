import { test, expect } from '@playwright/test';

const UI_URL = "localhost:5173/";

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole('button', { name: "Menu" }).click();
  // get the sign in button
  await page.getByRole("link", { name: "Log In" }).click();


  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  //locate the element on our page that has the name email
  await page.locator("[name=email]").fill("le@gmail.com");
  await page.locator("[name=password]").fill("123123");

  await page.getByRole("button", { name: "Log In" }).click();

  await expect(page.getByText("Sign in successful")).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
});

test("should allow user to register", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole('button', { name: "Menu" }).click();
  // get the sign in button
  await page.getByRole("link", { name: "Log In" }).click();

  await expect(page.getByText("Create An Account")).toBeVisible();

  await page.getByRole("link", { name: "Create an account" }).click();
  await page.locator("[name=firstName]").fill("test");
  await page.locator("[name=lastName]").fill("test");
  await page.locator("[name=email]").fill(String(new Date()).replace(/[^a-zA-Z0-9@.]/g, "")+"@gmail.com");
  await page.locator("[name=password]").fill("testtest");
  await page.locator("[name=confirmPassword]").fill("testtest");

  await page.getByRole("button", { name: "Create Account" }).click();
  await expect(page.getByText("Registration Success!")).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
})