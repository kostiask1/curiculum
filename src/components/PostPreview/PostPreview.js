import React from "react";
import { Link } from "react-router-dom";

const PostPreview = (props) => {
  const { image, title, link } = props;
  return (
    <div className="case">
      <Link to={`post/${link}`}>
        <strong>{title}</strong>
        <div className="case-img">
          <picture>
            <img src={image} alt={title} />
          </picture>
        </div>
      </Link>
    </div>
  );
};

export default PostPreview;
