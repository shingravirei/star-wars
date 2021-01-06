const asyncHandler = require('express-async-handler');
const { Planeta } = require('../models');
const { quantidadeAparicoes } = require('../services');

module.exports = (router) => {
    router.get(
        '/planeta',
        asyncHandler(async (req, res) => {
            const planetas = await Planeta.find({});

            return res.json(planetas);
        })
    );

    router.get(
        '/planeta/search',
        asyncHandler(async (req, res) => {
            const { nome, id } = req.query;

            if (!nome && !id) {
                return res.status(400).end();
            }

            if (nome) {
                const planeta = await Planeta.findOne({ nome });

                if (!planeta) {
                    return res.status(404).end();
                }

                return res.json({ planeta });
            }

            if (id) {
                const planeta = await Planeta.findById({ _id: id });

                if (!planeta) {
                    return res.status(404).end();
                }

                return res.json({ planeta });
            }

            return res.status(404).end();
        })
    );

    router.post(
        '/planeta',
        asyncHandler(async (req, res) => {
            const { nome, clima, terreno } = req.body;

            if (!nome || !clima || !terreno) {
                return res.status(400).json({ erro: 'propriedade faltando' });
            }

            const nAparicoesFilmes = await quantidadeAparicoes(nome);

            const planeta = new Planeta({
                nome,
                clima,
                terreno,
                nAparicoesFilmes
            });

            await planeta.save();

            return res.status(201).json(planeta);
        })
    );

    router.delete(
        '/planeta/:id',
        asyncHandler(async (req, res) => {
            const { id } = req.params;

            const planeta = await Planeta.findOneAndDelete({
                _id: id
            });

            if (!planeta) {
                return res.status(404).end();
            }

            return res.status(204).end();
        })
    );
};
