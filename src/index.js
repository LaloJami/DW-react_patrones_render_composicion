import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App/index.js';
import './index.css';

function App(props){
  return(
    <h1>¡{props.saludo}, {props.nombre}!</h1>
  )
}

function withWhatever(WrappedComponent){
  return function ComponenteDeverdad(props) {
    return (
      <React.Fragment>
        <WrappedComponent {...props}/>
        <p>Estamos acompañando al WrappedComponent</p>
      </React.Fragment>
    );
  }
}

const AppWithWhatever = withWhatever(App);

ReactDOM.render(
  <AppWithWhatever saludo="buenas" nombre="Alan"/>,
  // <App saludo="buenas" nombre="Alan"/>,
  document.getElementById('root')
);
