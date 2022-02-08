const express = require('express');
const connectDB = require('../config/db');
const router = express.Router();

// Get all companies
router.route('/getall')
.get(async(req, res)=>{
    try{
        await connectDB.query(`EXEC getAllCompanies`, (err, results)=>{
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
        await connectDB.query(`EXEC getCompanyById @id ='${id}'`, (err, results)=>{
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




//  Get company by DMS Distributor's code
router.route('/code/:id')
.get(async(req, res)=>{
    const id = req.params.id;

    try{
        await connectDB.query(`EXEC getCompanyByCode @distCode = '${id}'`, (err, results)=>{
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
        await connectDB.query(`EXEC getCompanyByStatus @status =  '${status}'`, (err, results)=>{
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
        await connectDB.query(`EXEC getCompanyBySFCode @SFCode = '${salesforceCode}'`, (err, results)=>{
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

router.route('/companies/:country')
.get(async(req, res)=>{
    const country = req.params.country;

    try{
        await connectDB.query(`EXEC getCompanyByCountry @country = '${country.trim()}'`, (err, results)=>{
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
});

router.route('/syspro/:code')
.get(async(req, res)=>{
    const sysprocode = req.params.code;

    try{
        await connectDB.query(`EXEC getCompanyBySYSCode @SYSCode = '${sysprocode}'`, (err, results)=>{
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

router.route('/rate-distributor/:id')
    .patch(async(req, res) =>{
        const id = req.params.id;
        const stars = req.body.stars;
        const comment = req.body.comment;
        const companyId = req.body.companyId;
        const reviewerId = req.body.reviewerId;

        try{
            if(stars > 0 && stars <= 5){
                await connectDB.query(`EXEC getCompanyById @id = ${id}`, async(err, results) =>{
                    if(results.recordset.length > 0){
                        const record = results.recordset[0];
                        const raters = parseInt(record.raters + 1);
                        const ratings = parseInt(record.ratings + stars);
                        const currentRating = (parseFloat(ratings/raters)).toFixed(1);
                        await connectDB.query(`EXEC rateDistributors @id = ${id}, @rate = ${ratings}, 
                        @raters = ${raters}, @stars = ${currentRating}`, async(err, results) =>{
                            if(results.rowsAffected > 0){
                            await connectDB.query(`EXEC createReview @companyId = '${companyId}', 
                            @reviewerId = '${reviewerId}', @comment = '${comment}', @rating = '${stars}'`, (err, result) =>{
                                if(result.rowsAffected > 0){
                                    return res.status(200).json({success: true, msg: "Review added successfully", result: results.recordset[0]})
                                }
                                else{
                                    res.status(400).json({success: false, msg: 'Review not added'});
                                }
                            })
                        
                            }
                            else{
                                return res.status(400).json({success: false, msg: 'Rating failed'})
                            }
                        })
                    }
                    else{
                        return res.status(400).json({success: false, msg: 'Distributor not found'})
                    }
                })
            }
            else{
                return res.status(400).json({success: false, msg: 'Value must be within the range of 0 and 5'})
            }
        }
        catch(err){
            res.status(500).json({success: false, msg: 'Server error!'})
        }
    })

module.exports = router;