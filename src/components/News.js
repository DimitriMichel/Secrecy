import React, { useState, useEffect } from "react";
import { Spinner } from "evergreen-ui";
import { stockKEY, newsKEY } from "../utils";
import { AnimatePresence, motion } from "framer-motion";

export const News = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  //API Call for  # articles
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsKEY}`
    )
      .then((response) => response.json())
      .then(
        (response) => {
          setLoading(false);
          setArticles(response.articles);
          console.log(response.articles);
        },
        // it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <AnimatePresence>
      <div>
        <motion.h2 className="page-header"
          style={{ display: "inline-block" }}
          animate={{ y: -10, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          News
        </motion.h2>
        <div className="article-grid-container">
          {articles.map((article, index) => (
            <div className="article" key={index}>
              <div className="article-image-container">
                <img
                  className="article-image"
                  src={article.urlToImage}
                  alt={article.title}
                />
              </div>
              <span className="article-author">{article.author}</span>
              <div className="article-title-container">
                <h4 className="article-title">{article.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};
