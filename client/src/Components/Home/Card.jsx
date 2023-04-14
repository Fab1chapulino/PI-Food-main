import { NavLink } from "react-router-dom";
import styles from "../../css/Home.module.css";

export default function Card({ id, title, image, diets}){
    const dietstrings = typeof id !=="string"? diets.join(", ") : diets.map(diet=> diet.name ).join(", ")
    return (
        <div className={styles.Card}>
            <NavLink to={`/detail/${id}`} className={styles.link}>
            <img src={image} alt={title} className={styles.cardImage}/>
            <h3 className={styles.title}>{title}</h3>
            <p>Diets:{dietstrings}</p>
            </NavLink>
           
        </div>
    )
}