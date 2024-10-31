const userModel = require('../models/user');
const bcrypt = require('bcryptjs');

const updateInfo = async (req, res) =>{
    const { password, ...others} = req.body;
    const { id } = req.user;
    try {
     await userModel.findByIdAndUpdate( id, others, {new:true});
        res.json({ message: "info updated successfully" })
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });

    }
}

const updatePassword = async (req, res) =>{
    const { oldPassword, newPassword } = req.body;
    const {id} =  req.user;
    try {
        const getUser = await userModel.findById(id);
        const userPassword = bcrypt.compareSync( oldPassword, getUser.password );
        if(!userPassword){
            return res
                        .status(404)
                        .json({ message: "password does not match" });
        }
        if(oldPassword === newPassword){
            return res
                        .status(404)
                        .json({ message: "new password cant be same as old"});
        }
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        await userModel.findByIdAndUpdate( id, {password:hashedPassword}, {new:true});
        res
                .status(200)
                .json({ message: "password updated successfully"});
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });
    }
};
 
const deleteUser = async (req,res) => {
    const { id } = req.user;
    try {
    await userModel.findByIdAndDelete(id);
    return res
                .clearCookie("user_token")
                .status(200)
                .json({ message: "account deleted successfully" });
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });

    }
};


const updateRole = async (req, res) => {
    const {id} = req.body;
    const {role} = req.user;

    if(role !== "superAdmin" && role !== "Admin"){
        return res
                    .status(400)
                    .json({ message: "you are not authorized"});
    }
    try {
        await userModel.findByIdAndUpdate(id, {role: "Admin"}, {new:true});
        res
            .status(200)
            .json({ message: `${id} is now an Admin` });
    } catch (error) {
        res
            .status(500)
            .json({messge: "something wemt wrong" });

    }
}





module.exports = { updateInfo, updatePassword, deleteUser, updateRole };