import NavBar from "./components/Nav/NavBar.js";
import Welcome from "./components/Welcome/Welcome.js";
import News from "./components/News/News.js";
import Notes from "./components/Notes/Notes.js";
import "./components/site_style.css";
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';

function App(props) {
  const [buttonAddNotes, setButtonAddNotes] = useState(false);
  return (
    <>
      <NavBar />
      <div className="container">
        <main>
           <button onClick={() => setButtonAddNotes(true)}>Add Notes</button>
        </main>
        <Notes trigger={buttonAddNotes} setTrigger={setButtonAddNotes}></Notes>
        <h1></h1>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
