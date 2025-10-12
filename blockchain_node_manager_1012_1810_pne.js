// 代码生成时间: 2025-10-12 18:10:00
// Required modules
const fs = require('fs');
const path = require('path');

// Define the data directory for blockchain nodes
const dataDir = 'blockchain_nodes';
const nodesFilePath = path.join(__dirname, dataDir, 'nodes.json');

// Ensure data directory exists
fs.existsSync(dataDir) || fs.mkdirSync(dataDir, { recursive: true });

// Node manager class
class NodeManager {
  /**
   * Initializes the node manager and loads existing nodes.
   */
  constructor() {
    try {
      const fileContents = fs.readFileSync(nodesFilePath);
      this.nodes = JSON.parse(fileContents);
    } catch (error) {
      // If file doesn't exist or is empty, initialize an empty array
      this.nodes = [];
    }
  }

  /**
   * Adds a new node to the blockchain network.
   * @param {string} nodeId - The ID of the node to add.
   */
  addNode(nodeId) {
    if (!nodeId) throw new Error('Node ID cannot be empty.');
    if (this.nodes.includes(nodeId)) throw new Error('Node already exists.');
    this.nodes.push(nodeId);
    this.saveNodes();
  }

  /**
   * Removes a node from the blockchain network.
   * @param {string} nodeId - The ID of the node to remove.
   */
  removeNode(nodeId) {
    const index = this.nodes.indexOf(nodeId);
    if (index === -1) throw new Error('Node does not exist.');
    this.nodes.splice(index, 1);
    this.saveNodes();
  }

  /**
   * Lists all nodes in the blockchain network.
   * @returns {string[]} - An array of node IDs.
   */
  listNodes() {
    return this.nodes;
  }

  /**
   * Saves the current state of nodes to a file.
   */
  saveNodes() {
    fs.writeFileSync(nodesFilePath, JSON.stringify(this.nodes, null, 2));
  }
}

// Create an instance of NodeManager
const nodeManager = new NodeManager();

// Example usage:
// nodeManager.addNode('node123');
// nodeManager.removeNode('node123');
// console.log(nodeManager.listNodes());

module.exports = nodeManager;