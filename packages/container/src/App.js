import React from 'react'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'
import { BrowserRouter } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'

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
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <MarketingApp />
        </div>
      </StylesProvider>
    </BrowserRouter>
  )
}
