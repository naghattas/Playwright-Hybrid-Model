## 📄 License
This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

# 📚 Playwright Hybrid Model Testing Framework

## 🚀 Overview
Welcome to the **Playwright Hybrid Model Testing Framework**, a creation born out of coffee, curiosity, and a sprinkle of AI. 

This framework was built with the goal of mixing the best of both worlds:  
- **Page Object Model (POM)** for the broader, high-level page structure.  
- **Component Object Model (COM)** for fine-tuned control over individual UI components.  

In simpler terms, we’re using POM as the skeleton and COM as the muscles. Together, they aim to create a robust, flexible, and highly maintainable test automation solution. 

AI tools assisted in the initial scaffolding and accelerated the development of this framework. It's still evolving.  

---

## 📦 Technologies Used
- **Playwright** (TypeScript) - The powerhouse for E2E testing.
- **Node.js** - For the runtime environment and package management.  
- **TypeScript** - For static typing and improved code maintainability.  
- **Logger Utility** - For structured and readable test execution logs.  

---

## 💾 Installation and Setup
Alright, let’s get you rolling:  

1. **Prerequisites:**

* **Node.js and npm:** This project requires Node.js (which includes npm).
    * **To install Node.js:**
        1.  Visit the [official Node.js website](https://nodejs.org).
        2.  Download the LTS (Long Term Support) version recommended for most users, or choose another version suitable for your operating system (Windows, macOS, Linux).
        3.  Run the downloaded installer and follow the on-screen instructions.
    * **Verify installation:** After installation, open your terminal or command prompt and type `node -v` and `npm -v`. You should see version numbers printed for both.
    * *(Optional: For advanced users or managing multiple Node versions, consider using a Node Version Manager like [nvm](https://github.com/nvm-sh/nvm)
      for macOS/Linux or [nvm-windows](https://github.com/coreybutler/nvm-windows) for Windows.)*

2. **Install dependencies:**  
    ```bash
    npm install
    npx playwright install
    ```

3. **Open this repo with your editor.**  
    Clone this repository and open it in your preferred code editor (**[VSCode](https://code.visualstudio.com/)** is recommended). 

4. * Run tests headless (common for CI/CD):
    ```bash
    npx playwright test
    ```
   * Run tests in headed mode (useful for local development and debugging):
    ```bash
    npx playwright test --headed
    ```
---

## 📂 Framework Structure
The structure of this hybrid framework is intentionally designed to facilitate modularity, reusability, and enhanced efficiency in test automation suites.

A crucial aspect of understanding this framework is its directory structure. Below is an overview of key files and their roles:

* `src/framework/BaseComponent.ts` - Abstract base class for creating reusable UI components.
* `src/framework/BasePage.ts` - Abstract base class defining common functionalities for page objects.
* `src/pages/TodosPage/components/TodoItem.ts` - Component representing an individual todo item within the list, handling its specific interactions (e.g., marking complete, deleting).
* `src/pages/TodosPage/components/TodoInput.ts` - Component responsible for the new todo input field and submission logic.
* `src/pages/TodosPage/components/TodosFooter.ts` - Component managing the footer of the Todos application, which may include item counts and filtering options.
* `src/pages/TodosPage/components/TodosList.ts` - Component that encapsulates the list of todo items and its interactions.
* `src/pages/TodosPage/TodosPage.ts` - The main Page Object for the Todos application, orchestrating the various components (Input, List, Footer) and defining page-level actions.
* `src/tests/TestBase.ts` - A base test class providing common setup, teardown, or helper functions for all test suites, promoting cleaner test code.
* `src/tests/TodoApp.test.ts` - Contains the actual test cases for the Todo application, demonstrating how to use the framework's pages and components to write end-to-end tests.
* `src/utils/Logger.ts` - Custom utility for generating clear and structured logs during test execution, aiding in debugging and reporting.
* `env.ts` - Manages environment-specific configurations, such as base URLs, timeouts, or test data paths.
* `pages.ts` - Exports a factory function (`createPages`) that instantiates and returns page objects (e.g., `TodosPage`), providing convenient access within test files.

---

## 🧩 POM & COM: The Dynamic Duo
This framework implements **Page Object Model (POM)** and **Component Object Model (COM)** to enhance flexibility and scalability. Here’s how it works:  

### **Page Object Model (POM)**
- Defines a page as a class with relevant methods.  
- Example: `TodosPage.ts` that bundles different components (TodoInput, TodoList, TodosFooter) into one.  
- Think of it as the conductor of our test orchestra. 🎻  

### **Component Object Model (COM)**
- Breaks down pages into smaller, testable components.  
- Example: `TodoInput.ts` manages interactions with the input box, `TodoList.ts` handles the list items, etc.  
- POM orchestrates the high-level page interactions, while COM objects manage the detailed interactions within those specific UI elements. 🦸‍♀️

---

### 📋 Example Usage  
The following example demonstrates how to test the addition and completion of a todo item using this framework:

```typescript
import { test } from '@playwright/test';
import { createPages } from './pages';

test('Can add and complete a todo', async ({ page }) => {
    const { TodosPage } = createPages(page);

    await TodosPage.input.addNewTodo('Walk the dog');
    await TodosPage.list.markTodoComplete('Walk the dog');
    const isComplete = await TodosPage.list.isCheckedAsComplete('Walk the dog');

    expect(isComplete).toBe(true);
});

   ```
---

### **✅ What just happened here?**
- We added a new Todo.
- Marked it as complete.
- Checked if it was indeed completed.
- All while using nicely encapsulated components. 

### **🤖 Leveraging AI in Framework Development**
- AI tools (primarily ChatGPT) played a significant role in accelerating the development of this framework.
- AI assisted in generating initial boilerplate for components and utility functions.
- It provided valuable assistance in refactoring code sections and suggesting optimizations.
- AI-driven suggestions for code structure and logic helped streamline the development timeline.
- While AI provided significant assistance, this framework also represents substantial custom design and iterative refinement. The integration of AI in the development process is an ongoing exploration.

### **🔮 Future Improvements**
- Add even more granular tests for components.
- Refactor repeated logic into BasePage and BaseComponent for better DRY compliance.
- Enhance the Logger utility to capture async errors more effectively.
- Introduce configuration handling for better test scalability.

### **📌 References**  
- [📖 Playwright Documentation](https://playwright.dev/)  
- [📖 TypeScript Documentation](https://www.typescriptlang.org/docs/)  
- [📖 GitHub Repository](https://github.com/naghattas/Playwright-Hybrid-Model)  


