require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Recipe } = require ('../../db')
const applySearch = require('../../utils.js')


const getRecipeByName = async function(req,res){
    try{
        const { search } = req.query;
        const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=9&apiKey=${API_KEY}&addRecipeInformation=true`);
        const {results}=data;
        const recipeApi = results.map( recipe => {
            return {
                id:recipe.id,
                title:recipe.title,
                image:recipe.image,
                diets:recipe.diets
            }
        })
       let recipeDB = await applySearch(search);
       const boolean = recipeDB.pop();

       const recipes = boolean? recipeDB.concat(recipeApi).slice(0,9) : recipeApi.concat(recipeDB).slice(0,9)
        //res.status(200).json(recipeApi)
        recipes.length? res.status(200).json(recipes): res.status(400).send('No results found')
    }catch(err){
        res.status(400).send(err.message)
    }
}
module.exports=getRecipeByName;