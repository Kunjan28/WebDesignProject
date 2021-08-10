import React from 'react'
import './SocialMedia.css'

function SocialMedia() {
    return (<>
        <div className="footer-icon-sidebar">
            <ul className="navbar-nav">
                <li className="nav-item inline-block">
                    <a href="https://github.com/Kunjan28/WebDesignProject" aria-label="Github" className="nav-link text-github"><i
                        className="fa fa-github"></i></a></li>
                <li className="nav-item inline-block"><a href="https://www.facebook.com/kunjan.gala.9" aria-label="Insagram" className="nav-link"><i className="fa fa-facebook"
                ></i></a>
                </li>
                <li className="nav-item inline-block">
                    <a href="https://github.com/Kunjan28/WebDesignProject" aria-label="Github" className="nav-link text-github"><i
                        className="fa fa-twitter"></i></a></li>
                <li className="nav-item inline-block"><a href="https://www.instagram.com/kunjan.gala/" aria-label="Insagram" className="nav-link"><i className="fa fa-instagram"
                ></i></a>
                </li>
                <li className="nav-item inline-block"><a href="https://www.linkedin.com/in/kunjangala28/" aria-label="LinkedIn" className="nav-link"><i className="fa fa-linkedin"
                ></i></a>
                </li>
            </ul>
        </div>


    </>
    )
}

export default SocialMedia
