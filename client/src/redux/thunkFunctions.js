import axios from 'axios';
import { getAllRecipes, searchByName, generateError } from './actions'

export async function getRecipesThunk( dispatch, getState){
    try{
        const { data } = await axios.get('http://localhost:3001/recipes');
        console.log(data, "----------->data")
        dispatch(getAllRecipes(data))
    }catch(err){
        dispatch(generateError("Fetch failed"))
    }
} 
export function getByNameThunk(query){
        return async function(dispatch, getState){
         try{
            const {data} = await axios.get(`http://localhost:3001/recipes/name?search=${query}`);
            dispatch(searchByName(data))
         }catch(err){
            dispatch(generateError("Coudn`t find results for this recipe"))
         }
            
        }

}
export function createRecipeThunk(form){
    return async function(dispatch, geState){
        try{
            const {data}= await axios.post("http://localhost:3001/recipes", form)
            console.log(data, "data")
            dispatch(generateError(data))
        }catch(err){
            dispatch(generateError("CANNOT POST RECIPE"))
        }
    }
}