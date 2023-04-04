require('dotenv').config();
const { API_KEY } = process.env;
const axios =require("axios");
const { Recipe, Diet } = require('../../db');

const getAllRecipes = async function (req, res){
    try{
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`);
        const {results}=data;
        const allRecipesApi = results.map( recipe => {
            return {
                id:recipe.id,
                title:recipe.title,
                image:recipe.image,
                diets:recipe.diets
            }
        })
        const allRecipesDB = await Recipe.findAll({
            attributes:["id", "title", "image"],
            include:{
                model:Diet,
                attributes:["name"],
                through:{
                    attributes:[]
                }
            }
        })
        const allRecipes = allRecipesDB.concat(allRecipesApi);
        res.status(200).json(allRecipes);
    }catch(err){
        res.status(500).send(err.message)
    }
} 
module.exports=getAllRecipes;  