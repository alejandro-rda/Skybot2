/**
 * Created by rualejan on 28/07/2017.
 */
const conString = process.env.DATABASE_URL;

function inicializarMapa(mapa){
    var respuesta = "";

    pg.connect(conString, function (err, client, done) {
        if (err) {
            return next(err)
        }
        client.query('SELECT name, value FROM message;', [], function (err, result) {
            done();

            if (err) {
                return next(err)
            }

            respuesta.json(result.rows)
        })
    });

    for(var item in respuesta){
        mapa.set(item[name], item[value]);
    }

    return mapa;
}


function devolvermensaje(mensaje,mensajeM, mapa) {

    mapa.forEach(function (key, value) {

        var regex = new RegExp(key,"i");

        if(mensajeM.match(regex)){
            return value;
        }else{
            return "No entiendo lo que dices :P";
        }
    })
    
}