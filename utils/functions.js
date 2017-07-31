/**
 * Created by rualejan on 28/07/2017.
 */

exports.devolvermensaje = function (mensaje, mensajeM, lstMensajes) {

    for (let mensaje of lstMensajes) {

        let regex = new RegExp(mensaje.name, "i");

        if (mensajeM.match(regex)) {
            return mensaje.value;
        }
    }

    return "No entiendo lo que dices :P";
};