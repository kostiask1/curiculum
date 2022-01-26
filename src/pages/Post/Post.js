import React, { useEffect, useContext, useRef } from "react"
import { cvContext } from "../../context/catalog/cv-context"
import Footer from "../../layout/Footer/Footer"
import useDraggableScroll from "use-draggable-scroll"

const Post = (props) => {
    const { getPostById, data } = useContext(cvContext)
    const ref = useRef(null)

    useEffect(() => {
        getPostById(props.params.post)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { onMouseDown } = useDraggableScroll(ref, { direction: "horizontal" })

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
                                View Live -&#62;
                            </a>
                        ) : null}

                        <div className="description">{description}</div>
                        {window.innerWidth > 767 && imagesArray.length > 1 ? (
                            <span className="hint">
                                To scroll slides horizontally grab with mouse /
                                hold shift and scroll / use touchpad
                            </span>
                        ) : null}
                        <div
                            ref={ref}
                            onMouseDown={(e) => onMouseDown(e)}
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
