/**
 * Created by rualejan on 28/07/2017.
 */

const {Client} = require('pg');
const connectionString = process.env.DATABASE_URL;

exports.getMessages =  function (mensajes) {
    const client = new Client({
        connectionString: connectionString
    });
    client.connect();
    client.query('SELECT name, value FROM message;', (err, res) => {
        if (err) {
            mensajes = err.stack;
            client.end();
        } else {
            mensajes = res.rows;
            client.end();
        }

        return JSON.stringify(mensajes);

    });

};

exports.recuperarMensajes = function () {
    let respuesta = [];
    const client2 = new Client({
        connectionString: connectionString
    });
    client2.connect();
    client2.query('SELECT name, value FROM message;', (err, res) => {
        if (err) {
            respuesta = err;
            client2.end();
        } else {
            respuesta.push(res.rows[0]);
            client2.end();
        }

        console.log("R: " + JSON.stringify(respuesta));
        return JSON.stringify(respuesta);
    });

};

exports.devolvermensaje = function (mensaje, mensajeM, mapa) {

    mapa.forEach(function (key, value) {

        let regex = new RegExp(key, "i");

        if (mensajeM.match(regex)) {
            return value;
        }
    });
    return "No entiendo lo que dices :P";
};