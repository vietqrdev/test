const limitMax = 96;
const limitMin = 1;
const limitDefault = 16;

function offset(page, limit) {
    return (page - 1) * limit;
} 

var paginate = (req, res, next) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);

    if (isNaN(limit) || limit < limitMin || limit > limitMax) {
        limit = limitDefault;
    }

    if (isNaN(page) || page < 1) {
        page = 1;
    }

    req.query.page = page;
    req.query.limit = limit;
    req.query.offset = offset(page, limit);
    next();
}

module.exports = paginate;