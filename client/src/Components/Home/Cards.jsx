import Card from "./Card";
import styles from "../../css/Home.module.css";

export default function Cards({nineRecipes}){
    return (
        <div className={styles.Cards}>
            {nineRecipes.map( recipe =>{
                return (<div key={recipe.id} className={styles.divCard}>
                    <Card id={recipe.id} title={recipe.title} image={recipe.image} diets={recipe.diets} />
                    </div>)
            })}
        </div>
    )
}