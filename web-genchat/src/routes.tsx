import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import { Container } from './styles';

import Home from './pages/Home';
import Main from './pages/Main';

const Routes: React.FC = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/main" component={Main} />
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;