import NewsAPI from "newsapi"
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
