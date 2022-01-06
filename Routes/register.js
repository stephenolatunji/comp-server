const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');
const randomize = require('randomatic');
const { reset } = require('nodemon');


router.route('/')
    .post(async(req, res)=>{
       const {
           salesforceCode, type, compName, 
           country, email, district, state, region, 
           address, Owner_Name, Owner_Phone, 
           DD_Name, DD_Phone, lat, long, sysproCode,
        } = req.body;
       const split_name = compName.slice(0, 3).toUpperCase();
       const split_type = type.charAt(0).toUpperCase();
       const random = randomize('0', 4);
       const date = new Date().getFullYear()+'-'+(new Date().getMonth()+parseInt("1"))+'-'+new Date().getDate();
       const code = `${split_type}${split_type}${split_name}${random}`;
        
       try{
            await connectDB.query(`SELECT * FROM companies_tb WHERE SF_code = '${salesforceCode}'`, (err, results) =>{
                if(results.recordset.length > 0){
                   return res.status(400).json({success: false, msg: 'User company already exists.'})
                }
                else{
                    connectDB.query(`EXEC registerCompany @distributorCode = '${code}', @salesforceCode = '${salesforceCode}', 
                    @sysproCode = '${sysproCode}', @companyType = '${type}', @companyName ='${compName}', 
                    @country = '${country}', @email = '${email}', @district = '${district}', @state = '${state}',
                    @region = '${region}', @address = '${address}', @Owner_Name = '${Owner_Name}',
                    @Owner_Phone = '${Owner_Phone}', @DD_Name = '${DD_Name}', @DD_Phone = '${DD_Phone}', 
                    @lat = '${lat}', @long = '${long}', @registeredOn = '${date}'`, async(err, result) => {
                        if(result.rowsAffected > 0){
                          await connectDB.query(`SELECT * FROM companies_tb WHERE SF_Code = '${salesforceCode}'`, (err, results)=>{
                            if(results.recordset.length > 0){
                                res.status(200).json({success: true, msg: 'Successful registration!', result: results.recordset[0]})
                            }
                            else{
                                res.status(400).json({success: false, msg: 'Can not fetch newly registered company'})
                            }
                          })
                        }
                        else{
                            res.status(200).json({success: true, msg: 'Company registration not successful', results: result.recordset});
                        }
                    })
                }
            })
       }
       catch(err){
        res.status(500).json({success: false, msg: `Server Error ${err}`});
       }
    })
module.exports = router;