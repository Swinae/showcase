import { ButtonType1 } from "../Buttons/ButtonType1";

export function NavbarTop() {


    return (
        <>
            <nav>
                <a className="logo" href="">Trippr</a>
                <ul>
                    <li><a href="">Sign up</a></li>
                    <li><ButtonType1 ButtonText={"Login"}/></li>
                </ul>
            </nav>
        </>
    )
}