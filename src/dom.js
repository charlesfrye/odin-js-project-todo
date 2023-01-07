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

  remove() {
    this.div.remove();
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
  }

  setupTodos() {
    const todoManagers = this.manager.todos;
    this.todos = todoManagers.map((todoManager) => new Todo(this, todoManager));
    this.todos.map((todo) => todo.setup());
  }

  remove() {
    this.div.remove();
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
    this.div.addEventListener("click", (event) => handleClick(event.target));
    this.project.div.appendChild(this.div);
  }

  remove() {
    this.div.remove();
  }
}

function handleClick(todoDiv) {
  if (todoDiv.classList.contains("complete")) {
    todoDiv.classList.remove("complete");
  } else {
    todoDiv.classList.add("complete");
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
