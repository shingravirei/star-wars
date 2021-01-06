const axios = require('axios').default;

const quantidadeAparicoes = async (nomePlaneta) => {
    const res = await axios.get('https://swapi.dev/api/planets', {
        params: {
            search: nomePlaneta
        }
    });

    if (res.data.count === 0) {
        return 0;
    }

    return res.data.results[0].films.length;
};

module.exports = { quantidadeAparicoes };
