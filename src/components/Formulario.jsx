import React, { useState } from "react";
//import uuid from 'uuid';
import { v4 as uuid } from "uuid";

import PropTypes from 'prop-types'

const Formulario = ({ crearCita }) => {
  // crear estado de citas
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  // segundo actualziador de stado de error
  const [error, actualziarError] = useState(false);

  // funcion actualziar stado
  const actualizarState = (evento) => {
    actualizarCita({
      // se realzia una copia para no perder los demas capos
      ...cita,
      [evento.target.name]: evento.target.value,
    });
  };

  //extraer los valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // enviar formulario
  const submitCita = (evento) => {
    evento.preventDefault();

    // validar formulario
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualziarError(true);
      return;
    }

    // remover la alerta de error
    actualziarError(false);

    // asignar un identificador (id)
    cita.id = uuid();
    //console.log(cita);

    // crear la cita
    crearCita(cita); // ya contine el id

    // reiniciar el formulario
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <React.Fragment>
      <h2>crear citas</h2>

      {error ? (
        <p className="alerta-error">todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label> Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label> Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="nombre del propietario"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Sintomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          placeholder="descripcion"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          agregar cita
        </button>
      </form>
    </React.Fragment>
  );
};
// documentacion de proptypes
Formulario.propTypes = {
  crearCita: PropTypes.func,
}

export default Formulario;
