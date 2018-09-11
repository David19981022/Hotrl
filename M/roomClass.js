var mongoose =require("mongoose");
var Class=new mongoose.Schema({
    "leibie": String,
    "mingcheng": String,
    "mianji": Number,
    "chuangweishu": Number,
    "zaocan": String,
    "wangluo": String,
    "dianshi": String,
    "jiage": Number,
    "shuliang": Number,
    "shengyushuliang":Number
});
var roomClass=mongoose.model("roomClass",Class);
module.exports=roomClass;



