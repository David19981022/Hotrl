var formidable = require("formidable");
var url = require("url");
var crypto = require("crypto");
var type = require("../M/type");  //管理登录
var roomClass = require("../M/roomClass"); //房间类
var room = require("../M/room"); //房间
var Sub = require("../M/Sub"); //在线订单
exports.Sub=function (req,res) {
  res.render("Sub")
};
// 在线预订
// 获取数量
exports.roomshu=function (req,res) {
    var str=req.params.str;
    roomClass.find({"mingcheng":str},function (err,data) {
        if (err){
            res.json({"s":-1});
            return;
        }
        res.json({"s":data});
    })
};
//提交
exports.addSub = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        Sub.find({"lianxiren": fields.lianxiren}, function (err, data) {
            if (data.length == 0) {
                var json = new Sub(fields)
                json.save(function (err) {
                    if (err) {
                        res.json({"s": -1});
                        return;
                    } else {
                        res.json({"s": 1});
                        return;
                    }
                })
            }
            else {
                res.json({"s": -2})
            }
        })
    })
};
// 预定后修改数量
exports.xiurommCass=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        roomClass.find({'mingcheng':fields.lei},function (err,data) {
            if (data.length==0){
                res.json({"s":-1});
            }
            var result=data[0];
            let sheng=result.shengyushuliang-fields.shuliang;
            result.leibie=result.leibie;
            result.mingcheng=result.mingcheng;
            result.mianji=result.mianji;
            result.chuangweishu=result.chuangweishu;
            result.zaocan=result.zaocan;
            result.wangluo=result.wangluo;
            result.dianshi=result.dianshi;
            result.jiage=result.jiage;
            result.shuliang=result.shuliang;
            result.shengyushuliang=sheng;
            result.save(function (err) {
                if (err){
                    res.json({"s":-1})
                    return;
                }
                res.json({"s":1})
            })
        })
    })
};
//判断选中房间是否可以入住
exports.zhaungtai=function(req,res){
    var str=req.params.str;
    room.find({"fangjianhao":str},function (err,data) {
        if (err){
            res.json({"s":-1});
            return;
        }
        res.json({"s":data});
    })
};
//订单查询---------------
exports.order=function (req,res) {
    res.render("Order")
};
//客户订单查询
exports.ordCha=function (req,res) {
    var lianxiren=req.params.lianxiren;
    Sub.find({"lianxiren":lianxiren},function (err,data) {
        if (err){
            res.json({"s":-1});
            return;
        }
        res.json({"s":data[0]});
    })
};
// 客户删除订单
exports.Delding=function (req,res) {
    var lianxiren=req.params.lianxiren;
    Sub.find({"lianxiren":lianxiren},function (err,results) {
        if(err || results.length == 0){
            res.json({"s" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"s" : -1});
                return;
            }
            res.json({"s" : 1});
        });
    })
};
// 客户删除订单  修改类型数量 - //非同一类型 修改订单后 之前数量的
exports.delShu=function (req,res) {
    var leixing=req.params.lei;
    roomClass.find({'mingcheng':leixing},function (err,data) {
        if (data.length==0){
            res.json({"s":-1});
        }
        var result=data[0];
        var sheng=result.shengyushuliang;
        sheng++;
        result.leibie=result.leibie;
        result.mingcheng=result.mingcheng;
        result.mianji=result.mianji;
        result.chuangweishu=result.chuangweishu;
        result.zaocan=result.zaocan;
        result.wangluo=result.wangluo;
        result.dianshi=result.dianshi;
        result.jiage=result.jiage;
        result.shuliang=result.shuliang;
        result.shengyushuliang=sheng;
        result.save(function (err) {
            if (err){
                res.json({"s":-1})
                return;
            }
            res.json({"s":1})
        })
    })
};
//客户修改订单
exports.updateding=function (req,res) {
    var lianxiren=req.params.lianxiren;
    Sub.find({"lianxiren":lianxiren},function (err,data) {
        if (err){
            res.json({"s":-1})
            return;
        }
        res.json({"s":data})
    })
};
// 修改了类型的订单 提交
exports.xiugailei=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        Sub.find({"lianxiren":fields.lianxiren},function (err,data) {
            if (err){
                res.json({"s":-2})
                return;
            }
            var result=data[0];
            result.ruzhu=fields.ruzhu;
            result.lidian=fields.lidian;
            result.leixing=fields.leixing;
            result.shengyu=result.shengyu;
            result.jiage=fields.jiage;
            result.fangjian=fields.fangjian;
            result.shuliang=result.shuliang;
            result.name=fields.name;
            result.lianxiren=fields.lianxiren;
            result.lianxiphone=fields.lianxiphone;
            result.liuyan=result.liuyan;
            result.save(function (err) {
                if (err){
                    res.json({"s":-1})
                    return;
                }
                res.json({"s":1})
            })
        })
    })
};
//非同一类型 修改订单后 之后数量的
exports.leixingok=function (req,res) {
    var leixing=req.params.lei;
    roomClass.find({'mingcheng':leixing},function (err,data) {
        if (data.length==0){
            res.json({"s":-1});
        }
        var result=data[0];
        var sheng=result.shengyushuliang;
        sheng--;
        result.leibie=result.leibie;
        result.mingcheng=result.mingcheng;
        result.mianji=result.mianji;
        result.chuangweishu=result.chuangweishu;
        result.zaocan=result.zaocan;
        result.wangluo=result.wangluo;
        result.dianshi=result.dianshi;
        result.jiage=result.jiage;
        result.shuliang=result.shuliang;
        result.shengyushuliang=sheng;
        result.save(function (err) {
            if (err){
                res.json({"s":-1})
                return;
            }
            res.json({"s":1})
        })
    })
};
//更换房间
exports.overfangjian=function(req,res){
    var leixing=req.params.lei;
    room.find({"fangjianleixing":leixing,"zhaungtai": 0},function (err,data) {
        if (err){
            res.json({"s":-1});
            return;
        }
        res.json({"s":data});
    })
};
// 确定退房后修改数量
exports.outrommCass=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        roomClass.find({'mingcheng':fields.lei},function (err,data) {
            if (err){
                res.json({"s":-1});
            }
            var result=data[0];
            let sheng=result.shengyushuliang+Number(fields.shuliang);
            result.leibie=result.leibie;
            result.mingcheng=result.mingcheng;
            result.mianji=result.mianji;
            result.chuangweishu=result.chuangweishu;
            result.zaocan=result.zaocan;
            result.wangluo=result.wangluo;
            result.dianshi=result.dianshi;
            result.jiage=result.jiage;
            result.shuliang=result.shuliang;
            result.shengyushuliang=sheng;
            result.save(function (err) {
                if (err){
                    res.json({"s":-1})
                    return;
                }
                res.json({"s":1})
            })
        })
    })
};
//确定退房   -改变房间入住状态
exports.oufangjian=function(req,res){
    let fangjian=req.params.fangjian;
    room.find({"fangjianhao":String(fangjian)},function (err,data) {
        if (data.length==0){
            res.json({"s":-1});
        }
        var result=data[0];
        result.weizhi=result.weizhi;
        result.fangjianhao=result.fangjianhao;
        result.miaoshu=result.miaoshu;
        result.fangjianleixing=result.fangjianleixing;
        result.zhaungtai=0;
        var s= new room(result)
        s.save(function (err) {
            if (err){s
                res.json({"s":-1})
                return;
            }
            res.json({"s":1})
        })
    })
};