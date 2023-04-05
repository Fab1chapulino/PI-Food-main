import {NavLink} from "react-router-dom";

export default function Landing(){
    return (<div>
        <h1>Welcome to Apetito</h1>
        <NavLink to="/home/1">Go Home</NavLink> 
    </div>)
}