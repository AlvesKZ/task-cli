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


const taskJson = JSON.stringify(task, null, 2);

const createTask = (json) => {
    fs.appendFile("./task.json", json, (e) => {
        if(e) {
            console.log("Error during create task");
        }
    });
}

createTask(taskJson);

function validate(name, description, status) {
    if(status !== "y" || status !== "n" ) {
        console.log("Awnser the status whith 'y' or 'n'");
        return;
    }

    if(!name) {
        console.log("The field 'name' can't be empty");
        return;
    }
    
    if(!description) {
        console.log("The field 'name' can't be empty");
        return;
    }
}