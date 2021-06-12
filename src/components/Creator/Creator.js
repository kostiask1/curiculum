import React, { useState } from "react";
import { app } from "../../base";
import "../../sass/creator.scss";
const db = app.firestore();

const Creator = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [fullImage, setFullImage] = useState("");
  const [stack, setStack] = useState("");

  const clearInputs = (e) => {
    if (e) e.preventDefault();
    setTitle("");
    setImage("");
    setFullImage("");
    setStack("");
  };

  const newItem = (e) => {
    e.preventDefault();
    const data = {
      title,
      image,
      fullImage,
      stack,
    };

    db.collection("All")
      .doc(data.id)
      .set(data)
      .then(() => clearInputs());
  };

  const handleTitle = (e) => {
    if (!e) return setTitle("");
    let newTitle = e[0].toUpperCase();
    newTitle = newTitle + e.slice(1);
    setTitle(newTitle);
  };
  return (
    <div className="creator">
      <div className="wrap">
        <div className="row">
          <div className="block">
            <form onSubmit={(e) => newItem(e)}>
              <h2 className="title">Create item</h2>
              <div className="row">
                <div className="col-10">
                  <div>&nbsp;</div>
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      placeholder="Item title"
                      onChange={(e) => handleTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="image"
                      value={image}
                      placeholder="Image"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="image"
                      value={fullImage}
                      placeholder="Full Image"
                      onChange={(e) => setFullImage(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="stack"
                      value={stack}
                      placeholder="Item stack"
                      onChange={(e) => setStack(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <button onClick={(e) => clearInputs(e)}>reset</button>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="block">
            <h2 className="title">Item preview</h2>
            <div className="cases">
              <div className="case-wrap">
                <div className="case">
                  <strong>{title && title}</strong>
                  <div className="case-img">
                    <picture>
                      <img src={image && image} alt={title && title} />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
