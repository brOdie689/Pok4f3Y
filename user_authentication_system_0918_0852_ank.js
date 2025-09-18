// 代码生成时间: 2025-09-18 08:52:59
const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// 用户验证系统
const app = express();
const usersDB = []; // 模拟数据库，存储用户信息

// 解析请求体中间件
app.use(express.json());

// 注册新用户
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username and password are required.');
    }

    // 检查用户名是否已被使用
    const existingUser = usersDB.find(user => user.username === username);
    if (existingUser) {
      return res.status(409).send('Username is already taken.');
    }

    // 密码加盐哈希
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const newUser = { id: userId, username, password: hashedPassword };
    usersDB.push(newUser);
    res.status(201).send('User registered successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error.');
  }
});

// 用户登录
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send('Username and password are required.');
    }

    // 查找用户
    const user = usersDB.find(u => u.username === username);
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // 验证密码
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).send('Invalid credentials.');
    }

    // 登录成功，返回用户信息但不包含密码
    const { password: hashedPassword, ...userInfo } = user;
    res.send(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error.');
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});