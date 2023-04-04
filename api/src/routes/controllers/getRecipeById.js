require('dotenv').config();
const { API_KEY } = process.env;
const axios = require ('axios');
const {Recipe, Diet} = require('../../db');

const getRecipeById = async function (req, res){
    try{
        const {idRecipe}=req.params;
        if(idRecipe.length<36){
        const {data}=await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`);
        const detail = {
            title:data.title,
            summary:data.summary,
            healthScore:data.healthScore,
            steps:data.analyzedInstructions[0].steps.map(step=>step.step),
            image:data.image,
            diets:data.diets
        };
        res.status(200).json(detail);
    }else if(idRecipe.length>=36){
        const recipe = await Recipe.findOne({
            where:{
                id:idRecipe
            },
            include:{
                model:Diet,
                through:{
                    attributes:[]
                }
            }
        })
        res.status(200).json(recipe)
    }
        }catch(err){
            res.status(500).send(err.message)
        }
}
module.exports=getRecipeById;