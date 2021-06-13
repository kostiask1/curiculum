import React, { useEffect, useContext } from "react";
import Palette from "../../components/Palette/Palette";
import { cvContext } from "../../context/catalog/cv-context";
import Footer from "../../layout/Footer/Footer";

const Post = (props) => {
  const { findWithTitle, data } = useContext(cvContext);

  useEffect(() => {
    findWithTitle(props.params.post);
    Palette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //console.log(props);

  if (data && data.length !== 0) {
    const { fullImage, title } = data;
    const stack = data.stack.split(",");
    return (
      <>
        <section className="post fadeIn">
          <div className="container">
            <span className="name">{title}</span>
            <picture className="img-wrap">
              <img src={fullImage} className="delayed fadeIn" alt="" />
            </picture>
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
    );
  } else return false;
};

export default Post;
