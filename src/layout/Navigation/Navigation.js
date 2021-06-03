import React from "react";
import { Link } from "react-scroll";

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="container">
        <a href="\">kostiask</a>
        <div className="navs">
          <div className="ham">
            <span />
            <span />
            <span />
          </div>
          <Link to="main" spy={true} smooth={true} offset={-100} duration={500}>
            Главная
          </Link>
          <Link to="info" spy={true} smooth={true} offset={-100} duration={500}>
            Обо мне
          </Link>
          <Link
            to="cases"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Мои работы
          </Link>
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
