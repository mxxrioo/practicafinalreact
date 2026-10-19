import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ServiceChampions from '../services/ServiceChampions';

export default class Jugadores extends Component {
    service = new ServiceChampions();

    state = {
        jugadores: [],
        status: false,
        mensaje: null
    }

    loadJugadores = () => {
        this.setState({
            status: false,
            mensaje: null,
            jugadores: []
        })

        let peticion;

        if (this.props.idequipo) {
            peticion = this.service.getJugadoresEquipo(this.props.idequipo);
        } else if (this.props.nombre) {
            peticion = this.service.buscarJugadores(this.props.nombre);
        } else {
            this.setState({
                status: true
            })
            return;
        }

        peticion.then((result) => {
            this.setState({
                jugadores: result,
                status: true
            })
        }).catch(() => {
            this.setState({
                mensaje: "No se han podido cargar los jugadores",
                status: true
            })
        })
    }

    componentDidMount() {
        this.loadJugadores();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.idequipo !== this.props.idequipo ||
            prevProps.nombre !== this.props.nombre
        ) {
            this.loadJugadores();
        }
    }

    render() {
        return (
            <div className="text-center">
                {
                    this.props.idequipo &&
                    <NavLink
                        className="btn btn-success mb-3"
                        to={"/equipo/" + this.props.idequipo}
                    >
                        Volver al equipo
                    </NavLink>
                }

                {
                    this.state.mensaje &&
                    <p className="text-danger">{this.state.mensaje}</p>
                }

                {
                    this.state.status === false ?
                    <h2>Cargando jugadores...</h2> :
                    <div className="table-responsive">
                        <table className="table table-info align-middle">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Posición</th>
                                    <th>País</th>
                                    <th>Detalles</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.jugadores.map((jugador) => {
                                        return (
                                            <tr key={jugador.idJugador}>
                                                <td>
                                                    <img
                                                        src={jugador.imagen}
                                                        alt={jugador.nombre}
                                                        style={{ width: "70px" }}
                                                    />
                                                </td>
                                                <td>{jugador.nombre}</td>
                                                <td>{jugador.posicion}</td>
                                                <td>{jugador.pais}</td>
                                                <td>
                                                    <NavLink
                                                        className="btn btn-danger"
                                                        to={"/jugador/" + jugador.idJugador}
                                                    >
                                                        Detalles
                                                    </NavLink>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        {
                            this.state.jugadores.length === 0 &&
                            !this.state.mensaje &&
                            <p>No se han encontrado jugadores.</p>
                        }
                    </div>
                }
            </div>
        )
    }
}