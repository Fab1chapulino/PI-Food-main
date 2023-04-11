const initialState = {
    allRecipes: [],
    searchRecipes:[],
    message:"",
};

export default function rootReducer( state=initialState, {type, payload} ){
    switch(type){
        case "GET_ALL_RECIPES":
            return {
                ...state,
                allRecipes:[...payload]
            }
        case "GET_BY_NAME":
            return {
                ...state,
                searchRecipes:[...payload]
            }
        case "GENERATE_ERROR":
            return {
                ...state,
                message:payload
            }
        default:
            return {
                ...state
            }
    }
}