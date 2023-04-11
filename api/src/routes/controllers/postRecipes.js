const {Recipe} = require('../../db');

String.prototype.capitalize = function() {
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); });
  };

const postRecipes = async function (req, res){
    try{
        let {
            title,
            summary,
            healthScore,
            steps,
            image,
            diets
        } = req.body;

        title=title.capitalize();
        
         const newRecipe = await Recipe.create({
            title,
            summary,
            healthScore,
            steps,
            image
        })
        if(!diets.length) diets.push(11)
        await newRecipe.addDiets(diets)
        res.status(200).send("POSTED RECIPE SUCCESFULLY") 
        //res.status(200).send('NO se')
    }catch(err){
        res.status(400).send("CANNOT POST RECIPE")
    }
}
module.exports = postRecipes;
/* Nombre.
-  Resumen del plato.
-  Nivel de comida saludable (health score).
-  Paso a paso.
-  Imagen.
-  Tipos de dieta. */