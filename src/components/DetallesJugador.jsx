import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ServiceChampions from '../services/ServiceChampions';

export default class DetallesJugador extends Component {
    service = new ServiceChampions();

    state = {
        jugador: null,
        status: false,
        mensaje: null
    }

    componentDidMount() {
        this.service.findJugador(this.props.idjugador).then((result) => {
            this.setState({
                jugador: result,
                status: true
            })
        }).catch(() => {
            this.setState({
                mensaje: "No se ha podido cargar el jugador",
                status: true
            })
        })
    }

    render() {
        if (this.state.status === false) {
            return <h2>Cargando jugador...</h2>;
        }

        if (this.state.mensaje) {
            return <p className="text-danger">{this.state.mensaje}</p>;
        }

        if (!this.state.jugador) {
            return <p>No se ha encontrado el jugador.</p>;
        }

        return (
            <div className="card text-center">
                <div className="card-header">
                    {this.state.jugador.nombre}
                </div>

                <div className="card-body">
                    <img
                        src={this.state.jugador.imagen}
                        alt={this.state.jugador.nombre}
                        style={{ width: "100px" }}
                    />

                    <h5 className="card-title mt-3">
                        {this.state.jugador.posicion}
                    </h5>

                    <p>
                        Fecha de nacimiento: {this.state.jugador.fechaNacimiento}
                    </p>

                    <p>País: {this.state.jugador.pais}</p>

                    <NavLink
                        className="btn btn-success"
                        to={"/jugadores/" + this.state.jugador.idEquipo}
                    >
                        Jugadores
                    </NavLink>
                </div>
            </div>
        )
    }
}