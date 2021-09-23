const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.HOST,
    user: 'sqlserver',
    password: process.env.PASSWORD,
    database: process.env.DB,
    options: {encrypt: true, trustServerCertificate: false},
}
const connectDB = sql.connect(config, (err) =>{
    if(err){
        console.log(err)
    }
    console.log('DB connected...')
});

const sql2 = `CREATE TABLE company IF NOT EXISTS(
    id int IDENTITY(1, 1) PRIMARY KEY,
    company_code varchar(255) NOT NULL, 
    company_type varchar(255) NOT NULL,
    company_name varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    email varchar(255) NULL,
    status varchar(255) NULL
    )`;


module.exports = connectDB; 