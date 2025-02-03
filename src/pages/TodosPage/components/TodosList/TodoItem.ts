import { BasePage } from "@/framework/BasePage";
import { expect, Page } from "@playwright/test";

// src/pages/TodosPage/components/TodoItem.ts
export class TodoItem extends BasePage {
  private selectors = {
      checkbox: '[data-testid="todo-checkbox"]'
  };

  // Method to mark a todo as complete
  async markTodoComplete(text: string) {
      try {
          const todo = this.page.getByTestId(`todo-${text}`);
          const checkbox = todo.locator(this.selectors.checkbox);
          await checkbox.click();
          this.logger.info(`Marked todo "${text}" as complete`);
      } catch (error) {
          this.logger.error(`Failed to mark todo "${text}" as complete`);
          throw error;
      }
  }
}


