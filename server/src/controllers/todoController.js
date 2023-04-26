const todoModel = require("../models/todoModel");

const todoController = {
    async getAll(req, res) {
        try {
            const uid = req.user.uid
            const { priority, isComplete } = req.body;
            const condition = { priority, isComplete, uid }
            if (!priority) {
                delete condition.priority
            }
            if (!isComplete) {
                delete condition.isComplete
            }
            const todos = await todoModel.find(condition).sort({ 'createdAt': -1 });
            res.status(200).json(todos)
        } catch (error) {
            res.status(500).json('server is error')
        }
    },
    async create(req, res) {
        try {
            const uid = req.user.uid
            const { content, priority } = req.body;
            const todo = await todoModel.create({ content, priority, uid })
            res.status(200).json(todo)
        } catch (error) {
            res.status(500).json('server is error')
        }
    }, async update(req, res) {
        try {
            const { id } = req.params
            const { content, priority, isComplete } = req.body;
            const todo = await todoModel.findByIdAndUpdate(id, { content, priority, isComplete }, { new: true })
            res.status(200).json(todo)
        } catch (error) {
            res.status(500).json('server is error')
        }
    }, async delete(req, res) {
        try {
            const { id } = req.params
            await todoModel.findByIdAndDelete(id)
            res.status(200).json('delete success')
        } catch (error) {
            res.status(500).json('server is error')
        }
    }
}

module.exports = todoController