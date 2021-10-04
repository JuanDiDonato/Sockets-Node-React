//Routes
import {BrowserRouter as Router, Route} from 'react-router-dom';
//CUSTOM CSS
import './assets/css/main.css'
//Components
import Home from './Components/Home'


function App() {
  return (
    <Router>
        <Route exact path ='/' component={Home}></Route>
    </Router>
  );
}

export default App;
