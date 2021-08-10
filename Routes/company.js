const express = require('express');
const connectDB = require('../../Config/db');
const router = express.Router();

// Get all companies
router.route('/getall')
.get(async(req, res)=>{
    try{
        await connectDB.query(`SELECT * FROM companies`, (err, results)=>{
            if(err){
                return res.status(400).json({success: false, msg: 'Unable to fetch companies'})
            }
            else{
                return res.status(200).json({success: true, results})
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
    const id = req.params;

    try{
        await connectDB.query(`SELECT * FROM companies WHERE id ='${id}'`, (err, results)=>{
            if(results.length > 0){
                return res.status(200).json({success: true, results})
            }
            else{
                return res.status(404).json({success: false, msg: 'Can not find delivery'})
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
        await connectDB.query(`SELECT * FROM companies WHERE company_code = '${id}'`, (err, results)=>{
            if(results.length > 0){
                return res.status(200).json({success: true, results})
            }
            else{
                return res.status(404).json({success: false, msg: 'Can not find company'})
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
    const status = req.params;
 
    try{
        await connectDB.query(`SELECT * FROM companies WHERE status =  '${status}'`, (err, results)=>{
            if(results.length > 0){
                return res.status(200).json({success: true, results})
            }
            else{
                return res.status(404).json({success: false, msg: 'Can not find companies'})
            }
        })
    }
    catch(err){
        res.status(500).json({success: false, msg: 'Server error!'})
    }
})

module.exports = router;