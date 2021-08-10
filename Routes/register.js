const express = require('express');
const router = express.Router();
const connectDB = require('../config/db');
const randomize = require('randomatic');


router.route('/')
    .post(async(req, res)=>{
       const {type, name, country} = req.body;
       const split_name = name.slice(0, 3).toUpperCase();
       const split_type = type.charAt(0).toUpperCase();
       const random = randomize('0', 4);
       const code = `${split_type}${split_type}${split_name}${random}`;
        console.log(code);
       try{
            await connectDB.query(`INSERT INTO companies (company_code, company_type, name, status, country) VALUES('${code}', '${type}', '${name}','new', '${country}')`, (err, result) =>{
                if(err){
                    res.status(400).json({success: false, msg: 'Can not register company'});
                }
                res.status(200).json({success: true, msg: 'Company registration successful'});
            })
       }
       catch(err){
        res.status(500).json({success: false, msg: `Server Error ${err}`});
       }
    })
module.exports = router;