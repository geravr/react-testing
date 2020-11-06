# React testing - app To-Do

Tutorial desarrollado por [@geravr](https://github.com/geravr)

## Render

### Shallow Rendering
Renderiza solamente el componente sobre el cual estamos trabajando, pero no renderiza componentes hijos. Esto lo hace para permitirnos trabajar con nuestros componentes como una sola unidad.
```javascript
import { shallow } from 'enzyme';

const wrapper = shallow(<MyComponent />);
// ...
```

### Full Rendering
Toma nuestro componente, genera el html y lo monta en un DOM para permitirnos probar la interacción que va a tener nuestro componente con el DOM. De esta manera, nos permite trabajar con eventos que tengan que ver con el DOM.
```javascript
import { mount } from 'enzyme';

const wrapper = mount(<MyComponent />);
// ...
```

### Static Rendering
Toma nuestro componente, genera el html, pero no lo monta sobre el DOM, además nos entrega una api que nos permite por ejemplo, consultar si renderizó o no un botón, si dicho botón contiene o no cierto texto.
```javascript
import { render } from 'enzyme';

const wrapper = render(<MyComponent />);
// ...
```
## Methods
### find
El método `find(selector)` encuentra todos los elementos que coincidan con el selector que se le pasa como argumento, basandose en el arbol de elementos que contiene nuestro componente renderizado.
Pueden utilizarse los mismo selectores que se usan en CSS, por ejemplo:

`button` para buscar un elemento por tipo de elemento (en este caso un botón).
`.mi-clase` Para buscar un elemento por clase
`#mi-id` para buscar un elemento por id

```javascript
import { shallow } from 'enzyme';

const wrapper = shallow(<MyComponent />);
					   
// Esto buscaría un elemento con el id 'complete-button' que se encuentre dentro de nuestro componente					   
wrapper.find('#complete-buton');
```