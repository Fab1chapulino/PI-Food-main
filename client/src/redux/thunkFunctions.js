import axios from 'axios';
import { getAllRecipes, getDetail } from './actions'

export async function getRecipesThunk( dispatch, getState){
    try{
        const { data } = await axios.get('http://localhost:3001/recipes');
        console.log(data)
        dispatch(getAllRecipes(data))
    }catch(err){
        console.log(err.message)
    }
} 
/*  export function getDetailthunk( id ){
    return async function( dispatch, getState ){
        const { data } = await axios.get(`http://localhost:3001/recipes/${id}`);
        dispatch(getDetail(data))
    }
} */