import mongoose from "mongoose";

let NoteSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{
    timestamps : true
});

// Populate the author field in the database
ArticleBookmarkSchema.methods.toJSONFor = user => {
    return {
        title: this.title,
        body: this.body,
        author: this.author.toProfileJSONFor(user)
    }
};

mongoose.model('Note', NoteSchema);