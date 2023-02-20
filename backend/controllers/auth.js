const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../configs/db');

exports.signup = (req,res) => {

    const {name ,email , password} = req.body;

    //Check if the user already exits
    // const isValid = tempData.findIndex((ele) => (ele.email === email));

    client.query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
        isValid = data.rows;
        
        if(isValid.length !== 0){
            res.status(400).json({
                error: "User already exists"
            });
        }
        
        else{
            //Generate Token
        const token = jwt.sign(
            { 
               email: email,
            }, 
            process.env.Secret_Key
            );
       
           //Hash password
           bcrypt.hash(password, 10,(err, hash) => {
               if(err){
                   res.status(500).json({
                       error: "Internal Server Error",
                   });
               }   
       
               const user = {
                   name,
                   email,
                   password: hash,
               };
               
               client.query(`INSERT INTO users (name,email,password) VALUES ('${user.name}','${user.email}','${user.password}');`)
               .then((data) => {
                res.status(200).json({
                    message: "User added successfully to database",
                    token: token,
                });
               })
               .catch((err) => {
                    res.status(500).json({
                        error: "Database error occurred!"
                    });
               });
           });
        }
    })
    .catch((err) => {
        res.status(500).json({
            error: "Database error occurred!"
        });
    });
};

exports.signin = (req,res) => {
    //TODO: Complete Signin
    const {email ,password} = req.body;

    client.query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
        userData = data.rows;

        if(userData.length === 0){
            res.status(400).json({
                error : "User doesnot exist, signup instead!",
            });
        }
        else{
            bcrypt.compare(password, userData[0].password, (err,result) => {
                if(err){
                    res.status(500).json({
                        error: "User doesnot exist ,Please SignUp!!"
                    });
                }
                else if(result === true){
                    const token = jwt.sign(
                        {
                            email: email,
                        },
                        process.env.Secret_Key
                    );
                    res.status(200).json({
                        message: "User Signed In sucessfully",
                        token: token,
                    });
                }
                else{
                    res.status(400).json({
                        error: "Enter correct password!",
                    });
                }
            });
        }
    })
    .catch((err) => {
        res.status(500).json({
            error: "Database Error Occurred!",
        });
    });
};