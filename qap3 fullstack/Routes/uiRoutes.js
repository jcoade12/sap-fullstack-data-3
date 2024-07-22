// routes/uiRoutes.js

const express = require('express');
const router = express.Router();
const itemDal = require('../data/itemDal');

// Display all items
router.get('/', async (req, res) => {
    try {
        const items = await itemDal.getAllItems();
        res.render('home', { items });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle item deletion
router.post('/items/:id/delete', async (req, res) => {
    const { id } = req.params;
    try {
        await itemDal.deleteItemById(id);
        res.redirect('/');
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle item addition
router.post('/items/add', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        await itemDal.addItem(name, description, price);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle item editing
router.post('/items/:id/edit', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        await itemDal.updateItemById(id, name, description, price);
        res.redirect('/');
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
