import React, { useEffect, useState } from "react";
import { SearchInput, Spinner } from "evergreen-ui";
import { NEWSKEY, STOCKKEY } from "../utils";
import { articleAnimVariants } from "../utils/animConfig";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "evergreen-ui";
import { v4 as uuidv4 } from "uuid";
import Chart from "./Chart";
import { appleStock } from "@vx/mock-data";
import { thresholdFreedmanDiaconis } from "d3-array";

export const News = () => {
  const [isLoading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [stockArticles, setStockArticles] = useState([]);
  const [spyData, setSPYData] = useState([]);

  //API Call for  # articles
  useEffect(() => {
    //Fetch News API
    fetch(
      `https://newsapi.org/v2/top-headlines?pageSize=20&country=us&category=business&apiKey=${NEWSKEY}`
    )
      .then((response) => response.json())
      .then(
        (response) => {
          setArticles(response.articles);
        },
        (error) => {
          console.log(error);
        }
      );
    //Fetch Finance News API.. SPY for general S&P news
    /*fetch(`https://cloud.iexapis.com/stable/stock/SPY/news?token=${STOCKKEY}`)
      .then((response) => response.json())
      .then((response) => {
        setStockArticles(response);
      });*/
    /*fetch(
      `https://cloud.iexapis.com/stable/stock/SPY/chart/max?token=${STOCKKEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setSPYData(response);
        setLoading(false);
      });*/
  }, []);

  // Remove hyphen and source from titles and put them into a newTitle property.
  //ex. "New Miracle Immunotherapy Treatment - Medical Journal" -> "New Miracle Immunotherapy Treatment"
  for (let article of articles) {
    article.source.name = article.title.match(/([^-])*$/g).join("");
    article.newTitle = article.title.replace(
      /(?!(?:COVID-19)(?![\w-]))\S[^-]*$/g,
      ""
    );
  }

  return articles.length === 0 ? (
    <div className="spinner">
      <Spinner />
    </div>
  ) : (
    <AnimatePresence>
      <div className="news-component">
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
            <div className="headline">
              <div>{articles[1].newTitle}</div>
            </div>
            <div className="sub-headlines-container">
              <div className="sub-headline">{articles[2].newTitle}</div>
              <div className="sub-headline">{articles[3].newTitle}</div>
              <div className="sub-headline">{articles[4].newTitle}</div>
              <div className="chart">
                <Chart stock={appleStock} height={100} width={550} />
              </div>
            </div>
          </div>
          <div className="headline-image-container">
            <img
              className="headline-image"
              src={articles[1].urlToImage}
              alt=""
            />
          </div>
        </motion.div>{" "}
        <motion.div className="sub-article-grid-container">
          {articles.slice(8, 12).map((article, index) => (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={articleAnimVariants}
              transition={{ staggerChildren: 0.1 }}
              className="article"
              key={uuidv4()}
            >
              <div className="article-title-container">
                <span className="article-author">{article.source.name}</span>
                <h4 className="article-title">{article.newTitle}</h4>
              </div>
            </motion.div>
          ))}
          {articles.slice(13, 17).map((article) => (
            <div className="sub-articles-2">
              <div className="article-title-container" key={uuidv4()}>
                <div className="image-container">
                  <img
                    className="article-image"
                    src={article.urlToImage}
                    alt={article.description}
                  />
                </div>
                <span className="article-author">{article.source.name}</span>
                <h4 className="article-title">{article.newTitle}</h4>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
