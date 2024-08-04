import React, { lazy, Suspense, useEffect, useState } from 'react'
import Header from './components/Header'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import Progress from './components/Progress';
import { createBrowserHistory } from 'history';
 
const AuthLazy = lazy(() => import('./components/AuthApp'));
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

/**
 * evita conflictos cuando se compila para prod
 * genera prefijos de clases que empiezan con co y esto evita que 
 * se haga una coalición de clases entre distintos microfronts con 
 * la misma libreria css in js como material ui
 */
const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

const history = createBrowserHistory();

export const App = () => {
  const [ isSignedIn, setIsSignedIn ] = useState(false);

  useEffect(() => {
    if(isSignedIn){
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header 
            onSignOut={ () => { setIsSignedIn(false); console.log("signout");} } 
            isSignedIn={ isSignedIn }/>
          <Suspense fallback={<Progress/>}>
            <Switch>
              <Route path='/auth' >
                <AuthLazy 
                  onSignIn={ () => { setIsSignedIn(true); console.log("signin");}}/>
              </Route>
              <Route path='/dashboard'>
                { !isSignedIn && <Redirect to='/'/> }
                <DashboardLazy/>
              </Route>
              <Route path='/' component={MarketingLazy} /> {/* importante poner el '/' al final */}
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  )
}
