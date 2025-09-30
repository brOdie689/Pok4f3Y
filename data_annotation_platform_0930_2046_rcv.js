// 代码生成时间: 2025-09-30 20:46:49
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// 数据库模型
const { Annotation, Task, User } = require('./models');

// 配置
const app = express();
const PORT = process.env.PORT || 3000;

// 跨域资源共享
app.use(cors());

// 用于解析请求体
app.use(bodyParser.json());

// 连接数据库
mongoose.connect('mongodb://localhost/dataAnnotationDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 创建路由
const annotationRouter = require('./routes/annotations');
const taskRouter = require('./routes/tasks');
const userRouter = require('./routes/users');

// 使用路由
app.use('/api/annotations', annotationRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 数据标注平台的主要功能模块
// 模型
// Annotation, Task, User 模型定义在 models 文件夹中
// 路由
// annotations, tasks, users 路由定义在 routes 文件夹中

// 以下是 models 文件夹和 routes 文件夹中的示例代码

// models/index.js
module.exports = {
  Annotation: require('./Annotation'),
  Task: require('./Task'),
  User: require('./User')
};

// models/Annotation.js
const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  // 注释模型的属性
  text: String,
  label: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }
});

module.exports = mongoose.model('Annotation', annotationSchema);

// routes/annotations.js
const express = require('express');
const router = express.Router();

const { Annotation } = require('../models');

// 获取所有注释
router.get('/', async (req, res) => {
  try {
    const annotations = await Annotation.find();
    res.json(annotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 添加更多路由处理程序以处理注释的创建、更新和删除

module.exports = router;

// 其他路由和模型文件应遵循类似的结构和实践。