const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');
const randomize = require('randomatic');


router.route('/')
    .post(async(req, res)=>{
        const salesforceCode = req.body.salesforceCode;
        const sysproCode = req.body.sysproCode;
        const compName = req.body.compName; 
        const type = req.body.type;
        const country = req.body.country; 
        const email = req.body.email; 
        const district = req.body.district;
        const region = req.body.region;
        const state = req.body.state;
        const address = req.body.address; 
        const Owner_Name = req.body.Owner_Name; 
        const Owner_Phone = req.body.Owner_Phone; 
        const DD_Name = req.body.DD_Name; 
        const DD_Phone = req.body.DD_Phone; 
        const DD_Email = req.body.DD_Email; 
        const lat = req.body.lat; 
        const long = req.body.long; 
        const split_name = compName.slice(0, 3).toUpperCase();
        const split_type = type.charAt(0).toUpperCase();
        const random = randomize('0', 4);
        const date = new Date().getFullYear()+'-'+(new Date().getMonth()+parseInt("1"))+'-'+new Date().getDate();
        const code = `${split_type}${split_type}${split_name}${random}`;

       try{
            await connectDB.query(`EXEC getCompanyBySYSCode @SYSCode = '${sysproCode}'`, async(err, results) =>{
                if(!results.rowsAffected < 1){
                    await connectDB.query(`EXEC registerCompany @distributorCode = '${code}', @salesforceCode = '${salesforceCode}', 
                    @sysproCode = '${sysproCode}', @companyType = '${type}', @companyName ='${compName}', @country = '${country}', 
                    @email = '${email}', @district = '${district}', @state = '${state}', @region = '${region}', @address = '${address}', 
                    @Owner_Name = '${Owner_Name}', @Owner_Phone = '${Owner_Phone}', @DD_Name = '${DD_Name}', @DD_Phone = '${DD_Phone}', 
                    @DD_Email = '${DD_Email}', @lat = '${lat}', @long = '${long}', @registeredOn = '${date}'`, (err, results) => {
                        if(results.recordset.length > 0){
                            res.status(200).json({success: true, msg: 'Successful registration!', result: results.recordset[0]})
                        }
                        else{
                            res.status(200).json({success: true, msg: 'Company registration not successful', results: result.recordset});
                        }
                    })
                   
                }
                else{
                   return res.status(400).json({success: false, msg: 'User company already exists.'})
                }
            })
       }
       catch(err){
        res.status(500).json({success: false, msg: `Server Error ${err}`});
       }
    })
module.exports = router;