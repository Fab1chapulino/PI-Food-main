import {useParams, NavLink, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "../css/Detail.module.css";

export default function Detail(){
    //hooks
    const {id} = useParams();
    const history = useHistory();
    const [ detail, setDetail ] = useState({});
    const [message, setMessage]=useState("");

    useEffect(()=>{
        ( async function getDetail(){
            try{
            const {data} = await axios.get(`http://localhost:3001/recipes/${id}`)
            
        const regex = /(<([^>]+)>)/ig;
        data.summary=data.summary.replace(regex, "");
        console.log(typeof data.id, data.id)

            data.diets=id.length <36
            ? data.diets.join(", ") 
            : data.diets.map( diet => diet.name).join(", ");

            setDetail({...data})
            }catch(err){
                setMessage("Cannot Fetch Recipe")
                console.log(err.message)
            }
      
  })()
    },[])

    return(
        !message.length?
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
                    <p>{detail.diets}</p> 
            </div> 
             
        </div>
        :<div>
              <div>
            <button onClick={()=> history.goBack()} className={styles.goBack}>Go back</button>
            </div>
            <h1 className={styles.errorMessage}>Coudn`t fetch recipe.<br/> Please check your internet connection.</h1>
        </div>
    )
}