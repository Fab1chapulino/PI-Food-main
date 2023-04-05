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