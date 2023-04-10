export default function validate(input){
    const errors={}
    const name = /^[A-Za-z][A-Za-z0-9- ]/
    const url = /(http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/
    const format =/.*(png|jpg|jpeg)$/

    if(!input.title.length){
        errors.title="You can't submit an empty field."
    }else if(input.title.length>60){
        errors.title="Name can't have more than 60 caracters."
    }else if(!name.test(input.title)){
        errors.title="Only alphanumeric caracters."
    }
    if(input.summary.length<10){
        errors.summary="min length of 10 caracters."
        }
    if(input.summary.length>500){
        errors.summary="max length of 500 caracters."
    }
    if(!input.steps.length){
        errors.steps="Your recipe need instructions."
    }
    if(!input.image.length){
        errors.image="You can't submit an empty field."
    }else if(!url.test(input.image)){
        errors.image="You must write a valid url."
    }else if(!format.test(input.image)){
        errors.image="Only png, jpg and jpeg formats are allowed."
    }

    return errors;
}