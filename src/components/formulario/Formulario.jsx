import React from "react";
import { useState } from "react";
import "./Formulario.css";
import notebookImg from "../../assets/notebook2.jpg";
import Swal from "sweetalert2";

const axios = require("axios");

export const Formulario = () => {
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    dni: "",
    email: "",
    phone: "",
    relation: "",
  });

  const [validation, setValidation] = useState(false);

  const handleInputChange = ({ target }) => {
    // console.log(target.value);
    setInputs({
      ...inputs,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputs.name.trim() === "" ||
      inputs.surname.trim() === "" ||
      inputs.dni.trim() === "" ||
      inputs.email.trim() === "" ||
      inputs.phone.trim() === "" ||
      inputs.relation.trim() === ""
    ) {
      console.log("por favor completa el formulario");
      setValidation(true);
    } else {
      setValidation(false);
      axios({
        method: "POST",
        url: "http://192.168.68.118:8000/api/contact",
        data: inputs,
      })
        .then((res) => console.log(res.inputs))
        .catch((err) => console.log(err));

      setInputs({
        name: "",
        surname: "",
        dni: "",
        email: "",
        phone: "",
        relation: "",
      });

      Swal.fire({
        icon: "success",
        title: "Tus datos se enviaron correctamente ",
      });
    }
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-12 col-md-6 offset-md-3">
          <h3 className="title">¿Te gustaría probar Nodos?</h3>

          <h4 className="subtitle">
            Dejanos tus datos de contacto y un representante se comunicará a la
            brevedad.
          </h4>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <div className="card my-3">
            <img
              className="card-img-top img__login"
              src={notebookImg}
              alt="img login"
            />
            <div className="card-body">
              <form
                action="https://web.e-nodos.com/envio"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className="form-nombre">
                  <label className="form-label" htmlFor="nombre">
                    Nombre
                  </label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="name"
                    value={inputs.name}
                    id="nombre"
                    placeholder="Ingrese su nombre"
                    maxLength="25"
                    onChange={handleInputChange}
                    // required
                  />
                </div>

                {validation && inputs.name.length === 0 && (
                  <div className="alert alert-danger" role="alert">
                    Por favor ingresa tu nombre
                  </div>
                )}

                <div className="form-apellido">
                  <label className="form-label" htmlFor="apellidos">
                    Apellido
                  </label>
                  <input
                    className="form-control mb-2"
                    type="text"
                    name="surname"
                    value={inputs.surname}
                    id="apellidos"
                    maxLength="25"
                    placeholder="Ingrese su apellido"
                    onChange={handleInputChange}
                    // required
                  />
                </div>

                {validation && inputs.surname.length === 0 && (
                  <div className="alert alert-danger" role="alert">
                    Por favor ingresa tu apellido
                  </div>
                )}

                <div className="form-dni">
                  <label className="form-label" htmlFor="dni">
                    DNI
                  </label>
                  <input
                    className="form-control mb-2 w-50"
                    type="number"
                    name="dni"
                    value={inputs.dni}
                    id="dni"
                    maxLength="10"
                    placeholder="Ingresar sin puntos ó guiones"
                    onChange={handleInputChange}
                  />
                </div>

                {validation && inputs.dni.length === 0 && (
                  <div className="alert alert-danger" role="alert">
                    Por favor ingresa tu numero de DNI
                  </div>
                )}

                <div className="form-mail">
                  <label className="form-label" htmlFor="email">
                    Correo electrónico
                  </label>
                  <input
                    className="form-control mb-2"
                    type="email"
                    name="email"
                    value={inputs.email}
                    id="email"
                    maxLength="40"
                    placeholder="example@mail.com"
                    onChange={handleInputChange}
                    // required
                  />
                </div>

                {validation && inputs.email.length === 0 && (
                  <div className="alert alert-danger" role="alert">
                    Por favor ingresa tu mail
                  </div>
                )}

                <div className="form-telefono">
                  <label className="form-label" htmlFor="telefono">
                    Teléfono de contacto
                  </label>
                  <input
                    className="form-control mb-2 w-50"
                    maxLength="10"
                    type="number"
                    name="phone"
                    value={inputs.phone}
                    id="telefono"
                    onChange={handleInputChange}
                  />
                </div>

                {validation && inputs.phone.length === 0 && (
                  <div className="alert alert-danger" role="alert">
                    Por favor ingresa un telefono de contacto
                  </div>
                )}

                <div className="form-relacion">
                  <label className="form-label" htmlFor="relacion">
                    Relación con la institución
                  </label>
                  <select
                    className="form-control"
                    name="relation"
                    value={inputs.value}
                    id="relation"
                    defaultValue={"default"}
                    onChange={handleInputChange}
                  >
                    <option value="default" disabled>
                      Despliga para elegir opción
                    </option>
                    <option>Alumno</option>
                    <option>Tutor</option>
                    <option>Docente</option>
                    <option>Directivo</option>
                  </select>
                </div>

                {validation && inputs.relation.length === 0 && (
                  <div className="alert alert-danger mt-2" role="alert">
                    Por favor ingresa una opción
                  </div>
                )}

                <input
                  className="btn btn-danger button mt-4"
                  type="submit"
                  value="Quiero probar Nodos"
                  id="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
