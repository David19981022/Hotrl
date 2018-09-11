var formidable = require("formidable");
var url = require("url");
var crypto = require("crypto");
var type = require("../M/type");  //管理登录
var Sub = require("../M/Sub");  //在线订单(客户)
var roomClass = require("../M/roomClass"); //房间类
var room = require("../M/room"); //房间
var clude = require("../M/clude"); //订单入住
var outRoom = require("../M/outRoom"); //退过房的
exports.Index = function (req, res) {
    res.render("index")
};
exports.manage = function (req, res) {
    res.render("Manage")
};
exports.addlogin = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        type.nameZhan(fields.yonghuming, function (err, data) {
            if (!data) {
                res.json({"s": -2})
                return;
            }
            if (crypto.createHmac('sha256', fields.mima).digest('hex') === data.mima) {
                req.session.login = 1;
                req.session.yonghuming = fields.yonghuming;
                res.json({"s": 1})
                return
            } else {
                res.json({"s": -1})
                return
            }
        })
    })
};
// ---------------------进入管理系统---------------------
// 页面
exports.Mindex = function (req, res) {
    if (req.session.login != 1) {
        res.send('<a href="/manage">请先登录</a>')
        return;
    }
    res.render("man/index", {"yonghuming": req.session.yonghuming})
};
// 页面 修改密码
exports.passupdate = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        type.nameupdate(fields.yonghuming, function (err, data) {
            if (!data) {
                res.json({"s": -2})
                return;
            }
            var reutle = data[0];
            reutle.yonghuming = fields.yonghuming;
            reutle.mima = crypto.createHmac('sha256', fields.mima).digest('hex');
            reutle.save(function (err, data) {
                if (err) {
                    res.json({"s": -1})
                    return;
                }
                res.json({"s": 1})
            })
        })
    })
};
// 房类管理  页面
exports.roomClass = function (req, res) {
    if (req.session.login != 1) {
        res.send('<a href="/manage">请先登录</a>')
        return;
    }
    res.render("man/roomClass")
};
// 增加
exports.addroomClass = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        fields.shengyushuliang = fields.shuliang;
        roomClass.find({"leibie": fields.leibie}, function (err, data) {
            if (data.length == 0) {
                var json = new roomClass(fields)
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
// 获取数据
exports.readroomClass = function (req, res) {
    var num = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 10;
    roomClass.count({}, function (err, count) {
        roomClass.find({}).limit(pagesize).skip(pagesize * num).exec(function (err, data) {
            res.json({
                "pageAmount": Math.ceil(count / pagesize),
                "result": data,
            })
        })
    })
};
// 删除
exports.delRoomClass = function (req, res) {
    var id = req.params.id;
    roomClass.find({"_id": id}, function (err, results) {
        if (err || results.length == 0) {
            res.json({"s": -1});
            return;
        }
        results[0].remove(function (err) {
            if (err) {
                res.json({"s": -1});
                return;
            }
            res.json({"s": 1});
        });
    })
};
// 修改
exports.updateroomClass = function (req, res) {
    var id = req.params.id;
    roomClass.findOne({"_id": id}, function (err, data) {
        if (err) {
            res.json({"s": -1});
            return;
        }
        res.json({"s": data});
    })
};
//修改  提交
exports.uproomClass = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        roomClass.find({"leibie": fields.leibie}, function (err, data) {
            if (data.length == 0) {
                res.json({"s": -1});
            }
            var result = data[0];
            result.leibie = fields.leibie;
            result.mingcheng = fields.mingcheng;
            result.mianji = fields.mianji;
            result.chuangweishu = fields.chuangweishu;
            result.zaocan = fields.zaocan;
            result.wangluo = fields.wangluo;
            result.dianshi = fields.dianshi;
            result.jiage = fields.jiage;
            result.shuliang = fields.shuliang;
            result.shengyushuliang = result.shengyushuliang;
            result.save(function (err) {
                if (err) {
                    res.json({"s": -1})
                    return;
                }
                res.json({"s": 1})
            })
        })
    })
};
// 房间管理------页面
exports.room = function (req, res) {
    if (req.session.login != 1) {
        res.send('<a href="/manage">请先登录</a>')
        return;
    }
    res.render("man/room")
};
// 获取房类
exports.roomLei = function (req, res) {
    roomClass.find({}, function (err, data) {
        res.json({"result": data})
    })
};
// 增加
exports.addroom = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        room.find({"fangjianhao": fields.fangjianhao}, function (err, data) {
            if (data.length == 0) {
                var json = new room(fields)
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
//获取数据
exports.readroom = function (req, res) {
    var num = url.parse(req.url, true).query.page - 1 || 0;
    var pagesize = 10;
    room.count({}, function (err, count) {
        room.find({}).limit(pagesize).skip(pagesize * num).exec(function (err, data) {
            res.json({
                "pageAmount": Math.ceil(count / pagesize),
                "result": data,
            })
        })
    })
};
//删除
exports.delRoom = function (req, res) {
    var id = req.params.id;
    room.find({"_id": id}, function (err, results) {
        if (err || results.length == 0) {
            res.json({"s": -1});
            return;
        }
        results[0].remove(function (err) {
            if (err) {
                res.json({"s": -1});
                return;
            }
            res.json({"s": 1});
        });
    })
};
// 修改
exports.updateroom = function (req, res) {
    var id = req.params.id;
    room.findOne({"_id": id}, function (err, data) {
        if (err) {
            res.json({"s": -1});
            return;
        }
        res.json({"s": data});
    })
};
//修改  提交
exports.uproom = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        room.find({"fangjianhao": fields.fangjianhao}, function (err, data) {
            if (data.length == 0) {
                res.json({"s": -1});
            }
            var result = data[0];
            result.fangjianhao = fields.fangjianhao;
            result.weizhi = fields.weizhi;
            result.miaoshu = fields.miaoshu;
            result.fangjianleixing = fields.fangjianleixing;
            result.zhaungtai = fields.zhaungtai;
            var s = new room(result)
            s.save(function (err) {
                if (err) {
                    res.json({"s": -1})
                    return;
                }
                res.json({"s": 1})
            })
        })
    })
};
// 判断类数量与房间数量相等
exports.lengthRoom=function(req,res){
    var lei = req.params.lei;
    room.find({"fangjianleixing":lei},function (err,data) {
        if (err){
            res.json({"s":-1})
            return
        }
        res.json({"s":data})
    })
};
//订单入住-----------------页面
exports.clude = function (req, res) {
    if (req.session.login != 1) {
        res.send('<a href="/manage">请先登录</a>')
        return;
    }
    res.render("man/clude")
};
//获取房间号
exports.roomHao = function (req, res) {
    var Hao = req.params.hao;
    room.find({"fangjianleixing": Hao, "zhaungtai": 0}, function (err, data) {
        if (err) {
            res.json({"s": -1});
            return;
        }
        res.json({"s": data});
    })
};
// 办理入住
exports.addclude = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        clude.find({"zhengjianhao": fields.zhengjianhao}, function (err, data) {
            if (data.length == 0) {
                // 将退房的人都存进一个数据库
                var s = new outRoom(fields);
                s.save();
                var json = new clude(fields)
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
//入住后 改变房间状态
exports.fangjian = function (req, res) {
    var fangjian = req.params.fangjian;
    room.find({"fangjianhao": fangjian}, function (err, data) {
        if (data.length == 0) {
            res.json({"s": -1});
        }
        var result = data[0];
        result.fangjianhao = result.fangjianhao;
        result.weizhi = result.weizhi;
        result.miaoshu = result.miaoshu;
        result.fangjianleixing = result.fangjianleixing;
        result.zhaungtai = 1;
        var s = new room(result)
        s.save(function (err) {
            if (err) {
                res.json({"s": -1})
                return;
            }
            res.json({"s": 1})
        })
    })
};
// 入住后删除订单
exports.lianxiren = function (req, res) {
    var lianxiren = req.params.ren;
    Sub.find({"lianxiren": lianxiren}, function (err, results) {
        if (err || results.length == 0) {
            res.json({"s": -1});
            return;
        }
        results[0].remove(function (err) {
            if (err) {
                res.json({"s": -1});
                return;
            }
            res.json({"s": 1});
        });
    })
};
//大堂入住--------------页面
exports.shop = function (req, res) {
    if (req.session.login != 1) {
        res.send('<a href="/manage">请先登录</a>')
        return;
    }
    res.render("man/shop")
};
// 入住记录查询----------页面
exports.about = function (req, res) {
    if (req.session.login != 1) {
        res.send('<a href="/manage">请先登录</a>')
        return;
    }
    res.render("man/about")
};
// 查询
exports.aboutcha = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        outRoom.find({
            "lianxiren": fields.lianxiren,
            "ruzhu": fields.ruzhu,
            "lidian": fields.lidian,
        }, function (err, data) {
            if (data.length == 0) {
                res.json({"s": -1})
                return
            }
            res.json({"s": data})
        })
    })
};
//退房管理-----------页面
exports.outRoom = function (req, res) {
    if (req.session.login != 1) {
        res.send('<a href="/manage">请先登录</a>')
        return;
    }
    res.render("man/outRoom")
};
//查询已入住的房间号
exports.outRoomCha = function (req, res) {
    var hao = req.params.hao;
    clude.find({"fangjian": hao}, function (err, data) {
        if (data.length == 0) {
            res.json({"s": -1})
            return
        }
        res.json({"s": data})
    })
};
//确定退房
exports.outRomclude = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        // //删除入住的库里存的数据
        clude.find({"fangjian":fields.fangjian},function (err,results) {
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
    })
};
// 退出
exports.tuichu=function (req,res) {
    var login = req.session.login = 0;
    var yonghuming=req.session.yonghuming="";
    if(!yonghuming) {
        res.render("Manage",{
            "login" : login,
            "yonghuming" : "",
        });
    }
};
//房间图表-----------页面
exports.tubiao = function (req, res) {
    if (req.session.login != 1) {
        res.send('<a href="/manage">请先登录</a>')
        return;
    }
    res.render("man/tubiao")
};
//房间图表-----------页面
exports.tu = function (req, res) {
    room.find({},function (err,data) {
        if (err){
            red.json({"s":-1});
            return
        }
        res.json({"s":data})
    })
};