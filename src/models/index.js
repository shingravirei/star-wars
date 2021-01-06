const mongoose = require('mongoose');
const PlanetaConn = require('./Planeta');

const { DB_NAME, DB_PASSWORD } = process.env;
const url = `mongodb+srv://chandriano:${DB_PASSWORD}@cluster0.3qe5n.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Planeta = PlanetaConn(mongoose);

module.exports = { Planeta };
