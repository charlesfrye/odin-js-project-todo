import * as dates from "date-fns";
import { v4 as uuidv4 } from "uuid";

import * as util from "./util";

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
}

export { Todo };
