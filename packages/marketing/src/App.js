import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles'
import Pricing from './components/Pricing';
import Album from './components/Landing';

export default () => {
    return (
        <React.Fragment>
            <StylesProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/pricing' component={ Pricing }/>
                        <Route path='/' component={Album}/>
                    </Switch>
                </BrowserRouter>
            </StylesProvider>
        </React.Fragment>
    )
}