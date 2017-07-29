/**
 * Created by rualejan on 28/07/2017.
 */

const {Client} = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new Client({
    connectionString: connectionString
});
client.connect();


exports.inicializarMapa =  function (mapa) {
    let respuesta = "";
    const results = [];
    client.query('SELECT name, value FROM message;', (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows);
        }
    });

    client.end();

    for (let item in respuesta) {
        mapa.set(item[name], item[value]);
    }

    return mapa;
};

exports.recuperarMensajes = function () {
    let respuesta = "";
    const results = [];
    client.query('SELECT name, value FROM message;', (err, res) => {
        if (err) {
            respuesta = err;
        } else {
            respuesta = JSON.stringify(res.rows);
            console.log(res.rows);
        }

    });
    console.log(respuesta);
    client.end();
    return respuesta;
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