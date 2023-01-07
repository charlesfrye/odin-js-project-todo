import { v4 as uuidv4 } from "uuid";

class Todo {
  constructor(title, id, isComplete) {
    this.title = title;
    this.id = id;
    this.isComplete = isComplete;
  }
}

function createNew(title) {
  return new Todo(title, uuidv4(), false);
}

function fromJSON(json) {
  const todo = new Todo(json.title, json.id, json.isComplete);
  return todo;
}

export { Todo, createNew, fromJSON };
