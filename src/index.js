import * as util from "./util";
import * as portfolios from "./portfolios";
import * as projects from "./projects";
import * as todos from "./todos";
import * as dom from "./dom";

import "./style.css";

function createDefault() {
  const defaultPortfolio = portfolios.createNew("Default Portfolio");
  const defaultProject = projects.createNew("Getting started with 🎉 Tada");
  const completedTodo = todos.createNew("Look at the first todo");
  const defaultTodo = todos.createNew("Create a new project");
  const deleteTodo = todos.createNew("Press an X to delete");

  completedTodo.isComplete = true;

  defaultProject.addTodo(completedTodo);
  defaultProject.addTodo(defaultTodo);
  defaultProject.addTodo(deleteTodo);
  defaultPortfolio.addProject(defaultProject);

  return defaultPortfolio;
}

window.util = util;

window.createDefault = createDefault;

const jsonString = util.loadFromStorage();
let loadedPortfolio = {};
if (jsonString === undefined) {
  loadedPortfolio = createDefault();
} else {
  loadedPortfolio = portfolios.fromJSON(JSON.parse(jsonString));
}

dom.setup(loadedPortfolio);
