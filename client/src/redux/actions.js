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