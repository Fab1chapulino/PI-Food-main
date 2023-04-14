import {NavLink} from "react-router-dom";
import styles from "../../css/Nav.module.css";

export default function Nav(){

    return (
    <div>
        <div className={styles.Nav}>
        <NavLink to="/home/1" className={styles.link}>Home</NavLink>
        <NavLink to="/form" className={styles.link}>Create</NavLink>
        </div>

    </div>)
}