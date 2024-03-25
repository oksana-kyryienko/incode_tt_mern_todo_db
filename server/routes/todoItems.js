const router = require('express').Router();

const todoItemsModel = require('../models/todoItems');

router.post('/api/item', async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });

    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.json(err);
  }
});

router.get('/api/items', async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

router.put('/api/item/:id', async (req, res) => {
  try {
    await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      status: req.body.status,
      new: true
    });
    res.status(200).json('Item was updated');
  } catch (err) {
    res.json(err);
  }
});

router.delete('/api/item/:id', async (req, res) => {
  try {
    await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item was deleted');
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
