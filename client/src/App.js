//import axios from 'axios';
import {
  Landing,
  Home,
  Form,
  Nav,
  Detail,
  Search,
  Loading
} from "./Components/index.js";
import { useSelector } from "react-redux";
import { Switch, Route, useLocation} from 'react-router-dom';

function App() {
  //hooks
  const location = useLocation();
  const allRecipes = useSelector(data=>data.allRecipes);
  return (
    <div>
      {location.pathname!=="/"?<Nav/>:null}
      {location.pathname!=="/"?<Search/>:null}
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>

         <Route path="/home/:page">
         { allRecipes.length
         ?<div>
          
         <Home/>
          </div>
         :<Loading/>}
        </Route>

        <Route path="/form">
          <Form/>
        </Route>

        <Route path="/detail/:id">
          <Detail/>
        </Route>

       {/*  <Route path="/search">
          <Search/>
        </Route> */}
        
      </Switch>
    </div>
  );
}

export default App;