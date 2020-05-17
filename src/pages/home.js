import React, { Component } from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/core";
import News from "./news";

class Home extends Component {
  render() {
    return (
      <Tabs >
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }
}

export default Home;
