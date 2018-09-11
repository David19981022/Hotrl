var mongoose = require('mongoose');
var crypto = require('crypto');
var Type=mongoose.Schema({
    yonghuming:String,
    mima:String,
});
var type=mongoose.model("type",Type);

exports.nameZhan=function (yonghuming,callback) {
    type.findOne({"yonghuming":yonghuming},callback)
};
exports.nameupdate=function (yonghuming,callback) {
    type.find({"yonghuming":yonghuming},callback)
};


