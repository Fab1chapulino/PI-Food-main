import {useParams} from "react-router-dom";
import axios from "axios";

async function getDetail(id){
    try{
      const {data} = await axios.get(`http://localhost:3001/recipes/${id}`)
    console.log(data, "detail")
    console.log(id, "id")
    return data;
    //setDetail({...data})
    }catch(err){
      console.log(err.message)
    }
  }

export default function Detail(/* {title, image, summary, healthScore, steps, diets } */){
    const {id} = useParams();

    const {title, image, summary, healthScore} = getDetail(id)
    console.log(title, "title")

    return(
        <div>
            <img src={image} alt={title}/>
            <p>Name:{title}</p>
            <p>Summary:{summary}</p>
            <p>HealthScore:{healthScore}</p>
            {/* <p>Instructions:{steps}</p>
            <p>Diets:{diets}</p> */}
        </div>
    )
}