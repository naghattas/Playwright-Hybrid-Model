import { expect, Page } from "@playwright/test";
import { ILogger, Logger } from '@utils/Logger'; 

// src/framework/BasePage.ts
export abstract class BasePage {
    protected page: Page;
    protected logger: Logger;

    constructor(page: Page) {
        this.page = page;
        this.logger = new Logger();
    }

    // Helper methods that all pages can use
    // protected async getElementState(selector: string) {
    //     try {
    //         const element = this.page.locator(selector);
    //         return {
    //             isVisible: await element.isVisible(),
    //             text: await element.textContent() || '',
    //             value: await element.inputValue(),
    //             isEnabled: await element.isEnabled()
    //         };
    //     } catch (error) {
    //         this.logger.error(`Failed to get element state for ${selector}`);
    //         throw error;
    //     }
    // }

    // src/framework/BaseComponent.ts
protected async getElementState(selector: string) {
    try {
        const element = this.page.locator(selector);
        
        // Wait for element with timeout
        await element.waitFor({ state: 'attached', timeout: 5000 });
        
        return {
            isVisible: await element.isVisible(),
            value: await element.inputValue().catch(() => ''),  // Fallback for non-input elements
            text: await element.textContent() || '',
            isEnabled: await element.isEnabled()
        };
    } catch (error) {
        this.logger.error(`Failed to get element state for ${selector}`);
        throw error;
    }
}

    protected async clickElement(selector: string) {
        try {
            await this.page.click(selector);
            this.logger.info(`Clicked element: ${selector}`);
        } catch (error) {
            this.logger.error(`Failed to click element: ${selector}`);
            throw error;
        }
    }
}
