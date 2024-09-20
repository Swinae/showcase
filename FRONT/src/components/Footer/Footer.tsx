import './Footer.css'

export function Footer() {


    return (
        <>
            <p>© 2024 Trippr</p>
            <ul className='socials'>
                <li><a href=""><i className="fa-brands fa-instagram"></i></a></li>
                <li><a href=""><i className="fa-brands fa-facebook"></i></a></li>
                <li><a href=""></a><i className="fa-brands fa-x-twitter"></i></li>
            </ul>
            <div className='links-logo'>
                <ul className='links'>
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