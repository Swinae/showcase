import { NavLink } from "react-router-dom";
import { ButtonType1 } from "../Buttons/ButtonType1";

export function NavbarTop() {


    return (
        <>
            <nav>
                <NavLink to={'/'} className={'logo'}>Trippr</NavLink> 
                <ul>
                    <li><NavLink to={'/register'}>Register</NavLink></li>
                    <li><ButtonType1 ButtonText={"Sign in"} ButtonRedirection={"/signin"}/></li>
                </ul>
            </nav>
        </>
    )
}