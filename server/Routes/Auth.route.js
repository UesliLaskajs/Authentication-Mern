const {Signup, Login}=require("../Controllers/AuthcControllers");
const { userVerification } = require("../Middlewares/Auth.middleware");
const router=require("express").Router();

router.post("/signup",Signup);
router.post("/login",Login);
router.post("/",userVerification)
module.exports=router;