// 代码生成时间: 2025-09-21 01:29:16
const os = require('os');
const { exec } = require('child_process');

/**
 * 获取系统内存使用情况
 * @returns {Promise<Object>} 包含内存使用信息的对象
 */
function getMemoryUsage() {
  return new Promise((resolve, reject) => {
    // 使用child_process模块执行系统命令获取内存使用情况
    exec('free -m', (error, stdout, stderr) => {
      if (error) {
        // 如果执行命令出错，拒绝Promise
        return reject(error);
      }
      if (stderr) {
        // 如果标准错误流中有内容，也认为是一个错误
        return reject(stderr);
      }
      const lines = stdout.split('
');
      // 通常内存使用情况在第二行
      const memoryUsage = lines[1].split(/\s+/).slice(1, 4);
      const memoryInfo = {
        total: parseInt(memoryUsage[0], 10),
        used: parseInt(memoryUsage[1], 10),
        free: parseInt(memoryUsage[2], 10),
        shared: parseInt(memoryUsage[3], 10)
      };
      resolve(memoryInfo);
    });
  });
}

/**
 * 分析内存使用情况并打印结果
 */
function analyzeMemoryUsage() {
  getMemoryUsage().then(memoryInfo => {
    console.log('Memory Usage Analysis:');
    console.log('Total Memory:', memoryInfo.total, 'MB');
    console.log('Used Memory:', memoryInfo.used, 'MB');
    console.log('Free Memory:', memoryInfo.free, 'MB');
    console.log('Shared Memory:', memoryInfo.shared, 'MB');
  }).catch(error => {
    console.error('Error:', error.message);
  });
}

// 运行内存使用情况分析
analyzeMemoryUsage();