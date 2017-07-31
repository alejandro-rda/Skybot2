const restify = require('restify');
const builder = require('botbuilder');
const HashMap = require('hashmap');
const funciones = require('./utils/functions.js');
const db = require('./db/dao.js');

/*FIXME: MEJORAS AL CODIGO -> CACHE DE RESPUESTAS AL INICIALIZAR EL APP*/
let mapavacio = new HashMap;
/*FIN CACHE*/

let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
let connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
});

server.get('https://skybot-danielazo.herokuapp.com/api/messages', function (req, response) {
    let returnMessage = db.devolverMensajes();
    returnMessage.then(function (result) {
        response.send(result);
    });
});


// Listen for messages from users
server.post('https://skybot-danielazo.herokuapp.com/api/messages', connector.listen());

// Receive messages from the user
    let bot = new builder.UniversalBot(connector, function (session) {
    let mensaje = session.message.text;
    let mensajeVal = session.message.text.toUpperCase();

        let rpta = funciones.devolvermensaje(mensaje,mensajeVal, mapacargado);
        session.send(rpta);

        /*if(mensajeVal.includes('@')){
            session.send(mensaje.split('@').reverse().pop() + "mariconazo");
        }else{
            session.send(mensaje + " mariconazo");
        }*/

});

bot.on('conversationUpdate', function (message) {

    let danSalio = false;

    if (message.membersAdded && message.membersAdded.length > 0) {
        let membersAdded = message.membersAdded
            .map(function (m) {
                let isSelf = m.id === message.address.bot.id;
                return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
            })
            .join(', ');

        bot.send(new builder.Message()
            .address(message.address)
            .text('Bienvenido ' + membersAdded + ' :)'));
    }

    if (message.membersRemoved && message.membersRemoved.length > 0) {
        let membersRemoved = message.membersRemoved
            .map(function (m) {
                if(m.id === "29:1WQ6aolBgg8k5pFCtNV3dk__auzje3gG56OGWnL9ro-g"){
                    danSalio = true;
                }
                let isSelf = m.id === message.address.bot.id;
                return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
            })
            .join(', ');

        bot.send(new builder.Message()
            .address(message.address)
            .text('El siguiente miembro ' + membersRemoved + ' se ha quitado :('));

        if(danSalio){
            bot.send(new builder.Message()
                .address(message.address)
                .text('Dan se ha salido, alguien agreguelo porfa :S'));
        }

    }
});