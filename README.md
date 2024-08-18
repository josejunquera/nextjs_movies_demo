This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

He desarrollado la aplicación web usando React 18 como se indica en los requisitos de la prueaba técnica. Apesar de no tener experiencia con Next.js, al ver la documentación oficial de React más actualizada veo que el uso de frameworks como Next es altamente recomendado, y prácticamente un requisito y standard para la creación de aplicaciones modernas.

En cuanto a la gestión del estado global dentro de la aplicación, tengo experiencia con Redux Vanilla pero al ser un requisito de la prueba técnica opto por el uso de Redux Toolkit. Me ha gustado mucho por su simplicidad frente al uso de Redux tradicional.

En cuanto a los estado global de la aplicación he trabajado con 2 slices:
-guestSessionSlice: Maneja la creación y persistencia de sesiones de invitado, permitiendo a los usuarios calificar películas sin necesidad de autenticación.
-moviesSlice: Administra la información de las películas, incluyendo listado de películas destacadas, detalles específicos de películas individuales y listado películas calificadas por el usuario.

La aplicación está diseñada con una estructura de componentes muy simple, donde cada componente tiene una responsabilidad clara. Componentes como MovieCard, MoviesList, y RatingForm se encargan de renderizar la información relacionada con las películas, mientras que GuestSessionInitializer asegura que los usuarios tengan una sesión activa para calificar películas cuando que se inizializa la aplicación.

Normalmente me gusta trabajar con una estructura de componentes tipo atom design, pero por la sencillez del proyecto y el poco tiempo que le he podido dedicar me ha parecido mejor opción simplificar la estructura de componentes y hacerlo de una forma más directa.

Las solicitudes a la API de TMDb se manejan con Axios, aprovechando su capacidad para configurar un cliente HTTP con cabeceras personalizadas. La clave API se almacena de manera segura usando variables de entorno.

He elegido Tailwind CSS principalmente por la limpieza y rapidez en la creación de diseños responsive y modernos. Todos los estilos de la aplicación están implementados utilizando clases de Tailwind, lo que facilita la gestión y modificación de los estilos a lo largo del proyecto.
