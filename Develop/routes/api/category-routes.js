const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name'],
      },
    ],
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => {
       console.log(err);
       res.status(400).json(err);
     });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        attributes: ['product_name'],
      }
    ],
  })
 .then((category) => res.status(200).json(category))
 .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  // post body should look like this...
  // {
  //   "category_name": "Stuff"
  // }
  Category.create(req.body)
 .then((category) => {
    // TODO: here, we need to find all the things associated with the new category from the request body and then update them or something
  
    res.status(200).json(category)
  })
 .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
});

// TODO: understand why the product update changes the tags associated with the product and replaces it. we might need to do something similar with this model because categories have many products?
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // post body should look like this...
  // 	{
	// 	"id": 6,
	// 	"category_name": "Stuff",
	// 	"products": []
	// }
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },  
  })
  .then((category) => {
    // TODO: here, we need to update any fields about the category that were changed
  
    res.status(200).json(category)
  })
  .catch((err) => {
         console.log(err);
         res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((category) => res.status(200).json(category))
  .catch((err) => {
         console.log(err);
         res.status(400).json(err);
  });
});

module.exports = router;
