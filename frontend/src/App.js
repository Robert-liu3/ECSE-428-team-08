import NavBar from "./components/Nav/NavBar.js";
import Welcome from "./components/Welcome/Welcome.js";
import News from "./components/News/News.js";
import Notes from "./components/Notes/Notes.js";
import "./components/site_style.css";
import { Route, Routes } from "react-router-dom";

function App(props) {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
