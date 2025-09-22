// 代码生成时间: 2025-09-22 09:13:17
const os = require('os');
const process = require('process');

/**
 * 获取系统的内存使用情况
 * @returns {object} 包含总内存和已使用内存的对象
 */
function getSystemMemoryUsage() {
  const mem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = mem - freeMem;
  return {
    total: mem,
    used: usedMem,
    free: freeMem
  };
}

/**
 * 获取当前进程的内存使用情况
 * @returns {object} 包含总内存和已使用内存的对象
 */
function getProcessMemoryUsage() {
  const memUsage = process.memoryUsage();
  return {
    rss: memUsage.rss, // 常驻集大小
    heapTotal: memUsage.heapTotal, // 堆总大小
    heapUsed: memUsage.heapUsed, // 堆已使用大小
  };
}

/**
 * 打印内存使用情况
 */
function printMemoryUsage() {
  try {
    const systemMemUsage = getSystemMemoryUsage();
    const processMemUsage = getProcessMemoryUsage();

    console.log('System Memory Usage:');
    console.log(`Total: ${systemMemUsage.total} bytes`);
    console.log(`Used: ${systemMemUsage.used} bytes`);
    console.log(`Free: ${systemMemUsage.free} bytes`);

    console.log('Process Memory Usage:');
    console.log(`RSS: ${processMemUsage.rss} bytes`);
    console.log(`Heap Total: ${processMemUsage.heapTotal} bytes`);
    console.log(`Heap Used: ${processMemUsage.heapUsed} bytes`);
  } catch (error) {
    console.error('Error while fetching memory usage:', error);
  }
}

// 调用函数打印内存使用情况
printMemoryUsage();