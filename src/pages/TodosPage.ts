
import { Page } from "@playwright/test";

import { BasePage } from "@/framework/BasePage";
import { TodoInput } from "./TodosPage/components/TodoInput";
import { TodosList } from "./TodosPage/components/TodosList";
import { TodosFooter } from "./TodosPage/components/TodosFooter";
import { APP_URL } from "@/env";



export class TodosPage extends BasePage {
    private readonly todoInput: TodoInput;
    private readonly todosList: TodosList;
    private readonly todosFooter: TodosFooter;

    constructor(page: Page) {
        // Call parent constructor first
        super(page);
        
        // Initialize components with proper dependency injection
        this.todoInput = new TodoInput(page);
        this.todosList = new TodosList(page);
        this.todosFooter = new TodosFooter(page);
    }

    // Public getters for components - allows controlled access
    get input() { return this.todoInput; }
    get list() { return this.todosList; }
    get footer() { return this.todosFooter; }

    // Navigation method with logging
    async goto() {
        try {
            await this.page.goto(APP_URL);
            this.logger.info(`Navigated to ${APP_URL}`);
        } catch (error) {
            this.logger.error(`Failed to navigate to ${APP_URL}: ${error}`);
            throw error;
        }
    }

    // State management instead of direct assertions
    async getPageState() {
        try {
            const header = this.page.getByRole("heading", {
                name: "todos",
                exact: true,
            });

            return {
                headerVisible: await header.isVisible(),
                headerText: await header.textContent() || '',
                url: this.page.url()
            };
        } catch (error) {
            this.logger.error('Failed to get page state');
            throw error;
        }
    }
}
  

