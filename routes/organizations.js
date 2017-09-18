const express = require('express');
var router = express.Router();
const { Organization } = require('../app/models');
const { paginate, validate } = require('../app/middleware');

router.get('/', paginate, validate.listOrganization, async (req, res, next) => {
  let data = await Organization.all({
    attributes: req.query.fields,
    offset: req.query.offset,
    limit: req.query.limit
  });

  res.json({
    data: data
  });
});

router.post('/', async (req, res, next) => {
  let insert = await Organization.create(req.body);

  res.json({
    data: {
      success: insert == undefined ? false : true
    }
  });
});

router.get('/:id', async (req, res, next) => {
  let data = await Organization.findById(req.params.id);

  if (!data) {
    return next();
  }

  res.json({
    data: data
  });
});

router.put('/:id', async (req, res, next) => {
  let result = await Organization.update(req.body, { where: { id: req.params.id }, fields: ['name', 'address', 'phone', 'email', 'vat_id', 'gln', 'website', 'logo'] }).catch(e => console.log(e));

  res.json({
    data: {
      success: result
    }
  })
});

router.delete('/:id', async (req, res, next) => {
  await Organization.destroy({ where: { id: req.params.id } });

  res.json({
    data: {
      success: true
    }
  });
});

module.exports = router;