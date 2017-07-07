var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '82ff654b-3087-4b37-beef-2bd10868c0b7',
    appPassword: '02aYSbsvEiJLTMqmfi2FjpO'
});

// Listen for messages from users

server.post('https://skybot-danielazo.herokuapp.com/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {

    if(
        session.message.text.match('/^.*Daniel.*$')
        || session.message.text.match('/^.*daniel.*$')
        || session.message.text.match('/^.*Dan.*$')
        || session.message.text.match('/^.*dan.*$'))
    {
        session.send("Erazo mariconazo");
    }

});