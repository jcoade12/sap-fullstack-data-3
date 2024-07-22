// data/itemDal.js

const db = require('./db'); // Ensure this file exists and is correctly set up

// Function to get all items
const getAllItems = async () => {
    try {
        const result = await db.query('SELECT * FROM items');
        return result.rows;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

// Function to get an item by ID
const getItemById = async (id) => {
    try {
        const result = await db.query('SELECT * FROM items WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            throw new Error('Item not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching item by ID:', error);
        throw error;
    }
};

// Function to add a new item
const addItem = async (name, description, price) => {
    try {
        await db.query('INSERT INTO items (name, description, price) VALUES ($1, $2, $3)', [name, description, price]);
    } catch (error) {
        console.error('Error inserting item into database:', error);
        throw error;
    }
};

// Function to update an item by ID
const updateItemById = async (id, name, description, price) => {
    try {
        const result = await db.query(
            'UPDATE items SET name = $1, description = $2, price = $3 WHERE id = $4',
            [name, description, price, id]
        );
        if (result.rowCount === 0) {
            throw new Error('Item not found');
        }
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};

// Function to delete an item by ID
const deleteItemById = async (id) => {
    try {
        const result = await db.query('DELETE FROM items WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            throw new Error('Item not found');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};

module.exports = {
    getAllItems,
    getItemById,
    addItem,
    updateItemById,
    deleteItemById
};
