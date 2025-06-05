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
}
