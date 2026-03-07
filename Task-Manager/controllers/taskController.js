const Task = require("../models/taskModel")


async function handleCreateTask(req, res) {
    const body = req.body;

    const task = await Task.create(req.body);
    return res.status(201).json(task);

}

// handle get all task
async function handleGetTask(req, res) {
    const allTask = await Task.find({});
    return res.status(201).json(allTask)
}

// handle get task by filter
async function handleGetTask(req, res) {
    const filter = req.query;
    const task  = await Task.find(filter)
    return res.status(200).json(task)
}

async function handleGetTaskById(req, res) {
    const id = req.params.id;
    const task = await Task.findById(id);
    return res.status(201).json(task);
}


async function handleUpdateById(req,res){
    const body = req.body;
    const id = req.params.id;

    const task = await Task.findByIdAndUpdate(id,body,{new:true})
    return res.status(201).json({msg:"Task SUccessfully Updated",task:task});
}

async function handleDeleteTask(req,res){
    const id = req.param.id
    const task = await Task.findByIdAndDelete(id);
    if(!task){
        return res.json({msg:"task not found"});
    }

    return res.status(200).json({msg:`task successfully Deleted`,task:task})
}




module.exports = {
    handleCreateTask,
    handleGetTask,
    handleGetTaskById,
    handleUpdateById,
    handleDeleteTask,
}