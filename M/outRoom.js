let mongoose =require("mongoose");
let Out=new mongoose.Schema({
    "lianxiren": String,
    "xingbie":String,
    "ruzhu": String,
    "lidian": String,
    "shuliang": Number,
    "zhengjian":String,
    "zhengjianhao":Number,
    "leixing": String,
    "jiage": Number,
    "name": String,
    "lianxiphone": Number,
    "qian": Number,
    "fangjian":Number,
});
let outRoom=mongoose.model("outRoom",Out);
module.exports=outRoom;



