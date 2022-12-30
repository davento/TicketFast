# TicketFast
Ejercicio de tienda online.

## Prerequisitos
Se requiere de `node.js` para correr la aplicación y `npm` para descargar los paquetes. Asegurar tenerlos instalado.

Los paquetes a utilizar se encuentran en las dependencias mostradas en `packages.json`. Estos incluyen:
- **[body-parser:](https://www.npmjs.com/package/body-parser)** middleware para reconocer elementos en el cuerpo de una página y poder usarlos en el backend.
- **[ejs:](https://www.npmjs.com/package/express)** embeber páginas web con JavaScript
- **[express:](https://www.npmjs.com/package/express)** framework web
- **[morgan:](https://www.npmjs.com/package/morgan)** logger para requests en HTTP.
- **[neo4j-driver:](https://www.npmjs.com/package/neo4j-driver)** poder hacer requests a la base de datos en neo4j.

Correr 
```
npm install
```
para instalarlos.

## Ejecución
Usar `node` o `nodemon` para ejecutar el aplicativo.
```
node app.js
```

El aplicativo puede visualizarse de manera local desde el [puerto 3000](http://localhost:3000/) cuando se está ejecutando.
