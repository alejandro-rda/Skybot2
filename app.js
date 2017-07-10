var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
});

/*
var regex = /.*Dan.*!/;
var regex2 = /.*dan.*!/;
*/

var regex3 = /.*Loco.*/;
var regex4 = /.*loco.*/;
var regex5 = /.*Alejandro.*/;
var regex6 = /.*alejandro.*/;

// Listen for messages from users
server.post('https://skybot-danielazo.herokuapp.com/api/messages', connector.listen());

// Receive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {

    var mensaje = session.message.text;

    if
     (mensaje.match(regex3)||mensaje.match(regex4)||mensaje.match(regex5)||mensaje.match(regex6)) {
        session.send("Lo siento no puedo molestar a mi creador.");
    }else{
        if(mensaje.includes('@')){
            session.send(mensaje.split('@').reverse().pop() + "mariconazo");
        }else{
            session.send(mensaje + " mariconazo");
        }
    }
});

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded && message.membersAdded.length > 0) {
        var membersAdded = message.membersAdded
            .map(function (m) {
                var isSelf = m.id === message.address.bot.id;
                return (isSelf ? message.address.bot.name : m.name) || '' + ' (Nombre: ' + m.name + ')';
            })
            .join(', ');

        bot.send(new builder.Message()
            .address(message.address)
            .text('Bienvenido ' + membersAdded + ' :)'));
    }

    if (message.membersRemoved && message.membersRemoved.length > 0) {
        var membersRemoved = message.membersRemoved
            .map(function (m) {
                var isSelf = m.id === message.address.bot.id;
                return (isSelf ? message.address.bot.name : m.name) || '' + ' (Nombre: ' + m.name + ')';
            })
            .join(', ');


        bot.send(new builder.Message()
            .address(message.address)
            .text('El siguiente miembro ' + membersRemoved + ' se ha quitado :('));

        membersRemoved.map(function (m) {
            if(m.id === 'luiso_xd'){
                bot.send(new builder.Message()
                    .address(message.address)
                    .text('Dan se ha salido, alguien agreguelo porfa :S'));
            }
        });
    }
});