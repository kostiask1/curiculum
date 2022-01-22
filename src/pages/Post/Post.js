import React, { useEffect, useContext } from "react"
import Palette from "../../components/Palette/Palette"
import { cvContext } from "../../context/catalog/cv-context"
import Footer from "../../layout/Footer/Footer"
import { NavLink } from "react-router-dom"

const Post = (props) => {
    const { findWithTitle, data } = useContext(cvContext)

    useEffect(() => {
        findWithTitle(props.params.post)
        Palette()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (data && data.length !== 0) {
        const { imagesArray, title, description, stack } = data
        return (
            <>
                <section className="post fadeIn">
                    {props?.params?.post ? (
                        <NavLink to={"/create/" + props.params.post}>
                            Edit
                        </NavLink>
                    ) : null}
                    <div className="container">
                        <span className="name">{title}</span>
                        <div className="image-carousel">
                            {imagesArray.map((img, index) => (
                                <picture key={index} className="img-wrap">
                                    <img
                                        className="delayed fadeIn"
                                        src={img}
                                        alt={img}
                                    />
                                </picture>
                            ))}
                        </div>
                        <div className="description">{description}</div>
                        {stack && stack.length !== 0 ? (
                            <div className="stack">
                                <span>Stack of used technologies:</span>
                                <ul>
                                    {stack.map((item) => (
                                        <li className="button" key={item}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </section>
                <Footer />
            </>
        )
    } else return false
}

export default Post
