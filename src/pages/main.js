import React, { useState } from "react";
import "../App.css";
import { Home } from "../components/Home";
import { Watchlist } from "../components/Watchlist";
import { News } from "../components/News";
import { ChartIcon, HomeIcon, EyeOpenIcon, GlobeIcon } from "evergreen-ui";
import { Pane, SidebarTab, Tab, Tablist } from "evergreen-ui";
import { AnimatePresence, motion } from "framer-motion";
import NavBar from "../components/Navbar";
const Stock = () => {
  return <div>This is the Stocks page</div>;
};

const ContentWindow = ({loading, articles}) => {
  const tabs = { Home, Watchlist, Stock, News };

  const [tabState, setTab] = useState("Home");
  const [index, setIndex] = useState(0);
  const TabContent = tabs[tabState];
  return (
    <div className="wrapper">
      <AnimatePresence>
        <div className="main-container">
          <div className="main">
            <div className="content-container">
              <div className="content">
                <div className="layout-grid-container">
                  <div className="sidenav">
                    <div className="tabs">
                      <Tablist marginBottom={20} marginTop={20} flexBasis={240}>
                        <SidebarTab
                          fontFamily="inherit"
                          fontSize={16}
                          onSelect={() => {
                            setTab("Home");
                            setIndex(0);
                          }}
                          isSelected={index === 0}
                        >
                          <HomeIcon color="muted" size={15} />
                          <span className="tab-text">Home</span>
                        </SidebarTab>
                        <SidebarTab
                          fontFamily="inherit"
                          fontSize={16}
                          onSelect={() => {
                            setTab("News");
                            setIndex(1);
                          }}
                          isSelected={index === 1}
                        >
                          <GlobeIcon color="muted" size={15} />
                          <span className="tab-text">News</span>
                        </SidebarTab>
                        <SidebarTab
                          fontFamily="inherit"
                          fontSize={16}
                          onSelect={() => {
                            setTab("Stock");
                            setIndex(2);
                          }}
                          isSelected={index === 2}
                        >
                          <ChartIcon color="muted" size={15} />
                          <span className="tab-text">Stocks</span>
                        </SidebarTab>
                        <SidebarTab
                          fontFamily="inherit"
                          fontSize={16}
                          onSelect={() => {
                            setTab("Watchlist");
                            setIndex(3);
                          }}
                          isSelected={index === 3}
                        >
                          <EyeOpenIcon color="muted" size={15} />
                          <span className="tab-text">Watchlist</span>
                        </SidebarTab>
                      </Tablist>
                    </div>
                  </div>
                  <div className="content-components">
                    <TabContent loading={loading} articles={articles}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ContentWindow;
