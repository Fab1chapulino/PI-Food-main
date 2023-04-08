const initialState = {
    allRecipes: [],
    searchRecipes:[]
};

export default function rootReducer( state=initialState, {type, payload} ){
    switch(type){
        case "GET_ALL_RECIPES":
            return {
                ...state,
                allRecipes:payload
            }
            case "GET_BY_NAME":
                return {
                    ...state,
                    searchRecipes:[...payload]
                }
        default:
            return {
                ...state
            }
    }
}