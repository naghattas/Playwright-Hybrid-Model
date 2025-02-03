import { Page } from "@playwright/test";
import { TodosPage } from "./pages/TodosPage";


export const createPages = (page: Page) => {
  return {
    TodosPage: new TodosPage(page),
  };
};
