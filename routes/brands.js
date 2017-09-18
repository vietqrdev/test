const express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();
const { Brand, Organization } = require('../app/models');
const { paginate, filterField } = require('../app/middleware');

router.get('/', paginate, filterField(['id', 'logo', 'name']), async (req, res, next) => {
    let options = {
        attributes: req.query.fields,
        offset: req.query.offset,
        limit: req.query.limit
    };

    let data = await Brand.findAll(options);

    res.json({
        data: data
    });
});

router.post('/', async (req, res, next) => {
    let insert = await Brand.create(req.body);

    res.json({
        data: {
            success: insert == undefined ? false : true
        }
    });
});

router.get('/:id', filterField(['id', 'logo', 'name']), async (req, res, next) => {
    let data = await Brand.findById(req.params.id, { attributes: req.query.fields });

    if (!data) {
        return next();
    }

    res.json({
        data: data
    });
});

router.put('/:id', async (req, res, next) => {
    let result = await Brand.update(
        req.body,
        {
            where: { id: req.params.id },
            fields: ['name', 'logo', 'organization_id']
        }).catch(e => console.log(e));

    res.json({
        data: {
            success: true
        }
    })
});

router.delete('/:id', async (req, res, next) => {
    await Brand.destroy({ where: { id: req.params.id } });

    res.json({
        data: {
            success: true
        }
    });
});

module.exports = router;