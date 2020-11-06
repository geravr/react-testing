# React testing - app To-Do

Tutorial desarrollado por [@geravr](https://github.com/geravr)

## Jest methods

### describe & test
`describe(name, fn)`
Crea un bloque que agrupa varias pruebas relacionadas. El primer argumento es un string que describe el bloque, y el segundo una función que contiene los test

`test(name, fn)`
Método que ejecuta una prueba dentro de un bloque. El primer argumento es un string con el cual se describe la prueba, y el segundo es una función que contiene las expectativas a probar.

Ejemplo de uso:
```javascript
const completeTodo = () => {
  //Lógica de la función
};
const removeTodo = () => {
  //Lógica de la función
};

describe('TodoList', () => {
  test('ejecuta completeTodo cuando presiono el botón complete', () => {
    //Aquí va mi código de pruebas
  });

  test('ejecuta removeTodo cuando presiono el botón delete', () => {
    //Aquí va mi código de pruebas
  });
});
```

## Expect
De manera recurrente debemos comprobar que ciertos valores cumplen con determinadas condiciones, por ejemplo, lo que nos retorna una función. `expect`nos da acceso a un número de comparadores que nos permiten realizar estas validaciones.

`expect(value)`
Es una función que se utiliza cada vez que deseamos probar un valor.
Cada vez que necesitemos realizar una validación, utilizaremos la función  `expect`en conjunto con un comparador.

Por ejemplo, si estamos testeando una función pura llamada `isLogin()`, que debería retornar `true`, la forma en que lo comprobaríamos sería la siguiente:
```javascript
test('se comprueba que el usuario siga autenticado', () => {
  expect(isLogin()).toBe(true);
});
```
En este caso usamos el comparador `toBe` para comparar el resultado.

### Matchers
[Documentación - matchers](https://jestjs.io/docs/en/using-matchers#common-matchers)
Jest usa comparadores (matchers) para poder comprobar valores de distinas maneras. Por ejemplo para comprobar un valor con igualdad exacta se utiliza el comparador `toBe(value)`.
```javascript
test('siete por 3 son 21', () => {
  expect(7 * 3).toBe(21);
});
```

### Mocks Functions
[Documentación - mocks](https://jestjs.io/docs/en/mock-functions)

Jest posee un tipo de función llamada mock, este tipo de funciones son funciones simuladas que nos permiten probar nuestra aplicación, capturando las veces que han sido ejecutadas, y con que argumentos se han ejecutado.

 - Se declaran de la siguiente forma: `const myFunction = jest.fn();`

 - Para saber cuantas veces se ejecutó, se llama de la siguiente manera `myFunction.mock.calls`
   - Esto nos retornará un arreglo vacio `[]` si no se ejecutó ninguna vez
   - Si se ejecutó 1 o más veces retornará uno o varios arreglos dentro de un arreglo, es decir, si se ejecutó una vez, devolverá `[[]]`, si se ejecutó 3 veces `[[], [], []]`
   - Si alguna de las ejecuciones le pasó un argumento, el valor del argumento estará dentro del arreglo que corresponde a esa ejecución.
   
ejemplo:
```javascript
const myFunction = jest.fn();

// mandamos a ejecutar myFunction 1 vez sin argumentos
myFunction();

// llamamos al mock
myFunction.mock.calls // === [[]]

// ejecutamos 2 veces más nuestra función, pero ahora en una ocasión le pasamos un argumento
myFunction('testing');
myFunction();

// Volvemos a llamar al mock
myFunction.mock.calls // === [[], ['testing'], []]
```