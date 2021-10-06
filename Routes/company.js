const express = require('express');
const connectDB = require('../config/db');
const router = express.Router();

// Get all companies
router.route('/getall')
.get(async(req, res)=>{
    try{
        await connectDB.query(`SELECT * FROM companies_tb`, (err, results)=>{
            if(err){
                return res.status(400).json({success: false, msg: 'Unable to fetch companies'})
            }
            else{
                return res.status(200).json({success: true, result: results.recordset})
            }
        })
    }
    catch(err){
        res.status(500).json({success: false, msg: 'Server error!'})
    }
})


// Get company by Id
router.route('/:id')
.get(async(req, res)=>{
    const id = req.params.id;

    try{
        await connectDB.query(`SELECT * FROM companies_tb WHERE id ='${id}'`, (err, results)=>{
            if(err){
                return res.status(404).json({success: false, msg: 'Can not find company'});
            }
            else{
                return res.status(200).json({success: true, result: results.recordset[0]})
            }
        })
    }
    catch(err){
        res.status(500).json({success: false, msg: 'Server error!'})
    }
})




//  Get all company by code
router.route('/code/:id')
.get(async(req, res)=>{
    const id = req.params.id;

    try{
        await connectDB.query(`SELECT * FROM companies_tb WHERE DIST_Code = '${id}'`, (err, results)=>{
            if(err){
                
                return res.status(404).json({success: false, msg: 'Can not find company'});
            }
            else{
                return res.status(200).json({success: true, result: results.recordset[0]});
            }
        })
    }
    catch(err){
        res.status(500).json({success: false, msg: 'Server error!'})
    }
});

// Get all company by status
router.route('/status/:status')
.get(async(req, res)=>{
    const status = req.params.status;
 
    try{
        await connectDB.query(`SELECT * FROM companies_tb WHERE status =  '${status}'`, (err, results)=>{
            if(err){
                
                return res.status(404).json({success: false, msg: 'Can not find companies'});
            }
            else{
                return res.status(200).json({success: true, result: results.recordset});
            }
        })
    }
    catch(err){
        res.status(500).json({success: false, msg: 'Server error!'})
    }
}),

router.route('/salesforce/:code')
.get(async(req, res)=>{
    const salesforceCode = req.params.code;

    try{
        await connectDB.query(`SELECT * FROM companies_tb WHERE SF_Code = '${salesforceCode}'`, (err, results)=>{
            if(err){
                
                return res.status(404).json({success: false, msg: 'Can not find company'});
            }
            else{
                return res.status(200).json({success: true, result: results.recordset[0]});
            }
        })
    }
    catch(err){
        res.status(500).json({success: false, msg: 'Server error!'})
    }
});

module.exports = router;