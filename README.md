## 说明

因为做收银系统，每台收银设备需要用机器唯一GUID来做区分，保持数据独立。获取机器唯一GUID采用的规则是：获取硬盘序列号、硬盘签名、硬盘容量，经测试有的机器并不能获取硬盘签名，所以采用判断，如存在的拼接起来生成GUID，提高GUID的唯一性。<a href="https://github.com/Tanghailun/node-computer-guid">源码下载</a>

## 安装方式
由于ffi包需要编译，请直接下载源代码。

## 使用方式
```
var device = require('node-computer-guid');
console.log(device.getGuid());
```