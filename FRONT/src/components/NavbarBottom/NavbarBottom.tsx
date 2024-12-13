import { css } from "@emotion/react"

export function NavbarBottom() {

    const NavbarBottomStyle = css`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5rem;

        li > button {
            font-size: 3rem;
            color: var(--third-font-color);
            background: none;
            border: none;
            
        }
    `

    return (
        <>
            <ul className="navbar-wrapper" css={NavbarBottomStyle}>
                <li><button><i className="fa-solid fa-list"></i></button></li>
                <li><button><i className="fa-solid fa-map"></i></button></li>
            </ul>
        </>
    )
}