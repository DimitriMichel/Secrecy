import React from "react";
import "./App.css";
//Pages
import Main from "./pages/main";
import Login from "./pages/login";
import Register from "./pages/register";
import NavBar from "./components/Navbar";
function App() {

  return (
    <div className="App">
      <div className="nav-container">
        <NavBar />
      </div>
      <Main />
    </div>
  );
}

export default App;
