# React testing - app To-Do
Tutorial desarrollado por [@geravr](https://github.com/geravr)
## 🧪 Pruebas de integración - Conceptos


### ¿Qué son las pruebas unitarias?
Este tipo de test está enfocado en probar un conjunto de piezas (unidades) de código, que componen a un software.

Normalmente son utilizados una vez se aprueben las pruebas unitarias. Si las pruebas unitarias pasan, entonces se realizan pruebas de integración, donde se ponen a prueba dichas unidades en conjunto.

### Caso de uso
Un caso de uso puede ser un módulo To-do, el cual está construido por un conjunto de unidades de código (distintas funciones para agregar, editar, borrar, así como eventos dentro del módulo). Se comprueba que la integración de todas estás piezas en conjunto funcionen de manera íntegra.

## 🧪 Pruebas de integración - Primeros pasos

### /TodoForm.js
El primer componente que probaremos será el componente `Todo.js` que se encuentra en la ruta `src/components/TodoForm/`

Si observamos, este componente tiene algunas cosas diferentes a nuestro componente anterior `Todo` que tenemos que integrar en nuestra prueba.

 - Entre ellas, en este nuevo componente se está haciendo uso del hook `useState`, que es el primer hook que deberíamos testear
 
 - Tenemos otra función `handleChange`que cambia el valor de nuestro state. Cada que el valor de nuestro input cambia, esta función es ejecutada.

 - Tenemos una función interna que se llama `handleSubmit`, la cual se ejecuta cuando el formulario es enviado.

 - Tenemos un input que ejecuta `handleChange` con el evento `onChange`
 - Tenemos un botón que ejecuta `handleSubmit` con el evento `onSubmit` del formulario.


```javascript
const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form className={style.todoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Read a book"
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};
```

En este punto haremos diferentes tipos de pruebas a nuestro componente `TodoForm`

#### Pasos a realizar - Parte 1/2
 - Crear un mock function para addTodo
 - Crear el objeto `e` que contiene las propiedades target.value y preventDefault como mock function
 - Renderizar TodoForm con shallow render
 - Simular un cambio en el input para que se ejecute addTodo con el objeto `e`
 - Simular un submit para que se ejecute handleSubmit con el objeto `e` y comprobar que se ejecuta `preventDefault`

#### Pasos a realizar - Parte 2/2
 - Refactorizar la lógica de TodoForm con custom Hook
 - Evaluar que el state `value` cambió con el nuevo valor asignado al momento de ejcutar `handleChange`
 - Evaluar que `handleSubmit`se ejecuta cuando el state `value` contiene datos
 - Evaluar que `handleSubmit` no se ejecuta cuando el state `value`no tiene datos

### /TodoForm.test.js

### Parte 1/2

#### Paso 1
 - Creamos un archivo llamado `TodoForm.test.js` dentro de la misma ubicación donde se encuentra nuestro componente, una vez creado, importamos react, enzyme (shallow y configure), y el adaptador de enzyme, así como la configuración del adaptador de enzyme. También debemos importar nuestro componente a testear

 - Nos debería quedar como lo siguiente:

```javascript
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import TodoForm from "./TodoForm";

configure({ adapter: new Adapter() });
```

#### Paso 2

 - agregamos el método `describe` para indicar que realizaremos el test en nuestro componente `Todo`, y el método `test` para indicar que es lo que vamos a probar.

```javascript
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Component
import TodoForm from "./TodoForm";

configure({ adapter: new Adapter() });

describe('TodoForm', () => {
  test('ejecuta addTodo cuando el formulario es enviado', () => {
    // ...
  });
});
```

#### Paso 3
 - Ahora tenemos que comenzar a construir dentro del método `test` la mock function `addTodo` que le vamos a pasar a nuestro componente como argumento, y el objeto `e` con las propiedades `target.value` y `preventDefault` como mock function, para pasarlo como argumento en los evento de `handleChange` y `handleSubmit`

```javascript
describe('TodoForm', () => {
  test('ejecuta addTodo cuando el formulario es enviado', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
  });
});
```

#### Paso 4
Llamamos a nuestro método shallow, para renderizar nuestro componente, le pasamos por prop la mock function `addTodo` y lo almacenamos en un wrapper de la siguiente manera:

```javascript
describe('TodoForm', () => {
  test('ejecuta addTodo cuando el formulario es enviado', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
	  const wrapper = shallow(<TodoForm addTodo={addTodo} />);
  });
});
```

#### Paso 5
En este punto nuestro componente ya está listo en el wrapper, para comenzar a simular las acciones `change` y `submit`

- Usamos el método `find`  y buscamos el elemento input
- Posteriormente concatenamos el método `simulate` para simular el evento `change` en nuestro `input`, y le pasamos el objeto `e` como argumento

```javascript
describe('TodoForm', () => {
  test('ejecuta addTodo cuando el formulario es enviado', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
	  const wrapper = shallow(<TodoForm addTodo={addTodo} />);
	  wrapper.find("input").simulate("change", e);
  });
});
```

#### Paso 6
 - Hacemos los mismos pasos anteriores, pero ahora aplicado para el elemento `form` y simulando un evento `submit`

```javascript
describe('TodoForm', () => {
  test('ejecuta addTodo cuando el formulario es enviado', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
	  const wrapper = shallow(<TodoForm addTodo={addTodo} />);
	  wrapper.find("input").simulate("change", e);
	  wrapper.find("form").simulate("submit", e);
  });
});
```

#### Paso 7
Ahora que ya tenemos nuestro componente renderizado y nuestros eventos simulados, debemos evaluar que nuestro mock `addTodo` fué llamado una vez con el argumento de `e.target.value`, y que nuestro mock `e.preventDefault` fue llamado una vez sin argumentos.

 - Usamos la función `expect` con `mock.calls` de `addTodo` como argumento, y el método `toEqual` para realizar la comparación con nuestro objeto `e.target.value`

```javascript
describe('TodoForm', () => {
  test('ejecuta addTodo cuando el formulario es enviado', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
	  const wrapper = shallow(<TodoForm addTodo={addTodo} />);
	  wrapper.find("input").simulate("change", e);
	  wrapper.find("form").simulate("submit", e);
	
	  expect(addTodo.mock.calls).toEqual([[e.target.value]]);
  });
});
```

#### Paso 8
 - Para comprobar nuestro `preventeDefault` realizamos los mismos pasos anteriores, pero en esta ocasión el argumento de `expect` debe ser con `e.preventDefault` y en el método `toEqual` el array debe estar vacío para comprobar que nuestro mock solo se llamó una vez sin argumentos

```javascript
describe('TodoForm', () => {
  test('ejecuta addTodo cuando el formulario es enviado', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
	  const wrapper = shallow(<TodoForm addTodo={addTodo} />);
	  wrapper.find("input").simulate("change", e);
	  wrapper.find("form").simulate("submit", e);
	
	  expect(addTodo.mock.calls).toEqual([[e.target.value]]);
	  expect(e.preventDefault.mock.calls).toEqual([[]]);
  });
});
```

 - Guardamos cambios
 - Abrimos nuestra consola en la ruta raíz de nuestro proyecto
 - Corremos el test con `npm test`
 - Si todos está correcto, nuestro test debería pasar la prueba correctamente
 - Podemos comprobar nuestro test, cambiando el valor dentro del método comparador, poniendo por ejemplo toEqual([[4]]) u otro valor
 - Veremos como nuestro test falla, y nos indica donde está el fallo.

---

En este punto ya estamos realizando un test de integración, ya que estamos evaluando diferentes unidades en conjunto que están relacionadas entre sí, como lo son las funciones `addTodo` y `preventDefault`, las simulaciones `submit` y `change` en conjunto con las funciones `handleChange`, `handleSubmit` y el cambio de nuestro state `value` de manera indirecta.

Pero no estamos testeando lo que está sucediento dentro de nuestra lógica de componente, por ejemplo, no estamos comprobando que efectivamente nuestro state cambió con `handleChange` y que dato debería tener, además de evaluar que la función `handleSubmit`, solo se ejecute de manera correcta cuando tenemos datos en dicho state.

---

### Parte 2/2

### /TodoForm.js

#### Paso 1

Primeramente, en nuestro componente `TodoForm`, debemos realizar una refactorización de la lógica de nuestro componente, para que dicha lógica pueda ser probada.

Debemos convertir nuestra lógica en un custom hook que retorne nuestras funcione y state, y posteriormente usarla dentro de nuestro componente.

Para realizarlo hacemos lo siguiente:
 - Debemos crear una nueva función llamada `useTodoForm`, que esté fuera de la función que construye nuestro componente
 - Posteriormente debemos llevarnos la lógica de nuestro componente (el state `value`, y las funciones `handleSubmit` y `handleChange`) a la nueva función creada

```javascript
import React, { useState } from "react";
import style from "./todoForm.module.css";

export const useTodoForm = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
}

const TodoForm = ({ addTodo }) => {

  return (
    <form className={style.todoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Read a book"
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};
export default TodoForm;
```

---

#### Paso 2

 - Hacemos que nuestro hook `useTodoForm` retorne nuestras 2 funciones y nuestro state
 - También agregamos un parámetro a la función, que se usará para pasarle el prop `addTodo`
 - Exportamos nuestro hook, para poder usarlo más adelante en nuestras pruebas

```javascript
export const useTodoForm = (addTodo) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return { value, handleSubmit, handleChange }
}
```

Nuestro hook ya está listo para ser usado, solo basta con comenzar a usarla dentro de nuestro componente.

---

#### Paso 3

 - Llamamos nuestro hook dentro de la lógica de nuestro componente y le pasamos como argumento `addTodo`
 - Hacemos una destructuración de nuestra función para extraer las funciones y state que está retornando

```javascript
const TodoForm = ({ addTodo }) => {

  const { value, handleSubmit, handleChange } = useTodoForm(addTodo);

  return (
    <form className={style.todoForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Read a book"
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
```
 - Guardamos cambios, y probamos que nuestro componente siga funcionando, y que las pruebas que habíamos hecho, sigan pasando correctamente

---

### /TodoForm.test.js
#### Paso 4

 - Ahora que tenemos listo nuestro hook para comenzar a testear, agregamos un nuevo `describe` y `test` para comenzar a crear la primer prueba, que será monitorear el cambio de nuestro state, cuando la función `handleChange` se ejecuta
```javascript
describe("useTodoForm", () => {
  test('cuando se llama a handleChange, se modifica el state "value"', () => {
    // ...
  });
});
```

 - Construimos nuestro mock `addTodo` y nuestro objeto `e`

```javascript
describe("useTodoForm", () => {
  test('cuando se llama a handleChange, se modifica el state "value"', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
  });
});
```

---

#### Paso 5
Ahora tenemos que importar nuestro hook, para poder testearlo.

Pero existe un problema, un hook no puede ser llamado fuera de de un componente React, por lo cual necesitaremos crear un componente de prueba para poder pasarle nuestro hook como prop, y posteriormente poder extraer las propiedades de nuestro hook para comenzar a realizar los test.

 - Definimos nuestro componente de prueba con sus `props`
 - Dentro de nuestro componente creamos una nueva variable llamada `hook`, a la cual le alacenaremos la ejecución de nuestro hook que vamos a pasar como propiedad
 - Dentro del componente retornamos un elemento `div` al cual le vamos a inyectar nuestra variable `hook` de forma destructurada

```javascript
describe("useTodoForm", () => {
  test('cuando se llama a handleChange, se modifica el state "value"', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
  });
});
```

En este punto nuestro div va a contener las propiedades `value`, `handleSubmit` y `handleChange`.

Con ezyme, podemos renderizar nuestro componente de prueba, y pedirle que nos devuelva las propiedades del elemento `div` para comenzar a utilizarlas en las pruebas.

---

#### Paso 6

 - Definimos nuestro wrapper con un shallow render de nuestro componente de test

```javascript
describe("useTodoForm", () => {
  test('cuando se llama a handleChange, se modifica el state "value"', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
	const wrapper = shallow(<Test hook={useTodoForm} />);
  });
});
```

---

#### Paso 7

 - Extraemos las propiedades de nuestro componente div y lo almacenamos en una variable `let` (ya que estaremos actualizando su valor) llamada props
 - En el llamado de props le pasamos como argumento a nuestro mock `addTodo`

```javascript
describe("useTodoForm", () => {
  test('cuando se llama a handleChange, se modifica el state "value"', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
	const wrapper = shallow(<Test hook={useTodoForm} />);
	let props = wrapper.find("div").props();
  });
});
```

---

#### Paso 8

En este punto ya tenemos nuestros props listos para comenzar a realizar acciones y evaluar los resultados

En esta prueba queremos comprobar que cuando se ejecute `handleChange` y se le pasa nuestro objeto `e` como argumento, el valor de nuestro state `value` ha sido modificado y el nuevo valor es el mismo que el de nuestro objeto

 - Ejecutamos `handleChange` y le pasamos nuestro objeto `e` como argumento

```javascript
describe("useTodoForm", () => {
  test('cuando se llama a handleChange, se modifica el state "value"', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
	const wrapper = shallow(<Test hook={useTodoForm} />);
	let props = wrapper.find("div").props();
	props.handleChange(e);
  });
});
```

 - Volvemos a re-asignar props, para que se actualien los valores después de haber ejecutado `handleChange``

```javascript
describe("useTodoForm", () => {
  test('cuando se llama a handleChange, se modifica el state "value"', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
	const wrapper = shallow(<Test hook={useTodoForm} />);
	let props = wrapper.find("div").props();
	props.handleChange(e);
	props = wrapper.find("div").props();
  });
});
```

Ahora props ya se encuentra actualizado con los nuevos valores y podemos comenzar a utilizar expect para evaluar los resultados.

---

#### Paso 9
En este punto queremos evaluar que el valor de `props.value` (nuestro state), sea el mismo que el de nuestro objeto `e.target.value`, y que nuestros mocks `preventDefault` y `addTodo` no hayan sido ejecutados

 - agregamos un `expect` para cada caso y realizamos la comparación con el método `toEqual`

```javascript
describe("useTodoForm", () => {
  test('cuando se llama a handleChange, se modifica el state "value"', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
    const wrapper = shallow(<Test hook={useTodoForm} />);
    let props = wrapper.find("div").props();
    props.handleChange(e);
    props = wrapper.find("div").props();
    expect(props.value).toEqual(e.target.value);
    expect(e.preventDefault.mock.calls).toEqual([]);
    expect(addTodo.mock.calls).toEqual([]);
  });
});
```
 - Guardamos y volvemos a correr las pruebas
 - Si todo está correcto, nuestros test deberían seguir funcionando.

---

#### Paso 10
Ahora debemos realizar 2 test adicionales que evaluarán que handleSubmit solo se acciona si tenemos datos en el state `value`

un test que comprueba que se ejecuta con datos en el state y otro test que comprueba que no se ejecuta si no hay datos en el state

 - Creamos un nuevo `test` con la descripción "cuando el state 'value' contiene datos, se ejecuta handleSubmit"
 - Copiamos toda la lógica de nuestra prueba anterior hasta la línea donde se declara por primera vez `let props = ...`

```javascript
  test('cuando el state "value" contiene datos, se ejecuta handleSubmit', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
    const wrapper = shallow(<Test hook={useTodoForm} />);
    let props = wrapper.find("div").props();
  });
```

---

#### Paso 11
Debemos ejecutar `handleChange` para agregar un valor a nuestro state `value` y posteriormente ejecutamos `handleSubmit` para enviar el submit a través de addTodo con el nuevo valor.

 - A través de `props` ejecutamos `handleChange` pasandole como argumento el objeto `e`
 - Reasignamos `props` para actualizar el cambio
 - A través de `props` ejecutamos `handleSubmit` pasandole como argumento el objeto `e`
 - Reasignamos `props` para actualizar el cambio

```javascript
  test('cuando el state "value" contiene datos, se ejecuta handleSubmit', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
    const wrapper = shallow(<Test hook={useTodoForm} />);
    let props = wrapper.find("div").props();
    props.handleChange(e);
    props = wrapper.find("div").props();
    props.handleSubmit(e);
    props = wrapper.find("div").props();
  });
```

---

#### Paso 12
- Ahora que las acciones han sido ejecutadas, procedemos a realizar la evaluación que cumpla las siguientes condiciones:
  - El mock `preventDefault` tuvo haberse ejecutado sin argumentos
  - El mock `addTodo` tuvo que haberse ejecutado con el valor de `e.target.value` como argumento
  - El state value debe ser un string vacío

 - Creamos los 3 `expect` correspondientes con el método comparador `toEqual` para cumplir las condiciones mencionadas

```javascript
  test('cuando el state "value" contiene datos, se ejecuta handleSubmit', () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
    const wrapper = shallow(<Test hook={useTodoForm} />);
    let props = wrapper.find("div").props();
    props.handleChange(e);
    props = wrapper.find("div").props();
    props.handleSubmit(e);
    props = wrapper.find("div").props();
	
    expect(e.preventDefault.mock.calls).toEqual([[]]);
    expect(addTodo.mock.calls).toEqual([[ e.target.value ]]);
    expect(props.value).toEqual("");
  });
```

 - Guardamos y volvemos a correr las pruebas
 - Si todo está correcto, nuestros test deberían seguir funcionando.

---

#### Paso 13
 - Creamos un nuevo `test` con la descripción "cuando el state 'value' contiene datos, se ejecuta handleSubmit"
 - Copiamos toda la lógica de nuestra prueba anterior, pero en esta ocasión omitimos la ejecución de `handleSubmit`

```javascript
  test("cuando el state 'value' NO contiene datos, handleSubmit falla", () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
    const wrapper = shallow(<Test hook={useTodoForm} />);
    let props = wrapper.find("div").props();
    props.handleSubmit(e);
    props = wrapper.find("div").props();

    expect(e.preventDefault.mock.calls).toEqual([[]]);
    expect(addTodo.mock.calls).toEqual([[ e.target.value ]]);
    expect(props.value).toEqual("");
  });
  });
```

---

#### Paso 14
 - Debemos actualizar los `expect` para que cumplan las siguientes condiciones:
   - El mock `preventDefault` tuvo haberse ejecutado sin argumentos
   - El mock `addTodo` no tuvo que haberse ejecutado
   - El state value debe ser un string vacío

```javascript
  test("cuando el state 'value' NO contiene datos, handleSubmit falla", () => {
    const addTodo = jest.fn();
    const e = {
      target: {
        value: "nuevo todo",
      },
      preventDefault: jest.fn(),
    };
    const Test = (props) => {
      const hook = props.hook(addTodo);
      return <div {...hook}></div>;
    };
    const wrapper = shallow(<Test hook={useTodoForm} />);
    let props = wrapper.find("div").props();
    props.handleSubmit(e);
    props = wrapper.find("div").props();

    expect(e.preventDefault.mock.calls).toEqual([[]]);
    expect(addTodo.mock.calls).toEqual([]);
    expect(props.value).toEqual("");
  });
  });
```

 - Guardamos y volvemos a correr las pruebas
 - Si todo está correcto, nuestros test deberían seguir funcionando.