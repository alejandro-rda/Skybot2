/**
 * Created by rualejan on 28/07/2017.
 */

const pg = require('pg');
const client = new pg.Client;
const conString = process.env.DATABASE_URL;


exports.inicializarMapa = function(mapa){
    let respuesta = "";
    client.connect(conString, function (err, client, done) {
        if (err) {
            return next(err)
        }
        client.query('SELECT name, value FROM message;', [], function (err, result) {
            done();

            if (err) {
                return next(err)
            }

            respuesta.json(result.rows);
            client.end();
        })
    });

    for(let item in respuesta){
        mapa.set(item[name], item[value]);
    }

    return mapa;
};


exports.devolvermensaje = function(mensaje,mensajeM, mapa) {

    mapa.forEach(function (key, value) {

        let regex = new RegExp(key,"i");

        if(mensajeM.match(regex)){
            return value;
        }else{
            return "No entiendo lo que dices :P";
        }
    })
    
}