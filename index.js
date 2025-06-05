import read from "readline-sync";
import fs from "fs";
import Task from "./Task";
import TaskRepository from "./TaskRepository";

function main() {
    const name = read.question("Enter the project name: ");
    const description = read.question("Enter the project description: ");
    const status = read.question("The project is done? (y/n) ");

    try {
        const task = new Task(name, description, status);
        task.validate();

        const repo = new TaskRepository("./task.json");
        repo.createTask(task.toJson());
    } catch (e) {
        console.log(e.message);
    }
}

main();
