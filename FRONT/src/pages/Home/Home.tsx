import './Home.css'
import { ButtonType1 } from "../../components/Buttons/ButtonType1";

export function HomePage() {


    return (
        <>
            <section className="intro">
                <h1>Welcome to Trippr !</h1>
                <p>
                    Trippr is a plannification tool for your trips around the world. <br />
                    <br />
                    Prepare and plan everything before going on your adventure and get easy access to your list anywhere !
                </p>
            </section>

            <section className="hero">
                <p>Plan your first trip now !</p>
                <ButtonType1 ButtonText={"Let's go"} ButtonRedirection={'/signin'} />
            </section>

            <section className="presentation">
                <h2>How does it work ?</h2>
                <ol>
                    <li>
                        <h4>Create a trip</h4>
                        <img src="../../Trip card.png" alt="Exemple of a trip card" />
                    </li>
                    <li>
                        <h4>Plan your itinary</h4>
                        <img src="../../Itinary.png" alt="Exemple of a trip itinary" />
                    </li>
                    <li>
                        <h4>Follow your map</h4>
                        <img src="../../Map.png" alt="Exemple of a trip map" />
                    </li>
                </ol>
            </section>

        </>
    )
}