import React, { lazy, Suspense, useState } from 'react'
import Header from './components/Header'
import { BrowserRouter } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom';
import Progress from './components/Progress';

const AuthLazy = lazy(() => import('./components/AuthApp'));
const MarketingLazy = lazy(() => import('./components/MarketingApp'));

/**
 * evita conflictos cuando se compila para prod
 * genera prefijos de clases que empiezan con co y esto evita que 
 * se haga una coalición de clases entre distintos microfronts con 
 * la misma libreria css in js como material ui
 */
const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
});

export const App = () => {
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  return (
    <BrowserRouter>
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
              <Route path='/' component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  )
}
