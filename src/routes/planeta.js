const asyncHandler = require('express-async-handler');
const { Planeta } = require('../models');

module.exports = (router) => {
    router.get(
        '/planeta',
        asyncHandler(async (req, res) => {
            const { search } = req.query;

            if (search) {
                // TODO: implement search
            }

            const planetas = await Planeta.find({});

            res.json(planetas);
        })
    );

    router.post(
        '/planeta',
        asyncHandler(async (req, res) => {
            const { nome, clima, terreno } = req.body;

            if (!nome || !clima || !terreno) {
                return res.status(400).json({ erro: 'propriedade faltando' });
            }

            const planeta = new Planeta({ nome, clima, terreno });

            await planeta.save();

            return res.status(201).json(planeta);
        })
    );
};
