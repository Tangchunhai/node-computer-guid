const ffi = require('ffi');

const getGuid = function() {
        // 调用DLL获取GUID
        const result = ffi.Library('identifier.dll', {
            'getDiskName': [
                'string', []
            ],
            'getSerialNumber': [
                'string', []
            ],
            'getSignature': [
                'string', []
            ],
            'getHardDiskSize': [
                'string', []
            ]
        });

        const diskNameArr = result.getDiskName().split('!@#'); // 盘符数组
        const serialNumberArr = result.getSerialNumber().split('!@#'); // 硬盘签名数组6
        const signatureArr = result.getSignature().split('!@#'); // 签名数组
        const hardDiskSizeArr = result.getHardDiskSize().split('!@#'); // 硬盘容量大小数组
        
        for (let i = 0; i < diskNameArr.length; i++) {
            if (diskNameArr[i].indexOf('PHYSICALDRIVE0') >= 0) {
                var serialNumber = serialNumberArr[i].replace(/[\s]+/g, '') === 'null' ? '' : serialNumberArr[i].replace(/[\s]+/g, ''); // 硬盘序列号
                var signature =  signatureArr[i].replace(/[^1234567890null]+/g, '') === 'null'? '' : signatureArr[i].replace(/[^1234567890null]+/g, ''); // 硬盘签名
                var hardDiskSize = hardDiskSizeArr[i].replace(/[^1234567890null]+/g, '') === 'null' ? '' : hardDiskSizeArr[i].replace(/[^1234567890null]+/g, ''); // 硬盘容量大小              
            }
        }
        
        let guid = '';

        if (serialNumber.length > 0 && signature.length > 3 && hardDiskSize.length > 0) {
            // 只有硬盘序列号、硬盘签名、硬盘容量大小都存在，组合连接字符串生成GUID
            guid = String(serialNumber) + (Number(signature) + Number(hardDiskSize));
        } else if (serialNumber.length > 0 && signature.length > 3) {
            // 只有硬盘序列号、硬盘签名都存在，组合连接字符串生成GUID
            guid = String(serialNumber) + String(signature);
        } else if (signature.length > 3 && hardDiskSize.length) {
            // 只有硬盘签名、硬盘容量大小都存在，组合连接字符串生成GUID
            guid = (Number(signature) + Number(hardDiskSize));
        } else if (serialNumber.length > 0 && hardDiskSize.length) {
            // 只有硬盘序列号、硬盘容量大小都存在，组合连接字符串生成GUID
            guid = String(serialNumber) + String(hardDiskSize);
        } else if (signature.length > 3 && businessId.length > 0) {
            // 只有硬盘签名存在生成GUID
            guid = String(signature);
        }
        
        // console.log('组合生成唯一标识符GUID：' + guid);
        return guid;
}

module.exports = getGuid;