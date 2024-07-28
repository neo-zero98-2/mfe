# mfe

### Deployd en aws
(Opcional)crear una accion [personalizada con github actions](https://docs.github.com/es/actions/quickstart) con el codigo que se encuentra en la ruta raiz de este proyecto `.github/workflows/container.yml` para que cada push que se haga al repo se despliegue en aws.

Si compro el curso [Microfrontends with React: A Complete Developer's Guide
](https://www.udemy.com/course/microfrontend-course/?couponCode=MCLARENT71824) se puede guiar de la guia de referencia [cheatsheet](https://www.udemy.com/course/microfrontend-course/learn/lecture/33274448#questions) para poder configurar los micrfronts en aws.

1. crear bucket con las configuraciones por defecto

2. ir a la pestaña de propiedades del bucket, habilitar Alojamiento de sitios web estáticos(static website hosting) y especificar la pagina de inicio del sitio web(index document) en `index.html`

3. ir a la pestaña de permisos, ir a edit block public access y deshabilitar la opcion de bloquear todo el acceso publico(Edit public access blocking (bucket settings))

4. crear una politica, ir a pestaña permisos,  editar poitica del bucket, ir a generardor de politicas(aws policy generator) para generar la politica.

   - **Step 1: Select Type of Policy**

      | nombre     | opcion     |
      | ---------- | --------------- |
      | `Select Type of Policy`    | S3 Bucket Policy          |

   - **Step 2: Add Statement(s)**

      | nombre     | opcion     |
      | ---------- | --------------- |
      | `Effect`    | Allow          |
      | `Principal` | *              |
      | `Actions`  | GetObject       |
      | `Amazon Resource Name (ARN)`  | `{{ ARN del bucket }}` |

   - **Step 3: Generate Policy**
   - **Step 4**: `copiar y pegar el json de la politica en politica del bucket(Bucket policy) y guardar`