import { css } from "@emotion/react"
import { useState } from "react"

interface NavbarBottomProps {
    mapDisplayStatus: (isDisplayed: boolean) => void;
}
export function NavbarBottom({ mapDisplayStatus }: NavbarBottomProps) {

    const [isDisplayed, setIsDisplayed] = useState(false);

    const NavbarBottomStyle = css`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5rem;

        li > button {
            font-size: 2.5rem;
            color: var(--third-font-color);
            background: none;
            border: none;
        }
    `

    const toggleDisplay = () => {
        setIsDisplayed(!isDisplayed)
        mapDisplayStatus(isDisplayed)
    }

    return (
        <>
            <ul className="navbar-wrapper" css={NavbarBottomStyle}>
                <li><button onClick={toggleDisplay}><i className="fa-solid fa-list"></i></button></li>
                <li><button onClick={toggleDisplay}><i className="fa-solid fa-map"></i></button></li>
            </ul>
        </>
    )
}