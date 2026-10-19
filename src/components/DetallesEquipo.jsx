import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ServiceChampions from '../services/ServiceChampions';

export default class DetallesEquipo extends Component {
    service = new ServiceChampions();

    state = {
        equipo: null,
        status: false,
        mensaje: null
    }

    componentDidMount() {
        this.service.findEquipo(this.props.idequipo).then((result) => {
            this.setState({
                equipo: result,
                status: true
            })
        }).catch(() => {
            this.setState({
                mensaje: "No se ha podido cargar el equipo",
                status: true
            })
        })
    }

    render() {
        if (this.state.status === false) {
            return <h2>Cargando equipo...</h2>;
        }

        if (this.state.mensaje) {
            return <p className="text-danger">{this.state.mensaje}</p>;
        }

        if (!this.state.equipo) {
            return <p>No se ha encontrado el equipo.</p>;
        }

        return (
            <div className="card text-center">
                <div className="card-header">
                    {this.state.equipo.nombre}
                </div>

                <div className="card-body">
                    <img
                        src={this.state.equipo.imagen}
                        alt={this.state.equipo.nombre}
                        style={{ width: "100px" }}
                    />

                    <h5 className="card-title mt-3">
                        Champions: {this.state.equipo.champions}
                    </h5>

                    <p className="card-text">
                        {this.state.equipo.descripcion}
                    </p>

                    <NavLink
                        className="btn btn-success me-2"
                        to={"/jugadores/" + this.state.equipo.idEquipo}
                    >
                        Jugadores
                    </NavLink>

                    <NavLink className="btn btn-primary" to="/">
                        Volver
                    </NavLink>
                </div>
            </div>
        )
    }
}