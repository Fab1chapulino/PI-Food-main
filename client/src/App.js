import './App.css';
import {
  Landing,
  Home,
  Form,
  Nav,
  Detail
} from "./Components/index.js";
import { Switch, Route, useLocation} from 'react-router-dom';

function App() {
  //hooks
  const location = useLocation();

  return (
    <div>
      {location.pathname!=="/"?<Nav/>:null}
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
         <Route path="/home">
          <Home/>
        </Route>
        <Route path="/form">
          <Form/>
        </Route>
        <Route path="/detail:id">
          <Detail/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;