let mongoose =require("mongoose");
let Clude=new mongoose.Schema({
    "ruzhu": String,
    "lidian": String,
    "leixing": String,
    "jiage": Number,
    "shuliang": Number,
    "name": String,
    "lianxiren": String,
    "lianxiphone": Number,
    "liuyan": String,
    "fangjian":Number,
    "zhengjian":String,
    "zhengjianhao":Number,
    "xingbie":String,
    "qian":Number
});
let clude=mongoose.model("clude",Clude);
module.exports=clude;



