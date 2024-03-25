const router = require('express').Router();

const taskModel = require('../models/todoItems');

router.post('api/item', async (req, res) => {
  try {
    const newItem = new taskModel({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status 
    });

    const savedItem = await newItem.save();
    res.status(200).json(savedItem);

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;