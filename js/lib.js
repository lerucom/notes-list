export class Task {
    constructor(name) {
        this.name = name;
        this.done = false; // не сделано / сделано

    }
}

export class TaskList { // несмотря на то что будет только один
    constructor() {
        this.items = [];
    }

    add(item) {
        this.items.push(item); // в конец
    }

    remove(item) {
        const index = this.items.indexOf(item);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        //TODO:
    }

    up(item) {
        // [1, 2, 3] -> up(3)
        const index = this.items.indexOf(item);

        if (index !== -1) {
            const previous = this.items[index - 1];
            this.items[index - 1] = item;
            this.items[index] = previous;
        }
    }

    down(item) {
        const index = this.items.indexOf(item);

        if (index !== -1) {

            const next = this.items[index + 1];
            this.items[index + 1] = item;
            this.items[index] = next;
        }
    }
}