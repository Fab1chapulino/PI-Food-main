import styles from "../css/Loading.module.css";
import loading from "./assets/pngegg.png";

export default function Loading(){
    return (
        <div className={styles.Loading}>
            <img src={loading} alt="loading" />
        </div>
    )
}