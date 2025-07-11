export default class Task {
    constructor(name, description, status) {
        this.id = null;
        this.name = name;
        this.description = description;
        this.status = status;
    }

    validate() {
        if (this.status !== "y" && this.status !== "n") {
            throw new Error("Answer the status with 'y' or 'n'");
        }

        if (!this.name) {
            throw new Error("The field 'name' can't be empty");
        }

        if (!this.description) {
            throw new Error("The field 'description' can't be empty");
        }

        this.setStatus();
    }

    setStatus() {
        if (this.status === "y") {
            this.status = "Done";
        }
        if (this.status === "n") {
            this.status = "In progress";
        }
    }

    toJson() {
        return JSON.stringify(this, null, 2);
    }
}
