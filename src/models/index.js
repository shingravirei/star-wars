const mongoose = require('mongoose');
const PlanetaConn = require('./Planeta');

const { DB_USER, DB_NAME, DB_NAME_TEST, DB_PASSWORD, NODE_ENV } = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.3qe5n.mongodb.net/${
    NODE_ENV === 'test' ? DB_NAME_TEST : DB_NAME
}?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Planeta = PlanetaConn(mongoose);

module.exports = { Planeta };
