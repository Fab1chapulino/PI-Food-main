import axios from 'axios';
import { getAllRecipes, searchByName,createRecipe } from './actions'

export async function getRecipesThunk( dispatch, getState){
    try{
        const { data } = await axios.get('http://localhost:3001/recipes');
        console.log(data)
        dispatch(getAllRecipes(data))
    }catch(err){
        console.log(err.message)
    }
} 
export function getByNameThunk(query){
    return async function(dispatch, getState){
        const {data} = await axios.get(`http://localhost:3001/recipes/name?search=${query}`);
        dispatch(searchByName(data))
    }
}
export function createRecipeThunk(form){
    return async function(dispatch, geState){
        const {data}=axios.post("http://localhost:3001/recipes", form)
        dispatch(createRecipe(data))
    }
}