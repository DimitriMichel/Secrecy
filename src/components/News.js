import React, { useEffect, useState } from "react";
import { SearchInput, Spinner } from "evergreen-ui";
import { NEWSKEY } from "../utils";
import { articleAnimVariants } from "../utils/animConfig";
import { AnimatePresence, motion } from "framer-motion";

export const News = () => {
  const [isLoading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  //API Call for  # articles
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?pageSize=8&country=us&category=business&apiKey=${NEWSKEY}`
    )
      .then((response) => response.json())
      .then(
        (response) => {
          setArticles(response.articles);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          setLoading(false);
        }
      );
  }, []);

  for (let article of articles) {
    article.source.name = article.title.match(/([^-])*$/g).join("");
    //(?!(?:COVID-19)(?![\w-]))\S[^-]*$

    article.newTitle = article.title.replace(
      /(?!(?:COVID-19)(?![\w-]))\S[^-]*$/g,
      ""
    );
    //article.newTitle = article.title.replace(/-.*$/g, "");
    console.log(article.source.name);
    console.log(article.newTitle);
  }

  return isLoading && articles.length === 0 ? (
    <div className="spinner">
      <Spinner />
    </div>
  ) : (
    <AnimatePresence>
      <div>
        <motion.h2
          className="page-title"
          style={{ display: "inline-block" }}
          animate={{ y: [10, 0], opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          News
        </motion.h2>
        <div className="search-container">
          <motion.div
            animate={{ y: -10, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <SearchInput placeholder="Search Ticker.." height={35} />
          </motion.div>
        </div>
        <motion.div
          className="headline-grid-container"
          initial="hidden"
          animate="visible"
          variants={articleAnimVariants}
        >
          <div className="title-stories">
            <h1>{articles[0].newTitle}</h1>
            <div>{articles[0].description}</div>
            <div className="sub-headlines-container">
              <div className="sub-headline">{articles[1].newTitle}</div>
              <div className="sub-headline">{articles[2].newTitle}</div>
              <div className="sub-headline">{articles[3].newTitle}</div>
            </div>
          </div>
          <div className="headline-image-container">
            <img
              className="headline-image"
              src={articles[0].urlToImage}
              alt=""
            />
          </div>
        </motion.div>
        <motion.div className="sub-article-grid-container">
          {articles.map((article, index) => (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={articleAnimVariants}
              transition={{ staggerChildren: 0.1 }}
              className="article"
              key={index}
            >
              <div className="article-title-container">
                <span className="article-author">{article.source.name}</span>
                <h4 className="article-title">{article.newTitle}</h4>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
