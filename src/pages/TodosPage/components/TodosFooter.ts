// src/pages/TodosPage/components/TodosFooter.ts
import { Page } from "@playwright/test";
import { BasePage } from "@framework/BasePage";

export class TodosFooter extends BasePage {
    // Define readonly selectors object for better maintainability
    private readonly selectors = {
        footer: '[data-testid="footer"]',
        clearButton: 'button:has-text("Clear completed")',
        itemCount: '[data-testid="items-count"]'
    };

    constructor(page: Page) {
        // Call parent constructor to initialize base functionality
        super(page);
    }

    // State management methods - these return state rather than making assertions
    async getFooterState() {
        try {
            const footer = this.page.locator(this.selectors.footer);
            const clearButton = this.page.locator(this.selectors.clearButton);
            
            return {
                isVisible: await footer.isVisible(),
                clearButtonVisible: await clearButton.isVisible(),
                itemCount: await this.getItemCount()
            };
        } catch (error) {
            this.logger.error('Failed to get footer state');
            throw error;
        }
    }

    private async getItemCount(): Promise<number> {
        try {
            const countText = await this.page
                .locator(this.selectors.itemCount)
                .textContent();
            
            // Extract number from text like "5 items left!"
            const match = countText?.match(/(\d+)/);
            return match ? parseInt(match[1]) : 0;
        } catch (error) {
            this.logger.error('Failed to get item count');
            throw error;
        }
    }

    // Actions - methods that perform operations on the page
    async clearCompleted() {
        try {
            const clearButton = this.page.locator(this.selectors.clearButton);
            
            // Wait for button to be clickable
            await clearButton.waitFor({ state: 'visible' });
            await clearButton.click();
            
            this.logger.info('Cleared completed todos');
        } catch (error) {
            this.logger.error('Failed to clear completed todos');
            throw error;
        }
    }

    // Helper methods for checking state conditions
    async waitForItemCount(expectedCount: number, timeoutMs = 5000) {
        try {
            const startTime = Date.now();
            
            while (Date.now() - startTime < timeoutMs) {
                const currentCount = await this.getItemCount();
                if (currentCount === expectedCount) {
                    return true;
                }
                await this.page.waitForTimeout(100);
            }
            
            throw new Error(`Timeout waiting for item count to be ${expectedCount}`);
        } catch (error) {
            this.logger.error(`Failed while waiting for item count: ${error}`);
            throw error;
        }
    }

    // Method to check if the clear completed button is available
    async isClearCompletedAvailable(): Promise<boolean> {
        try {
            const clearButton = this.page.locator(this.selectors.clearButton);
            return await clearButton.isVisible() && await clearButton.isEnabled();
        } catch (error) {
            this.logger.error('Failed to check clear completed button state');
            throw error;
        }
    }
}
