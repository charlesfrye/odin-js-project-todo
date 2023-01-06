import * as util from "./util";
import { Portfolio } from "./portfolios";
import { Project } from "./projects";
import { Todo } from "./todos";

import "./style.css";

function load(id) {
  if (util.storageAvailable("localStorage")) {
    let target_key = "portfolio";
    if (id !== undefined) {
      // get by ID
      target_key += `-${id}`;
    }

    const keys = Object.keys(localStorage);
    for (let key of keys) {
      console.log(`${key}: ${localStorage.getItem(key)}`);
      if (key) {
        const result = JSON.parse(localStorage.getItem(key));
        return result;
      }
    }
  }
}

function createDefault() {
  const defaultPortfolio = new Portfolio("Default Portfolio");
  const defaultProject = new Project("Default Project");
  const defaultTodo = new Todo("Sample Todo");

  defaultTodo.date = [2023, 0, 17];
  defaultTodo.description = "An example todo.";

  defaultProject.addTodo(defaultTodo);
  defaultPortfolio.addProject(defaultProject);

  return defaultPortfolio;
}

const loaded = load();

if (loaded === undefined) {
  createDefault();
}

window.load = load;
window.util = util;

window.createDefault = createDefault;

window.Todo = Todo;
window.Project = Project;
window.Portfolio = Portfolio;
