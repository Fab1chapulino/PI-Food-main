import { useSelector } from "react-redux";
import { NavLink, useParams,useHistory } from "react-router-dom";
import {useState, useEffect} from "react";
import Cards from "./Cards";
import Options from "./Options.jsx";
import Loading from "../Loading.jsx";
import styles from "../../css/Home.module.css";

export default function Home(){
    //hooks
    let { page } = useParams();
    page = parseInt(page);
    const history = useHistory();
    const [loading, setLoading]=useState(true);
    //Gettin nine recipes
    const allRecipes = useSelector(data=>data.allRecipes);
    const message = useSelector(data=> data.message);
    //console.log(allRecipes);
    const nineRecipes = allRecipes.slice((page-1)*9, page*9)
    //Setting pages
    let pages = [];
    for (let i=1; i<=Math.ceil(allRecipes.length/9); i++){
        pages.push(i)
    }

    const left = "<";
    const right = ">";
    function goLeft(){
        if(page !== 1 ) history.push(`/home/${page-1}`)
    }
    function goRight(){
        if(page !==pages[pages.length-1] ) history.push(`/home/${page+1}`)
    }

    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },1000)
    },[])

    //rendering
    return (
    message !== "Fetch failed" ?
    !loading?
        <div>
             <Options/>
            <div className={styles.Pages}>
                <span onClick={goLeft} className={styles.button}>{left}</span>
                {pages.map( page => {
                     return (<span key={page}>
                        <NavLink to={`/home/${page}`} className={styles.button}>{page}</NavLink>
                        </span>)
                })}
                <span onClick={goRight} className={styles.button}>{right}</span>
            </div>

            <div>
                <Cards nineRecipes={nineRecipes}/>
            </div>

            <div className={styles.Pages}>
                <span onClick={goLeft} className={styles.button}>{left}</span>
                    {pages.map( page => {
                        return (<span key={page}>
                            <NavLink to={`/home/${page}`} className={styles.button}
                            >{page}</NavLink>
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