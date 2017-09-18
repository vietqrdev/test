const express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();
const { Description } = require('../app/models');
const { paginate, filterField } = require('../app/middleware');

router.get('/', paginate, filterField(['id', 'title', 'body']), async (req, res, next) => {
    let options = {
        attributes: req.query.fields,
        offset: req.query.offset,
        limit: req.query.limit
    };
    let where = {};

    if (req.query.type) {
        where.description_type = req.query.type;
    }

    if (req.query.relation_id) {
        where.description_id = req.query.relation_id;
    }

    options.where = where;

    let data = await Description.findAll(options).catch(() => {});

    res.json({
        data: data || []
    });
});

router.post('/', async (req, res, next) => {

    if (!Array.isArray(req.body)) {
        req.body = [req.body];
    }

    let insert = await Description.bulkCreate(req.body).catch((err) => {});

    res.json({
        data: {
            success: insert == undefined ? false : true
        }
    });
});

router.get('/:id', filterField(['id', 'title', 'body']), async (req, res, next) => {
    let data = await Description.findById(req.params.id, { attributes: req.query.fields }).catch(() => {});

    if (!data) {
        return next();
    }

    res.json({
        data: data
    });
});

router.put('/:id', async (req, res, next) => {
    let result = await Description.update(
        req.body,
        {
            where: { id: req.params.id },
            fields: ['title', 'body']
        }).catch(e => console.log(e));

    res.json({
        data: {
            success: true
        }
    })
});

router.delete('/:id', async (req, res, next) => {
    await Description.destroy({ where: { id: req.params.id } }).catch(() => {});

    res.json({
        data: {
            success: true
        }
    });
});

module.exports = router;