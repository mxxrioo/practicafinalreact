import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import ServiceChampions from '../services/ServiceChampions';

export default class CreateApuesta extends Component {
    service = new ServiceChampions();

    cajaUsuario = React.createRef();
    cajaLocal = React.createRef();
    cajaVisitante = React.createRef();
    cajaFecha = React.createRef();

    state = {
        status: false,
        mensaje: null
    }

    insertApuesta = (event) => {
        event.preventDefault();

        let apuesta = {
            idApuesta: 0,
            usuario: this.cajaUsuario.current.value,
            resultado: this.cajaLocal.current.value
                + "-"
                + this.cajaVisitante.current.value,
            fecha: this.cajaFecha.current.value
        };

        this.service.insertApuesta(apuesta).then(() => {
            this.setState({
                status: true
            })
        }).catch(() => {
            this.setState({
                mensaje: "No se ha podido insertar la apuesta"
            })
        })
    }

    render() {
        if (this.state.status === true) {
            return <Navigate to="/apuestas"/>;
        }

        return (
            <div className="mx-auto" style={{ maxWidth: "500px" }}>
                <h1 className="text-center">Nueva apuesta</h1>

                {
                    this.state.mensaje &&
                    <p className="text-danger">{this.state.mensaje}</p>
                }

                <form onSubmit={this.insertApuesta}>
                    <label htmlFor="usuario" className="form-label">
                        Usuario:
                    </label>
                    <input
                        id="usuario"
                        type="text"
                        className="form-control mb-3"
                        ref={this.cajaUsuario}
                        required
                    />

                    <label htmlFor="local" className="form-label">
                        Goles local:
                    </label>
                    <input
                        id="local"
                        type="number"
                        min="0"
                        className="form-control mb-3"
                        ref={this.cajaLocal}
                        required
                    />

                    <label htmlFor="visitante" className="form-label">
                        Goles visitante:
                    </label>
                    <input
                        id="visitante"
                        type="number"
                        min="0"
                        className="form-control mb-3"
                        ref={this.cajaVisitante}
                        required
                    />

                    <label htmlFor="fecha" className="form-label">
                        Fecha:
                    </label>
                    <input
                        id="fecha"
                        type="text"
                        className="form-control mb-3"
                        placeholder="dd/mm/aaaa"
                        ref={this.cajaFecha}
                        required
                    />

                    <button className="btn btn-info" type="submit">
                        Nueva apuesta
                    </button>
                </form>
            </div>
        )
    }
}