import {useState,useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import Cards from "./Cards.jsx";
import {useDispatch} from "react-redux";
import {getByNameThunk} from "../../redux/thunkFunctions.js";

export default function Search(){
    //hooks
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("");
    const [searching, setSearching]=useState(false);
    const [pages, setPages] = useState(0);
    const history = useHistory();
    const location = useLocation();
    const search = useSelector( state => state.searchRecipes)
    const dispatch = useDispatch();    
    
    //Some functions
    const handleInputChange = function(e){
            const value = e.target.value;
            setQuery(value);
        }
    const onSearch=function(){
            if(query.length){
                //Set the searchin mode
                setSearching(true);
                //Increment pages
                setPages(pages+1)
                setRecipes([])
                location.pathname !== "/search" && history.push("/search")
                dispatch(getByNameThunk(query))
                setQuery("")
            } 
        }

    console.log(pages)
        //useEffects
     useEffect(()=>{
        setRecipes([...search])
    },[search]) 

     useEffect(()=>{
    searching? history.push(`/search`): history.push("/home/1")
    },[searching])

    useEffect(()=>{
        location.pathname !== "/search" && setPages(0)
    },[location.pathname])
    
    //rendering
    return (
        <div>
            <div>
                <input type="search" size="70" onChange={(e)=> handleInputChange(e)} value={query}/>
                <button onClick={()=>onSearch()}>search</button>
            </div>
            {
            location.pathname==="/search" && recipes.length
            ?<div><button onClick={()=>history.go(-pages)}>Go Back</button><Cards nineRecipes={recipes} /></div>
            :null
            }
        </div>
    )
}