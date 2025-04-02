# 📚 Playwright Hybrid Model Testing Framework

## 🚀 Overview
Welcome to the **Playwright Hybrid Model Testing Framework**, a creation born out of coffee, sleepless nights, and a sprinkle of AI wizardry. 

This framework was built with the goal of mixing the best of both worlds:  
- **Page Object Model (POM)** for the broader, high-level page structure.  
- **Component Object Model (COM)** for fine-tuned control over individual UI components.  

In simpler terms, we’re using POM as the skeleton and COM as the muscles. Together, they make the framework strong, flexible, and probably capable of bench-pressing a microservices architecture. 💪  

Oh, and by the way, **AI was my trusty sidekick here**. After enough prompts to make HAL 9000 proud, I managed to whip this framework into shape. It's still evolving, but the AI help definitely sped up the process.  

---

## 📦 Technologies Used
- **Playwright** (TypeScript) - The powerhouse for E2E testing.
- **Node.js** - Because JavaScript’s best frenemy.  
- **TypeScript** - Keeping us safe from our own type errors.  
- **Logger Utility** - Built to keep our logs cool, clear, and collected.  

---

## 💾 Installation and Setup
Alright, let’s get you rolling:  

1. **Install Node.js** (if not already installed):  
    ```bash
    npm install -g npm
    ```

2. **Install dependencies:**  
    ```bash
    npm install
    npx playwright install
    ```

3. **Open this repo with your editor.**  
    I highly recommend **[VSCode](https://code.visualstudio.com/)** because... well, you know.  

4. **Run the tests:**  
    ```bash
    npx playwright test --headed
    ```

---

## 📂 Framework Structure
Welcome to the **organized chaos**. This setup makes sure our tests are modular, reusable, and ultimately more efficient than your average one-size-fits-all framework.

### **Directory Structure**
- src/
  - framework/
    - BaseComponent.ts
    - BasePage.ts
  - pages/
    - TodosPage/
      - components/
        - TodoItem.ts
        - TodoInput.ts
        - TodosFooter.ts
        - TodosList.ts
    - TodosPage.ts
  - tests/
    - TestBase.ts
    - TodoApp.test.ts
  - utils/
    - Logger.ts
  - env.ts
  - pages.ts

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
- Basically, POM is the big boss, and COM are the reliable minions doing the actual work. 🦸‍♀️

---

### 📋 Example Usage  
Let’s say you want to test adding and completing a todo (because what else would you be doing in life, really?):  

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
- All while using nicely encapsulated components. 🎯

### **🤖 AI-Driven Development Process**
- I won’t lie, the AI (hello, ChatGPT! 👋) made this a lot easier. I didn’t have to reinvent the wheel; instead, I just kept improving it.
- It wrote boilerplate code.
- It helped me refactor when my brain was too busy thinking about tacos. 🌮
- It made suggestions that sped up the whole process.
- But hey, it’s still a work in progress. AI is cool, but it’s not perfect. Yet.

### **🔮 Future Improvements**
- Add even more granular tests for components.
- Refactor repeated logic into BasePage and BaseComponent for better DRY compliance.
- Enhance the Logger utility to capture async errors more effectively.
- Introduce configuration handling for better test scalability.

### **📌 References**  
- [📖 Playwright Documentation](https://playwright.dev/)  
- [📖 TypeScript Documentation](https://www.typescriptlang.org/docs/)  
- [📖 GitHub Repository](https://github.com/naghattas/Playwright-Hybrid-Model)  

# PlaywrightAutomation
