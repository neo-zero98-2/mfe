import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue'

const mount = (el) => {
    const app = createApp(Dashboard);
    app.mount(el);
}

/**
 * si nosotros estamos en desarrollo y en aislamiento
 * llama inmediatamente a mount
 */
if(process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_dashboard-dev-root');

    if(devRoot){
        mount(devRoot,);
    }
}

/**
 * corrremos a través del container
 * y deberiamos exportar la funcion mount
 */
export { mount };