import React, { useEffect, useContext } from "react"
import { Link } from "react-scroll"
import { Link as RLink, NavLink, useLocation } from "react-router-dom"
import { cvContext } from "../../context/catalog/cv-context"

export default function Navigation() {
    const { find, data } = useContext(cvContext)

    useEffect(() => {
        find()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let screenWidth = document.documentElement.clientWidth
    let location = useLocation()

    if (screenWidth < 767) {
    }
    const toggleMenu = () => {
        if (document.documentElement.clientWidth > 768) return
        const menu = document.querySelector(".navs")
        if (menu.classList.contains("active")) {
            menu.classList.remove("active")
        } else {
            menu.classList.add("active")
        }
    }

    return (
        <nav className="nav fadeIn">
            <div className="container">
                <RLink to="/">Constantine</RLink>
                {(location.pathname.includes("/post/") && screenWidth > 768) ||
                location.pathname === "/" ? (
                    <div className="navs" onClick={() => toggleMenu()}>
                        <div className="ham">
                            <span />
                            <span />
                            <span />
                        </div>
                        {process.env.NODE_ENV === "development" ? (
                            <NavLink to="/create">Create</NavLink>
                        ) : null}
                        {location.pathname.includes("/post/") ? (
                            <>
                                <RLink to="/">Main</RLink>
                                {process.env.NODE_ENV === "development" ? (
                                    <NavLink
                                        to={
                                            "/create/" +
                                            location.pathname.split("/post/")[1]
                                        }
                                    >
                                        Edit
                                    </NavLink>
                                ) : null}
                            </>
                        ) : (
                            <>
                                <Link
                                    className="undelined"
                                    to="main"
                                    spy={true}
                                    smooth={true}
                                    offset={-100}
                                    duration={500}
                                    containerId="page"
                                >
                                    Main
                                </Link>
                                <Link
                                    className="undelined"
                                    to="info"
                                    spy={true}
                                    smooth={true}
                                    offset={-100}
                                    duration={500}
                                    containerId="page"
                                >
                                    About
                                </Link>
                                {data && data.length !== 0 ? (
                                    <Link
                                        className="undelined"
                                        to="cases"
                                        spy={true}
                                        smooth={true}
                                        offset={-100}
                                        duration={500}
                                        containerId="page"
                                    >
                                        Cases
                                    </Link>
                                ) : null}
                            </>
                        )}
                        <a
                            className="button"
                            href="https://t.me/kostiask"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <i className="fab fa-telegram-plane" />
                            &nbsp;Contact me
                        </a>
                    </div>
                ) : null}
            </div>
        </nav>
    )
}
