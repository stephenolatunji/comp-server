const mysql = require('mysql')
require('dotenv').config();


const connectDB = mysql.createConnection({
    host: process.env.HOST,
    user: 'companydb@dmscompanydb',
    password: process.env.PASSWORD,
    database: process.env.DB,
    ssl: true
});

const sql2 = `CREATE TABLE company IF NOT EXISTS(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255), 
    lastname VARCHAR(255)),
    email VARCHAR(255)),
    company VARCHAR(255))
    role VARCHAR(255)),
    registeredOn VARCHAR(255)),
    status VARCHAR(255))
    `;

connectDB.connect((error) =>{
    if(error) throw error;
    
    // connectDB.query(sql1, (err, result) =>console.log("Database created"));
    console.log('DB connected...');
    // connectDB.query(sql2, ( err, result) =>console.log("customer table created"));
});
setInterval(function () {
    connectDB.query('SELECT 1');
}, 3000);

module.exports = connectDB; 