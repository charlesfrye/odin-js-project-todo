import { v4 as uuidv4 } from "uuid";

class Portfolio {
  constructor(title) {
    this._title = title;
    this._id = uuidv4();
    this._projects = new Array();
    this.save();
  }

  get projects() {
    return this._projects;
  }

  addProject(project) {
    this._projects.push(project);
    this.save();
  }

  removeProject(project) {
    this._projects = this._projects.filter((input) => input.id !== project.id);
    this.save();
  }

  get todos() {
    return this._projects.flatMap((project) => project.todos);
  }

  mapTodos(f) {
    return this._projects.map((project) => [
      project.todos.map((todo) => f(todo, project)),
    ]);
  }

  save() {
    if (util.storageAvailable("localStorage")) {
      localStorage.setItem(`portfolio-${this._id}`, JSON.stringify(this));
    }
  }

  delete() {
    if (util.storageAvailable("localStorage")) {
      localStorage.removeItem(`portfolio-${this._id}`);
    }
  }
}

export { Portfolio };
