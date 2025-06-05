class Task {
    constructor(name, description, status) {
        this.name = name;
        this.description = description;
        this.status = status;
    }

    validate() {
        if (this.status !== "y" || this.status !== "n") {
            console.log("Awnser the status whith 'y' or 'n'");
            return;
        }

        if (!this.name) {
            console.log("The field 'name' can't be empty");
            return;
        }

        if (!this.description) {
            console.log("The field 'description' can't be empty");
            return;
        }
    }

    toJson(task) {
        return JSON.stringify(task, null, 2);
    }
}
