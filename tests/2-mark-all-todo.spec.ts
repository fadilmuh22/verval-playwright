import { test, expect } from "@playwright/test";
import { TODO_ITEMS, createTodo } from "./variables";

test.beforeEach(async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc");
});

test("should allow me to mark items as complete check todos state", async ({
  page,
}) => {
  await createTodo(page, TODO_ITEMS);

  await page.getByText("Mark all as complete").click();
  await expect(page.getByTestId("todo-count")).toContainText("0");
  await expect(page.getByTestId("todo-item")).toHaveClass([
    "completed",
    "completed",
    "completed",
  ]);
});

test("should allow me to mark items as complete check mark all button state", async ({
  page,
}) => {
  await createTodo(page, TODO_ITEMS);

  await page.getByText("Mark all as complete").click();
  await expect(page.getByTestId("todo-count")).toContainText("0");
  await expect(page.getByText("Mark all as complete")).toBeChecked();
});

test("should allow me to unmark items as complete check todos state", async ({
  page,
}) => {
  await createTodo(page, TODO_ITEMS);

  await page.getByText("Mark all as complete").click();
  await expect(page.getByTestId("todo-count")).toContainText("0");

  await page.getByText("Mark all as complete").click();
  await expect(page.getByTestId("todo-count")).toContainText("3");
  await expect(page.getByTestId("todo-item")).not.toHaveClass([
    "completed",
    "completed",
    "completed",
  ]);
});

test("should allow me to unmark items as complete check mark all button state", async ({
  page,
}) => {
  await createTodo(page, TODO_ITEMS);

  await page.getByText("Mark all as complete").click();
  await expect(page.getByTestId("todo-count")).toContainText("0");

  await page.getByText("Mark all as complete").click();
  await expect(page.getByTestId("todo-count")).toContainText("3");
  await expect(page.getByText("Mark all as complete")).not.toBeChecked();
});
