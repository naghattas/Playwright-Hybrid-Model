import { BasePage } from "@/framework/BasePage";
import { expect, Page } from "@playwright/test";
import { TodoItem } from "./TodosList/TodoItem";

export class TodosList extends BasePage {
    private readonly todoItem: TodoItem;
    private readonly selectors = {
        todoList: '[data-testid="todo-list"]',
        todoItems: '[data-testid="todo-item"]'
    };

    constructor(page: Page) {
        super(page);
        this.todoItem = new TodoItem(page);
    }

    // State management methods
    async getTodoState(text: string) {
        try {
            const todo = this.page.getByTestId(`todo-${text}`);
            return {
                isVisible: await todo.isVisible(),
                isCompleted: await todo.getAttribute('class').then(c => c?.includes('completed')),
                text: await todo.textContent() || ''
            };
        } catch (error) {
            this.logger.error(`Failed to get todo state for "${text}"`);
            throw error;
        }
    }

    async getListState() {
        try {
            const list = this.page.locator(this.selectors.todoList);
            return {
                isVisible: await list.isVisible(),
                itemCount: await this.page.locator(this.selectors.todoItems).count()
            };
        } catch (error) {
            this.logger.error('Failed to get list state');
            throw error;
        }
    }

    // Actions with proper error handling and logging
   async markTodoComplete(text: string) {
    try {
        await this.todoItem.markTodoComplete(text);
        this.logger.info(`Marked todo "${text}" as complete`);
    } catch (error) {
        this.logger.error(`Failed to mark todo "${text}" as complete`);
        throw error;
    }
    }

    
}
