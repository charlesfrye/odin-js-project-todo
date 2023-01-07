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
    this.div.innerHTML += `<h3>${this.manager.title}</h3>`;
    this.portfolio.div.appendChild(this.div);
    this.setupTodos();
    this.div.addEventListener("mousedown", (event) =>
      util.handleHold(event, this)
    );
    this.div.addEventListener("touchstart", (event) =>
      util.handleHold(event, this)
    );
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
    this.div.innerHTML += `<p>${this.manager.title}</p>`;
    // this.div.addEventListener("click", (_) => this.handleClick());
    this.div.addEventListener("mousedown", (event) =>
      util.handleHold(event, this)
    );
    this.div.addEventListener("touchstart", (event) =>
      util.handleHold(event, this)
    );
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
  });
}

export { setup };
