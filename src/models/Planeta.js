module.exports = (mongoose) => {
    const planetaSchema = new mongoose.Schema(
        {
            nome: { type: String, required: true },
            clima: { type: String, required: true },
            terreno: { type: String, required: true },
            nAparicoesFilmes: { type: Number, default: 0 }
        },
        { versionKey: false }
    );

    return mongoose.model('Planeta', planetaSchema);
};
