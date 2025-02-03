
import { BaseComponent } from "@/framework/BaseComponent";
import { expect, Page } from "@playwright/test";

export class TodoInput extends BaseComponent {
  private selectors = {
    root: '[data-testid="new-todo-section"]',
    input: 'input[placeholder="What needs to be done?"]'  // Changed to be more specific
};

  constructor(page: Page) {
      super(page, '[data-testid="new-todo-section"]');
  }

  async addTodo(text: string) {
    try {
        const inputSelector = this.getChildSelector(this.selectors.input);
        const input = this.page.locator(inputSelector);
        
        // Wait for element before interacting
        await input.waitFor({ state: 'visible', timeout: 5000 });
        
        await input.fill(text);
        await this.page.keyboard.press('Enter');
        this.logger.info(`Added todo: ${text}`);
    } catch (error) {
        this.logger.error(`Failed to add todo: ${text}`);
        throw error;
    }
}

//   async getState() {
//       const inputSelector = this.getChildSelector(this.selectors.input);
//       return await this.getElementState(inputSelector);
//   }

  async getState() {
    try {
        const inputSelector = this.getChildSelector(this.selectors.input);
        const element = this.page.locator(inputSelector);
        
        // Wait for element with timeout
        await element.waitFor({ state: 'attached', timeout: 5000 });
        
        return {
            isVisible: await element.isVisible(),
            value: await element.inputValue(),  // Use inputValue instead of textContent for input elements
            isEnabled: await element.isEnabled()
        };
    } catch (error) {
        this.logger.error(`Failed to get input state: ${error}`);
        throw error;
    }
}
}
