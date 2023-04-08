import { NavLink } from "react-router-dom";

export default function Card({ id, title, image, diets}){
    const dietstrings = typeof id !=="string"? diets.join(", ") : diets.map(diet=> diet.name ).join(", ")
    return (
        <div>
            <NavLink to={`/detail/${id}`}>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>Diets:{dietstrings}</p>
            </NavLink>
           
        </div>
    )
}