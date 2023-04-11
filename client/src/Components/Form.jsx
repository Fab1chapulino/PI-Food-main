import {useState,useEffect} from "react";
import axios from "axios";
import validate from "../validations";
import {useDispatch, useSelector} from "react-redux";
import {createRecipeThunk} from "../redux/thunkFunctions";
import {useHistory} from 'react-router-dom';

export default function Form(){
    //hooks
    const dispatch = useDispatch();
    const history = useHistory();
    const message= useSelector( state => state.message)
    //useStates
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
/*--------------------------Handling the inputs-----------------------------*/

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

        if(e.target.name==="steps"){
            console.log(input.steps)
            setErrors({
                ...errors,
                [e.target.name]:validate({
                    [e.target.name]: input.steps
                })[e.target.name]
            })
        }else{
             setErrors({
            ...errors,
            [e.target.name]:validate({
                [e.target.name]: e.target.value
            })[e.target.name]
        })
        }
    }
/*--------------------------HandleSubmit------------------------------*/
    function handleSubmit(e){
        e.preventDefault()
        console.log(submit, "submit")
         if(submit){
            dispatch(createRecipeThunk(input))
        } 
    }


//Doing the user to know what instructions have been added so far
      function createStep(){
        step.length &&
        setInput({
            ...input,
            steps:[...input.steps,step]
        })
        setSteps("")
        setErrors({
            ...errors,
            steps:""
        })
        //console.log(input)
    }  

    function deleteStep(e){
        const id = e.target.id;
        console.log(typeof id, "-------> ID del step")
        if(input.steps.length===1){
            setInput({
                ...input,
                steps:[]
            }) 
        }else{
            const filtered = input.steps.find( (e,i) =>i == id)
            setInput({
                ...input,
                steps:[...input.steps.filter( step => step !== filtered)]
            })
            console.log(filtered, "-------->filtered")
            console.log(input.steps, "blbablabab")
        }
    }
  function editStep(e){
            const {id, value}= e.target;
            const newSteps = input.steps.toSpliced(id,1, value)
            setInput({
                ...input,
                steps:[...newSteps]
            })
        }
    /*------------------------------------------useEffects----------------------------------------------*/

    useEffect( ()=>{
        async function fetchDiets(){
        const {data} = await axios.get("http://localhost:3001/diets")
        let dietNames = data.map( diet => diet.name)
        dietNames.pop();
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

    useEffect(()=>{
        console.log(message, "message")
           if(message==="CANNOT POST RECIPE"){
                console.log(input)
                setErrors(validate(input))
            }else if(message==="POSTED RECIPE SUCCESFULLY"){
                history.push("/home/1")
                window.location.reload() 
            }
    },[message])


    /*---------------------Rendering------------- */
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
                <label   onClick={()=>createStep()}  >Add</label>
                <p>{errors.steps && errors.steps}</p>
                <ol>
                    { input.steps && input.steps.map( (inst, i) =>{
                        return <li key={i} >
                            <span>{inst}</span>
                            <input id={i} onChange={(e)=> editStep(e)} value={input.steps[i]}/>               
                            <label id={i} onClick={(e) => deleteStep(e)}>X</label>

                            </li>
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