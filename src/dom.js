class Portfolio {
  constructor(container, portfolioManager) {
    this.manager = portfolioManager;
    this.container = container;
  }

  setup() {
    this.div = document.createElement("div");
    this.div.classList.add("portfolio");

    this.container.appendChild(this.div);

    this.setupProjects();

    const projectCreator = document.createElement("div");
    projectCreator.classList.add("project");
    projectCreator.innerText = "+ Create New";
    projectCreator.setAttribute(
      "style",
      "align-content: center; align-items:center;"
    );
    this.div.appendChild(projectCreator);
  }

  setupProjects() {
    const projectManagers = this.manager.projects;
    this.projects = projectManagers.map(
      (projectManager) => new Project(this, projectManager)
    );
    this.projects.map((project) => project.setup());
  }
}

class Project {
  constructor(portfolio, projectManager) {
    this.portfolio = portfolio;
    this.manager = projectManager;
  }

  setup() {
    this.div = document.createElement("div");
    this.div.classList.add("project");

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("header");

    const deleteButton = document.createElement("h3");
    deleteButton.classList.add("delete");
    deleteButton.innerText = "X";
    deleteButton.addEventListener("click", () => this.remove());

    const headerText = document.createElement("h3");
    headerText.innerText = `${this.manager.title}`;

    headerDiv.appendChild(deleteButton);
    headerDiv.appendChild(headerText);
    this.div.appendChild(headerDiv);

    this.portfolio.div.appendChild(this.div);
    this.setupTodos();
  }

  setupTodos() {
    const todoManagers = this.manager.todos;
    this.todos = todoManagers.map((todoManager) => new Todo(this, todoManager));
    this.todos.map((todo) => todo.setup());
  }

  remove() {
    this.portfolio.manager.removeProject(this.manager);
    this.div.remove();
    this.save();
  }

  save() {
    this.portfolio.manager.save();
  }
}

class Todo {
  constructor(project, todoManager) {
    this.project = project;
    this.manager = todoManager;
  }

  setup() {
    this.div = document.createElement("div");
    this.div.classList.add("todo");

    const titleSpan = document.createElement("span");
    titleSpan.innerText = `${this.manager.title}`;
    titleSpan.addEventListener("click", (_) => this.handleClick());
    this.div.appendChild(titleSpan);

    const deleteButton = document.createElement("p");
    deleteButton.classList.add("delete");
    deleteButton.innerText = "X";
    this.div.appendChild(deleteButton);
    deleteButton.addEventListener("click", (_) => this.remove());

    this.project.div.appendChild(this.div);

    this.styleComplete();
  }

  handleClick() {
    this.manager.isComplete = !this.manager.isComplete;
    this.styleComplete();
    this.save();
  }

  styleComplete() {
    const todoDiv = this.div;
    if (this.manager.isComplete) {
      todoDiv.classList.add("complete");
    } else {
      todoDiv.classList.remove("complete");
    }
  }

  remove() {
    this.project.manager.removeTodo(this.manager);
    this.div.remove();
    this.save();
  }

  save() {
    this.project.portfolio.manager.save();
  }
}

function setup(portfolioManager) {
  document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("container");
    const portfolio = new Portfolio(container, portfolioManager);
    portfolio.setup();
    for (const element of document.getElementsByClassName("delete")) {
      addDeleteHandler(element);
    }
  });
}

export { setup };
