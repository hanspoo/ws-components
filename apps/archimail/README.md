# archimail

Componentes React

Para construir la imagen de docker elegir una imagen de base pequeña en este caso node para construir la imagen y nginx para desplegar.

Tenemos que considerar que podemos hacer el build directamente desde la línea de comandos agregando el tag del Racing que tiene el micro k8s en el puerto 32000:

```
welinux@puma ~/ws-components (main)$ docker build -f apps/archimail/Dockerfile -t localhost:32000/archimail/1.0:latest .
Sending build context to Docker daemon  6.664MB
Step 1/14 : FROM node:18.12.1-buster-slim AS builder
 ---> 35863b20820b
```

Tageada la imagen de esa forma después tenemos que hacerle un push al registry de microk8s

`docker push  localhost:32000/archimail/1.0:latest`

Luego borrar el POD actual, y si la imagen está tallada con latest, kubectl va a tomar esa imagen para crear un nuevo POD.

```
kubectl get pods
kubectl delete pod archimail-6d7f7bd65f-cw7fk
```

Podemos validar localmente en el puerto que elegimos por ejemplo 31006 y después revisar también que el Proxy de Apache esté apuntando a ese puerto para que se pueda cargar directamente desde el sitio web oficial en puertos 443 u 80.

`curl localhost:31006`

Al hacer el build el js de la app, tiene un nombre dinámica, se le debe cambiar a uno estandar por ej all-components.js, para poder incluir en la página que hostea el componente. Esto se hace normalmente en el project.json de la aplicación.
