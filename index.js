import read from "readline-sync";
import Task from "./classes/Task.js";
import TaskRepository from "./classes/TaskRepository.js";

function main() {
    console.log("1 - List all tasks.");
    console.log("2 - Create Task.");
    console.log("3 - Update Task.");
    console.log("4 - Delete Task.");
    console.log("5 - List Done Tasks.");
    console.log("6 - List In Progress Tasks.");


    const service = read.question();

    switch (service) {
        case "1":
            listTask();
            break;
        case "2":
            createTask();
            break;
        case "3":
            updateTask();
            break;
        case "4":
            deleteTask();
            break;
        case "5":
            listDone();
            break;
        case "6":
            listInProgress();
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

function listTask() {
    const repo = new TaskRepository("./task.json");
    repo.listTasks();
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

function deleteTask() {
    const id = read.questionInt("Enter the project ID: ");

    try {
        const repo = new TaskRepository("./task.json");
        repo.deleteTask(id)

        console.log("Task deleted successfully!");
    } catch (e) {
        console.log("Error deleting task:", e.message);
    }
}

function listDone() {
    const repo = new TaskRepository("./task.json");
    repo.listDoneTasks();
}

function listInProgress() {
    const repo = new TaskRepository("./task.json");
    repo.listInProgressTasks();
}


main();