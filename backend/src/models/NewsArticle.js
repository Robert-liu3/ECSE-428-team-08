import mongoose, { mongo } from "mongoose";

let ArticleSchema = new mongoose.Schema({
    title: String,
    description: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
},
{
    timestamps: true
}); // save the createdAt and updatedAt data for the article

// Populate the author field in the database
ArticleSchema.methods.toJSONFor = (user) => {
    return {
        id: this._id,
        title: this.title,
        description: this.description,
        body: this.body,
        author: this.author.toProfileJSONFor(user),
    }
};

mongoose.model('NewsArticle', ArticleSchema);