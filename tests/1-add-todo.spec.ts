import { test, expect } from "@playwright/test";
import { createTodo, TODO_ITEMS } from "./variables";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test("should allow me to add todo items", async ({ page }) => {
  await page.getByPlaceholder("What needs to be done?").click();
  await page.getByPlaceholder("What needs to be done?").fill("ngoding");
  await page.getByPlaceholder("What needs to be done?").press("Enter");

  await expect(page.getByTestId("todo-count")).toContainText("1");
  await expect(page.getByTestId("todo-title")).toContainText("ngoding");
});

test("should clear text input field when an item is added", async ({
  page,
}) => {
  await page.getByPlaceholder("What needs to be done?").click();
  await page.getByPlaceholder("What needs to be done?").fill("nugas");
  await page.getByPlaceholder("What needs to be done?").press("Enter");

  await expect(page.getByPlaceholder("What needs to be done?")).toBeEmpty();
});

test("should append new items to the bottom of the list", async ({ page }) => {
  await createTodo(page, TODO_ITEMS);

  await expect(page.getByTestId("todo-count")).toContainText("3");
  for (const [index, item] of TODO_ITEMS.entries()) {
    await expect(page.getByTestId("todo-title").nth(index)).toContainText(item);
  }
});
