/**
 * Created by rualejan on 28/07/2017.
 */

const {Client} = require('pg');
const connectionString = process.env.DATABASE_URL;

exports.getMessages =  function () {
    let mensajes = "";
    const client = new Client({
        connectionString: connectionString
    });
    client.connect();
    client.query('SELECT name, value FROM message;', (err, res) => {
        if (err) {
            mensajes = JSON.stringify(err.stack);
            client.end();
        } else {
            mensajes = JSON.stringify(res.rows);
            client.end();
        }

        console.log("FUNCION: " + mensajes);
        return mensajes;

    });

    console.log("FUNCION V2: " + mensajes);

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