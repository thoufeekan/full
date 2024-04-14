const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = require('../model/auth');

router.use(express.json())
//signup route
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    let newUser = await users(data).save();
    let payload = { user: newUser.username, pwd: newUser.password };
    let token = jwt.sign(payload, 'reactblogapp');
    res.status(200).send({ message: "User created successfully", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred while creating user" });
  }
});

//login routes
router.post('/loginadmin',async(req,res)=>{
  let username= req.body.username;
  let password =req.body.password;

  const user = await users.findOne({username:username});
  if(!user){
      res.json({message:"User not found"});
  }
  try {
     if(user.password== password) {
      let payload ={user:username,pwd:password}
      let token = jwt.sign(payload,'reactblogapp');
      res.send({message:'login success', token:token})
     }
     else{
      res.json({message:"Invalid Login"})
     }
  } catch (error) {
      console.log(error)
  }
})


module.exports = router