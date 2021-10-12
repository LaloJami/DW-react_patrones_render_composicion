<div align="center">
  <h1>Curso de React.js: Patrones de render y composición</h1>
</div>

# Introducción 
Los patrones de render son soluciones comunes que nos pueden ayudar a resolver un problema en específico, por lo general estos patrones son bien conocidos dentro de la comunidad, aunque esto no significa que siempre los debamos usar, ya que cada proyecto conlleva diferentes problemas y funcionalidades. Los patrones simplemente son formas que podríamos usar para llegar a una solución.

# Principios de Diseño en React

Los principios de diseño son las reglas que un equipo sigue para crear sus aplicaciones o proyectos, y el equipo de Facebook encargado de mantener y crear nuevas APIs para React no es la excepción, ellos también cuentan con ciertos principios a la hora de escribir su código. Los más importantes son: 
## Principios de React para React
### Abstracciones comunes

En el core de React no se van a incluir APIs para resolver problemas demasiado específicos, a menos de que muchas personas estén resolviendo dicho problema de una manera muy mala y poco funcional. 

### Interoperabilidad

React debe ser capaz de convivir con otras herramientas sin causar ningún problema, por lo tanto podemos tener proyectos que usan diferentes herramientas y funcional igualmente, o también podemos migrar proyectos que están construidos con otra herramienta y lentamente incluir React sin que la app se rompa.

### Estabilidad

React no va a lanzar nuevas versiones de su core si estas rompen el código que ya existe, por lo tanto el código que escribimos hace varios meses o años todavía va a funcionar a día de hoy. En caso de que el equipo de React saque alguna funcionalidad que cause conflictos con APIs anteriores, entonces le avisaran a la comunidad para así poder implementar una solución diferente a tiempo.

### Experiencia de desarrollo

React no solo busca que podamos implementar soluciones a nuestros problemas con sus APIs, sino que también busca que estas soluciones sean disfrutables, y que brinden una buena experiencia a la hora de ser implementadas. 

### Implementación

El código 'aburrido' siempre se va a preferir sobre el código elegante, ya que este último puede llegar a ser difícil de mover o eliminar en caso de que se deseen hacer modificaciones a la app.

### Optimizado para la instrumentación

Los nombres de las APIs de react siempre tratarán de ser autodescriptivos, detallados y distintivos, aunque esto no significa que se vayan a colocar nombres muy largos. 

### Dogfooding

Debemos recordar que React es un proyecto creado por y para Facebook, por lo tanto el equipo encargado de crear nuevas funcionalidades siempre priorizará lo que necesita Facebook y no lo que quiere o necesita la comunidad. Aunque esto parece malo a primera vista, es todo lo contrario, ya que React cuenta con el apoyo y mantenimiento de una empresa enorme, lo cual lo convierte en una herramienta muy confiable.

## Principios de React para la comunidad
### Planificación

Antes de empezar cualquier proyecto debemos definir qué responsabilidades le vamos a delegar a React y cuales dependen de nosotros. 

### Configuración

Nosotros no podemos, o mejor, no deberíamos modificar directamente el código de React, ya que esto podría causar conflictos a la hora de añadir nuevas herramientas al entorno de nuestro proyecto.

### Depuración

React siempre nos va a dejar pequeñas pistas cada vez que ocurra un error dentro de nuestra aplicación, para así poder encontrar cuál es el foco del problema y saber que deberíamos cambiar.

# Qué es composición de componentes y colocación del estado

Es un patrón para crear componentes que nos da libertad para elegir dónde y cómo usamos nuestros componentes. Cada componente debe cumplir una tarea muy específica pero no debe de decirnos exactamente como usar esa solución que nos provee, debe ser muy flexible dándonos libertad para usar la información como queramos.

Esto nos permite hacer a los componentes más fáciles de integrar al resto de componentes, y agiliza el proceso de reutilizar o hacer cambios en los componentes.

**Colocación del estado**

¿Dónde los guardamos? Este problema también se conoce como state colocation.

* Máxima cercanía a la relevancia: El estado debe estar tan cerca como sea posible de donde lo estemos usando y actualizando.
* Stateful vs stateless: Separar lógica y estado de componentes que manejan UI.

> Ir de lo grande a lo específico. -Richard hautmant

Hay que examinar que componentes manejan su propio estado, asumiendo que todos los componentes consumen el estado general de la app queremos encontrar a los componentes que crean un estado aparte del general. De esta manera podemos dividir componentes, de un lado tendremos a los componentes que solo consumen el estado general de la app y esos son componentes stateless(de interfaz, de UI), y del otro lado a los componentes que crean su propio código interno (estado) serán los stateful y siguiendo el principio de separar al estado de la UI podemos dividir a estos componentes con su propio estado en 2 uno stateful, y el otro en stateless.

En resumen:

⭐️ Cuando los componentes nietos de App no solo son nietos, sino también componentes hijos, podemos pasarles props directamente y mejorar su comunicación.


Casi siempre que llamamos a un componente… pos lo llamamos y ya. 😅
```js
function App() {
  return (
    <TodoHeader />
  );
}

function TodoHeader() {
  return (
    <TodoCounter />
  );
}
```
Esto implica que para compartir el estado debemos pasar props y props y props por cada componente intermedio entre App y los componentes que realmente necesiten esas props en cualquier lugar de la jerarquía. 😓
```js
function App() {
  const [state, setState] = React.setState(initialState);

  return (
    <TodoHeaderstate={state}setState={setState} />
  );
}

function TodoHeader({ state, setState }) {
  return (
    <header>
      <TodoCounterstate={state}setState={setState} />
    </header>
  );
}
```
Pero otra forma de trabajar es que App no solo llame a sus componentes directamente hijos, sino que también llamen a los siguientes componentes en la jerarquía de la aplicación. 😮
```js
function App() {
  return (
    <TodoHeader>
      <TodoCounter />
    </TodoHeader>
  );
}

function TodoHeader({ children }) {
  return (
    <header>
      {children}
    </header>
  );
}
```
Y esta nueva forma de trabajar implica que ya no tenemos que pasar props y props y props entre App y el resto de componentes para compartir el estado, sino que App puede comunicarse directamente con el componente que realmente necesita ese estado. 🤩
```js
function App() {
  const [state, setState] = React.setState(initialState);

  return (
    <TodoHeader>
      <TodoCounterstate={state}setState={setState} />
    </TodoHeader>
  );
}
```
💚 Esta es la magia de la composición de componentes.
