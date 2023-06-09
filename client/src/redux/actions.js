export function getAllRecipes( recipes ){
    return {
        type:"GET_ALL_RECIPES",
        payload:recipes
    }
}
export function getDetail( detail ){
    return{
        type:"GET_DETAIL",
        payload:detail
    }
}
export function searchByName( query ){
    return {
        type:"GET_BY_NAME",
        payload: query
    }
}
export function createRecipe(form){
    return {
        type:"CREATE_RECIPE",
        payload:form
    }
}
export function generateError(error){
    return {
        type:"GENERATE_ERROR",
        payload: error
    }
}
export function filter(filters){
    return {
        type:"FILTER",
        payload: filters
    }
}
export function order(orders){
    return {
        type:"ORDER",
        payload:orders
    }
}