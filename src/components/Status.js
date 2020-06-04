import React, { useState } from "react";
import { Avatar, Spinner, Popover, Pane, Button } from "evergreen-ui";
import { STOCKKEY } from "../utils";
import { v4 as uuidv4 } from "uuid";
import TickerTile from "./TickerTile";

const Status = ({
  status: {
    statusID,
    userName,
    body,
    createdAt,
    userImage,
    tickerTags,
    commentCount,
    likeCount,
  },
}) => {
  const [isLoading, setLoading] = useState(true);
  const [tickerInfo, setTickerInfo] = useState(null);

  const handleTickerTag = (ticker) => {
    setLoading(true);
    ticker = ticker.replace("$", "");
    fetch(
      `https://cloud.iexapis.com/stable/stock/${ticker}/batch?types=logo,quote,news,chart&range=1m&last=10&token=${STOCKKEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setTickerInfo(response);
        setLoading(false);
      });
  };
  if (tickerInfo) {
    console.log(tickerInfo);
  }

  //This RegEx separates capitalized string words of 5 letters of less that begin with "$"
  //ex. "$INTC is doing well." will separate "$INTC" from other words in the string.
  const tickerRegex = /(\$[A-Z]{1,5}\b)/g;
  const statusWithTags = body.split(tickerRegex).map((word) =>
    word[0] === "$" ? (
      <Popover
        onOpen={() => handleTickerTag(word)}
        trigger="click"
        content={
          <Pane width={200} height={150}>
            {isLoading === true ? (
              <div >
              </div>
            ) : (
              <TickerTile
                logo={tickerInfo.logo.url}
                symbol={word}
                companyName={tickerInfo.quote.companyName}
                marketCap={tickerInfo.quote.marketCap}
                latestPrice={tickerInfo.quote.latestPrice}
                priceEarningsRatio={tickerInfo.quote.peRatio}
                openPrice={tickerInfo.quote.open}
                volume={tickerInfo.quote.latestVolume}
                exchange={tickerInfo.quote.primaryExchange}
              />
            )}
          </Pane>
        }
      >
        <Button
          key={uuidv4()}
          className="status-tags"
          height={24}
          padding={1}
          appearance="minimal"
          color="black"
        >
          {word}
        </Button>
      </Popover>
    ) : (
      word
    )
  );

  return (
    <div>
      <div className="status-container">
        <div className="avatar-container">
          <Avatar size={50} src={userImage} />
        </div>
        <div className="status-text-container">
          <div className="status-username">
            <a href={`/users/${userName}`}>{userName}</a>
          </div>
          <div className="status-created">{createdAt}</div>
          <div className="status-body">{statusWithTags}</div>
        </div>
      </div>
    </div>
  );
};

export default Status;
