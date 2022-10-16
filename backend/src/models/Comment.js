import mongoose from "mongoose";

let CommentSchema = new mongoose.Schema({
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    newsArticle: { type: mongoose.Schema.Types.ObjectId, ref: 'NewsArticle'}
},
{
    timestamps: true
}); // save the createdAt and updatedAt data for the comment

// Populate the author field in the database
CommentSchema.methods.toJSONFor = user => {
    return {
        id: this._id,
        body: this.body,
        createdAt: this.createdAt,
        author: this.author.toProfileJSONFor(user)
    }
};

mongoose.model('Comment', CommentSchema);