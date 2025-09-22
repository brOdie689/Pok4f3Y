// 代码生成时间: 2025-09-23 00:35:21
const EventEmitter = require('events');

// Define an event emitter for cart events
class ShoppingCart extends EventEmitter {
    /**
     * Initialize a new shopping cart instance.
     */
    constructor() {
        super();
        this.items = []; // Internal storage for cart items
    }

    /**
     * Adds an item to the shopping cart.
     * 
     * @param {Object} item - The item to add, must have id and quantity properties.
     * @returns {Boolean} - Indicates success or failure.
     */
    addItem(item) {
        if (!item || typeof item.id !== 'string' || typeof item.quantity !== 'number') {
            console.error('Error: Item must have an id and a quantity.');
            return false;
        }

        const existingItem = this.items.find((i) => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push({ ...item });
        }

        this.emit('itemAdded', item);
        return true;
    }

    /**
     * Removes an item from the shopping cart.
     * 
     * @param {String} id - The id of the item to remove.
     * @returns {Boolean} - Indicates success or failure.
     */
    removeItem(id) {
        const index = this.items.findIndex((item) => item.id === id);
        if (index === -1) {
            console.error('Error: Item with id not found.');
            return false;
        }

        const removedItem = this.items.splice(index, 1)[0];
        this.emit('itemRemoved', removedItem);
        return true;
    }

    /**
     * Gets a summary of the shopping cart.
     * 
     * @returns {Array} - Array of items in the cart with their quantities.
     */
    getSummary() {
        return this.items;
    }
}

// Export the ShoppingCart class
module.exports = ShoppingCart;