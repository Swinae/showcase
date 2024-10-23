import { ButtonType1 } from "../../components/Buttons/ButtonType1";
import { css } from '@emotion/react';

export function HomePage() {

    const introStyle = css`
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `

    const heroStyle = css`
        background-color: var(--second-bg-color);
        color: var(--second-font-color);
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;

        & p {
            font-size: 20px;
            font-weight: 300;
        }
    `
    
    const presentationStyle = css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    `

    return (
        <>
            <section className="intro" css={introStyle}>
                <h1>Welcome to Trippr !</h1>
                <p>
                    Trippr is a plannification tool for your trips around the world. <br />
                    <br />
                    Prepare and plan everything before going on your adventure and get easy access to your list anywhere !
                </p>
            </section>

            <section className="hero" css={heroStyle}>
                <p>Plan your first trip now !</p>
                <ButtonType1 ButtonText={"Let's go"} ButtonRedirection={'/signin'} />
            </section>

            <section className="presentation" css={presentationStyle}>
                <h2>How does it work ?</h2>
                <ol css={presentationStyle}>
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