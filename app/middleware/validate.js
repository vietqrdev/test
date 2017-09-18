const { arrayIntersect } = require('../support/index');

exports.listOrganization = (req, res, next) => {
    let defaultFields = ['id', 'gln', 'name', 'address', 'phone', 'email', 'website', 'logo'];
    let requestFields = req.query.fields;

    if (requestFields) {
        requestFields = requestFields.split(',');
        req.query.fields = arrayIntersect(defaultFields, requestFields);
    } else {
        req.query.fields = defaultFields;
    }

    next();
}