const request = require('supertest');

const app = require('../src/app');
const { Planeta } = require('../src/models');

beforeAll(async () => {
    const alderaan = new Planeta({
        nome: 'Alderaan',
        clima: 'temperado',
        terreno: 'variado',
        nAparicoesFilmes: 2
    });

    await alderaan.save();
});

afterAll(async () => {
    await Planeta.findOneAndDelete({});
});

describe('/api', () => {
    describe('/planeta', () => {
        test('retorna todos os planetas', async () => {
            const res = await request(app).get('/api/planeta');

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined();
        });

        test('adiciona um novo planeta', async () => {
            const planeta = {
                nome: 'tatooine',
                clima: 'árido',
                terreno: 'deserto'
            };

            const res = await request(app).post('/api/planeta').send(planeta);

            expect(res.status).toBe(201);
        });

        test('deleta um planeta', async () => {
            const planetas = await request(app).get('/api/planeta');

            const { _id } = planetas.body[0];

            const res = await request(app).delete(`/api/planeta/${_id}`);

            expect(res.status).toBe(204);
        });
    });

    describe('/planeta/search', () => {
        test('encontra um planeta pelo nome', async () => {
            const res = await request(app).get(
                '/api/planeta/search?nome=tatooine'
            );

            expect(res.status).toBe(200);
        });

        test('encontra um planeta pelo id', async () => {
            const planetas = await request(app).get('/api/planeta');

            const { _id } = planetas.body[0];

            const res = await request(app).get(`/api/planeta/search?id=${_id}`);

            expect(res.status).toBe(200);
        });
    });
});
