import read from "readline-sync";
import fs from "fs";

const name = read.question("Enter the project name: ");
const description = read.question("Enter the project description: ");
const status = read.question("The project is done? (y/n) ");

if(status !== y || status !== n ) {
    return (console.log("Awnser the status whith 'y' or 'n'"));
}

const createTask = () => {

}