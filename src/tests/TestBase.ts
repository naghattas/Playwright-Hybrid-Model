// src/tests/TestBase.ts
import { TodosPage } from '@/pages/TodosPage';
import { Page, TestInfo, test as base } from '@playwright/test';


// Define our test fixtures
type TestFixtures = {
    todosPage: TodosPage;
};

// Extend the base test with our fixtures
export const test = base.extend<TestFixtures>({
    todosPage: async ({ page }, use) => {
        const todosPage = new TodosPage(page);
        await todosPage.goto();
        
        // Make the page object available to the test
        await use(todosPage);
        
        // Cleanup after the test
        await page.close();
    }
});

// Base test class with common setup/teardown
export class TestBase {
    protected page: Page;
  protected testInfo: TestInfo;

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
  }
    // Common setup for all test files
    static async beforeAll() {
        // Any one-time setup (e.g., data preparation)
    }

    // Common cleanup for all test files
    static async afterAll() {
        // Any one-time cleanup
    }

    // Common setup for each test
    static async beforeEach({ page }: { page: Page }, { testInfo }: { testInfo: TestInfo }) {
        // Clear browser state
        await page.evaluate(() => window.localStorage.clear());
        // Clear any other test data/state
      }
      
      static async afterEach({ page }: { page: Page }, { testInfo }: { testInfo: TestInfo }) {
        // Take screenshot on failure
        if (testInfo.status !== 'passed') {
          const screenshot = await page.screenshot({
            path: `./test-results/screenshots/${testInfo.title.replace(/\s+/g, '-')}.png`
          });
          await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
        }
        // Ensure browser cleanup
        await page.close();
      }
}