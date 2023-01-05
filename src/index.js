import * as dates from "date-fns";
import { v4 as uuidv4 } from "uuid";

import * as util from "./util";
import * as projects from "./projects";
import * as todos from "./todos";

import "./style.css";

class Todo {
  constructor(title) {
    this._title = title;
    this._id = uuidv4();
    this._isComplete = false;
  }

  get date() {
    return this._date;
  }

  set date(dateArray) {
    if (dateArray.length < 3) {
      console.log(`invalid dateArray for date: ${dateArray}`);
    }
    this._date = new Date(dateArray[0], dateArray[1], dateArray[2]);
  }

  get dateStr() {
    return dates.format(this._date, "yyyy-MM-dd");
  }

  get description() {
    return this._description;
  }

  set description(string) {
    if (typeof string === "string") {
      this._description = string;
    } else {
      console.log(`invalid string for description: ${string}`);
    }
  }

  get isComplete() {
    return this._isComplete;
  }

  set isComplete(state) {
    if (typeof state === "boolean") {
      this._isComplete = state;
    } else {
      console.log(`invalid state for isComplete: ${state}`);
    }
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  set title(string) {
    if (typeof string === "string") {
      this._isComplete = string;
    } else {
      console.log(`invalid string for title: ${string}`);
    }
  }

  // getter/setter for data in localStorage
}

class Project {
  constructor(title) {
    this._title = title;
    this._id = uuidv4();
    this._todos = new Array();
  }

  get title() {
    return this._title;
  }

  set title(string) {
    if (typeof string === "string") {
      this._isComplete = string;
    } else {
      console.log(`invalid string for title: ${string}`);
    }
  }

  get todos() {
    return this._todos;
  }

  addTodo(todo) {
    this._todos.push(todo);
  }

  removeTodo(todo) {
    this._todos = this._todos.filter((input) => input.id !== todo.id);
  }

  // getter/setter for data in localStorage
  //   factor through todo
}

class Portfolio {
  constructor(title) {
    this._title = title;
    this._id = uuidv4();
    this._projects = new Array();
  }

  get projects() {
    return this._projects;
  }

  addProject(project) {
    this._projects.push(project);
  }

  removeProject(project) {
    this._projects = this._projects.filter((input) => input.id !== project.id);
  }

  get todos() {
    return this._projects.flatMap((project) => project.todos);
  }

  mapTodos(f) {
    return this._projects.map((project) => [
      project.todos.map((todo) => f(todo, project)),
    ]);
  }

  // get/set data in localStorage?
  //   yes, but factor through todo/project
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

window.createDefault = createDefault;

window.Todo = Todo;
window.Project = Project;
window.Portfolio = Portfolio;
