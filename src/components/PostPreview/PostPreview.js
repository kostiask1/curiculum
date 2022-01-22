import React from "react"
import { Link } from "react-router-dom"

const PostPreview = ({ post }) => {
    //const { image, title, link } = post;
    console.log(post)

    console.log(/\b(?:.jpg|.webp|.png|.svg)\b/gi.exec(post.imagePreview))

    return (
        // <div className="case">
        //   <Link to={`post/${link}`}>
        //     <strong>{title}</strong>
        //     <div className="case-img">
        //       <picture>
        //         <img src={image} type={{/\b(?:.jpg|.webp|.png|.svg)\b/gi.exec(img)}} alt={title} />
        //       </picture>
        //     </div>
        //   </Link>
        // </div>
        null
    )
}

export default PostPreview
