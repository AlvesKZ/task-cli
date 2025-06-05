import read from "readline-sync";
import fs from "fs";


const name = read.question("Enter the project name: ");
const description = read.question("Enter the project description: ");
const status = read.question("The project is done? (y/n) ");

validate(name, description, status);

const task = {
    name,
    description,
    status,
}



const createTask = (json) => {
    fs.appendFile("./task.json", json, (e) => {
        if (e) {
            console.log("Error during create task");
        }
    });
}

createTask(taskJson);
