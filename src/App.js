
import { Container} from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import SimpleBottomNavigation from './Components/MainNav/MainNav';
import Trending from './Components/Pages/Trending/Trending';
import Movies from "./Components/Pages/Movies/Movies";
import Search from './Components/Pages/Search/Search';
import Series from './Components/Pages/Series/Series';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <div className="app">
        <Container>
        <Switch>
          <Route path='/' component={Trending} exact></Route>
          <Route path='/movies' component={Movies}></Route>
          <Route path='/series' component={Series}></Route>
          <Route path='/search' component={Search}></Route>
        </Switch>
        </Container>
      </div>
      
      <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
