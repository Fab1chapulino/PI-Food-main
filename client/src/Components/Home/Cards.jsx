import Card from "./Card";

export default function Cards({nineRecipes}){
    return (
        <div>
            {nineRecipes.map( recipe =>{
                return (<div key={recipe.id}>
                    <Card id={recipe.id} title={recipe.title} image={recipe.image} diets={recipe.diets} />
                    </div>)
            })}
        </div>
    )
}