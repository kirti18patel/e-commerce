const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        as: "products",
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        as: "products",
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ],
      where: {
      id: req.params.id
      }
      })
      .then(dbPostData => {
      if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
      }
      res.json(dbPostData);
      })
      .catch(err => {
      console.log(err);
      res.status(500).json(err);
      });
  });

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
    })
      .then(dbTagData => res.json(dbTagData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
