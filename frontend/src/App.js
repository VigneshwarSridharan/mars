import React, { Suspense } from 'react';
import Sidebar from './layouts/Sidebar';
import Navbar from './layouts/Navbar';
import { Scrollbars } from 'react-custom-scrollbars';
import routes from './router';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Spring } from 'react-spring/renderprops'
import { Preloader } from './utils';
import Chating from './views/Chatting';

function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Sidebar />
                <div className="main-wrapper">
                    <Navbar />
                    <div className="main-content-wrapper">
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
                                                        document.title = `Mars - ${options.name}`;
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
                        <Chating />
                    </div>
                </div>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;
