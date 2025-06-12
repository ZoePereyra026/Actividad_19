const { connectToDB, disconnectFromDB } = require('./src/mongodb.js');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json());

// Middleware para manejar el cuerpo de las peticiones
app.use(async (req,res,next) => {
    try {
        const client = await connectToDB()
        req.db = client.db('Paises').collection('Paises')
        next()
    } catch {
        console.log('Error al conectarse a la DB');
    }
})

// Endpoint de bienvenida
app.get('/', (req, res) => {
  res.json({message: "Bienvenido a la API de Paises!"})
})

// Endpoint para obtener todos los paises
app.get('/paises', async (req, res) => {
    const client = await connectToDB();
    const db = client.db('Paises');
    const paises = await db.collection('Paises').find().toArray();

    await disconnectFromDB();
        res.json(paises);
});

// Endpoint para buscar paises por nombre (incluyendo coincidencias parciales)
app.get('/paises/:nombre', async (req, res) => {
    const nombreBuscado = req.params.nombre.toLowerCase();
    const client = await connectToDB();
    const db = client.db('Paises');

    const paises = await db.collection('Paises')
    
    .find({ pais: new RegExp(nombreBuscado, 'i') }).toArray();

    await disconnectFromDB();

    if (paises.length > 0) {
        res.json(paises);
    } 
});




// Endpoint para el mensaje de error 404
// Si no se encuentra el endpoint, se devuelve un mensaje de error
app.use((req,res) => {
    res.status(404).json({message: 'Endpoint not found'})
})

app.listen(port, () => {
  console.log(`Ejecutandose en http://localhost:${port}`)
})