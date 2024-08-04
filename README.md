# MFE

  ## 🎯 Overview
  
  Este es el proyecto final de microfrontends del curso de [Microfrontends with React: A Complete Developer's Guide](https://www.udemy.com/course/microfrontend-course/)

### Installation
  
  1. Clone the repository:
  
     ```bash
     git clone https://github.com/neo-zero98-2/mfe.git
     cd project-name
     ```
  
  2. Install dependencies:
  
     ```bash
     npm install
     ```
  
  3. Start the development server:
     ```bash
     npm start
     ```

## 🚀 Despliegue en aws
(Opcional)crear una accion [personalizada con github actions](https://docs.github.com/es/actions/quickstart) con el codigo que se encuentra en la ruta raiz de este proyecto `.github/workflows/container.yml` para que cada push que se haga al repo se despliegue en aws.

Si compro el curso [Microfrontends with React: A Complete Developer's Guide
](https://www.udemy.com/course/microfrontend-course/?couponCode=MCLARENT71824) se puede guiar de la guia de referencia [cheatsheet](https://www.udemy.com/course/microfrontend-course/learn/lecture/33274448#questions) para poder configurar los micrfronts en aws o en su defecto seguir esta guia.

### Crear bucket 

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

### Crear una distribución CloudFront

1. Crear una distribución(Create distribution) en CloudFront

   | nombre     | opcion     |
   | ---------- | --------------- |
   | `Dominio de origen`    | `{{ nombre del bucket de aws s3 }}`          |

2. Nos dirigimos a la parte de Comportamiento predeterminado de la caché(Default cache behavior)

   | nombre     | opcion     |
   | ---------- | --------------- |
   | `Política de protocolo del espectador`    | Redirigir HTTP a HTTPS          |

3. una vez creada la distribución seleccionamos la distribución y nos vamos a sus ajustes.

   | nombre     | opcion     |
   | ---------- | --------------- |
   | `Objeto raíz predeterminado`    | /container/latest/index.html          |

   el valor `/container/latest/index.html` es el que se devolverá cuando se solicita la URL raíz (/)
4. nos iremos a paginas de errores(error pages) y creamos una respuesta de error personalizada

   | nombre     | opcion     |
   | ---------- | --------------- |
   | `Código de error HTTP`    | 403: Prohibido         |
   | `Error al almacenar en caché el TTL mínimo` | 10              |
   | `Personalizar la respuesta ante errores`  | Si       |
   | `Ruta de la página de respuesta`  | /container/latest/index.html |
   | `Código de respuesta HTTP`  | 200: Está bien |

### Generar Access Key ID y Secret Access Key

Si vio el curso Si compro el curso [Microfrontends with React: A Complete Developer's Guide
](https://www.udemy.com/course/microfrontend-course/?couponCode=MCLARENT71824) puede guiarse de la guía de referencia [cheatsheet](https://www.udemy.com/course/microfrontend-course/learn/lecture/30889004#overview)

1. ir a IAM de aws, luego a administracion del acceso, luego a usuarios y le damos en crear usuario

2. Especificar los detalles del usuario.

   | check      | nombre     | opcion     |
   | ---------- | ---------- | --------------- |
   |            | `Nombre de usuario`    | `{{ nombre del usuario }}`        |
   |      ☑️      | `Proporcione acceso de usuario a la consola de administración de AWS: opciona` |               |
   |      ☑️      | `Contraseña generada automáticamente` |              |
   |      ☑️      | `Los usuarios deben crear una nueva contraseña en el siguiente inicio de sesión (recomendado).` |  |

3. Establecer permisos

   | check      | nombre     | opcion     |
   | ---------- | ---------- | --------------- |
   |      ☑️    | `Opciones de permisos`    | Adjuntar políticas directamente       |

   una vez seleccionadas las opciones irse a politicas de permisos, buscar y seleccionar AmazonS3FullAccess y CloudFrontFullAccess.
4. Revisar y crear: revisamos y guardamos
5. Recuperar contraseña: se nos mostrara el link de acceso del usaurio junto con su usuario y contraseña
6. nos vamos a la lista de usuarios, seleccionamos nuestro usuario y en Claves de acceso le damos en `Crear clave de acceso`

   - **Prácticas recomendadas y alternativas para la clave de acceso**

      | check      | nombre     | opcion     |
      | ---------- | ---------- | --------------- |
      |      ☑️    | `Caso de uso`    | Interfaz de línea de comandos (CLI)      |
      |      ☑️    | `Entiendo la recomendación anterior y deseo proceder a la creación de una clave de acceso.`    |    |
   - **Establecer el valor de etiqueta de descripción - opcional**

       | nombre     | opcion     |
       | ---------- | --------------- |
       | `Valor de etiqueta de descripción`    | `{{ valor }}`        |

   - **Recuperar claves de acceso**: se nos mostrará el Access Key ID y Secret Access Key

### (solo si se creo una github action) crear secrets en github
1. nos vamos a nuestro repositorio, en settings, luego en deployd keys 
2. añadimos los valores de nuestro `container.yml` secrets.AWS_S3_BUCKET_NAME, secrets.AWS_ACCESS_KEY_ID y secrets.AWS_SECRET_ACCESS_KEY
3. una vez creadas volvemos a hacer push con cambios en la carpeta container.

`NOTA`: cada vez que se haga el proceso de build se tiene que agregar una invalidación en el cloudFront del o los archivo(s) que se hallan modificado. Esto aplica solo no se creo la accion con github actions.



