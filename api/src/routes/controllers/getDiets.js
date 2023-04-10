require('dotenv').config();
const { API_KEY } = process.env;
const { Diet } = require('../../db');
const  axios  = require('axios');

const getDiets = async function (req, res){
    try{
      const alreadyCreated = await Diet.findAll();
      if(!alreadyCreated.length){
        let diets = [];
          const {data} = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const {results} = data;
         
          for(let i=0;i<results.length; i++){
            diets=diets.concat(results[i].diets)
        }  

          const setOfDiets = new Set(diets)
        diets=[...setOfDiets]
        diets=diets.map(diet=>{
          return {name:diet}
        })
          const bulkDiets = await Diet.bulkCreate( diets )
          res.status(200).json(bulkDiets) 
        }else{
          res.status(200).json(alreadyCreated) 
        }
        

    }catch(err){
        res.status(500).send('Cannot get Diets')
    }
}
module.exports = getDiets;