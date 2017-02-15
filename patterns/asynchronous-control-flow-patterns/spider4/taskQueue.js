function TaskQueue (concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
}

TaskQueue.prototype.pushTask = function (task) {
    this.queue.push(task);
    this.next();
};

TaskQueue.prototype.next = function() {
    while (this.running < this.concurrency && this.queue.length) {
        let task = this.queue.shift();

        task((err) => {
            this.running--;
            this.next();
        });

        this.running++;
    }
};

module.exports = TaskQueue;