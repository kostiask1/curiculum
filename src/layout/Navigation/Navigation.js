import React, { useEffect, useContext } from "react";
import { Link } from "react-scroll";
import { Link as RLink } from "react-router-dom";
import { cvContext } from "../../context/catalog/cv-context";

export default function Navigation() {
  const { find, data } = useContext(cvContext);

  useEffect(() => {
    find();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //console.log(data);

  return (
    <nav className="nav fadeIn">
      <div className="container">
        <RLink to="/">kostiask</RLink>
        <div className="navs">
          <div className="ham">
            <span />
            <span />
            <span />
          </div>
          <Link
            to="main"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            containerId="page"
          >
            Главная
          </Link>
          <Link
            to="info"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            containerId="page"
          >
            Обо мне
          </Link>
          {data && data.length !== 0 ? (
            <Link
              to="cases"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              containerId="page"
            >
              Мои работы
            </Link>
          ) : null}
          <a
            className="button"
            target="_blanc"
            href="https://t.me/kostiask"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-telegram-plane" />
            &nbsp;Связаться
          </a>
        </div>
      </div>
    </nav>
  );
}
