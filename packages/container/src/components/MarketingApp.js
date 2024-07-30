import React, { useEffect, useRef } from 'react';
import { mount } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            /**
             * onNavigate se usa para comunicar con el mfe marketing
             * y enviar datos desde el mfe marketing al mfe container
             * 
             */
            onNavigate: ({ pathname: nextPathname}) => {
                const { pathname } = history.location;
                if(pathname !== nextPathname){
                    history.push(nextPathname);
                }
            }
        });

        history.listen(onParentNavigate);

    }, []);

    return (
        <div ref={ref}/>
    )
}
