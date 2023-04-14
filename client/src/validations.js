export default function validate(input){
    let errors={
        title:"",
        summary:"",
        steps:"",
        image:"",
        healthScore:"",
        diets:""
    }
    const name = /^[a-zA-Z0-9 ]*$/
    const url = /(http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/
    const format =/.*(png|jpg|jpeg)$/


    if(input.title !== undefined){
        if(input.title.length<2){
            errors={
                ...errors,
                title:"The name is too short."
            }
        }else if(input.title.length>60){
            errors={
                ...errors,
                title:"Name can't have more than 60 caracters."
            }
        }else if(!name.test(input.title)){
            errors={
                ...errors,
                title:"Only alphanumeric caracters."
            }
        }
    }
       

    if(input.summary !== undefined){
        if(input.summary.length<10){
            errors={
                ...errors,
                summary:"min length of 10 caracters."
            }
         }
        if(input.summary.length>500){
            errors={
                ...errors,
                summary:"max length of 500 caracters."
            }
        }
    }
    if(input.steps !== undefined){
        if(!input.steps.length){
            errors={
                ...errors,
                steps:"Your recipe need instructions."
            }
        }else if(!input.steps.find( step => step.length>1)){
             errors={
                ...errors,
                steps:"Your recipe need instructions."
            }
        }   
    }
    
 
    if(input.image !== undefined){
        if(!input.image.length){
            errors={
                ...errors,
                image:"You can't submit an empty field."
            }
        }else if(!url.test(input.image)){
            errors={
                ...errors,
                image:"You must write a valid url."
            }
        }else if(!format.test(input.image)){
            errors={
                ...errors,
                image:"Only png, jpg and jpeg formats are allowed."
            }
        }
    }


    return errors;
}