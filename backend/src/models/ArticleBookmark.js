import mongoose from "mongoose";

// Bookmarks will be attached to an article and stored in a user's favourite articles or bookmarks list
let ArticleBookmarkSchema = new mongoose.Schema({
    newsArticle: { type: mongoose.Schema.Types.ObjectID, ref: 'NewsArticle'}
},
{
    timestamps: true
});

// Populate the newsArticle field in the database
ArticleBookmarkSchema.methods.toJSONFor = () => {
    return {
        newsArticle: this.newsArticle.toJSONFor(this.newsArticle)
    }
};

const ArticleBookmark = mongoose.model('ArticleBookmark', ArticleBookmarkSchema);
export default ArticleBookmark;