import {NavLink} from "react-router-dom";
import styles from "../css/Landing.module.css";

export default function Landing(){
    return (<div className={styles.Landing}>
        <h1 className={styles.h1}>Welcome to Apetito</h1>
        <NavLink to="/home/1" className={styles.link}>Go Home</NavLink> 
    </div>)
}