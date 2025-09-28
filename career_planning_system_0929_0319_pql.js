// 代码生成时间: 2025-09-29 03:19:28
const fs = require('fs');
const path = require('path');

// CareerPlanner 类用于管理职业规划信息
class CareerPlanner {
  // 构造函数，接收一个文件路径来存储职业规划数据
  constructor(dataFilePath) {
    this.dataFilePath = dataFilePath;
  }

  // 读取职业规划信息
  async readCareerPlans() {
    try {
      // 检查文件是否存在
      if (!fs.existsSync(this.dataFilePath)) {
        throw new Error('Data file does not exist');
      }
      // 读取文件内容
      const data = await fs.promises.readFile(this.dataFilePath, 'utf8');
      // 将JSON数据转换为JavaScript对象
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading career plans:', error);
      throw error;
    }
  }

  // 写入职业规划信息
  async writeCareerPlans(careerPlans) {
    try {
      // 将JavaScript对象转换为JSON格式的字符串
      const data = JSON.stringify(careerPlans, null, 2);
      // 写入文件
      await fs.promises.writeFile(this.dataFilePath, data, 'utf8');
    } catch (error) {
      console.error('Error writing career plans:', error);
      throw error;
    }
  }

  // 添加新的职业规划
  async addCareerPlan(careerPlan) {
    try {
      // 读取当前的职业规划信息
      let careerPlans = await this.readCareerPlans();
      // 添加新的职业规划
      careerPlans.push(careerPlan);
      // 写入更新后的职业规划信息
      await this.writeCareerPlans(careerPlans);
    } catch (error) {
      console.error('Error adding career plan:', error);
      throw error;
    }
  }

  // 获取特定职业规划信息
  async getCareerPlanById(id) {
    try {
      // 读取职业规划信息
      const careerPlans = await this.readCareerPlans();
      // 查找指定ID的职业规划
      const careerPlan = careerPlans.find(plan => plan.id === id);
      if (!careerPlan) {
        throw new Error('Career plan not found');
      }
      return careerPlan;
    } catch (error) {
      console.error('Error getting career plan:', error);
      throw error;
    }
  }

  // 更新职业规划信息
  async updateCareerPlan(id, updatedPlan) {
    try {
      // 读取当前的职业规划信息
      let careerPlans = await this.readCareerPlans();
      // 查找并更新指定ID的职业规划
      const index = careerPlans.findIndex(plan => plan.id === id);
      if (index === -1) {
        throw new Error('Career plan not found');
      }
      careerPlans[index] = updatedPlan;
      // 写入更新后的职业规划信息
      await this.writeCareerPlans(careerPlans);
    } catch (error) {
      console.error('Error updating career plan:', error);
      throw error;
    }
  }

  // 删除职业规划信息
  async deleteCareerPlan(id) {
    try {
      // 读取当前的职业规划信息
      let careerPlans = await this.readCareerPlans();
      // 查找并删除指定ID的职业规划
      careerPlans = careerPlans.filter(plan => plan.id !== id);
      // 写入更新后的职业规划信息
      await this.writeCareerPlans(careerPlans);
    } catch (error) {
      console.error('Error deleting career plan:', error);
      throw error;
    }
  }
}

// 使用示例
(async () => {
  const planner = new CareerPlanner(path.join(__dirname, 'careerPlans.json'));
  try {
    // 添加职业规划
    await planner.addCareerPlan({ id: 1, name: 'Software Developer', description: 'Develop software applications' });
    // 获取职业规划信息
    const plan = await planner.getCareerPlanById(1);
    console.log('Career Plan:', plan);
    // 更新职业规划
    await planner.updateCareerPlan(1, { id: 1, name: 'Senior Software Developer', description: 'Develop and manage software applications' });
    // 删除职业规划
    await planner.deleteCareerPlan(1);
  } catch (error) {
    console.error('Error:', error);
  }
})();