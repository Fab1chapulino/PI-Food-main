import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";



export default function Detail(){
    //hooks
    const {id} = useParams();
    const [ detail, setDetail ] = useState({});

    useEffect(()=>{
        ( async function getDetail(){
      const {data} = await axios.get(`http://localhost:3001/recipes/${id}`)

    data.diets= id.length < 36
    ? data.diets.join(", ") 
    : data.diets.map( diet => diet.name).join(", ");

        setDetail({...data})
  })()
    },[])

    //let { title, image, summary, healthScore, steps, diets } = detail;
    

    return(
        <div>
            <img src={detail.image} alt={detail.title}/>
            <p>Name:{detail.title}</p>
            <p>Summary:{detail.ummary}</p>
            <p>HealthScore:{detail.healthScore}</p>
            <p>Instructions:</p>
            <ol>
            {detail.steps?detail.steps.map( (step,index) => {
                return (<div key={index}>
                    <li>{step}</li>
                </div>)
            }) : null}
            </ol>
           <p>Diets:{detail.diets}</p> 
        </div>
    )
}