import { v4 as uuidv4 } from "uuid";

import * as todos from "./todos";

class Project {
  constructor(title, id, todos) {
    this.title = title;
    this.id = id;
    this.todos = todos;
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todo) {
    this.todos = this.todos.filter((input) => input.id !== todo.id);
  }
}

function createNew(title) {
  return new Project(title, uuidv4(), new Array());
}

function fromJSON(json) {
  const tds = json.todos.map((todo) => todos.fromJSON(todo));
  const project = new Project(json.title, json.id, tds);
  return project;
}

export { Project, createNew, fromJSON };
