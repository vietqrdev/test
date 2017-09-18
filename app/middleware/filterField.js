const { arrayIntersect } = require('../support/index');

module.exports = (df) => {
    return (req, res, next) => {
        let requestFields = req.query.fields;
    
        if (requestFields) {
            requestFields = requestFields.split(',');
            req.query.fields = arrayIntersect(df, requestFields);
        } else {
            req.query.fields = df;
        }
    
        next();
    }
};