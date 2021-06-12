import React, { useEffect, useContext } from "react";
import PostPreview from "../../components/PostPreview/PostPreview";
import { cvContext } from "../../context/catalog/cv-context";
import Footer from "../../layout/Footer/Footer";
import { Link } from "react-scroll";

const Main = (props) => {
  const { find, data, getColor, palette } = useContext(cvContext);
  //console.log(props);
  useEffect(() => {
    find();
    //getColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                    HIRE ME! HIRE ME! HIRE ME!
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
              <div id="colorize" className="cwrap">
                <div className="mask" />
                {/* <i
                  className="fas fa-cog"
                  style={{ zIndex: 999, fontSize: "52px" }}
                /> */}
                <img src="/images/cog.png" alt="" className="rotate" />
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
                Посмотреть реботы
              </Link>
            ) : null}
            <a href="/" className="button">
              <div className="maskbtn maskbtn-load" />
              Мое резюме
            </a>
          </div>
        </div>
      </main>
      <section id="info" className="info">
        <div className="container">
          <div className="row">
            <div className="text">
              <h2>Привет!</h2>
              <b>Меня зовут Костя</b>
              <p>
                Junior Front-end разработчик - люблю разрабатывать сайты, делаю
                их адаптивными, анимироваными и быстрыми. Способен превратить
                любую вашу мечту в реальность.
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
            <h2>Мои работы</h2>
            <div className="case-wrap">
              {data.map((post) => (
                <PostPreview
                  image={post.image}
                  title={post.title}
                  link={post.title}
                  key={post.title}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <Footer />
    </>
  );
};

export default Main;
