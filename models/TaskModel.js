import fs from "fs";

const filePath = "../task.json";

class task {
    constructor(name, description, status) {
        this.name = name;
        this.description = description;
        this.status = status
    }

    showTasks(name) {

    }

    createTask() {
        data = {
            name: this.name,
            description: this.description,
            status: this.status
        }

        const jsonData = JSON.stringify(data, null, 3);
        fs.writeFile(filePath, jsonData, "utf8", err => {
            if(err) {
                console.log("Error creating task!");
                return;
            }
        });

        console.log("Task created!");
    }
}