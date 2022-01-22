import React, { useEffect, useContext } from "react"
import Palette from "../../components/Palette/Palette"
import { cvContext } from "../../context/catalog/cv-context"
import Footer from "../../layout/Footer/Footer"

const Post = (props) => {
    const { getPostById, data } = useContext(cvContext)

    useEffect(() => {
        getPostById(props.params.post)
        Palette()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (data && data.length !== 0) {
        const { imagesArray, title, description, stack, link } = data
        return (
            <>
                <section className="post fadeIn">
                    <div className="container">
                        <span className="name">{title}</span>
                        {link ? (
                            <a
                                className="liveurl"
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Live ->
                            </a>
                        ) : null}

                        <div className="description">{description}</div>
                        <div
                            className={
                                imagesArray.length > 1 ? "image-carousel" : null
                            }
                            dir="ltr"
                        >
                            {imagesArray.map((img, index) => (
                                <div key={index} className="img-wrap">
                                    <img
                                        className="delayed fadeIn"
                                        src={img}
                                        alt={img}
                                    />
                                </div>
                            ))}
                        </div>
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
