import axios from "axios";
import React, {useEffect, useState} from "react";
import Heart from "react-heart"

// Outside function for updating state of articles in containers
let updateNewsArticles;

// Get the user logged in
const userId = sessionStorage.getItem("currentUser")

function Header() {
  // Default search is for "stocks"
  const [query, setQuery] = useState("stocks");

  // Retrieve news articles
  async function apiCall() {
    let news = await axios.get("http://localhost:5000/news/getNews", {
      params: {
        query: query,
        category: "business"
      }
    });
    updateNewsArticles(news.data.articles.articles);
  }

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="section-header row">
          <div className="col-12">
            <h2 className="section-title h4 font-weight-bold font-alegreya">
              Latest in Stock News
            </h2>
          </div>
        </div>
      </div>

      {/*Search bar*/}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button className="btn btn-outline-secondary" type="button" onClick={apiCall}>
            <img src="https://icons.getbootstrap.com/assets/icons/search.svg" alt=""/>
          </button>
        </div>
        <input type="text" placeholder="Search for specific news..." className="form-control" onChange={s => setQuery(s.target.value)}></input>
      </div>
    </div>
  );
}

// Functions for adding and removing an article
async function addToFavorite(articleInfo, userId) {
  // Only add if the button is active (i.e. heart is colored)
  await axios.post("http://localhost:5000/news/addFavNews",null, {
    params: {
      title: articleInfo.articleTitle,
      description: articleInfo.articleDescription,
      body: articleInfo.articleBody,
      author: articleInfo.articleAuthor,
      url: articleInfo.articleUrl,
      imageUrl: articleInfo.articleImage,
      userId: userId
    }
  })
}

async function removeFromFavorite(bookmarkId, userId) {
  await axios.delete("http://localhost:5000/news/removeFavNews", {
    params: {
      articleToRemoveId: bookmarkId,
      userId: userId
    }
  })
}

// Will be used as a default to make cleaner
const LargeArticleContainer = (props) => {
  // Variables for article info
  let articleInfo = {
    articleTitle: props.title,
    articleDescription: props.description,
    articleBody: props.articleBody,
    articleAuthor: props.author,
    articleUrl: props.articleUrl,
    articleImage: props.imageUrl,
  }

  const [active, setActive] = useState(false)

  return (
    <div className="post mb-3 pb-3 border-bottom">
      <div className="post-media">
        <a href={articleInfo.articleUrl}>
          <img className="img-fluid" src={articleInfo.articleImage}  alt=""/>
        </a>
      </div>
      <div className="post-header">
        <div className="post-title h4 font-weight-bold">{articleInfo.articleTitle}</div>
      </div>
      <div className="post-body">
        <div className="post-content">{articleInfo.articleDescription}</div>
        <div className="post-date">
        <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" rel="stylesheet" type='text/css'/>
          <i className="fa fa-clock-o" aria-hidden="true"></i> 2 hours ago
        </div>
        <div style={{ display: "flex", width: "1.5rem" }}>
          <Heart isActive={active} onClick={() => {
            // Only sets active once for now
            if (!active) {
              setActive(true);
              addToFavorite(articleInfo, userId).catch(error => console.log(error));
            }
          }}/>
        </div>
      </div>
    </div>
  );
};

const SmallArticleContainer = (props) => {
  // Variables for article info
  let articleInfo = {
    articleTitle: props.title,
    articleDescription: props.description,
    articleBody: props.articleBody,
    articleAuthor: props.author,
    articleUrl: props.articleUrl,
    articleImage: props.imageUrl,
  }

  const [active, setActive] = useState(false)

  return (
    <div className="post mb-3 pb-3 border-bottom">
      <div className="row">
        <div className="col-auto">
          <div className="post-media ">
            <a href={articleInfo.articleUrl}>
              <img className="img-fluid" src={articleInfo.articleImage} width="100"  alt=""/>
            </a>
          </div>
        </div>
        <div className="col">
          <div className="post-header">
            <div className="post-title h5 font-weight-bold">{articleInfo.articleTitle}</div>
          </div>
          <div className="post-body">
            <div className="post-content">{articleInfo.articleDescription}</div>
            <div className="post-date">
              <i className="fa fa-clock-o" aria-hidden="true"></i> 2 hours ago
            </div>
            <div style={{ display: "flex", width: "1.5rem" }}>
              <Heart isActive={active} onClick={() => {
                // Only sets active once for now
                if (!active) {
                  setActive(true);
                  addToFavorite(articleInfo, userId).catch(error => console.log(error));
                }
              }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FavoritedNews = (props) => {
  // Get the bookmark of the user and use it to get article info
  const bookmark = props.bookmark;
  const [articleInfo, setArticleInfo] = useState({});

  useEffect(() => {
    async function getArticleInfo () {
      const articleFromBm = await axios.get("http://localhost:5000/news/getArticleFromBm", {
        params: { articleBm: bookmark}
      })
      setArticleInfo(articleFromBm.data);
    }

    getArticleInfo().catch(error => console.log(error));
  }, [articleInfo, bookmark])

  return (
    <div className="post mb-3 pb-1 border-bottom clearfix">
      <div className="post-media float-left mr-3"></div>
      <div className="post-header">
        <div className="post-title h6 font-weight-bold">
          <div className="col-auto">
            <div className="post-media ">
              <a href={articleInfo.url}>
                <img className="img-fluid" src={articleInfo.imageUrl} width="100"  alt=""/>
              </a>
            </div>
          </div>
          <div className="col">
            <div className="post-header">
              <div className="post-title h5 font-weight-bold">{articleInfo.title}</div>
            </div>
            <div className="post-body">
              <div className="post-content">{articleInfo.description}</div>
              <div className="post-date">
                <i className="fa fa-clock-o" aria-hidden="true"></i> 2 hours ago
              </div>
            </div>
            <div>
              <button className="btn btn-light" type="button" onClick={() => {
                removeFromFavorite(bookmark._id, userId).then(r => console.log("Removed successfully."))
              }}>
                <img src="https://icons.getbootstrap.com/assets/icons/trash.svg" alt=""></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function News() {
  // Local variables for news articles retrieved
  const [newsArticles, localUpdateNewsArticles] = useState([]);

  useEffect(() => {
    updateNewsArticles = localUpdateNewsArticles; // pass setter to outside function
  }, [])

  // Split articles into sets that need to be displayed
  const topArticles = newsArticles.slice(0, 4);
  const smallerArticles = newsArticles.slice(4, 10);

  // Get user's current favorite articles (in the form of bookmarks)
  const [favArticleBms, setFavArticleBms] = useState([]);

  useEffect(() => {
    async function getFavArticleBms() {
      let likedArticleBms = await axios.get("http://localhost:5000/news/getArticleBmsByUser", {
        params: { userId: userId }
      })
      setFavArticleBms(likedArticleBms.data);
    }

    getFavArticleBms();
  }, [favArticleBms])

  return (
    <>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"/>

      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <Header />

              {/*First column of articles*/}
              <div className="row">
                <div className="col-12 col-md-5 mb-3 mb-md-0">
                  <ul style={{ listStyleType: "none" }}>
                    {topArticles.map((article) => (
                      <li>
                        <LargeArticleContainer
                          imageUrl={article.urlToImage}
                          title={article.title}
                          description={article.description}
                          articleUrl={article.url}
                          articleBody={article.body}
                          author={article.author}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {/*Second column of articles*/}
                <div className="col-12 col-md-7">
                  <ul style={{ listStyleType: "none" }}>
                    {smallerArticles.map((article) => (
                      <li>
                        <SmallArticleContainer
                          imageUrl={article.urlToImage}
                          title={article.title}
                          description={article.description}
                          articleUrl={article.url}
                          articleBody={article.body}
                          author={article.author}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-10">
              <div className="sticky-sidebar">
                <div className="sticky-inside">
                  <div className="banner banner-sidebar mb-3 bg-light text-center"></div>
                  <div className="widget-posts gradient-back bg-light px-3 pb-3 pt-1 shadow ">
                    <div className="widget-header">
                      <div className="widget-title font-weight-bold">
                        Favorites
                      </div>
                    </div>
                    <div className="overflow-auto h-250 align-items-center pre-scrollable">
                      {/*Favorited news articles*/}
                      <ul style={{ listStyleType: "none" }}>
                        {favArticleBms.map((articleBm) => (
                            <li>
                              <FavoritedNews bookmark={articleBm}/>
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
