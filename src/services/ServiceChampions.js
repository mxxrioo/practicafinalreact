import axios from 'axios';
import Global from '../Global';

export default class ServiceChampions {
    getEquipos() {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiEjemplos;
            let request = "api/Equipos";

            axios.get(url + request).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    findEquipo(idEquipo) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiEjemplos;
            let request = "api/Equipos/" + idEquipo;

            axios.get(url + request).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    getJugadoresEquipo(idEquipo) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiEjemplos;
            let request = "api/Jugadores/JugadoresEquipos/" + idEquipo;

            axios.get(url + request).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    buscarJugadores(nombre) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiEjemplos;
            let request = "api/Jugadores/FindJugadores/"
                + encodeURIComponent(nombre);

            axios.get(url + request).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    findJugador(idJugador) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiEjemplos;
            let request = "api/Jugadores/" + idJugador;

            axios.get(url + request).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    getApuestas() {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiEjemplos;
            let request = "api/Apuestas";

            axios.get(url + request).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    insertApuesta(apuesta) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiEjemplos;
            let request = "api/Apuestas";

            axios.post(url + request, apuesta).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    deleteApuesta(idApuesta) {
        return new Promise(function(resolve, reject) {
            let url = Global.urlApiEjemplos;
            let request = "api/Apuestas/" + idApuesta;

            axios.delete(url + request).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    }
}