const express = require('express');
const router = express.Router();
const dal = require('../data/itemDal');

// GET all items
router.get('/items', async (req, res) => {
    const items = await dal.getAllItems();
    res.json(items);
});

// POST a new item
router.post('/items', async (req, res) => {
    const { name, description, price } = req.body;
    await dal.addItem(name, description, price);
    res.status(201).json({ message: 'Item added' });
});

// PUT (update) an item
router.put('/items/:id', async (req, res) => {
    const { name, description, price } = req.body;
    await dal.updateItem(req.params.id, name, description, price);
    res.json({ message: 'Item updated' });
});

// DELETE an item
router.delete('/items/:id', async (req, res) => {
    await dal.deleteItem(req.params.id);
    res.json({ message: 'Item deleted' });
});

module.exports = router;
