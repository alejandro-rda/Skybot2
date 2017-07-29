/**
 * Created by rualejan on 28/07/2017.
 */

const {Client} = require('pg');
const connectionString = process.env.DATABASE_URL;
const client = new Client({
    connectionString: connectionString,
});
client.connect();

exports.inicializarMapa = function (mapa) {
    let respuesta = "";
    const results = [];
    const query = client.query('SELECT name, value FROM message;');
    // Stream results back one row at a time
    query.on('row', (row) => {
        results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
        done();
        respuesta.json(results);
        client.end();
    });

    for (let item in respuesta) {
        mapa.set(item[name], item[value]);
    }

    return mapa;
};

exports.devolvermensaje = function (mensaje, mensajeM, mapa) {

    mapa.forEach(function (key, value) {

        let regex = new RegExp(key, "i");

        if (mensajeM.match(regex)) {
            return value;
        } else {
            return "No entiendo lo que dices :P";
        }
    })

}