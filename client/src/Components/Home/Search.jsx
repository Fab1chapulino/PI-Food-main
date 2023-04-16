import {useState,useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import Cards from "./Cards.jsx";
import {useDispatch} from "react-redux";
import {getByNameThunk} from "../../redux/thunkFunctions.js";
import styles from "../../css/Search.module.css";

export default function Search(){
    //hooks
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("");
    const [searching, setSearching]=useState(false);
    const [pages, setPages] = useState(0);
    const history = useHistory();
    const location = useLocation();
    const search = useSelector( state => state.searchRecipes)
    const message = useSelector(data=>data.message)
    const dispatch = useDispatch();    
    
    //Some functions
    const handleInputChange = function(e){
            const value = e.target.value;
            setQuery(value);
        }
    const onSearch=function(e){
        const {code, type}=e
        console.log(code)
            if((query.length && type==="click") || (query.length && code==="Enter")){
                //Set the searchin mode
                setSearching(true);
                //Increment pages
                setPages(pages+1)
                setRecipes([])
                location.pathname !== "/search" && history.push("/search")
                dispatch(getByNameThunk(query))
                //setQuery("")
            } 
        }

    console.log(pages)
        //useEffects
     useEffect(()=>{
        setRecipes([...search])
    },[search]) 

     useEffect(()=>{
        if(location.pathname==="/search"){
            !searching && history.push("/home/1")
        }
    
    },[searching])

    useEffect(()=>{
        location.pathname !== "/search" && setPages(0)
    },[location.pathname])
    
    //rendering
    return (
        <div>
            <div className={styles.Search}>
                <input type="search" onChange={(e)=> handleInputChange(e)} value={query} className={styles.input} onKeyDown={(e)=>onSearch(e)} />
                <span onClick={(e)=>onSearch(e)} className={styles.searchButton}>search</span>
            </div>
            {
            location.pathname==="/search"//message !== "Coudn`t find results for this recipe"
            ? recipes.length || message !== "Coudn`t find results for this recipe"
                
                ?<div><span onClick={()=>history.go(-pages)} className={styles.goBack}>Go Back</span>
                <Cards nineRecipes={recipes} /></div>

                :<div><span onClick={()=>history.go(-pages)} className={styles.goBack}>Go Back</span>
                <h1 className={styles.errorMessage}>Coudn`t find results for this recipe.</h1></div>
            :null
            }
        </div>
    )
}