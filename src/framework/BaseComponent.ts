import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export abstract class BaseComponent extends BasePage {
    protected rootSelector: string;

    constructor(page: Page, rootSelector: string) {
        super(page);
        this.rootSelector = rootSelector;
    }

    protected getChildSelector(childSelector: string): string {
        return `${this.rootSelector} ${childSelector}`;
    }
}


