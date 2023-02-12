import React, { useState, useEffect } from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";



function App() {

  // citas en almacenamiento local
  let citasIniciales = localStorage.getItem('citas');
  if (!citasIniciales){
    citasIniciales = [];
  }


  // arreglo de todas las citas
  const [citas, guardarCitas] = useState([]);


  /// hooks useEffect para realizar ciertas operaciones cuando el estado cambia 
    useEffect(()=>{
      let citasIniciales = localStorage.getItem('citas');
      if (citasIniciales){
        localStorage.setItem('citas', JSON.stringify(citas))
      }else{
        localStorage.setItem('citas', JSON.stringify());
      }
    },[citas] );


  // funcion que agrege las nueva cita
  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  }

  // funcion eliminar cita por identificador 
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    guardarCitas(nuevasCitas);
  }

  // condicinal del mensaje 
  const titulo = citas.length === 0 ? 'No hay Citas'  :  'Administra tus Citas'

  return (
    <React.Fragment>
      <h1>administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} 
              eliminarCita={eliminarCita}/>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
