import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ServiceChampions from '../services/ServiceChampions';

export default class MenuComponent extends Component {
    service = new ServiceChampions();

    state = {
        equipos: [],
        mensaje: null
    }

    componentDidMount() {
        this.service.getEquipos().then((result) => {
            this.setState({
                equipos: result
            })
        }).catch(() => {
            this.setState({
                mensaje: "No se han podido cargar los equipos"
            })
        })
    }

    render() {
        return (
            <nav
                className="navbar navbar-expand-lg"
                style={{ backgroundColor: "#e3f2fd" }}
            >
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        Champions
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menuChampions"
                        aria-controls="menuChampions"
                        aria-expanded="false"
                        aria-label="Abrir menú"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="menuChampions"
                    >
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/apuestas">
                                    Apuestas
                                </NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <button
                                    className="nav-link dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Equipos
                                </button>

                                <ul className="dropdown-menu">
                                    {
                                        this.state.equipos.map((equipo) => {
                                            return (
                                                <li key={equipo.idEquipo}>
                                                    <NavLink
                                                        className="dropdown-item"
                                                        to={"/equipo/" + equipo.idEquipo}
                                                    >
                                                        {equipo.nombre}
                                                    </NavLink>
                                                </li>
                                            )
                                        })
                                    }

                                    {
                                        this.state.mensaje &&
                                        <li className="dropdown-item-text text-danger">
                                            {this.state.mensaje}
                                        </li>
                                    }
                                </ul>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/buscador">
                                    Buscador
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}