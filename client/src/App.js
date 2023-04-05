import axios from 'axios';
import {
  Landing,
  Home,
  Form,
  Nav,
  Detail
} from "./Components/index.js";
import { Switch, Route, useLocation} from 'react-router-dom';
//import {useEffect, useState} from "react";

function App() {
  //hooks
  const location = useLocation();
/*  const {id} = useParams();
  //const [ idDetail, setIdDetail ] = useState(id)
  const [ detail, setDetail ]=useState({}); */

 /*  async function getDetail(id){
    try{
      const {data} = await axios.get(`http://localhost:3001/recipes/${id}`)
    console.log(data, "detail")
    console.log(id, "id")
    return data;
    //setDetail({...data})
    }catch(err){
      console.log(err.message)
    }
  } */

  /* useEffect(()=>{
    if(id){
      getDetail(id)
    }
  }, [id]) */

  return (
    <div>
      {location.pathname!=="/"?<Nav/>:null}
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
         <Route path="/home/:page">
          <Home/>
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