// 代码生成时间: 2025-09-17 04:03:38
const fs = require('fs');
const path = require('path');

// 数据存储文件路径
const configPath = path.join(__dirname, 'config.json');

// 主题配置文件
const themes = {
  'light': {
    'background': '#ffffff',
    'color': '#000000'
  },
  'dark': {
    'background': '#000000',
    'color': '#ffffff'
  }
};

// 获取当前主题
function getCurrentTheme() {
  try {
    const data = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(data).theme;
  } catch (error) {
    console.error('读取配置文件失败:', error);
    return null;
  }
}

// 设置当前主题
function setTheme(theme) {
  if (!themes[theme]) {
    throw new Error(`无效的主题: ${theme}`);
  }
  try {
    const config = { theme };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    console.log(`主题切换为: ${theme}`);
  } catch (error) {
    console.error('写入配置文件失败:', error);
  }
}

// 主题切换函数
function switchTheme() {
  const currentTheme = getCurrentTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// 暴露模块
module.exports = {
  switchTheme,
  setTheme,
  getCurrentTheme
};