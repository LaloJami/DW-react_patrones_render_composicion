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

# ¿Qué son las render props y render functions?
Nos ayudan a elevar nuestra composición de componentes a otro nivel.

Las render props nos permiten ser más específicos sobre que vamos a renderizar, cuando y donde vamos a renderizar cada parte del contenido de nuestros componentes.

## Render Function
Es el patrón de entregar la información de nuestro componente en una función. No es exclusivo de react context, nosotros podemos crear nuestros propios componentes que usen este patrón, que reciban una función para que le podamos enviar la información que queremos proveer y luego si, renderizar los componentes que ya tienen la info gracias a la función.
## Render Props
Cuando ya no mandamos la función dentro del componente, si no que la enviamos en alguna otra propiedad del componente. Podemos jugar con este patrón para que compartir información sea más divertido.

Las *render props* son una técnica avanzada que nos permite reutilizar componentes y lógica, para no tener que reinventar la rueda. Esta técnica se basa en pasar una función como *prop* a un componente, dicha función se encargará de renderizar lo que queremos que contenga este componente, removiendo así la lógica del render hacia otra parte y permitiéndonos reutilizar la lógica que contenga la función.

```jsx
import React, {useState} from 'react';

export default function App() {
	const people = [
		{name: 'Maria', age: 30, id: 1},
		{name: 'Phoebe', age: 20, id: 2},
	]

	return (
    <ListOfPeople
      data={people}
      render={
        ({name, id}) => (<h2 key={id} >Hello, I am { name }</h2>)
      } 
      />
	)
}

const ListOfPeople = ({render, data}) => {
	return (
    <>
      <h1>My list of people</h1>
      {data.map((person) => render(person))} 
			{/*iteramos sobre nuestro array de personas y llamamos a la función render que recibimos en nuestras props, y además le pasamos la información de cada persona. */}
    </>
	)
}
```
En el ejemplo anterior renderizamos una lista con el nombre de varias personas, pero el contenido de nuestra lista no lo define el componente `ListOfPeople`, sino `App` por medio de la función `render` que le pasamos a `ListOfPeople` en sus props. 

# React.Children y React.cloneElement

Para poder pasar propiedades especiales a los componentes hijos de nuestros componentes contenedores cuando hacemos composición.

Cuando enviamos más de un componente o elemento hijo al que use CloneElement, la app deja de funcionar y suelta un error. CloneElement necesita recibir un elemento de react, cuando children es más de un componente entonces tenemos un array, para esto existe React.Children que nos ayuda a que CloneElement entienda sin importar cuantos elementos vienen en el props.children.
```js
function TodoHeader({ children, loading }) {
  //No importa si viene un elemento, o dos o null siempre nos devuelve un array

  return (
    <header>
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { loading: loading })
      )}
    </header> //Por cada child vamos a llamar a clone element.
  ); //Crear elemento a partir de otro (elemento, objeto con las props que queramos que tenga)
}
```
No son las herramientas más populares pero pueden ser muy útiles cuando queremos compartir una o ciertas props a los componentes hijos de un componente contenedor.
# Qué son los High Order Components

Las funciones como las conocemos pueden devolvernos un valor en sus returns, pero estas funciones de “orden superior”, son funciones que devuelven otras funciones.

Si llamamos a la high order function y le enviamos un parámetro no tendremos todavía un resultado, como está devolviendo otra función tenemos que llamar a esa función que obtenemos luego de llamar a la de orden superior, enviarle los nuevos parámetros que necesita la función de retorno y entonces si, obtendremos nuestro resultado.

Los *high order components* (o componentes de orden superior) son componentes que reciben un componente y retornan otro componente con nuevas props o elementos, lo cual nos permite reutilizar lógica dentro de varios componentes.

Para comprenderlo veamos como son las high order functions
```js
function highOrderFunction(var1){
  return function returnFunction(var2){
    return var1 + var2;
  }
}

const withSum1 = highOrderFunction(1);
const sumTotal = withSum1(2);
//3
```
Ahora veamos a las high order components
```js
function Componente(props){
  return <p>...</p>
}

function highOrderComponent(){
  return function Component(props){
    return <p>...</p>;
  }
}
```
cuando se lo realiza como el ejemplo anterior no hay mucha diferencia, pero que pasa cuando lo hacemos de la siguiente forma
```js
function highOrderFunction(WrappedComponent){
  return function Componente(props){
    return (
      <WrappedComponent
        {...algoEspecial}
        {...props}
      />
    )
  }
}
```
Al realizarlo de esta forma podemos encontrar una nueva forma de trabajar con componentes a los cuales les podemos agregar algo especial y pasar pros.
```js
function TodoBox(props){
  return (
    <div prop={props.algoEspecial}>
      {props.children}
    </div>
  )
}
```
otro ejemplo 
```js
function withApi(WrappedComponent){
  const apuData = fetchApi('https://api.com');

  return function WrappedComponentWithApi(props){
    if (apiData.loading) return <p>Loading</p>;
    return (
      <WrappedComponent data={apiData.json} />
    );
  }
}

// componente aparte 
function TodoBox(props){
  return (
    <p>
      Tu nombre es {props.data.name}
    </p>
  )
}

const TodoBoxWithApi = withApi(TodoBox);
```
🤔 Pero ¿profe Juan, por qué haces como que no ves la advertencia de missing dependencias en la consola?
.
🌈 Los efectos son un tema espectacularmente divertidísimo dentro de React. Una de sus particularidades consideradas entre las más avanzados son las actualizaciones al estado dentro de los efectos y cómo estas afectan a los renders de nuestros componentes.
.
Si quieres que estudiemos este tema con la profundidad que merece, responde este comentario con un enorme 💚 y pondremos todo nuestro esfuerzo en grabar un Curso de React.js: Optimización de Render y Debugging.

# Render props vs. High Order Components vs. React Hooks

## Maquetación

Render props o render functions vs React hooks

* Ambas son formas correctas de trabajar y comunes.
* Las render props suben el nivel de elegancia del código pero también pueden bajar el nivel de código aburrido comparado con los react hooks.
* Si practicamos mucho podremos usar las render props de manera mucho más saludable para los componentes más estructuralmente importantes de nuestras apps. Nos ayudan a proteger nuestros componentes para que no nos equivoquemos y la maquetación sea correcta.

## Share data, compartir información entre componentes.

Aquí participan todos los patrones.


### Render Functions:

* Compartir info con funciones que en sus parámetros nos dejan esa info que necesitamos que nos compartieran.
* Si necesitamos demasiada info de distintas render functions para un mismo componente deja de verse bien y podría llegar al código spaghetti.
–
### HOC:

* Funciones que pueden retornar y retornar y retornar otras funciones hasta que en algún momento retornemos un componente de react y podamos pasarle toda la info.
* Usarlos es sencillo, envolvemos nuestros componentes en estos HOC y automáticamente van a recibir toda la info que nos querían compartir estos HOC.
* Si necesitamos la info de muchos HOC’S en un mismo componente tenemos el mismo problema que con las render functions. Código muy horizontal.

### React hooks

* Llamamos al react hook (oficial o custom) y luego consumimos la info en el return del componente.
* Cuando tenemos muchos llamados a distintos react hooks no hay código horizontal.
* Ganaron los hooks para compartir info entre varios componentes. 🎉