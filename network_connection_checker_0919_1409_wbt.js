// 代码生成时间: 2025-09-19 14:09:31
const net = require('net');

/**
 * 检查网络连接状态的函数
 * @param {string} host - 要检查的主机地址
 * @param {number} port - 要检查的端口号
 * @param {number} timeout - 超时时间（毫秒）
 * @returns {Promise<boolean>} - 表示连接状态的Promise
 */
function checkNetworkConnection(host, port, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();

    // 设置连接超时时间
    socket.setTimeout(timeout, () => {
      socket.destroy(); // 销毁套接字
      reject(new Error('Connection timed out')); // 超时时返回错误
    });

    socket.connect(port, host, () => {
      // 连接成功时关闭套接字并解决Promise
      socket.end();
      resolve(true);
    });

    socket.on('error', (err) => {
      // 连接出错时拒绝Promise
      socket.destroy(); // 销毁套接字
      reject(err);
    });
  });
}

/**
 * 主函数，用于检查指定的网络连接状态
 */
function main() {
  const host = 'example.com'; // 更改为你需要检查的主机地址
  const port = 80; // 更改为你需要检查的端口号

  checkNetworkConnection(host, port)
    .then((connectionEstablished) => {
      console.log(`Connection to ${host}:${port} is ${connectionEstablished ? 'established' : 'failed'}`);
    }).catch((error) => {
      console.error(`Error checking connection to ${host}:${port}: ${error.message}`);
    });
}

// 当直接运行此脚本时执行main函数
if (require.main === module) {
  main();
}

// 导出函数以供其他模块使用
module.exports = checkNetworkConnection;