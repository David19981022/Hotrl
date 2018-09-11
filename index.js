var express = require("express");
var session = require('express-session');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tavern');
var app = express();
//设置views
app.set("view engine","ejs");

//使用session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
let center=require("./C/centr");   //管理员
let client=require("./C/client"); //客户
//---------------------------------------------
//静态页面
app.use(express.static("static"));
//首页
app.get("/",center.Index);
// 预订
app.get("/Sub",client.Sub); //页面
app.get("/roomshu/:str",client.roomshu);//数量
app.post("/addSub",client.addSub);//提交
app.post("/xiurommCass",client.xiurommCass);//预定后修改数量
app.get("/zhaungtai/:str",client.zhaungtai);//判断选中房间是否可以入住
//订单查询
app.get("/order",client.order); //页面
app.get("/ordCha/:lianxiren",client.ordCha);//客户查询订单
app.get("/Delding/:lianxiren",client.Delding);//客户删除订单
app.get("/delShu/:lei",client.delShu);//客户删除订单  修改类型数量  ---//非同一类型 修改订单后 之前数量的
app.get("/updateding/:lianxiren",client.updateding);//客户修改订单
app.post("/xiugailei",client.xiugailei);//修改了类型的订单
app.get("/leixingok/:lei",client.leixingok);//非同一类型 修改订单后 之后数量的
app.get("/overfangjian/:lei",client.overfangjian);//更换房间
// -------酒店管理
app.get("/manage",center.manage); //页面
app.post("/addlogin",center.addlogin);//登录
app.get("/mangae/index",center.Mindex);//管理页面
app.post("/passupdate",center.passupdate);//修改密码
// 《----房类管理
app.get("/mangae/roomClass",center.roomClass);//房类管理页面
app.post("/addroomClass",center.addroomClass);//增加
app.get("/readroomClass",center.readroomClass);//获取数据
app.get("/delRoomClass/:id",center.delRoomClass);//删除
app.get("/updateroomClass/:id",center.updateroomClass);//修改
app.post("/uproomClass",center.uproomClass);//修改  提交
  // 《-----房间管理
app.get("/roomLei",center.roomLei);//获取房类
app.get("/mangae/room",center.room);//房间管理页面
app.post("/addroom",center.addroom);//增加
app.get("/readroom",center.readroom);//获取数据
app.get("/delRoom/:id",center.delRoom);//删除
app.get("/updateroom/:id",center.updateroom);//修改
app.post("/uproom",center.uproom);//修改  提交
app.get("/lengthRoom/:lei",center.lengthRoom);//判断类与房间数量相等
    // 《----订单入住
app.get("/mangae/clude",center.clude);//订单入住页面
app.get("/roomHao/:hao",center.roomHao);//获取房间号
app.post("/addclude",center.addclude);//办理入住
app.get("/fangjian/:fangjian",center.fangjian);//入住后 改变房间状态
app.get("/lianxiren/:ren",center.lianxiren);//入住后删除订单
// 《----大堂入住
app.get("/mangae/shop",center.shop);//大堂入住页面
//  《----入住记录查询
app.get("/mangae/about",center.about);//入住记录查询页面
app.post("/aboutcha",center.aboutcha);//记录查询
//   《---退房管理
app.get("/mangae/outRoom",center.outRoom);//退房管理
app.get("/outRoomCha/:hao",center.outRoomCha);//查询已入住的房间号
app.post("/outRomclude",center.outRomclude);//确定退房
app.post("/outrommCass",client.outrommCass);//确定退房后修改数量
app.get("/oufangjian/:fangjian",client.oufangjian);//确定退房后 改变房间入住状态
// 退出
app.get("/tuichu",center.tuichu);//退出

// 图表
app.get("/mangae/tubiao",center.tubiao);//房间图标
app.get("/tubiao",center.tu);//房间
app.listen(3000);