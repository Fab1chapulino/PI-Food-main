const initialState = {
    allRecipes: [],
    allRecipesCopy: [],
    searchRecipes:[],
    message:"",
};

export default function rootReducer( state=initialState, {type, payload} ){
    switch(type){
        case "GET_ALL_RECIPES":
            return {
                ...state,
                allRecipes:[...payload],
                allRecipesCopy:[...payload]
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
        case "FILTER":
            const {diets, origin} = payload
            
                let db_recipes = state.allRecipesCopy.filter( recipe => typeof recipe.id === "string")
                let api_recipes = state.allRecipesCopy.filter( recipe => typeof recipe.id === "number")

        if(diets.length){
                diets.forEach(diet=>{
                    db_recipes=db_recipes.filter( rp => rp.diets.map( name=>Object.values(name)[0] ).includes(diet))
                })
                diets.forEach( diet => {
                    api_recipes = api_recipes.filter( rp => rp.diets.includes(diet))
                })
            }
           switch(origin){
            case "Created":
                return {
                    ...state,
                    allRecipes:[...db_recipes]
                }
            case "Not Created":
                return {
                    ...state,
                    allRecipes:[...api_recipes]
                }
            default:
                return {
                    ...state,
                    allRecipes:db_recipes.concat(api_recipes)
                }
           }
        case "ORDER":
            const { by , mode } = payload;
            
            
            if(by==="HealthScore"){
                console.log(by, mode)
               return{
                ...state,
                allRecipes:[...state.allRecipes.sort((a,b)=>{
                    switch(mode){
                        case "Ascending":
                            console.log(typeof a.healthScore)
                            return a.healthScore-b.healthScore
                        case "Descending":
                            return b.healthScore-a.healthScore
                        default:
                            return 0
                    }
                }) ]
               }
            }else if(by==="Alphabetically" ){
                return{
                    ...state,
                    allRecipes:[...state.allRecipes].sort((a,b)=>{
                        if(mode==="Ascending"){
                            if(a.title<b.title)return -1;
                            if(a.title>b.title)return 1;
                            return 0;
                        }
                        if(mode==="Descending"){
                            if(a.title<b.title)return 1;
                            if(a.title>b.title)return -1;
                            return 0;
                        }
                        return 0;
                    })
                }
            }else{
                return {
                    ...state,
                    allRecipes:[...state.allRecipesCopy]
                }
            }
        default:
            return {
                ...state
            }
    }
}