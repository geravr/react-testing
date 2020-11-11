# React testing - app To-Do
Tutorial desarrollado por [@geravr](https://github.com/geravr)
## 🧪 Pruebas con snapshots - Conceptos


### ¿Qué son las pruebas unitarias?
Los tests de snapshot son de gran utilidad cuando se quiere asegurar que la UI no cambia inesperadamente.

### Caso de uso
Un caso de test de snapshot típico representa un componente de la interfaz de usuario, por ejemplo el login, toma el snapshot y luego lo compara con un archivo de snapshot de referencia almacenado junto con la prueba. La prueba fallará si los dos snapshots no coinciden: el cambio es inesperado o el snapshot de referencia debe actualizarse a la nueva versión del componente de la interfaz de usuario login.

## 🧪 Pruebas con snapshots - Primeros pasos

### /TodoForm.js
El componente que probaremos con snapshots será el componente `TodoForm.js` que se encuentra en la ruta `src/components/TodoForm/`.

La prueba la realizaremos dentro de nuestro archivo `TodoForm.test.js` que ya hemos utilizado anteriormente con las pruebas de inegración.

#### Paso 1

 - Para realizar las pruebas de snapshot primeramente necesitamos importar `import '@testing-library/jest-dom'`

 - Posteriormente dentro del `describe` de nuestro componente debemos agregar un nuevo test que llamaremos "comprobar que el componente TodoForm no ha cambiado"

```javascript
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import '@testing-library/jest-dom';

// Component
import TodoForm, { useTodoForm } from "./TodoForm";

configure({ adapter: new Adapter() });

describe("TodoForm", () => {
  test("comprobar que el componente TodoForm no ha cambiado", () => {
    // aquí va nuestra prueba de snapshot
  });

  test("ejecutar addTodo cuando el formulario es enviado", () => {
    // ...
  });
});
```

#### Paso 2

 - Creamos un wrapper de nuestro componente con shallow render

```javascript
describe("TodoForm", () => {
  test("comprobar que el componente TodoForm no ha cambiado", () => {
    const wrapper = shallow(<TodoForm />);
  });
});
```

#### Paso 3

 - Creamos un `expect` de nuestro wrapper, con el método `toMatchSnapshot`

```javascript
describe("TodoForm", () => {
  test("comprobar que el componente TodoForm no ha cambiado", () => {
    const wrapper = shallow(<TodoForm />);
	expect(wrapper).toMatchSnapshot();
  });
});
```
 - Guardamos cambios y corremos las pruebas

 - Lo que realiza el método `toMatchSnapshot` es lo siguiente:

   - Si no existe una captura previa, creará una nueva captura del componente que almacenará en `__snapshot__/TodoForm.test.js.snap` bajo la misma ruta del componente
   - Si ya existe una captura previa, tomará una nueva captura y hará una comparación, si las capturas son iguales, el test pasa, si las capturas son diferentes, el test falla
   - El test nos permitirá actualizar las capturas, si es que el cambio que se hizo al componente, era un cambio esperado

#### Paso 4
Si observamos el contenido de `__snapshot__/TodoForm.test.js.snap` podemos ver algo como esto:

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`TodoForm comprobar que el componente TodoForm no ha cambiado 1`] = `ShallowWrapper {}`;
```

Lo que nuestro snapshot está almacenando es `ShallowWrapper {}` y no nuestros elementos UI.

Este tipo de snapshots no nos sirven de mucho ya que lo que nosotros buscamos, es que almacene nuestro componente renderizado, es decir, elementos html como `<div>`, `<form>`, etc.

 - Para corregir esto necesitaremos instalar el paquete enzyme-to-json con la siguiente línea: 
`npm install --save-dev enzyme-to-json`

 - Una vez inslado realizamos la siguiente importación en nuestro archivo de test

```javascript
import {createSerializer} from 'enzyme-to-json';
 
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
```

 - Volvemos a correr las pruebas, y esta ocasión fallará el test de snapshot
 - En las pruebas nos dice que presionemos la tecla 'u' si queremos actualizar los cambios
 - Presionamos la tecla 'u' y se hará una actualización de nuestro snapshot

Si volvemos a abrir `__snapshot__/TodoForm.test.js.snap` veremos que el contenido ahora es algo como esto:
```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`TodoForm comprobar que el componente TodoForm no ha cambiado 1`] = `
<form
  className="todoForm"
  onSubmit={[Function]}
>
  <input
    className="input"
    onChange={[Function]}
    placeholder="Read a book"
    type="text"
    value=""
  />
  <button
    type="submit"
  >
    Add
  </button>
</form>
`;
```

De esta manera nuestro snapshot ya se encuentra almacenando todos los elementos que renderiza nuestro componente y nos permitirá detectar cuanto suceda un cambio en él.