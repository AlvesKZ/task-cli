import fs from "fs";

import Task from "./Task.js";

export default class TaskRepository {
    constructor(filePath) {
        this.filePath = filePath;
    }

    createTask(taskJson) {
        let tasks = [];

        if (fs.existsSync(this.filePath)) {
            const fileContent = fs.readFileSync(this.filePath, "utf-8");
            try {
                tasks = JSON.parse(fileContent);
            } catch (e) {
                console.log("Error reading JSON. Starting with empty list.");
            }
        }

        const taskObj = JSON.parse(taskJson);

        const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id || 0)) + 1 : 1;
        taskObj.id = nextId;

        tasks.push(taskObj);

        fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
    }

    listTasks() {
        if (!fs.existsSync(this.filePath)) {
            console.log("No tasks found.");
            return;
        }

        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        let tasks = [];

        try {
            tasks = JSON.parse(fileContent);
        } catch (e) {
            throw new Error("Error reading task file.");
        }

        if (tasks.length === 0) {
            console.log("No tasks found.");
            return;
        }

        console.log("=== Task list ===");
        tasks.forEach(task => {
            console.log(`ID: ${task.id}`);
            console.log(`Name: ${task.name}`);
            console.log(`Description: ${task.description}`);
            console.log(`Status: ${task.status}`);
            console.log("-------------------------");
        });
    }


    updateTask(taskId, updatedData) {
        let tasks = [];

        if (fs.existsSync(this.filePath)) {
            const fileContent = fs.readFileSync(this.filePath, "utf-8");
            try {
                tasks = JSON.parse(fileContent);
            } catch (e) {
                throw new Error("Error reading task file.");
            }
        }

        const index = tasks.findIndex(t => t.id === taskId);
        if (index === -1) {
            throw new Error("Task not found.");
        }

        const updatedTask = new Task(
            updatedData.name,
            updatedData.description,
            updatedData.status
        );

        updatedTask.validate();
        updatedTask.id = taskId;

        tasks[index] = updatedTask;

        fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
    }

    deleteTask(taskId) {
        let tasks = [];

        if (fs.existsSync(this.filePath)) {
            const fileContent = fs.readFileSync(this.filePath, "utf-8");
            try {
                tasks = JSON.parse(fileContent);
            } catch (e) {
                throw new Error("Error reading task file.");
            }
        }

        const index = tasks.findIndex(t => t.id === taskId);
        if (index === -1) {
            throw new Error("Task not found.");
        }

        tasks.splice(index, 1);

        fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
    }

    listDoneTasks() {
        if (!fs.existsSync(this.filePath)) {
            console.log("No tasks found.");
            return;
        }

        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        let tasks = [];

        try {
            tasks = JSON.parse(fileContent);
        } catch (e) {
            throw new Error("Error reading task file.");
        }

        const doneTasks = tasks.filter(task => task.status === "Done");

        if (doneTasks.length === 0) {
            console.log("No completed tasks found.");
            return;
        }

        console.log("=== Completed Tasks (Done) ===");
        doneTasks.forEach(task => {
            console.log(`ID: ${task.id}`);
            console.log(`Name: ${task.name}`);
            console.log(`Description: ${task.description}`);
            console.log(`Status: ${task.status}`);
            console.log("-------------------------");
        });
    }

    listInProgressTasks() {
        if (!fs.existsSync(this.filePath)) {
            console.log("No tasks found.");
            return;
        }

        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        let tasks = [];

        try {
            tasks = JSON.parse(fileContent);
        } catch (e) {
            throw new Error("Error reading task file.");
        }

        const inProgressTasks = tasks.filter(task => task.status === "In progress");

        if (inProgressTasks.length === 0) {
            console.log("No in-progress tasks found.");
            return;
        }

        console.log("=== In Progress Tasks ===");
        inProgressTasks.forEach(task => {
            console.log(`ID: ${task.id}`);
            console.log(`Name: ${task.name}`);
            console.log(`Description: ${task.description}`);
            console.log(`Status: ${task.status}`);
            console.log("-------------------------");
        });
    }

}
