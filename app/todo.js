(function(root) {
    root.TODO = function(addTask, updateCount) {
        this._todo = []

        this._addTask = addTask
        this._updateCount = updateCount

        this.push("git init")
    }

    root.TODO.prototype.push = function(text) {
        this._todo.push(text)

        this._addTask(text)
        this._updateCount(this._todo.length)
    }
})(this)
