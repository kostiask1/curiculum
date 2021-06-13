import React, { useEffect, useContext } from "react";
import PostPreview from "../../components/PostPreview/PostPreview";
import { cvContext } from "../../context/catalog/cv-context";
import Footer from "../../layout/Footer/Footer";
import { Link } from "react-scroll";
import Palette from "../../components/Palette/Palette";

const Main = () => {
  const { find, data } = useContext(cvContext);
  useEffect(() => {
    find();
    Palette();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let newData = data.reduce(
    (result, value, index, sourceArray) =>
      index % 2 === 0
        ? [...result, sourceArray.slice(index, index + 2)]
        : result,
    []
  );

  return (
    <>
      <main id="main" className="fadeIn">
        <div className="container">
          <h1>
            <span>
              <p>FRONT - END</p>
              <svg
                className="circle"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  id="curve"
                  d="m 0 50 a 1 1 0 0 1 100 0 a 1 1 0 0 1 -100 0 z "
                  fill="none"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 0 0;360 0 0"
                  dur="6.5s"
                  repeatCount="indefinite"
                />
                <text dy={10}>
                  <textPath
                    startOffset="-100%"
                    textLength={300}
                    fill="var(--gl)"
                    xlinkHref="#curve"
                  >
                    Click on me to change palette!!!
                    <animate
                      attributeName="startOffset"
                      from="-100%"
                      to="0%"
                      begin=".2s"
                      dur="3s"
                      repeatCount="once"
                      keyTimes="0; 1"
                      keySplines=".25 .1 .4 1;"
                      calcMode="spline"
                      fill="freeze"
                    />
                  </textPath>
                </text>
              </svg>
              <div
                id="colorize"
                className="cwrap"
                onClick={() => Palette(true)}
              >
                <div className="mask" />
                <img src="/images/drop.png" alt="" className="drop" />
              </div>
            </span>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;DEVELOPER</p>
          </h1>
          <div className="row">
            {data && data.length !== 0 ? (
              <Link
                to="cases"
                smooth={true}
                duration={500}
                containerId="page"
                className="button"
              >
                <div className="maskbtn maskbtn-arrow" />
                View works
              </Link>
            ) : null}
            <a
              href="https://firebasestorage.googleapis.com/v0/b/ciriculum-d98e2.appspot.com/o/CV%2FCV.pdf?alt=media&token=040dfadb-f1f3-4566-9db3-6a4815904db5"
              className="button"
              target="_blank"
              rel="noopener noreferrer"
              download="Kanshyn CV"
            >
              <div className="maskbtn maskbtn-load" />
              My CV
            </a>
          </div>
        </div>
      </main>
      <section id="info" className="info">
        <div className="container">
          <div className="row">
            <div className="text">
              <h2>Hi!</h2>
              <b>My name is Konstantine</b>
              <p>
                Junior Front-end developer - I love developing websites, making
                them responsive, animated and fast. Able to turn any of your
                dreams into reality.
              </p>
            </div>
            <picture className="pic">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ciriculum-d98e2.appspot.com/o/posts%2Finfo.jpg?alt=media&token=2599ecaf-e903-4bdc-8191-8a97f8f4d506"
                alt=""
              />
            </picture>
          </div>
        </div>
      </section>
      {data && data.length !== 0 ? (
        <section id="cases" className="cases">
          <div className="container">
            <h2>My works</h2>
            {newData.map((chunk) => (
              <div className="case-wrap" key={Math.random() * 99}>
                {chunk.map((post) => (
                  <PostPreview
                    image={post.image}
                    title={post.title}
                    link={post.title}
                    key={post.title}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
      ) : null}
      <Footer />
    </>
  );
};

export default Main;
