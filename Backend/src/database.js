const mysql = require("mysql2");
require("dotenv").config();

function connectDB() {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  });

  db.connect((err) => {
    if (err) {
      console.log(err);
      console.log("Erro no DB, tentando de novo...");
      setTimeout(connectDB,3000);
    } else {
      console.log("Conectado no MySQL!");
    }
  });

  return db;
}

module.exports = connectDB();