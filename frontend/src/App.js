import NavBar from './components/Nav/NavBar.js'
import Welcome from './components/Welcome/Welcome.js'
import Charts from './components/Chart/Chart.js'
import News from './components/News/News.js'
import UserLogin from './components/UserLogin/UserLogin.js'
import UserSignUp from './components/UserSignUp/UserSignUp.js'
import Notes from "./components/Notes/Notes.js";
import NotesList from "./components/Notes/NotesList.js"
import './components/site_style.css'
import { Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import {useState} from 'react';

function App(props) {
  const[buttonAddNotes, setButtonAddNotes] = useState(false);
    return (
        <>
            <NavBar/>
            <div className='container'>
              <main>
                <button onClick={() => setButtonAddNotes(true)}>Add Notes</button>
              </main>
              <Routes>
                  <Route path="/" element={<Welcome/>}/>
                  <Route path="/charts" element={<Charts/>}/>
                  <Route path="/news" element={<News/>}/>
                  <Route path="/login" element={<UserLogin/>}/>
                  <Route path="/signup" element={<UserSignUp/>}/>
                  <Route path="/notes" element={<NotesList />} />
              </Routes>
            </div>
        </>
    );
}

export default App;