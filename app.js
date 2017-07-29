const restify = require('restify');
const builder = require('botbuilder');
const HashMap = require('hashmap');
const pg = require('pg');

/*FIXME: MEJORAS AL CODIGO -> CACHE DE RESPUESTAS AL INICIALIZAR EL APP*/
var mapaRespuestas = new HashMap;
inicializarMapa(mapaRespuestas);
/*FIN CACHE*/

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
});


// Listen for messages from users
server.post('https://skybot-danielazo.herokuapp.com/api/messages', connector.listen());

// Receive messages from the user
    var bot = new builder.UniversalBot(connector, function (session) {
    var mensaje = session.message.text;
    var mensajeVal = session.message.text.toUpperCase();

    var rpta = devolvermensaje(mensaje,mensajeVal, mapaRespuestas);
    session.send(rpta);

        /*if(mensajeVal.includes('@')){
            session.send(mensaje.split('@').reverse().pop() + "mariconazo");
        }else{
            session.send(mensaje + " mariconazo");
        }*/

});

bot.on('conversationUpdate', function (message) {

    var danSalio = false;

    if (message.membersAdded && message.membersAdded.length > 0) {
        var membersAdded = message.membersAdded
            .map(function (m) {
                var isSelf = m.id === message.address.bot.id;
                return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
            })
            .join(', ');

        bot.send(new builder.Message()
            .address(message.address)
            .text('Bienvenido ' + membersAdded + ' :)'));
    }

    if (message.membersRemoved && message.membersRemoved.length > 0) {
        var membersRemoved = message.membersRemoved
            .map(function (m) {
                if(m.id === "29:1WQ6aolBgg8k5pFCtNV3dk__auzje3gG56OGWnL9ro-g"){
                    danSalio = true;
                }
                var isSelf = m.id === message.address.bot.id;
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