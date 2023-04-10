const initialState = {
    allRecipes: [],
    searchRecipes:[]
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
        case "CREATE_RECIPE":
            return {
                ...state,
                allRecipes:[payload, ...initialState.allRecipes]
            }
        default:
            return {
                ...state
            }
    }
}