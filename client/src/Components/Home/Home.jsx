import { useSelector } from "react-redux";
import { NavLink, useParams,useHistory,useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import Cards from "./Cards";
import Options from "./Options.jsx";
import Loading from "../Loading.jsx";
import styles from "../../css/Home.module.css";

export default function Home(){
    //hooks
    const location = useLocation();
    let { page } = useParams();
    page = parseInt(page);
    const history = useHistory();
    const [loading, setLoading]=useState(true);
    const [pages, setPages] = useState([]);
    const [pagesCP, setPagesCP] = useState([]);
    //Gettin nine recipes
    const allRecipes = useSelector(data=>data.allRecipes);
    const message = useSelector(data=> data.message);
    const nineRecipes = allRecipes.slice((page-1)*9, page*9)
    //Setting pages

   /*  useEffect(()=>{
        for (let i=1; i<=Math.ceil(allRecipes.length/9); i++){
            setPages([...pages], i)
        } 
        console.log(typeof page, "------>Este es el page")
        setPages([...pages].slice(page-1, page+6))
    },[location.pathname]) */

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },1000)
        let pagesVariable =[];
        for (let i=1; i<=Math.ceil(allRecipes.length/9); i++){
            pagesVariable.push(i)
        } 
        setPagesCP([...pagesVariable])
    },[])

    useEffect(()=>{
        setPages([...pagesCP.slice(page-1, page+6)])
    },[pagesCP])

    const left = "<";
    const right = ">";

    function goLeft(){
        if(page !== 1 ) {
             if(page===pages[0]){    
                setPages([...pagesCP.slice(page-2, page+5)])
            }  
            history.push(`/home/${page-1}`)
        }
        
    }
    function goRight(){
        if(page !== Math.ceil(allRecipes.length/9)){
           if(page===pages[pages.length-1]){
                setPages([...pagesCP.slice(page-6, page+1)])
            }  
            history.push(`/home/${page+1}`)
            
        } 
        
    }
    //rendering
    return (
    message !== "Fetch failed" ?
    !loading?
        <div>
             <Options/>
            <div className={styles.Pages}>
                <span onClick={goLeft} className={styles.button}>{left}</span>
                {pages.map( param => {
                     return (<span key={param}>
                        <NavLink to={`/home/${param}`} className={page===param?styles.buttonSelect:styles.button}>
                            {param}</NavLink>
                        </span>)
                })}
                <span onClick={goRight} className={styles.button}>{right}</span>
            </div>

            <div>
                <Cards nineRecipes={nineRecipes}/>
            </div>

            <div className={styles.Pages}>
                <span onClick={goLeft} className={styles.button}>{left}</span>
                    {pages.map( param => {
                        return (<span key={param}>
                            <NavLink to={`/home/${param}`} className={page===param?styles.buttonSelect:styles.button}
                            >{param}</NavLink>
                            </span>)
                    })}
                <span onClick={goRight} className={styles.button}>{right}</span>
            </div>
        </div>
        :<Loading/>
        : <div><h1 className={styles.errorMessage}>Oops! :O, there must be an error.<br/> Please check your internet connection<br/> and then refresh the page.</h1>
        </div>
    )
}