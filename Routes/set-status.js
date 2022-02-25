const express = require('express');
const connectDB = require('../config/db');
const router = express.Router();


router.route('/status/:id')

.patch(async(req, res) => {
    const id = req.params.id;
    const status = req.body.status;
 
    try{
        await connectDB.query(`EXEC updateCompanyStatus @status = '${status}', @id = '${id}'`, (err, results)=>{
            if(err){
                return res.status(404).json({success: false, msg: 'Can not update status'});
            }
            else{
                return res.status(200).json({success: true, msg: 'Updated successfully', result: results.recordset})
            }
        })
    }
    catch(err){

    }
});
module.exports = router;