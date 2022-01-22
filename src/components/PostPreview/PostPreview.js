import React from "react"
import { Link } from "react-router-dom"

const PostPreview = ({ post }) => {
    const { imagePreview, title, id } = post

    return (
        <div className="case">
            <Link to={`post/${id}`}>
                <strong>{title}</strong>
                <div className="case-img">
                    <picture>
                        <img src={imagePreview} alt={title} />
                    </picture>
                </div>
            </Link>
        </div>
    )
}

export default PostPreview
