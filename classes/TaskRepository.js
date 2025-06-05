import fs from "fs";

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
                console.log("Error during create task");
            }
        }

        const taskObj = JSON.parse(taskJson);
        tasks.push(taskObj);

        fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
    }
}
