import mongoose from "mongoose";

// Schema for news articles
let ArticleSchema = new mongoose.Schema({
    title: String,
    description: String,
    body: String,
    author: String,
    url: String,
    imageUrl: String
},
{
    // save the createdAt and updatedAt data for the article
    timestamps: true
});

// Used to populate database with an article
ArticleSchema.methods.toJSONFor = () => {
    return {
        id: this._id,
        title: this.title,
        description: this.description,
        body: this.body,
        author: this.author,
        url: this.url,
        imageUrl: this.imageUrl
    }
};

ArticleSchema.method.toProfileJSONFor = () => {
    return {
        id: this._id,
        title: this.title,
        description: this.description,
        body: this.body,
        author: this.author,
        url: this.url,
        imageUrl: this.imageUrl
    }
};

// Creates model for a news article
const NewsArticle = mongoose.model('NewsArticle', ArticleSchema);
export default NewsArticle;