# React testing - app To-Do

Tutorial desarrollado por [@geravr](https://github.com/geravr)

### [Volver al inicio](../../)

## Conceptos generales


### Funciones puras
Son aquellas funciones que siempre nos van a retornar un mismo valor:
```javascript
export const handleClick = (x) => {
	return x;
}
```

### Funciones impuras
Son aquellas funciones en las que desconocemos si lo que nos retornará será lo mismo o diferente.
```javascript
export const fetchUser = async () => {
  const response = await fetch('/api/v1/whoami/');
  const user = await response.json();
  return user;
}
```
## Tips
### Estructura de archivos
Para mantener una buena estructura en nuestros archivos, en este tutorial estaremos creando los archivos de testing dentro de la misma carpeta donde se encuentre el componente que deseemos testear usando el mismo nombre de nuestro componente.

Por ejemplo si tenemos el siguiente componente `src/components/App.js`, nuestro archivo de test sería el siguiente `src/components/App.test.js`