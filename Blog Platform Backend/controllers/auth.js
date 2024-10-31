const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const createUser = async (req,res) =>{
    const { password, role, ...others} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModel({ ...others, password:hashedPassword });
    try {
        await newUser.save();
        res
            .status(200)
            .json({ message: "PROFILE CREATED SUCCESSFULLY" });
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });
    };
};

const loginUser = async (req,res)=> {
    const { email, password } = req.body;
    try {
        const userInfo = await userModel.findOne({ email });
        if(!userInfo){
            return res
                        .status(404)
                        .json({ message: "wrong credentials" });
        };
        const verify = bcrypt.compareSync(password, userInfo.password);
        if(!verify){
            return res
                        .status(404)
                        .json({ message: "wrong credentials" });
        };
        const aboutUser = {id: userInfo.id, role: userInfo.role};
        const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
        return res
            .cookie("user_token", token)
            .status(200)
            .json({ message: "user loggedin successfully"});        
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });
     }

};

// loggingout a user
const logoutUser = async (req, res)=> {
    try {
        return res
                    .clearCookie('user_token')
                    .status(200)
                    .json({ message: "user logged out successfully!!!"})
    } catch (error) {
        res
            .status(500)
            res
            .status(500)
            .json({messge: "something wemt wrong" });
    }
};

// oauth registration

const oauthRegister = async (req, res) => {
    const {username, email, gender} = req.body;
    try {
        const findOne = await userModel.findOne({email});
        if(findOne && findOne.CredentialAcct){
            res
                .status(400)
                .json({ message: "Duplicate account is prohibited"});
            }
        if(findOne){
            const aboutUser = {id: findOne.id, role: findOne.role};
            const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
            res
                .cookie( "user_token", token )
                .status(200)
            return res
                        .status(200)
                        .json({ message: "user logged in successfully"})
        };
        const newUser = new userModel({ username, email, gender, CredentialAcct: false});
        const savedUser = await newUser.save();
        const aboutUser = {id: savedUser.id, role: savedUser.role};
        const token = jwt.sign(aboutUser, process.env.JWT_SECRETE);
       return res
            .cookie( "user_token", token )
            .status(200)
            .json({ message: "user logged in successfully"})
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });
    }
}


module.exports= { createUser, loginUser, logoutUser, oauthRegister }
