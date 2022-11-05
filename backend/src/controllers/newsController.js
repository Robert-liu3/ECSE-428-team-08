import NewsAPI from "newsapi"
import NewsArticle from "../models/NewsArticle.js"
const newsapi = new NewsAPI('4e01875ffe8c42ef878ccd83a054fd00');

// Uses newsapi to retrieve top headlines
// Requires query param, optional for category and sources; used for filtering
export const getNews = async (req, res) => {
    let articles = {};
    try {
        // Get articles from API based on query and optional category or sources
        // Note that sources and category can't be used together
        await newsapi.v2.topHeadlines({
            q: req.query['query'],
            category: req.query['category'],
            sources: req.query['sources'],
            language: 'en',
        }).then(response => {
            articles = response;
        });

        res.json({ articles });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const addFavNews = async (req,res) => {
    const article = {title: req.query['title'],description: req.query['description'],body: req.query['body'],author: req.query['author'],url: req.query['url'],imageUrl: req.query['imageUrl']}
    console.log(req.query)
    
    const newArticle = new NewsArticle(article);
    newArticle.save()
        .then(() => res.send("Article added to fav"))
        .catch(err => res.json("Error: Not added" + err))

}

export const deleteAllArticles = async (req,res) => {

    NewsArticle.deleteOne({_id:'6366b9551f7ebe5f7d0d14a6'}, (err,obj)=>{if(err) throw err;});


}

// id: this._id,
//         title: this.title,
//         description: this.description,
//         body: this.body,
//         author: this.author,
//         url: this.url,
//         imageUrl: this.imageUrl
export const getAllArticles = async (req,res) => {
    NewsArticle.find({}, )
      .then(articles => res.json(articles))
      .catch(err => res.json("Error: Not found " + err))
  
  
  };