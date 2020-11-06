# Proyecto: React Test - app To-Do

Tutorial desarrollado por [@geravr](https://github.com/geravr)

### Global Wiki:
  - [General](./docs/wiki/general.md)
  - [Jest](./docs/wiki/jest.md)
  - [Enzyme](./docs/wiki/enzyme.md)

## 💡Antes de comenzar
 **Te recomiendo que navegues en la global wiki**
 
 En la global wiki, encontrarás conceptos generales, tips, descripciones y ejemplos de uso, de muchos de los métodos que estaremos utilizando a lo largo de los tutoriales.

Cuando no comprendas un método o función, te recomiendo consultarlo nuevamente en la global wiki

## ✅ Objetivos

**Creación del proyecto**

1. **Realizar pruebas unitarias**
   - *tag:*  `1-unit-testing`
   - *tutorial:*  [unit-testing](./docs/steps/unit-testing.md)
2. **Realizar pruebas de integración**
   - *tag:*  `2-integration-testing`
   - *tutorial:*  [integration-testing](./docs/steps/integration-testing.md)
3. **Realizar pruebas con snapshots**
   - *tag:*  `3-snapshot-testing`
   - *tutorial:*  [snapshot-testing](./docs/steps/snapshot-testing.md)
4. **Realizar pruebas end-to-end con cypress**
   - *tag:*  `4-e2e-testing`
   - *tutorial:*  [e2e-testing](./docs/steps/end-to-end-testing.md)   

## 🤖 Guía Rápida

1.  **Selecciona el tema.**

    Cada tema tiene su propio tag, dicho tag contiene los archivos necesarios para comenzar a practicar.
    Deberás seleccionar el tema con el que deseas practicar, y clonar el tag en una nueva rama.

    Primero hacemos un fetch para asegurarnos de tener todos los tags:
    ```sh
    git fetch --tags
    ```
    Ahora creamos una nueva branch basada en el tag del tema de interés.
    En el siguiente ejemplo crearemos la nueva branch basado en el tag `1-unit-testing`:
    ```sh
    git checkout -b nombre-de-mi-branch 1-unit-testing
    ```

2.  **Empieza a desarrollar.**

    Instala dependencias

    ```sh
    npm install
    ```

    Inicia el proyecto

    ```sh
    npm start
    ```

    La app estará disponible en http://localhost:3000.

    Happy hacking!