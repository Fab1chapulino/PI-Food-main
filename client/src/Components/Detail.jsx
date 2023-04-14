import {useParams, NavLink, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "../css/Detail.module.css";

export default function Detail(){
    //hooks
    const {id} = useParams();
    const history = useHistory();
    const [ detail, setDetail ] = useState({});

    useEffect(()=>{
        ( async function getDetail(){
      const {data} = await axios.get(`http://localhost:3001/recipes/${id}`)
        
      const regex = /(<([^>]+)>)/ig;
      data.summary=data.summary.replace(regex, "");
      console.log(typeof data.id, data.id)

    /*     data.diets=typeof data.id ==="number"
        ? data.diets.join(", ") 
        : data.diets.map( diet => diet.name).join(", "); */

        setDetail({...data})
  })()
    },[])

    return(
        <div >
            <div>
            <button onClick={()=> history.goBack()} className={styles.goBack}>Go back</button>
            </div>
            <div className={styles.Data}>
                <img src={detail.image} alt={detail.title} className={styles.image}/>
                <h1 className={styles.Title}>{detail.title}.</h1>
                <p className={styles.Summary}>{detail.summary}</p>
                <h2 className={styles.Title}>HealthScore <br/><span className={styles.healthScoreValue}>{detail.healthScore}%</span></h2>
                
                <h2 className={styles.Title}>Instructions:</h2>
                <ol>
                {detail.steps?detail.steps.map( (step,index) => {
                    return (<div key={index}>
                        <li>{step}</li>
                    </div>)
                }) : null}
                </ol>
                <h2 className={styles.Title}>Diets</h2>
                   {/* <p>{detail.diets}</p> */} 
                  <ul>
                    {
                    typeof detail.id==="number" && detail.diets.length
                    ?detail.diets.map((diet, i)=> {
                        return <li key={i}>{diet}</li>
                    }): detail.diets.length && detail.diets.map((diet, i)=> {
                        return <li key={i}>{diet.name}</li>
                    })
                }
            </ul>
            </div> 
             
        </div>
    )
}