/**
 * Created by rualejan on 30/07/2017.
 */

const {Client} = require('pg');
const connectionString = process.env.DATABASE_URL;

exports.devolverMensajes = () => {
    const simpleClient = new Client({connectionString: connectionString});
    simpleClient.connect();
    return simpleClient.query('SELECT id, name, value FROM message;')
        .then(res => {
            simpleClient.end();
            return res.rows})
        .catch(e => console.error(e.stack));
};