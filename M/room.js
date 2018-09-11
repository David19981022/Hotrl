let mongoose =require("mongoose");
let Room=new mongoose.Schema({
    "fangjianhao": String,
    "fangjianleixing": String,
    "weizhi": String,
    "miaoshu": String,
    "zhaungtai": Number,
});
let room=mongoose.model("room",Room);
module.exports=room;



