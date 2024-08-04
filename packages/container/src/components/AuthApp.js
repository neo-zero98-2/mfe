import React, { useEffect, useRef } from 'react';
import { mount } from 'auth/AuthApp';
import { useHistory } from 'react-router-dom';

/**
 * !la funcion onNavigate no se manda a llamar nunca con el mfe auth
 * TODO: tratar de reparar este bug
 */
export default ({ onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            /**
             * onNavigate se usa para comunicar con el mfe marketing
             * y enviar datos desde el mfe marketing al mfe container
             * 
             */
            onNavigate: ({ pathname: nextPathname}) => {
                const { pathname } = history.location;
                console.log({ nextPathname, pathname });
                if(pathname !== nextPathname){
                    console.log("onNavigate auth");
                    history.push(nextPathname);
                }
            },
            onSignIn
        });

        history.listen(onParentNavigate);

    }, []);

    return (
        <div ref={ref}/>
    )
}
