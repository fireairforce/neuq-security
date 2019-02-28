## 路由相关
- 根路由进入的是信息收集界面: /
- /checklogin 进入后台审核的路由 
- /infocheck 是后台审核信息的界面

## 后台API
http://leaf.marklux.cn/api/doc/114

制证的接口:

http://neuqsecurity.lyzwhh.top/pass/getQRcode
 

## 相关说明
在infoall和infocheck界面如果没有token或者token过期的话是会直接跳转回来登录界面的。  

## 后台信息接口的使用

1. 按申请表提交时间升序，从第offset条开始，发送limit条

http://neuqsecurity.lyzwhh.top/pass/getpasses/{limit}/{offset}

从第offset条开始发送limit条，可以用这个做个分页器，往里面传递两个参数

2. 可以考虑把后台的数据全部拿出来之后，然后在页面里面对每一页的数据进行获取
