import React, { lazy, Suspense, useEffect } from "react"
import { Route, withRouter } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import Palette from "./components/Palette/Palette"
import { CvState } from "./context/catalog/cv-state"
import Navigation from "./layout/Navigation/Navigation"
const Create = lazy(() => import("./pages/Create/Create"))
const Main = lazy(() => import("./pages/Main/Main"))
const Auth = lazy(() => import("./pages/Auth/Auth"))
const Post = lazy(() => import("./pages/Post/Post"))

const routes = [
    { path: "/", Component: Main },
    { path: "/post/:post", Component: Post },
    { path: "/auth", Component: Auth },
]
if (!!sessionStorage.getItem("refreshToken")) {
    routes.push({ path: "/create", Component: Create })
    routes.push({ path: "/create/:post", Component: Create })
}

function App() {
    useEffect(() => {
        Palette()
    }, [])

    return (
        <>
            <CvState>
                <Navigation />
            </CvState>
            <Suspense fallback={null}>
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
            </Suspense>
        </>
    )
}

export default withRouter(App)
