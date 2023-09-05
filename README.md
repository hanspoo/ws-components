# Componentes React Sueltos

Bueno este proyecto actualmente es un clon del b2 starter y lo hemos hecho así para poder ocupar el sistema de autenticación de correo electrónico para hacer la pieza de correo electrónico validado.

Actualmente tenemos dos componentes uno para subir archivos que crea un _Archivo_ en intervi directamente y el otro para el email validado. Hay una aplicación que se llama _all-components_, que lo que hace es incluir estos dos componentes en un js que se incluye en la página de antecedentes personales de postulaciones.

El email validado ocupa la app express: "api" que permite autenticar el correo electrónico.

Para evitar problemas de CORS, esta aplicación debe estar proxeada por Apache y debe ejecutar ojalá con kubernetes.

## app all-components

Esta app permite construir un sólo archivo js con los componentes: email validado y sube archivo.

Se copia directamente a la carpeta en intervi, donde es incluido en la página host.

Esto componentes debiesen ser incluidos desde algun nginx que separe
el ciclo de vida de intervi del de los componentes.

Para construir y copiar a intervi, debe estar como hermano debemos hacer:

```
nx publish all-components
```

Revisar archivo `apps/all-components/project.json`

## Servicio de autenticación de email

API: App express que recibe la petición para validar un email, en el fondo
genera un código de seguridad que envía al email, y luego valida el código y genera
el ticket de autorización.

Llama al api:

`/api/registration/validate-email`

### Base de datos

Actualmente el servicio utiliza una base de datos y por lo tanto
lo más sano es empaquetarlo en su propio pod y ejecutarlo en kubernetes.

La base de datos de tickets debe ser persistente para el caso de
un reinicio.

Lo más conveniente para este caso es usar sqlite y así la base
de datos persistente sólo requiere montar una carpeta.

### Correo saliente

El correo saliente en producción debe ser diferente al de desarrollo.
Se debe usar el archivo .env para cambiar el remitente y credenciales.
