import React from 'react';
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Pricing from './components/Pricing';
import Album from './components/Landing';

/**
 * evita conflictos cuando se compila para prod
 * genera prefijos de clases que empiezan con ma y esto evita que 
 * se haga una coalición de clases entre distintos microfronts con 
 * la misma libreria css in js como material ui
 */
const generateClassName = createGenerateClassName({ 
    productionPrefix: 'ma' 
});

export default ({ history }) => {
    return (
        <React.Fragment>
            <StylesProvider generateClassName={generateClassName}>
                {/* BrowserRouter: crea una copia del Historia de navegacion y crea una historia propia */}
                {/* Router: creamos una copia de Historial de navegacion sin crear nuestra propia historia(recomendado para micrfront) */}
                <Router history={history}> 
                    <Switch>
                        <Route exact path='/pricing' component={ Pricing }/>
                        <Route path='/' component={Album}/>
                    </Switch>
                </Router>
            </StylesProvider>
        </React.Fragment>
    )
}