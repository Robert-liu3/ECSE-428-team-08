import mongoose, { mongo } from "mongoose";

let ArticleBookmarkSchema = new mongoose.Schema({
    newsArticle: { type: mongoose.Schema.Types.ObjectID, ref: 'NewsArticle'}
},
{
    timestamps: true
});

mongoose.model('ArticleBookmark', ArticleBookmarkSchema);