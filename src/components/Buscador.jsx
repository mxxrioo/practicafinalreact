import React, { Component } from 'react';
import ServiceChampions from '../services/ServiceChampions';
import Jugadores from './Jugadores';

export default class Buscador extends Component {
    service = new ServiceChampions();

    selectEquipo = React.createRef();
    cajaNombre = React.createRef();

    state = {
        equipos: [],
        idequipo: null,
        nombre: null,
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

    buscarPorEquipo = (event) => {
        event.preventDefault();

        this.setState({
            idequipo: this.selectEquipo.current.value,
            nombre: null
        })
    }

    buscarPorNombre = (event) => {
        event.preventDefault();

        this.setState({
            nombre: this.cajaNombre.current.value.trim(),
            idequipo: null
        })
    }

    render() {
        return (
            <div>
                <h1>Buscador de jugadores</h1>

                {
                    this.state.mensaje &&
                    <p className="text-danger">{this.state.mensaje}</p>
                }

                <form onSubmit={this.buscarPorEquipo} className="mb-4">
                    <label htmlFor="equipo" className="form-label">
                        Equipo:
                    </label>

                    <select
                        id="equipo"
                        className="form-select mb-2"
                        ref={this.selectEquipo}
                        defaultValue=""
                        required
                    >
                        <option value="" disabled>
                            Selecciona un equipo
                        </option>

                        {
                            this.state.equipos.map((equipo) => {
                                return (
                                    <option
                                        key={equipo.idEquipo}
                                        value={equipo.idEquipo}
                                    >
                                        {equipo.nombre}
                                    </option>
                                )
                            })
                        }
                    </select>

                    <button type="submit" className="btn btn-success">
                        Buscar por equipo
                    </button>
                </form>

                <form onSubmit={this.buscarPorNombre} className="mb-4">
                    <label htmlFor="nombre" className="form-label">
                        Nombre del jugador:
                    </label>

                    <input
                        id="nombre"
                        type="text"
                        className="form-control mb-2"
                        ref={this.cajaNombre}
                        required
                    />

                    <button type="submit" className="btn btn-primary">
                        Buscar por nombre
                    </button>
                </form>

                {
                    (this.state.idequipo || this.state.nombre) &&
                    <Jugadores
                        idequipo={this.state.idequipo}
                        nombre={this.state.nombre}
                    />
                }
            </div>
        )
    }
}