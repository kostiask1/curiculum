import React from "react";
import { Route, withRouter } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { CvState } from "./context/catalog/cv-state";
import Navigation from "./layout/Navigation/Navigation";
import Main from "./pages/Main/Main";
import Post from "./pages/Post/Post";

const routes = [
  { path: "/", Component: Main },
  { path: "/post/:", Component: Post },
];

function App() {
  return (
    <>
      <Navigation />
      <div className="container">
        {routes.map(({ path, Component }) => (
          <Route
            key={path}
            exact
            path={path}
            render={({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <CvState>
                    <Component {...match} />
                  </CvState>
                </div>
              </CSSTransition>
            )}
          />
        ))}
      </div>
    </>
  );
}

export default withRouter(App);
