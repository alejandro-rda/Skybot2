/**
 * Created by rualejan on 28/07/2017.
 */

const {Client} = require('pg');
const {await} = require('await');
const connectionString = process.env.DATABASE_URL;
const client = new Client({
    connectionString: connectionString,
});

exports.inicializarMapa = async function recuperarMapa (mapa) {

    let respuesta = "";
    const results = [];
    await client.query('SELECT name, value FROM message;', (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows);
        }
    });

    await client.end();

    for (let item in respuesta) {
        mapa.set(item[name], item[value]);
    }

    return mapa;
};

exports.recuperarMensajes = async function recuperMensaje () {
    await client.connect();
    let respuesta = "";
    const results = [];
    await client.query('SELECT name, value FROM message;', (err, res) => {
        if (err) {
            respuesta = err;
        } else {
            respuesta = JSON.stringify(res.rows);
        }

    });

    await client.end();
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