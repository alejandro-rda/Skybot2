/**
 * Created by rualejan on 28/07/2017.
 */

exports.devolvermensaje = function (mensaje, mensajeM, mapa) {

    mapa.forEach(function (key, value) {

        let regex = new RegExp(key, "i");

        if (mensajeM.match(regex)) {
            return value;
        }
    });
    return "No entiendo lo que dices :P";
};