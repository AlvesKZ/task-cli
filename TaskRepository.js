export default class TaskRepository {
    constructor(filePath) {
        this.filePath = filePath;
    }

    createTask(taskJson) {
        fs.appendFile(this.filePath, taskJson, (e) => {
            if (e) {
                console.log("Error during create task");
            }
        });
    }
}