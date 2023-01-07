import * as dates from "date-fns";
import { v4 as uuidv4 } from "uuid";

import * as util from "./util";

class Todo {
  constructor(title, id) {
    this.title = title;
    this.id = id;
    this.isComplete = false;
  }

  setDate(dateArray) {
    if (dateArray.length < 3) {
      console.log(`invalid dateArray for date: ${dateArray}`);
    }
    this.date = new Date(dateArray[0], dateArray[1], dateArray[2]);
  }

  getDateStr() {
    return dates.format(this._date, "yyyy-MM-dd");
  }

  markComplete() {
    this.isComplete = true;
  }

  markIncomplete() {
    this.isComplete = false;
  }

  setDescription(string) {
    this.description = string;
  }
}

function createNew(title) {
  return new Todo(title, uuidv4());
}

function fromJSON(json) {
  const todo = new Todo(json.title, json.id);
  return todo;
}

export { Todo, createNew, fromJSON };
