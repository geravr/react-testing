# Proyecto: React Test - app To-Do
Tutorial desarrollado por [@geravr](https://github.com/geravr)
## 🧪 Pruebas unitarias - Conceptos


### ¿Qué son las pruebas unitarias?
Es el tipo de test que está principalmente enfocado en poder probar una pequeña pieza (unidad) del código.

### Caso de uso

Un ejemplo de caso de uso, es cuando nosotros tenemos una función que vamos a ejecutar, a la cual le vamos a pasar argumentos, y esperamos un valor de retorno.

## 🧪 Pruebas unitarias - Primeros pasos
### Shallow

Para realizar nuestro primer test unitario, utilizaremos la API `Shallow Rendering` de enzyme, ya que nos permite renderizar componentes sin preocuparnos por los componentes hijo.

### /Todo.js
El primer componente que probaremos será el componente `Todo.js` que se encuentra en la ruta `src/components/Todo/`

Este componente es una función al cual se le están inyectando 4 props (todo, index, completeTodo, removeTodo), que posteriormente utiliza dentro del componente.

Debemos tener presente que completeTodo y removeTodo son funciones.

Tenemos 2 botones, y cada botón ejecuta una función diferente cuando se realiza clic en cualquiera de ellos.
```javascript
const Todo = ({ todo, index, completeTodo, removeTodo }) => {
  return (
    <div
      className={style.todo}
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div className={style.actions}>
        <button className={`${style.btn} ${style.primary}`} onClick={() => completeTodo(index)}>✔ Complete</button>
        <button className={`${style.btn} ${style.danger}`} onClick={() => removeTodo(index)}>X Delete</button>
      </div>
    </div>
  );
}
```
Lo que debemos de realizar para hacer el test, es que a la función que crea el componente, debemos pasarle un objeto que debe contener los props que recibe (todo, index, completeTodo, removeTodo).

Además, debemos de ser capaces de escucharla, es decir, saber cuantas veces se ha llamado, y con que argumento se llamó.

#### Pasos a realizar

 - Crearemos lo siguiente para pasarlo a nuestro componente como argumentos:
   - Un objeto llamado `todo` que contiene 2 propiedades: isCompleted y text
   - Una variable `index` con un valor numérico.
   - Dos funciones mock, para simular las funciones `completeTodo` y `removeTodo`.

 - Vamos a simular los clic's sobre cada botón para que se ejecuten las funciones, y posteriormente le preguntaremos al mock, si completeTodo y removeTodo han sido llamadas y con qué argumentos. En nuestro caso, los valores de los argumentos deben ser los que establecimos en la variable index.

### /Todo.test.js
#### Paso 1
 - Creamos un archivo llamado `Todo.test.js` dentro de la misma ubicación donde se encuentra nuestro componente, una vez creado, importamos react, enzyme (shallow y configure), y el adaptador de enzyme. También debemos importar nuestro componente a testear

 - Nos debería quedar como lo siguiente:

```javascript
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import Todo from "./Todo";
```
#### Paso 2
 - Ahora debemos configurar enzyme para poder correr nuestros test. Agregamos la siguiente línea:

```javascript
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import Todo from "./Todo";

configure({ adapter: new Adapter() });
```
#### Paso 3
 - agregamos el métodos `describe` para indicar que realizaremos el `test` en nuestro componente `Todo`, y el método test para indicar que es lo que vamos a probar

```javascript
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import Todo from "./Todo";

configure({ adapter: new Adapter() });

describe('Todo', () => {
  test('ejecuta completeTodo cuando presiono el botón complete', () => {
    
  });
});
```
#### Paso 4
 - Ahora tenemos que comenzar a construir dentro del método `test` las variables y funciones (todo, index, completeTodo, removeTodo), que le vamos a pasar a nuestro componente como argumentos
```javascript
describe("Todo", () => {
  test("ejecuta completeTodo cuando presiono el botón complete", () => {
    const todo = {
      text: "Test todo",
      isCompleted: true,
    };
    const index = 5;
    const completeTodo = jest.fn();
    const removeTodo = jest.fn();
  });
});
```
#### Paso 5
 - Llamamos a nuestro método shallow, para renderizar nuestro componente y lo almacenamos en un wrapper de la siguiente manera:
```javascript
describe("Todo", () => {
  test("ejecuta completeTodo cuando presiono el botón complete", () => {
    const todo = {
      text: "Test todo",
      isCompleted: true,
    };
    const index = 5;
    const completeTodo = jest.fn();
    const removeTodo = jest.fn();

    const wrapper = shallow(<Todo />)
  });
});
```
#### Paso 6
 - En este punto nos hace falta pasarle nuestras variables y funciones que construimos a nuestro componente como por props, los agregamos:
```javascript
describe("Todo", () => {
  test("ejecuta completeTodo cuando presiono el botón complete", () => {
    const todo = {
      text: "Test todo",
      isCompleted: true,
    };
    const index = 5;
    const completeTodo = jest.fn();
    const removeTodo = jest.fn();

    const wrapper = shallow(
      <Todo
        todo={todo}
        index={index}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    );
  });
});
```

#### Paso 7
 - Ahora que tenemos nuestro componente completo y renderizado, tenemos que indicar que es lo que queremos hacer con él. En nuestro caso, le indicaremos que vaya a buscar el botón Complete y simule darle un click.
 - Esto lo hacemos con el método `wrapper.find('button')`, pero al existir 2 botones, debemos especificarle cual es el que nos interesa, utilizando el método `at()` y pasándole como argumento el índice del elemento que nos interesa.
 - En nuestro caso quedaría algo como esto `wrapper.find('button').at(0)`
 - Ahora solo resta indicar la acción que queremos que realice con el método `simulate()` y pasandole como argumento la un string de la acción que nos interesa, en nuestro caso 'click' quedando de la siguiente manera `wrapper.find('button').at(0).simulate('click');`

Nuestro código debería algo como esto:
```javascript
describe("Todo", () => {
  test("ejecuta completeTodo cuando presiono el botón complete", () => {
    ...

    const wrapper = shallow(
      <Todo
        todo={todo}
        index={index}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    );

    wrapper.find("button").at(0).simulate("click");

  });
});
```

#### Paso 8
 - Mandamos llamar nuestra función `completeTodo` con expect para comparar el resultado con la función comparadora `toEqual()`
 - En nuestro caso queremos comprobar que `completeTodo`, se mandó llamar una vez, y el argumento que se le pasó debe ser igual al valor de nuestro index, en este caso index es igual a 5
```javascript
describe("Todo", () => {
  test("ejecuta completeTodo cuando presiono el botón complete", () => {
    ...

    const wrapper = shallow(
      <Todo
        todo={todo}
        index={index}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    );

    wrapper.find("button").at(0).simulate("click");

    expect(completeTodo.mock.calls).toEqual([[5]]);
  });
});
```
 - guardamos cambios
 - abrimos nuestra consola en la ruta raíz de nuestro proyecto
 - corremos el test con la siguiente línea `npm test`
 - vemos que nuestro test pasa la prueba exitosamente
 - podemos comprobar nuestro test, cambiando el valor dentro del comparador, poniendo por ejemplo `toEqual([[4]]);`
 - veremos como nuestro test falla, y nos indica donde está el fallo.

#### Paso 9
 - Ahora realizaremos la prueba sobre la función removeTodo
 - Ya que el evento es prácticamente el mismo, duplicamos nuestro test de `completeTodo`, y reemplazamos los datos que corresponden a removeTodo
Nuestro test debería verse de la siguiente forma (puedes asignar el valor que gustes en index):
```javascript
  test("ejecuta removeTodo cuando presiono el botón delete", () => {
    const todo = {
      text: "Test todo",
      isCompleted: true,
    };
    const index = 3;
    const completeTodo = jest.fn();
    const removeTodo = jest.fn();

    const wrapper = shallow(
      <Todo
        todo={todo}
        index={index}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    );
    wrapper.find("button").at(1).simulate("click");

    expect(removeTodo.mock.calls).toEqual([[3]]);
  });
```
 - guardamos y realizamos las mismas pruebas que se realizaron anteriormente, y nuestro test debe pasar ambas pruebas

#### Paso 10
 - Para completar nuestras pruebas correctamente, necesitamos realizar una segunda comprobación.
 - En el caso de la primer prueba, si se presiona el botón `Complete`, queremos comprobar que no se ejecute `removeTodo`, y para la segunda prueba comprobar que no se ejecuta `removeTodo`
 - Lo que debemos realizar, es debajo de la línea `expect` debemos agregar otro expect donde llamemos a removeTodo/completeTodo (según sea el caso), y debemos comprobar que el resultado es un array vacío.
```javascript
describe("Todo", () => {
  test("ejecuta completeTodo cuando presiono el botón complete", () => {
    ...

    const wrapper = shallow(
      <Todo
        todo={todo}
        index={index}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    );

    wrapper.find("button").at(0).simulate("click");

    expect(completeTodo.mock.calls).toEqual([[5]]);
  });
});
```
 - guardamos y volvemos a ejecutar las pruebas
 - Si todo es correcto, nuestras pruebas deberían pasar exitosamente

Para referencia, nuestro test completo debería verse como el siguiente:
```javascript
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import Todo from "./Todo";

configure({ adapter: new Adapter() });

describe("Todo", () => {
  test("ejecuta completeTodo cuando presiono el botón complete", () => {
    const todo = {
      text: "Test todo",
      isCompleted: true,
    };
    const index = 5;
    const completeTodo = jest.fn();
    const removeTodo = jest.fn();

    const wrapper = shallow(
      <Todo
        todo={todo}
        index={index}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    );
    wrapper.find("button").at(0).simulate("click");

    expect(completeTodo.mock.calls).toEqual([[5]]);
    expect(removeTodo.mock.calls).toEqual([]);
  });

  test("ejecuta removeTodo cuando presiono el botón delete", () => {
    const todo = {
      text: "Test todo",
      isCompleted: true,
    };
    const index = 3;
    const completeTodo = jest.fn();
    const removeTodo = jest.fn();

    const wrapper = shallow(
      <Todo
        todo={todo}
        index={index}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
      />
    );
    wrapper.find("button").at(1).simulate("click");

    expect(removeTodo.mock.calls).toEqual([[3]]);
    expect(completeTodo.mock.calls).toEqual([]);
  });
});
```
