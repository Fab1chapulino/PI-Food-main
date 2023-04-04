const {Recipe} = require('../../db');

const postRecipes = async function (req, res){
    try{
        const {
            title,
            summary,
            healthScore,
            steps,
            image,
            diets
        } = req.body;
         const newRecipe = await Recipe.create({
            title,
            summary,
            healthScore,
            steps,
            image
        })
        await newRecipe.addDiets(diets)
        res.status(200).json(newRecipe) 
        //res.status(200).send('NO se')
    }catch(err){
        res.status(400).send(err.message)
    }
}
module.exports = postRecipes;
/* Nombre.
-  Resumen del plato.
-  Nivel de comida saludable (health score).
-  Paso a paso.
-  Imagen.
-  Tipos de dieta. */