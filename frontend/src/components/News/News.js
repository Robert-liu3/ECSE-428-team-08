import axios from "axios"
import React, { useState, useEffect } from "react";

function Header() {
    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="section-header row">
                    <div className="col-12">
                        <h2 className="section-title h4 font-weight-bold font-alegreya">WORLD</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Will be used as a default to make cleaner

async function LargeArticleContainer() {
    const[articles,setArticles] = useState();
    //x holds articles
    useEffect(() => {
        async function apiCall(){
            var x = await axios.get("http://localhost:5000/news");
            setArticles(x.data);



        }
        apiCall();


    }, []);

    console.log(articles);

    //console.log(axios.get("http://localhost:5000/news"));
    return (
        <div className="post mb-3 pb-3 border-bottom">
            <div className="post-media">
                {articles.urlToImage}
                

            </div>
            <div className="post-header">
                <div className="post-supertitle">CATEGORY</div>
                <div className="post-title h4 font-weight-bold">Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur
                </div>
            </div>
            <div className="post-body">
                <div className="post-content">Quis autem vel eum iure reprehenderit qui in ea
                    voluptate velit esse quam nihil molestiae consequatur, vel illum qui
                    dolorem
                </div>
                <div className="post-date">
                    <i className="fa fa-clock-o" aria-hidden="true"></i> 2 hours ago
                </div>
            </div>
        </div>
    )
}

function SmallArticleContainer() {
    return (
        <div className="post mb-3 pb-3 border-bottom">
            <div className="row">
                <div className="col-auto">
                    <div className="post-media ">

                    </div>
                </div>
                <div className="col">
                    <div className="post-header">
                        <div className="post-title h5 font-weight-bold">Sed ut perspiciatis unde
                            omnis iste natus error sit voluptatem accusantium doloremque.
                        </div>
                    </div>
                    <div className="post-body">
                        <div className="post-content">Quis autem vel eum iure reprehenderit qui
                            in ea voluptate velit esse quam nihil.
                        </div>
                        <div className="post-date">
                            <i className="fa fa-clock-o" aria-hidden="true"></i> 2 hours ago
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LatestSideBarArticle() {
    return (
        <div className="post mb-3 pb-1 border-bottom clearfix">
            <div className="post-media float-left mr-3">

            </div>
            <div className="post-header">
                <div className="post-title h6 font-weight-bold">Sed ut perspiciatis unde
                    omnis iste natus error sit voluptatem accusantium doloremque.
                </div>
            </div>
        </div>
    )
}

export default function News() {
    let news = []

    return (
        <>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
            </link>

            <section class="section">
                <div class="container">

                    <div class="row">
                        <div class="col-xl-9 col-lg-8">

                            <Header/>

                            <div class="row">
                                <div class="col-12 col-md-5 mb-3 mb-md-0">
                                    <ul style={{listStyleType: "none"}}>
                                        <li>
                                            <LargeArticleContainer/>
                                        </li>

                                        <li>
                                            <LargeArticleContainer/>
                                        </li>

                                        <li>
                                            <LargeArticleContainer/>
                                        </li>

                                        <li>
                                            <LargeArticleContainer/>
                                        </li>
                                    </ul>

                                </div>
                                <div class="col-12 col-md-7">
                                    <ul style={{listStyleType: "none"}}>
                                        <li>
                                            <SmallArticleContainer/>
                                        </li>

                                        <li>
                                            <SmallArticleContainer/>
                                        </li>

                                        <li>
                                            <SmallArticleContainer/>
                                        </li>

                                        <li>
                                            <SmallArticleContainer/>
                                        </li>

                                        <li>
                                            <SmallArticleContainer/>
                                        </li>

                                        <li>
                                            <SmallArticleContainer/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4">
                            <div class="sticky-sidebar">
                                <div class="sticky-inside">
                                    <div class="banner banner-sidebar mb-3 bg-light text-center">

                                    </div>
                                    <div class="widget-posts gradient-back text-white bg-light px-3 pb-3 pt-1 shadow ">

                                        <div class="widget-header">
                                            <div class="widget-title">Latest</div>
                                        </div>

                                        <ul style={{ listStyleType: 'none' }}>
                                            <li>
                                                <LatestSideBarArticle/>
                                            </li>

                                            <li>
                                                <LatestSideBarArticle/>
                                            </li>

                                            <li>
                                                <LatestSideBarArticle/>
                                            </li>

                                            <li>
                                                <LatestSideBarArticle/>
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
    )

}