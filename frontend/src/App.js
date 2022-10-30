import NavBar from './components/Nav/NavBar.js'
import Welcome from './components/Welcome/Welcome.js'
import Charts from './components/Chart/Chart.js'
import News from './components/News/News.js'
import UserLogin from './components/UserLogin/UserLogin.js'
import UserSignUp from './components/UserSignUp/UserSignUp.js'
import './components/site_style.css'
import { Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

function App(props) {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/charts" element={<Charts/>}/>
          <Route path="/news" element={<News/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/signup" element={<UserSignUp/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
