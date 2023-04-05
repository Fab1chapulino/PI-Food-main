import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Cards from "./Cards";

export default function Home(){
    //const dispatch = useDispatch();
    const { page } = useParams();
    const allRecipes = useSelector(data=>data.allRecipes);
    console.log(allRecipes);
    const nineRecipes = allRecipes.slice((page-1)*9, page*9)
    let pages = [];

    for (let i=1; i<=Math.ceil(allRecipes.length/9); i++){
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map( page => {
                     return (<span key={page}>
                        <NavLink to={`/home/${page}`}>{page}</NavLink>
                        </span>)
                })}
            </div>
            <div>
                <Cards nineRecipes={nineRecipes}/>
            </div>
        </div>
    )
}