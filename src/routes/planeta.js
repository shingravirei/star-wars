const asyncHandler = require('express-async-handler');

module.exports = (router) => {
    router.get(
        '/planeta',
        asyncHandler(async (req, res) => {
            res.json({ planeta: 'tatooine' });
        })
    );
};
