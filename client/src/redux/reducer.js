const initialState = {
    allRecipes: []
};

export default function rootReducer( state=initialState, {type, payload} ){
    switch(type){
        case "GET_ALL_RECIPES":
            return {
                ...state,
                allRecipes:payload
            }
        /* case "GET_DETAIL":
            return {
                ...state,

            } */
        default:
            return {
                ...state
            }
    }
}