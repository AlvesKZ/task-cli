import read from "readline-sync";
import Task from "./classes/Task.js";
import TaskRepository from "./classes/TaskRepository.js";

function main() {
    const name = read.question("Enter the project name: ");
    const description = read.question("Enter the project description: ");
    const status = read.question("The project is done? (y/n) ");

    try {
        const task = new Task(name, description, status);
        task.validate();

        const repo = new TaskRepository("./task.json");
        repo.createTask(task.toJson());
        console.log("Task created successfully!");
    } catch (e) {
        console.log("Validation failed:", e.message);
    }
}

main();