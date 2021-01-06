module.exports = (mongoose) => {
    const planetaSchema = new mongoose.Schema(
        {
            nome: String,
            clima: String,
            terreno: String
        },
        { versionKey: false }
    );

    return mongoose.model('Planeta', planetaSchema);
};
