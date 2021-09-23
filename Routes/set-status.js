const express = require('express');
const connectDB = require('../config/db');
const router = express.Router();


router.route('/:id')
//  Update a delivery by changing its status using enum and adding the driver that accepted the delivery
.patch(async(req, res) => {
    const id = req.params;
    const {status} = req.body;
 
    try{
        await connectDB.query(`UPDATE company SET status = '${status}', WHERE id = '${id}' `, (err, results)=>{
            if(err){
                return res.status(404).json({success: false, msg: 'Can not update status'});
            }
            else{
                return res.status(200).json({success: true, results})
            }
        })
    }
    catch(err){

    }
});
module.exports = router;