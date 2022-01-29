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
                <RLink to="/">Konstantine</RLink>
                {location.pathname.includes("/post/") ||
                location.pathname === "/" ? (
                    <div className="navs" onClick={() => toggleMenu()}>
                        <div className="ham">
                            <span />
                            <span />
                            <span />
                        </div>
                        {!!sessionStorage.getItem("refreshToken") ? (
                            <NavLink className="underlined" to="/create">
                                Create
                            </NavLink>
                        ) : null}
                        {location.pathname.includes("/post/") ? (
                            <>
                                {!!sessionStorage.getItem("refreshToken") ? (
                                    <>
                                        <NavLink
                                            className="underlined"
                                            to={
                                                "/create/" +
                                                location.pathname.split(
                                                    "/post/"
                                                )[1]
                                            }
                                        >
                                            Edit
                                        </NavLink>
                                    </>
                                ) : null}
                                <RLink className="underlined" to="/">
                                    Main
                                </RLink>
                            </>
                        ) : (
                            <>
                                <Link
                                    className="underlined"
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
                                    className="underlined"
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
                                        className="underlined"
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
                            <svg
                                fill="var(--gl)"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50"
                                width="24px"
                                height="24px"
                            >
                                <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z" />
                            </svg>
                            &nbsp;Contact me
                        </a>
                    </div>
                ) : null}
            </div>
        </nav>
    )
}
