# Archimail

Este proyecto tiene dos partes Componentes React y API express.

Se pueden desplegar juntos usando kubernetes, como es usual la componente se despliega usando static en express, la raíz del componente que dejamos en public siempre el componente react quedará por ejemplo _localhost:31007/assets/archimail.js_

_A cada app desplegable en k8s se le asigna un puerto en el rango 31xxx._

## Despliegue

### Primera vez

```
docker build -t localhost:32000/archimail/1.0:latest
docker push localhost:32000/archimail/1.0:latest
kubectl apply -f k8s.yaml
kubectl get pods| awk '/archimail/ {print $1}' | xargs microk8s kubectl delete pod
```

### Subsiguientes

```
cd folder
git pull
docker build -t localhost:32000/archimail/1.0:latest .
docker push localhost:32000/archimail/1.0:latest
```

```
kubectl get pods| awk '/archimail/ {print $1}' | xargs microk8s kubectl delete pod
o
kubectl delete pods -l app=archimail
```

### Pruebas

`curl localhost:31007/assets/archimail.js`

### Configuración

#### Apache

`ProxyPass /archimail http://localhost:31007`

#### Página Host

`<script src="/archimail/assets/archimail.js"></script>`

#### Componentes React

Son usadas en el sistema de P&S (Postulación y Selección). Una que lee el email y valida su propiedad y el otro para subir archivos, en este caso puntual se usa para el certificado de nacimiento. Ambas componentes se pueden usar desde otras aplicaciones.

- Lectura de Email
- Lectura de Archivo

El js recibe un nombre fijo para que se pueda levantar desde las páginas.

### API Express

La usa la pieza de validación de email

El api sigue en /api

El JS de react debe desplegarse con k8s y estar disponible via proxy para ser incluido en las páginas que lo levanten via script.
Si además la pieza depende de un API, el API puede ser responsable también de desplegar la pieza.

## Componentes React Sueltos (Legady docs)

Bueno este proyecto actualmente es un clon del b2 starter y lo hemos hecho así para poder ocupar el sistema de autenticación de correo electrónico para hacer la pieza de correo electrónico validado.

Actualmente tenemos dos componentes uno para subir archivos que crea un _Archivo_ en intervi directamente y el otro para el email validado. Hay una aplicación que se llama _archimail_, que lo que hace es incluir estos dos componentes en un js que se incluye en la página de antecedentes personales de postulaciones.

El email validado ocupa la app express: "api" que permite autenticar el correo electrónico.

Para evitar problemas de CORS, esta aplicación debe estar proxeada por Apache, idealmente ejecutando con kubernetes.

## app archimail

Esta app permite construir un sólo archivo js con los componentes: email validado y sube archivo.

Actualmente se copia directamente a la carpeta public/components en intervi, donde es incluido en la página host.

Esto componentes debiesen ser incluidos desde algun nginx que separe
el ciclo de vida de intervi del de los componentes.

Para construir y copiar a intervi, debe estar como hermano debemos hacer:

```
nx publish archimail
```

Revisar archivo `apps/archimail/project.json`

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

## Despliegue

El despliegue de aplicaciones de componentes react que se encuentran en un proyecto NX se desarrolla de la siguiente manera:

Asignar un puerto.

Lo primero es hacer una imagen con un Dockerfile que está en la carpeta de la aplicación

Se tagea en el registry del microk8s

Luego la primera vez se debe hacer un apply del archivo k8s para crear Deployment y Service.

En los casos subsiguientes falta hacer la actualización de la aplicación y borrar el POD para que se vuelva a crear con la última versión, por eso estaba ocupando :latest como versión.

Luego hacemos un ProxyPass en el apache hacia el puerto que tengamos en kubernetes con un sufijo de aplicación
que usaremos en la etiqueta Script de la página en que lo vamos a incluir.
