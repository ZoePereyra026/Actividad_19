process.loadEnvFile()
const {MongoClient} = require('mongodb')
const client = new MongoClient(process.env.MONGODB_URLSTRING)
const connectToDB = async () => {
    try {
        await client.connect()
        console.log('Conectado a la BD correctamente');
        return client
    } catch (error) {
        console.error('Error al conectarse: ', error);
        return null
    }
}
const disconnectFromDB = async () => {
    try {
        await client.close()
        console.log('Desconectado a la BD correctamente');
    } catch (error) {
        console.error('Error al desconectarse: ', error);
    }
}

module.exports = { connectToDB, disconnectFromDB }
