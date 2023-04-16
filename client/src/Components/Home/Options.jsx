import {useState, useEffect} from "react";
import axios from "axios";
import { filter,order } from "../../redux/actions";
import {useDispatch} from "react-redux";
import styles from "../../css/Options.module.css";

export default function Options(){
    //hooks
    const dispatch = useDispatch();
    //useStates
    const [diets, setDiets] = useState([])
    const [show, setShow] = useState({
        diets:false,
    })
    const [filters, setFilters] = useState({
        diets:[],
        origin:"Show All"
    })
    const [orders, setOrders] = useState({
        by:"Default",
        mode:"None"
    })

    function showOptions(e){
        const id=e.target.id
      
        if(show[id]===false && diets.length){
            setShow({...show, [id]: true})
        }else{
            setShow({ ...show, [id]:false })
        }
    }

    function handleFilters(e){
        const {name, value, checked} = e.target;   
        switch(name){
            case "diets":
            checked?
            setFilters({
                ...filters,
                diets:[...filters.diets, value]
            }) :
            setFilters({
                ...filters,
                diets:[...filters.diets.filter( diet => diet!==value)]
            })  
            //console.log(filters.diets)
            break;
            case "origin":
                setFilters({
                    ...filters,
                    origin:value
                })
            break;
            default:
                setFilters({...filters})
        }  
    }

    function handleOrder(e){
        const {name, value} = e.target;
        console.log(name, value)
        setOrders({
            ...orders,
            [name]:value
        })
    }
    
    //useEffects
    useEffect(()=>{
        async function fetchDiets(){
            const {data} = await axios.get("http://localhost:3001/diets");
            console.log(data)
            let dietNames = data.map( diet => diet.name)
            dietNames.pop()
            setDiets(dietNames)
        }
        fetchDiets()
    },[])

     useEffect(()=>{
        dispatch(filter(filters))
    },[filters]) 

    useEffect(()=>{
        dispatch(order(orders))
    },[orders])


    //rendering
    return (<div className={styles.Options}>

        {/* Filters */}
        <div>
        <h3>Filters</h3>
          <div className={styles.filters}>
             <div className={styles.allSelects}>
                    <div className={styles.filtersOrders}>
                        
                        <label id="diets" onClick={(e)=>showOptions(e)} className={styles.label}>By diets</label>

                    </div>  
                    
                    <div className={styles.filtersOrders}>
                        <select name="origin" onChange={(e)=>handleFilters(e)} className={styles.select}>
                        <option value="Show All">Show All</option>
                        <option value="Created">Created</option>
                        <option value="Not Created">Not Created</option>
                        </select>
                    </div>
              </div>
                <div>
                    {show.diets && diets.map( (diet, i) => {
                        return <div key={i}>
                            <input type="checkbox" name="diets" id={diet} value={diet} onChange={(e)=> handleFilters(e)}/>
                            <label for={diet}>{diet}</label>
                        </div>
                    })}
                </div>
          </div>
          

        </div>
       

            {/* Orders */}
        <div>
        <h3>Order By</h3>
            <div className={styles.allSelects}>
                <div className={styles.filtersOrders}>
                    <select name="by" onChange={(e)=>handleOrder(e)} className={styles.select}>
                        <option value="By">By</option>
                        <option value="HealthScore">HealthScore</option>
                        <option value="Alphabetically">Alphabetically</option>
                    </select>
                </div>
               <div className={styles.filtersOrders}>
                    <select name="mode" onChange={(e)=>handleOrder(e)} className={styles.select}>
                        <option value="Mode">Mode</option>
                        <option value="Ascending">Ascending</option>
                        <option value="Descending">Descending</option>
                    </select>  
               </div>
             
            </div>
        </div>
    </div>)
}