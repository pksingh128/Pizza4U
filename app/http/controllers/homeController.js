const mysql = require('mysql');
const db = require('../../../app/config/connection')

exports.index = async(req, res) => {
     await db.query('SELECT * FROM menus',(err,results)=>{
        if(!err){
             res.render('home',{results});
        }else{
            console.log(err);
        }
        console.log(results);
           
    })
  
}