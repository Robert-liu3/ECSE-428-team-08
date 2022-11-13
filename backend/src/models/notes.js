import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: String,
    notes: String,
    creator: String,
    section: String,
})

const Notes =  mongoose.model('Notes', notesSchema);
export default Notes;