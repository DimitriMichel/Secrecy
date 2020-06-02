import React, { useState } from "react";
import { Avatar, Spinner, Popover, Pane, Button } from "evergreen-ui";
import { STOCKKEY } from "../utils";

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
  const [isLoading, setLoading] = useState(false);
  const [tickerInfo, setTickerInfo] = useState(null);


  const handleTickerTag = (ticker) => {
    setLoading(true);
    fetch(
      `https://cloud.iexapis.com/stable/stock/${ticker}/batch?types=quote,news,chart&range=1m&last=10&token=${STOCKKEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        setTickerInfo(response);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  if(tickerInfo){
      console.log(tickerInfo)
  }

  //This RegEx separates capitalized string words of 5 letters of less that begin with "$"
  //ex. "$INTC is doing well." will separate "$INTC" from other words in the string.
  const tickerRegex = /(\$[A-Z]{1,5}\b)/g;
  const statusWithTags = body.split(tickerRegex).map((word) =>
    word[0] === "$" ? (
      <Popover
        trigger="click"
        content={
          <Pane
            width={350}
            height={350}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <p>
              <Spinner />
            </p>
          </Pane>
        }
      >
        <Button
          className="status-tags"
          height={24}
          padding={1}
          appearance="minimal"
          color="black"
          intent="none"
          onClick={() => handleTickerTag(tickerTags[0])}
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
            <button onClick={() => handleTickerTag("MSFT")}>Button</button>
          <div className="status-created">{createdAt}</div>
          <div className="status-body">{statusWithTags}</div>
        </div>
      </div>
    </div>
  );
};

export default Status;
