import mongoose, { mongo } from "mongoose";

let ArticleBookmarkSchema = new mongoose.Schema({
    newsArticle: { type: mongoose.Schema.Types.ObjectID, ref: 'NewsArticle'}
},
{
    timestamps: true
});

// Populate the newsArticle field in the database
ArticleBookmarkSchema.methods.toJSONFor = user => {
    return {
        newsArticle: this.newsArticle.toJSONFor(newsArticle)
    }
};

mongoose.model('ArticleBookmark', ArticleBookmarkSchema);