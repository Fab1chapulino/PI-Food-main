const axios = require('axios');
const getRecipeById = require('./getRecipeById')
const getRecipeByName = require('./getRecipeByName')


const getByIdOrName = async function(req, res){
    const {search}=req.query;
    search? getRecipeByName(req,res):getRecipeById(req,res)
}
module.exports = getByIdOrName;