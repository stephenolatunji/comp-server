const sql = require('mssql');
require('dotenv').config();

const config = {
    server: microservices-sql-afr-dev.database.windows.net,
    user: DmsSqlAdminUser,
    password: xqQKzGePVVRobatEEgzlonyRp5dW6YkzruB6rbFtKYY,
    database: dmscompanydb,
    options: {encrypt: true, trustServerCertificate: false},

}
// const sql2 = `CREATE TABLE companies_tb (
//     id int IDENTITY(1, 1) PRIMARY KEY,
//     DIST_Code varchar(255) NOT NULL,
//     SF_Code varchar(255) NOT NULL,
//     SYS_Code varchar(255),
//     company_type varchar(255) NOT NULL,
//     company_name varchar(255) NOT NULL,
//     country varchar(255) NOT NULL,
//     email varchar(255),
//     status varchar(255),
//     district varchar(255),
//     region varchar(255),
//     address varchar(255),
//     Owner_Name varchar(255) NOT NULL,
//     Owner_Phone varchar(255),
//     DD_Name varchar(255),
//     DD_Phone varchar(255),
//     lat varchar(255),
//     long varchar(255),
//     registeredOn varchar(255) NOT NULL
//     )`

const connectDB = sql.connect(config, (err) =>{
    if(err) throw err;
    console.log('DB connected...');
    // sql.query(sql2, (err, results)=>{
    //     if(err){
    //         return console.log('Table already exists');
    //     }
    //     else{
    //         console.log('Table created successfully');
    //     }
    // })
});




module.exports = connectDB; 