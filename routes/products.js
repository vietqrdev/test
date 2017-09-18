const express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();
const { Product } = require('../app/models');
const { paginate, filterField } = require('../app/middleware');

router.get('/', paginate, filterField(['id', 'gtin', 'image', 'name', 'price', 'manufacturer_id', 'category_id']), async (req, res, next) => {
    let options = {
        attributes: req.query.fields,
        offset: req.query.offset,
        limit: req.query.limit
    };

    let data = await Product.findAll(options).catch(() => {});

    res.json({
        data: data
    });
});

router.post('/', async (req, res, next) => {
    let insert = await Product.create(req.body).catch((err) => {console.log(err)});

    res.json({
        data: {
            success: insert == undefined ? false : true
        }
    });
});

router.get('/:id', filterField(['id', 'gtin', 'image', 'name', 'price', 'manufacturer_id', 'category_id']), async (req, res, next) => {
    let data = await Product.findById(req.params.id, { attributes: req.query.fields }).catch(() => {});

    if (!data) {
        return next();
    }

    res.json({
        data: data
    });
});

router.put('/:id', async (req, res, next) => {
    let result = await Product.update(
        req.body,
        {
            where: { id: req.params.id },
            fields: ['gtin', 'image', 'name', 'price', 'category_id']
        }).catch(e => console.log(e));

    res.json({
        data: {
            success: true
        }
    })
});

router.delete('/:id', async (req, res, next) => {
    await Product.destroy({ where: { id: req.params.id } });

    res.json({
        data: {
            success: true
        }
    });
});

module.exports = router;