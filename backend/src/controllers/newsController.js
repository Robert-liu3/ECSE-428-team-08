import NewsAPI from "newsapi"
const newsapi = new NewsAPI('4e01875ffe8c42ef878ccd83a054fd00');

export const getNews = async (req, res) => {
    let articles = {};
    try {
        await newsapi.v2.topHeadlines({
            q: 'stocks',
            category: 'business',
            language: 'en',
        }).then(response => {
            articles = response;
        });

        // console.log(articles);
        res.json({ articles });
    } catch (error) {
        res.json({ message: error.message });
    }
}
