# Proyecto: React Test - app To-Do

Tutorial desarrollado por [@geravr](https://github.com/geravr)

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


## Jest methods

### describe and test
`describe(name, fn)`
Crea un bloque que agrupa varias pruebas relacionadas. El primer argumento es un string que describe el bloque, y el segundo una función que contiene los test

`test(name, fn)` Método que ejecuta una prueba. El primer argumento es un string con el cual se describe la prueba, y el segunto es una función que contiene las expectativas a probar.

Ejemplo de uso:
```javascript
const myBeverage = {
  delicious: true,
  sour: false,
};

describe('mi bebida', () => {
  test('es deliciosa', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('no es amarga', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});
```

### expect
`expect(value)`
Es una función que se utiliza cada vez que deseamos probar un valor. En la mayoría de escenarios, se llamará a `expect` junto con una función tipo "comparador" para afirmar los valores de retorno de una función que estemos testeando.

Por ejemplo, si estamos testeando una función pura llamada `isLogin()`, que sabemos que va a devolver `true`, la forma en que lo comprobaríamos sería la siguiente:
```javascript
test('se comprueba que el usuario siga autenticado', () => {
  expect(isLogin()).toBe(true);
});
```
En este caso usamos la función toBe para comparar el resultado.

Para conocer el resto de funciones comparadoras podemos consultarlo en la documentación [Documentación - matchers](https://jestjs.io/docs/en/using-matchers#common-matchers)

### Mocks functions
[Documentación - mocks](https://jestjs.io/docs/en/mock-functions)

Jest posee un tipo de función llamadas mocks, este tipo de funciones son funciones simuladas que nos permiten probar nuestra aplicación, capturando las veces que han sido ejecutadas, y con que argumentos se han ejecutado.

 - Se declaran de la siguiente forma: `const myMock = jest.fn();`

 - Para saber cuantas veces se ejecutó, se llama de la siguiente manera `myMock.mock.calls`
   - Esto nos retornará un arreglo vacio `[]` si no se ejecutó ninguna vez
   - Si se ejecutó 1 o más veces retornará uno o varios arreglos dentro de un arreglo, es decir, si se ejecutó una vez, devolverá `[[]]`, si se ejecutó 3 veces `[[], [], []]`
   - Si alguna de las ejecuciones, le pasó un argumento, el valor del argumento estará dentro del arreglo que corresponde a esa ejecución.
   - Ejemplo, si se ejecutó 3 veces, y en la seguna ejecución se pasó como argumento el número 4, entonces retornará `[[], [4], []]`

## Enzyme - render

### Shallow Rendering
Renderiza solamente el componente sobre el cual estamos trabajando, pero no renderiza componentes hijos. Esto lo hace para permitirnos trabajar con nuestros componentes como una sola unidad.
```javascript
import { shallow } from 'enzyme';

const wrapper = shallow(<MyComponent />);
// ...
```

### Full Rendering
Toma nuestro componente, renderiza el html y lo monta en un DOM para permitirnos probar la interacción que va a tener nuestro componente con el DOM. De esta manera, nos permite trabajar con eventos que tengan que ver con el DOM.
```javascript
import { mount } from 'enzyme';

const wrapper = mount(<MyComponent />);
// ...
```

### Static Rendering
Toma nuestro componente y genera el html, pero no lo monta sobre el DOM, además nos entrega una api que nos permite por ejemplo, consultar si renderizó o no un botón, si tiene o no contiene cierto texto.
```javascript
import { render } from 'enzyme';

const wrapper = render(<MyComponent />);
// ...
```
## Enzyme - methods
### find
El método `find(selector)` encuentra todos los nodos que coincidan con el selector que se le pasa como argumento, dentro del arbol sobre el contenedor que se está renderizando.
La sintaxis a usar como selector, es la misma que utilizamos con css