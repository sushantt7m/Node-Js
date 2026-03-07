const Notes = require('../models/noteModel')

async function handleCreateNotes(req, res) {
    const body = req.body;

    if (!req.body) {
        return res.status(400).json({ msg: "content and title required" })
    }

    const note = await Notes.create(body)

    return res.status(201).json(note);
}

async function handleGetNotes(req,res){
    const allNotes = await Notes.find({})

    res.json(allNotes)
}

async function handleGetNoteById(req,res){
    const id = req.params.id;
    const note = await Notes.findById(id);
    return res.status(201).json(note)
}

async function updateNotesById(req,res){
    const body = req.body;
    const id = req.params.id;

    const note = await Notes.findByIdAndUpdate(id,body,{new:true})

    return res.status(200).json({msg:"Successfully Patched",Notes:note})
}

async function deleteNotesById(req,res){
    const id = req.params.id;

    const note =await Notes.findByIdAndDelete(id);
    return res.status(200).json({msg:"Note Successfully Deleted",Note:note})
}

module.exports = {
    handleCreateNotes,
    handleGetNotes,
    handleGetNoteById,
    updateNotesById,deleteNotesById
}