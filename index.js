import read from "readline-sync";
import Task from "./classes/Task.js";
import TaskRepository from "./classes/TaskRepository.js";

function main() {
    console.log("Enter the number of the wanted service.");
    console.log("1 - List tasks.");
    console.log("2 - Create Task.");
    console.log("3 - Update Task.");
    console.log("4 - Delete Task.");

    const service = read.question();

    switch (service) {
        case "1":

            break;
        case "2":
            createTask();
            break;
        case "3":
            updateTask();
            break;
        case "4":

            break;
        default:
            console.log("Invalid option!");

            break;
    }
}

function createTask() {
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

function updateTask() {
    const id = read.questionInt("Enter the project ID: ");
    const name = read.question("Enter the new name: ");
    const description = read.question("Enter the new description: ");
    const status = read.question("The project is done? (y/n): ");

    try {
        const repo = new TaskRepository("./task.json");
        repo.updateTask(id, { name, description, status });

        console.log("Task updated successfully!");
    } catch (e) {
        console.log("Error updating task:", e.message);
    }
}


main();