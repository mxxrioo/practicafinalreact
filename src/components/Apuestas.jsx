import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ServiceChampions from '../services/ServiceChampions';

export default class Apuestas extends Component {
    service = new ServiceChampions();

    state = {
        apuestas: [],
        status: false,
        mensaje: null
    }

    loadApuestas = () => {
        this.setState({
            status: false,
            mensaje: null
        })

        this.service.getApuestas().then((result) => {
            this.setState({
                apuestas: result,
                status: true
            })
        }).catch(() => {
            this.setState({
                mensaje: "No se han podido cargar las apuestas",
                status: true
            })
        })
    }

    deleteApuesta = (idApuesta) => {
        this.service.deleteApuesta(idApuesta).then(() => {
            this.loadApuestas();
        }).catch(() => {
            this.setState({
                mensaje: "No se ha podido eliminar la apuesta"
            })
        })
    }

    componentDidMount() {
        this.loadApuestas();
    }

    render() {
        return (
            <div className="text-center">
                <NavLink
                    className="btn btn-danger mb-3"
                    to="/createapuesta"
                >
                    Realizar apuesta
                </NavLink>

                <h2>Apuestas del partido</h2>

                {
                    this.state.mensaje &&
                    <p className="text-danger">{this.state.mensaje}</p>
                }

                {
                    this.state.status === false ?
                    <h3>Cargando apuestas...</h3> :
                    <div className="table-responsive">
                        <table className="table table-info">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Resultado</th>
                                    <th>Fecha</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.apuestas.map((apuesta) => {
                                        return (
                                            <tr key={apuesta.idApuesta}>
                                                <td>{apuesta.usuario}</td>
                                                <td>{apuesta.resultado}</td>
                                                <td>{apuesta.fecha}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => {
                                                            this.deleteApuesta(
                                                                apuesta.idApuesta
                                                            )
                                                        }}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}