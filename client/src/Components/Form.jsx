import {useState,useEffect} from "react";
import axios from "axios";
import validate from "../validations";
import {useDispatch, useSelector} from "react-redux";
import {createRecipeThunk} from "../redux/thunkFunctions";

export default function Form(){
    //hooks
    const dispatch = useDispatch();
    const [input, setInput]= useState({
        title:"",
        summary:"",
        steps:[],
        healthScore:0,
        diets:[],
        image:"" 
    });
    const [errors, setErrors] = useState({
        title:"",
        summary:"",
        steps:"",
        image:""
    })
    const [diets, setDiets] = useState([]);
    const [step, setSteps] = useState("");
    const [submit, setSubmit]=useState(false);



//Some extra Logic
//Handling the inputs

    function handleInputChange(e){
        /*---------------for diets-----------*/

        if(e.target.name==="diets"){
            e.target.checked
            ?setInput({
                    ...input,
                    [e.target.name]: [...input[e.target.name], e.target.id]
                })
            :setInput({
                ...input,
                [e.target.name]:[...input[e.target.name].filter( diet => diet !== e.target.id)]
            })

            /*--------------------for steps-------------*/

        }else if(e.target.name==="steps"){

            setSteps(e.target.value)

            /*----------------else----------*/

        }else{
            setInput({
            ...input,
            [e.target.name]: e.target.value
            })      
        }
        setErrors(validate({
            ...input
        }))
   
        //console.log(e.target.value)
        console.log(input, "input")  
    }

    function handleSubmit(e){
        e.preventDefault()
        setErrors(validate(input))
        submit && dispatch(createRecipeThunk(input))
    }


//Doing the user to know what instructions have been added so far
      function createStep(){
        const {steps} = input;
        step.length &&
        setInput({
            ...input,
            steps:[...steps, step]
        })
        setSteps("")
        console.log(input)
    }  

    /*-------------useEffects--------------*/

    useEffect( ()=>{
        async function fetchDiets(){
        const {data} = await axios.get("http://localhost:3001/diets")
        let dietNames = data.map( diet => diet.name)
        setDiets(dietNames)
    }
      fetchDiets()
    },[])

    useEffect(()=>{
        if(Object.values(errors).find(v=>v.length)){
            setSubmit(false)
        }else{
            setSubmit(true)
        }
    },[errors])
    
    return (
        <div>
            <h1>Create a Recipe</h1>

            <form onSubmit={(e)=>handleSubmit(e)}>

        {/*  name */}

                <label for="title">Name</label>
                <input name="title" id="title" value={input.title} onChange={ e => handleInputChange(e)}/>
                <p>{errors.title && errors.title}</p>

       {/*  Summary */}

                <label for="summary">Summary</label>
                <textarea name="summary" id="summary" value={input.summary} onChange={ e => handleInputChange(e)}/>
                <p>{errors.summary && errors.summary}</p>
        {/* Steps */}

                <label for="steps">Instructions</label>
                <input name="steps"  value={step} id="steps" onChange={ e => handleInputChange(e)}/>
                <button   onClick={()=>createStep()}  >Add</button>
                <p>{errors.steps && errors.steps}</p>
                <ol>
                    { input.steps && input.steps.map( (inst, i) =>{
                        return <li key={i} >{inst}</li>
                    })}
                </ol>

      {/*   healthScore */}

                <label for="healthScore">HealthScore</label>
                <input value={input.healthScore} name="healthScore" id="healthScore" type="range" min="0" step="1" max="100" onChange={(e)=>handleInputChange(e)}/>
                <span>{input.healthScore && input.healthScore}</span>

        {/* diets */}

                <p>Diets</p>
                      {diets.length &&
                        diets.map((diet, index)=>{
                            return <div key={index} >
                                    <input type="checkbox" name="diets" value={diet} id={index+1} onChange={(e)=>handleInputChange(e)}/>
                                    <label for={diet}>{diet}</label>
                                </div>
                        })
                    } 

        {/* image */}
            
                <label for="image">Image</label>
                <input name="image" id="image" value={input.image} onChange={ e => handleInputChange(e)}/>
                <p>{errors.image && errors.image}</p>

            <button type="submit">Submit</button>
            </form>
            
        </div>
    )
}