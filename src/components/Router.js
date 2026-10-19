import React, { Component } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    useParams
} from 'react-router-dom';

import MenuComponent from './MenuComponent';
import HomeComponent from './HomeComponent';
import DetallesEquipo from './DetallesEquipo';
import Jugadores from './Jugadores';
import DetallesJugador from './DetallesJugador';
import Apuestas from './Apuestas';
import CreateApuesta from './CreateApuesta';
import Buscador from './Buscador';

export default class Router extends Component {
    render() {
        function DetallesEquipoElement() {
            let { idequipo } = useParams();

            return (
                <DetallesEquipo
                    key={idequipo}
                    idequipo={idequipo}
                />
            )
        }

        function JugadoresElement() {
            let { idequipo } = useParams();

            return (
                <Jugadores
                    key={idequipo}
                    idequipo={idequipo}
                />
            )
        }

        function DetallesJugadorElement() {
            let { idjugador } = useParams();

            return (
                <DetallesJugador
                    key={idjugador}
                    idjugador={idjugador}
                />
            )
        }

        return (
            <BrowserRouter>
                <MenuComponent/>

                <div className="container mt-4">
                    <Routes>
                        <Route
                            path="/"
                            element={<HomeComponent/>}
                        />

                        <Route
                            path="/equipo/:idequipo"
                            element={<DetallesEquipoElement/>}
                        />

                        <Route
                            path="/jugadores/:idequipo"
                            element={<JugadoresElement/>}
                        />

                        <Route
                            path="/jugador/:idjugador"
                            element={<DetallesJugadorElement/>}
                        />

                        <Route
                            path="/apuestas"
                            element={<Apuestas/>}
                        />

                        <Route
                            path="/createapuesta"
                            element={<CreateApuesta/>}
                        />

                        <Route
                            path="/buscador"
                            element={<Buscador/>}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        )
    }
}