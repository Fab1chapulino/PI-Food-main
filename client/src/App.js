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
import axios from "axios";
axios.defaults.baseURL = "https://pi-food-main-production-5b4b.up.railway.app/";

function App() {
  //hooks
  const location = useLocation();
  const allRecipes = useSelector(data=>data.allRecipes);
  const message = useSelector(data=>data.message);



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