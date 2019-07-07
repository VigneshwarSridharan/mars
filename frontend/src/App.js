import React, { Suspense } from 'react';
import Sidebar from './layouts/Sidebar';
import Navbar from './layouts/Navbar';
import { Scrollbars } from 'react-custom-scrollbars';
import routes from './router';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'

const Preloader = (
    <div className="preloader">
        <img className="m-auto" src={'./assets/images/logo.png'} alt="" />
    </div>
)

function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Sidebar />
                <div className="main-wrapper">
                    <Navbar />
                    <Scrollbars>
                        <Suspense fallback={Preloader}>
                            <Switch>
                                {
                                    routes.map((route, inx) => {
                                        let { component: DisplayComponent, animation = true, ...options } = route
                                        return (
                                            <Route
                                                {...options}
                                                render={props => {
                                                    return animation ?
                                                        (
                                                            <Spring
                                                                from={{ transform: 'translateY(100px)', opacity: 0 }}
                                                                to={{ transform: 'translateY(0)', opacity: 1 }}
                                                            >
                                                                {styles => (
                                                                    <div style={styles} className="main-content">
                                                                        <DisplayComponent {...props} />
                                                                    </div>
                                                                )}
                                                            </Spring>
                                                        ) :
                                                        (
                                                            <div className="main-content">
                                                                <DisplayComponent {...props} />
                                                            </div>
                                                        )
                                                }}
                                                key={`route-${inx}`}
                                            />
                                        )
                                    })
                                }
                            </Switch>
                        </Suspense>
                    </Scrollbars>
                </div>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;
