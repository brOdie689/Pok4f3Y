// 代码生成时间: 2025-09-23 10:05:51
const fs = require('fs');
const path = require('path');

// 配置备份文件存储路径
const backupDir = './backups';

// 确保备份目录存在
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// 备份函数
function backupData(sourcePath, backupFileName) {
  try {
    // 读取源文件数据
    const data = fs.readFileSync(sourcePath, 'utf8');

    // 设置备份文件路径
    const backupFilePath = path.join(backupDir, `${backupFileName}.json`);

    // 写入备份文件
    fs.writeFileSync(backupFilePath, data);

    console.log(`Backup successful: ${backupFilePath}`);
  } catch (error) {
    console.error('Backup failed:', error);
  }
}

// 恢复函数
function restoreData(backupFilePath, targetPath) {
  try {
    // 读取备份文件数据
    const data = fs.readFileSync(backupFilePath, 'utf8');

    // 写入目标文件
    fs.writeFileSync(targetPath, data);

    console.log(`Restore successful: ${targetPath}`);
  } catch (error) {
    console.error('Restore failed:', error);
  }
}

// 示例：备份和恢复数据
// 假设我们有一个名为 'data.json' 的文件，我们想要备份和恢复它

// 备份数据
const sourcePath = './data.json';
const backupFileName = 'data_backup';

backupData(sourcePath, backupFileName);

// 恢复数据
const backupFilePath = path.join(backupDir, `${backupFileName}.json`);
const targetPath = './restored_data.json';

restoreData(backupFilePath, targetPath);
