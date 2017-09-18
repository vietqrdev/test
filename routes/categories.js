const express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();
const { Category } = require('../app/models');
const { paginate, filterField } = require('../app/middleware');

router.get('/', paginate, filterField(['id', 'image', 'name']), async (req, res, next) => {
    let options = {
        attributes: req.query.fields,
        offset: req.query.offset,
        limit: req.query.limit
    };

    let data = await Category.findAll(options).catch((err) => {});

    res.json({
        data: data
    });
});

router.post('/', async (req, res, next) => {
    let insert = await Category.create(req.body).catch(() => {});

    res.json({
        data: {
            success: insert == undefined ? false : true
        }
    });
});

router.get('/:id', filterField(['id', 'image', 'name']), async (req, res, next) => {
    let data = await Category.findById(req.params.id, { attributes: req.query.fields });

    if (!data) {
        return next();
    }

    res.json({
        data: data
    });
});

router.put('/:id', async (req, res, next) => {
    let result = await Category.update(
        req.body,
        {
            where: { id: req.params.id },
            fields: ['name', 'image']
        }).catch(() => {});

    res.json({
        data: {
            success: true
        }
    })
});

router.delete('/:id', async (req, res, next) => {
    await Category.destroy({ where: { id: req.params.id } }).catch(() => {});

    res.json({
        data: {
            success: true
        }
    });
});

module.exports = router;