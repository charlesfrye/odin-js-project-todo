import { v4 as uuidv4 } from "uuid";

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
      this._title = string;
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
}

export { Project };
