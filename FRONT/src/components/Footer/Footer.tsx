import { css } from '@emotion/react'

export function Footer() {

    const socials = css`
        display: flex;
        gap: 1rem;
        font-size: 24px;
    `

    const links = css`
        display: flex;
        justify-content: space-between;
        align-items: center;

        .legals {
            display: flex;
            gap: 1rem;
        }
    `

    return (
        <>
            <p>© 2024 Trippr</p>
            <ul css={ socials } >
                <li><a href=""><i className="fa-brands fa-instagram"></i></a></li>
                <li><a href=""><i className="fa-brands fa-facebook"></i></a></li>
                <li><a href=""></a><i className="fa-brands fa-x-twitter"></i></li>
            </ul>
            <div css={ links }>
                <ul className='legals'>
                    <li><a href="">Legals</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Terms</a></li>
                    <li><a href="">Privacy</a></li>
                </ul>
                <a className='logo' href="">Trippr</a>
            </div>
        </>
    )
}