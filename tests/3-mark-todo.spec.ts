import { test, expect } from "@playwright/test";
import { createTodo, TODO_ITEMS } from "./variables";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test("should allow me to mark item as complete", async ({ page }) => {
  await createTodo(page, TODO_ITEMS);

  await expect(page.getByTestId("todo-count")).toContainText("3");

  const firstTodo = page.getByTestId("todo-item").nth(0);
  await firstTodo.getByRole("checkbox").check();
  await expect(firstTodo).toHaveClass("completed");
});

test("should allow me to un-mark item as complete", async ({ page }) => {
  await createTodo(page, TODO_ITEMS);

  await expect(page.getByTestId("todo-count")).toContainText("3");

  const firstTodo = page.getByTestId("todo-item").nth(0);
  await firstTodo.getByRole("checkbox").check();
  await expect(firstTodo).toHaveClass("completed");

  await firstTodo.getByRole("checkbox").uncheck();
  await expect(firstTodo).not.toHaveClass("completed");
});

test("should allow me to edit an item", async ({ page }) => {
  await createTodo(page, TODO_ITEMS);

  const editText = "belajar ngoding";
  const firstTodo = page.getByTestId("todo-item").nth(0);
  await firstTodo.dblclick();
  await firstTodo.getByRole("textbox").fill(editText);
  await firstTodo.getByRole("textbox").press("Enter");

  await expect(firstTodo).toContainText(editText);
});
