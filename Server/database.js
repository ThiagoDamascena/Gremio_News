const mysql = require("mysql2")

const db = mysql.createConnection({

    host: "localhost",

    user: "thiago",

    password: "1234",

    database: "gremio_estudantil"
})

module.exports = db