// src/tests/TodoApp.test.ts
import { expect } from '@playwright/test';
import { test, TestBase } from './TestBase';

test.describe('Todo Application', () => {
    // Set up hooks using our base class
    test.beforeAll(() => TestBase.beforeAll)
    test.afterAll(() => TestBase.afterAll)
    test.beforeEach(({ page }) => TestBase.beforeEach)
    test.afterEach(({ page }) => TestBase.afterEach)

    test('should load application correctly', async ({ todosPage, page }) => {
      // Debug: Log the HTML to see what's actually there
        console.log('Page HTML:', await page.content());  
      
      // Get initial state
        const headerState = await todosPage.getPageState();
        // Get initial state with better error handling
        const inputState = await todosPage.input.getState().catch(error => {
          console.error('Failed to get input state:', error);
          throw error;
      });
        // Make assertions with clear messages
        expect(headerState.headerVisible, 'Header should be visible').toBe(true);
        expect(headerState.headerText, 'Header should show correct text').toBe('todos');
        expect(inputState.isVisible, 'Todo input should be visible').toBe(true);
    });

    test('should not add todo on empty input', async ({ todosPage }) => {
        // Try to add empty todo
        await todosPage.input.addTodo('');

        // Verify list state
        const listState = await todosPage.list.getListState();
        expect(listState.isVisible, 'Todo list should not be visible').toBe(false);
    });

    test('can add todo to list', async ({ todosPage }) => {
        const todoText = 'Walk the dog';

        // Add todo
        await todosPage.input.addTodo(todoText);

        // Verify todo state
        const todoState = await todosPage.list.getTodoState(todoText);
        expect(todoState.isVisible, `Todo "${todoText}" should be visible`).toBe(true);
        expect(todoState.isCompleted, `Todo "${todoText}" should not be completed`).toBe(false);
    });

    test('can add and complete todos from list', async ({ todosPage }) => {
        const todo1 = 'Walk the dog';
        const todo2 = 'Wash the car';

        // Add todos
        await todosPage.input.addTodo(todo1);
        await todosPage.input.addTodo(todo2);

        // Verify both todos are visible
        const todo1State = await todosPage.list.getTodoState(todo1);
        const todo2State = await todosPage.list.getTodoState(todo2);
        expect(todo1State.isVisible, `Todo "${todo1}" should be visible`).toBe(true);
        expect(todo2State.isVisible, `Todo "${todo2}" should be visible`).toBe(true);

        // Complete first todo
        await todosPage.list.markTodoComplete(todo1);
        await todosPage.footer.clearCompleted();

        // Verify first todo is gone and second remains
        const updatedTodo1State = await todosPage.list.getTodoState(todo1);
        const updatedTodo2State = await todosPage.list.getTodoState(todo2);
        expect(updatedTodo1State.isVisible, `Todo "${todo1}" should be removed`).toBe(false);
        expect(updatedTodo2State.isVisible, `Todo "${todo2}" should remain`).toBe(true);

        // Complete second todo
        await todosPage.list.markTodoComplete(todo2);
        await todosPage.footer.clearCompleted();

        // Verify list is empty
        const listState = await todosPage.list.getListState();
        expect(listState.isVisible, 'Todo list should be empty').toBe(false);
    });
});


