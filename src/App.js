import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
//Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import NavBar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
