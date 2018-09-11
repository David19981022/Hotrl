let mongoose =require("mongoose");
let sub=new mongoose.Schema({
    "ruzhu": String,
    "lidian": String,
    "leixing": String,
    "shengyu": Number,
    "jiage": Number,
    "shuliang": Number,
    "name": String,
    "lianxiren": String,
    "lianxiphone": Number,
    "liuyan": String,
    "fangjian":Number,
});
let Sub=mongoose.model("Sub",sub);
module.exports=Sub;



