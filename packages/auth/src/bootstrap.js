import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory  } from 'history'; // toma la historia directamente del navegador

/** 
 * ! el history.listen(onNavigate) nunca se manda a  llamar porquetiene conflicto con el history.listen del mfe marketing
 * TODO: tratar de reparar este bug
*/
const mount = (el, { onNavigate,  defaultHistory, initialPath }) => {
    const history = 
        defaultHistory || 
        createMemoryHistory({
            initialEntries: [initialPath], // se le pasa una ruta por default al hisotory
        });
    if(onNavigate){
        history.listen(onNavigate); //cuando detecta una navegacion llama a onNavigate
    }

    ReactDOM.render(
        <React.Fragment>
            <App history={ history }/>
        </React.Fragment>,
        el
    );

    return {

        /**
         * onParentNavigate se usa para comunicar con el mfe container
         * y enviar datos desde el mfe container al mfe marketing
         * 
         */
        onParentNavigate: ({ pathname: nextPathname}) => {
            const { pathname } = history.location;
            if (pathname !== nextPathname) {
                console.log("onParent auth");
                history.push(nextPathname);
            }
        }
    }
}

/**
 * si nosotros estamos en desarrollo y en aislamiento
 * llama inmediatamente a mount
 */
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');

    if(devRoot){
        /**
         * defaultHistory hace uso del historial del navegador 
         * pero esto es recomendable de forma aislada como aqui
         */
        mount(devRoot,{ defaultHistory: createBrowserHistory() });
    }
}

/**
 * corrremos a través del container
 * y deberiamos exportar la funcion mount
 */
export { mount };