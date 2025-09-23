// 代码生成时间: 2025-09-24 01:03:36
const ExcelJS = require('exceljs');

/**
 * Excel表格自动生成器
 * @class ExcelGenerator
 */
class ExcelGenerator {
  constructor() {
    this.workbook = new ExcelJS.Workbook();
  }

  /**
   * 添加新的工作表
   * @param {string} sheetName 工作表名称
   */
  addSheet(sheetName) {
    this.sheet = this.workbook.addWorksheet(sheetName);
  }

  /**
   * 设置工作表的标题行
   * @param {Array} headers 标题行内容
   */
  setHeaders(headers) {
    this.sheet.columns = headers.map(header => ({ header, key: header, width: 10 }));
  }

  /**
   * 添加一行数据到工作表
   * @param {Array} rowData 行数据
   */
  addRow(rowData) {
    this.sheet.addRow(rowData);
  }

  /**
   * 保存工作簿到文件
   * @param {string} filePath 文件路径
   */
  saveWorkbook(filePath) {
    this.workbook.xlsx.writeFile(filePath)
      .then(() => console.log('Workbook saved successfully.'));
  }
}

/**
 * 使用示例
 */
const excelGenerator = new ExcelGenerator();
excelGenerator.addSheet('Example Sheet');
excelGenerator.setHeaders(['ID', 'Name', 'Age']);

let data = [
  {
    ID: 1,
    Name: 'John Doe',
    Age: 30
  },
  {
    ID: 2,
    Name: 'Jane Doe',
    Age: 25
  }
];

data.forEach(row => {
  excelGenerator.addRow(row);
});

// 保存为Excel文件
excelGenerator.saveWorkbook('./example.xlsx').catch(error => {
  console.error('Error saving workbook:', error);
});