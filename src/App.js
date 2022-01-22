import React from "react"
import { Route, withRouter } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import Creator from "./components/Creator/Creator"
import { CvState } from "./context/catalog/cv-state"
import Navigation from "./layout/Navigation/Navigation"
import Main from "./pages/Main/Main"
import Post from "./pages/Post/Post"

const routes = [
    { path: "/", Component: Main },
    { path: "/post/:post", Component: Post },
]
if (process.env.NODE_ENV === "development") {
    routes.push({ path: "/create", Component: Creator })
    routes.push({ path: "/create/:post", Component: Creator })
}

function App() {
    return (
        <>
            <CvState>
                <Navigation />
            </CvState>
            {routes.map(({ path, Component }) => (
                <Route path={path} exact key={path}>
                    {({ match }) => (
                        <CSSTransition
                            in={match != null}
                            timeout={300}
                            classNames="page"
                            unmountOnExit
                        >
                            <CvState>
                                <div id="page" className="page">
                                    <Component {...match} />
                                </div>
                            </CvState>
                        </CSSTransition>
                    )}
                </Route>
            ))}
        </>
    )
}

export default withRouter(App)
