import axios from "axios";
import React, { useState, useEffect } from "react";
import Heart from "react-heart"

function Header() {
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

  // // Will be used temporarily to get the user logged in
  const userId = localStorage.getItem("currentUser")

  const [active, setActive] = useState(false)

  return (
    <div className="post mb-3 pb-3 border-bottom">
      <div className="post-media">
        <a href={articleInfo.articleUrl}>
          <img className="img-fluid" src={articleInfo.articleImage}  alt={"https://u.osu.edu/duska.7/files/2017/04/stock-market-3-21gyd1b.jpg"}/>
        </a>
      </div>
      <div className="post-header">
        <div className="post-title h4 font-weight-bold">{articleInfo.articleTitle}</div>
      </div>
      <div className="post-body">
        <div className="post-content">{articleInfo.articleDescription}</div>
        <div className="post-date">
        <link 
  href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" 
  rel="stylesheet"  type='text/css'></link>
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
  const articleImage = props.imageUrl;
  const articleTitle = props.title;
  const articleDescription = props.description;
  const articleUrl = props.articleUrl;

  const [active, setActive] = useState(false)

  return (
    <div className="post mb-3 pb-3 border-bottom">
      <div className="row">
        <div className="col-auto">
          <div className="post-media ">
            <a href={articleUrl}>
              <img className="img-fluid" src={articleImage} width="100"  alt={"https://u.osu.edu/duska.7/files/2017/04/stock-market-3-21gyd1b.jpg"}/>
            </a>
          </div>
        </div>
        <div className="col">
          <div className="post-header">
            <div className="post-title h5 font-weight-bold">{articleTitle}</div>
          </div>
          <div className="post-body">
            <div className="post-content">{articleDescription}</div>
            <div className="post-date">
              <i className="fa fa-clock-o" aria-hidden="true"></i> 2 hours ago
            </div>
            <div style={{ display: "flex", width: "1.5rem" }}>
              <Heart isActive={active} onClick={() => setActive(!active)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function FavoritedNews() {
  return (
    <div className="post mb-3 pb-1 border-bottom clearfix">
      <div className="post-media float-left mr-3"></div>
      <div className="post-header">
        <div className="post-title h6 font-weight-bold">
          Find your favorited news articles right here!
        </div>
      </div>
    </div>
  );
}

export default function News() {
  // Variable will store the articles obtained from api
  // Requires initial value
  const [newsArticles, setArticles] = useState([]);

  // When the call is made, update newsArticles
  useEffect(() => {
    async function apiCall() {
      let news = await axios.get("http://localhost:5000/news/getNews", {
        params: {
          query: "stocks",
          category: "business"
        }
      });
      setArticles(news.data.articles.articles);
    }

    apiCall();
  }, []);

  // Split articles into sets that need to be displayed
  const topArticles = newsArticles.slice(0, 4);
  const smallerArticles = newsArticles.slice(4, 10);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      ></link>

      <section class="section">
        <div class="container">
          <div class="row">
            <div class="col-xl-9 col-lg-8">
              <Header />

              {/*First column of articles*/}
              <div class="row">
                <div class="col-12 col-md-5 mb-3 mb-md-0">
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
                <div class="col-12 col-md-7">
                  <ul style={{ listStyleType: "none" }}>
                    {smallerArticles.map((article) => (
                      <li>
                        <SmallArticleContainer
                          imageUrl={article.urlToImage}
                          title={article.title}
                          description={article.description}
                          articleUrl={article.url}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4">
              <div class="sticky-sidebar">
                <div class="sticky-inside">
                  <div class="banner banner-sidebar mb-3 bg-light text-center"></div>
                  <div class="widget-posts gradient-back text-white bg-light px-3 pb-3 pt-1 shadow ">
                    <div class="widget-header">
                      <div class="widget-title">
                        Favorites
                      </div>
                    </div>
                    
                    <ul style={{ listStyleType: "none" }}>
                      <li>
                        <FavoritedNews />
                      </li>

                      <li>
                        <FavoritedNews />
                      </li>

                      <li>
                        <FavoritedNews />
                      </li>

                      <li>
                        <FavoritedNews />
                      </li>
                    </ul>
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
