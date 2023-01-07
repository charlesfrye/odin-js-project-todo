import { v4 as uuidv4 } from "uuid";

import * as projects from "./projects";
import * as util from "./util";

class Portfolio {
  constructor(title, id, projects) {
    this.title = title;
    this.id = id;
    this.projects = new Array();
    projects.map((project) => this.addProject(project));
  }

  addProject(project) {
    this.projects.push(project);
    this.save();
  }

  removeProject(project) {
    this._projects = this._projects.filter((input) => input.id !== project.id);
    this.save();
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

function createNew(title) {
  return new Portfolio(title, uuidv4(), new Array());
}

function fromJSON(json) {
  const projs = json.projects.map((proj) => projects.fromJSON(proj));
  const portfolio = new Portfolio(json.title, json.id, projs);
  return portfolio;
}

export { Portfolio, createNew, fromJSON };
