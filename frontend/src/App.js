import NavBar from './components/Nav/NavBar.js'
import Welcome from './components/Welcome/Welcome.js'
import Charts from './components/Chart/Chart.js'
import News from './components/News/News.js'
import './components/site_style.css'
import { Route, Routes } from 'react-router-dom'

function App(props) {
  return (
    <>
      <NavBar/>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/charts" element={<Charts/>}/>
          <Route path="/news" element={<News/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
