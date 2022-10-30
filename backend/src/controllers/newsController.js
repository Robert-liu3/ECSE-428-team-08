import NewsAPI from "newsapi"
const newsapi = new NewsAPI('4e01875ffe8c42ef878ccd83a054fd00');

// Uses newsapi to retrieve top headlines with "stocks" as a keyword
export const getNews = async (req, res) => {
    let articles = {};
    try {
        // get articles from API
        await newsapi.v2.topHeadlines({
            q: 'stocks',
            category: 'business',
            language: 'en',
        }).then(response => {
            articles = response;
        });

        res.json({ articles });
    } catch (error) {
        res.json({ message: error.message });
    }
}
