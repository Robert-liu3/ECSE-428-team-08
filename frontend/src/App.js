import NavBar from './components/Nav/NavBar.js'
import Welcome from './components/Welcome/Welcome.js'
import Charts from './components/Chart/Chart.js'
import News from './components/News/News.js'

function App(props) {
  let Component;
  switch (window.location.pathname) {
    case '/':
      Component = Welcome;
      break;
    case '/charts':
      Component = Charts;
      break;
    case '/news':
      Component = News;
      break;
  }
  return (
    <>
      <NavBar/>
      <Component/>
    </>
  );
}

export default App;
