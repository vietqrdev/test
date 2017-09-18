exports.arrayIntersect = (a1, a2) => {
    return a2.filter((e) => {
        return a1.includes(e);
    });
}