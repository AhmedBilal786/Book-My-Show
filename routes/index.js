const { Template } = require('ejs');
var express = require('express');
var router = express.Router();
var messagebird = require('messagebird')('sA98WInEe4M1vUnAXkrkK2cRq',)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/step2',function(req,res){
 var number = req.body.number;
 console.log(number)
 messagebird.verify.create(number,{
  template : 'your verification code is %token'
 },function(err,response){
  if(err){
    console.log(err)
    res.render('index',{
      error : err.errors[0].description
    })
  }
  else{
    console.log(response );
    res.render('otp',{
      id : response.id
    })
  }

 })
});
router.post('/step3',function(req,res){

  var id = req.body.id;
  var token = req.body.token;
  messagebird.verify.verify(id,token,function(err,response){
    if(err){
      res.send(err)
    }
    else{
      res.render(success)
    }
  })
})
module.exports = router;
