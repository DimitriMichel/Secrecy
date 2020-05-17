import React, { useState } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Pane, Paragraph, Spinner, Tab, Tablist } from "evergreen-ui";

const Watchlist = () => {
  return <div>This is the Watchlist page</div>;
};

const Home = () => {
  return <div>This is the Home page</div>;
};

const Stock = () => {
  return <div>This is the Stocks page</div>;
};

const ContentWindow = () => {
  const tabs = { Home, Watchlist, Stock, Spinner };
  const [tabState, setTab] = useState("Home");
  const [index, setIndex] = useState(0);
  const TabContent = tabs[tabState];
  return (
    <div>
      <Pane height={120}>
        <div className="tabs">
          <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
            <Tab
              fontFamily="inherit"
              fontSize={16}
              onClick={() => {
                setTab("Home");
                setIndex(0);
              }}
              isSelected={index === 0}
            >
              Home
            </Tab>
              •
            <Tab
              fontFamily="inherit"
              fontSize={16}
              onClick={() => {
                setTab("Watchlist");
                setIndex(1);
              }}
              isSelected={index === 1}
            >
              Watchlist
            </Tab>
              •
            <Tab
              fontFamily="inherit"
              fontSize={16}
              onClick={() => {
                setTab("Stock");
                setIndex(2);
              }}
              isSelected={index === 2}
            >
              Stocks
            </Tab>
          </Tablist>
        </div>
        <div className="content-container">
          <Pane flex="1">
            <TabContent />
          </Pane>
        </div>
      </Pane>
    </div>
  );
};

export default ContentWindow;
