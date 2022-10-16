import mongoose from "mongoose";

let NoteSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{
    timestamps : true
});

mongoose.model('Note', NoteSchema);