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
import {useState, useEffect} from "react";
import { Switch, Route, useLocation, useParams} from 'react-router-dom';

function App() {
  //hooks
  const location = useLocation();
  const allRecipes = useSelector(data=>data.allRecipes);
  const message = useSelector(data=>data.message);
  const {id}=useParams();



  return (
    <div>
      {location.pathname!=="/"?<Nav/>:null}
      {location.pathname!=="/"?<Search/>:null}
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>

         <Route path="/home/:page">    
              {allRecipes.length || message==="Fetch failed"?<Home/>:<Loading/>}
        </Route>

        <Route path="/form">
          <Form/>
        </Route>

        <Route path="/detail/:id">
          <Detail/>
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;