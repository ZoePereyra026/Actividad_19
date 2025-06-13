const { connectToDB, disconnectFromDB } = require('./src/mongodb.js');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.use(express.json());

// Middleware para manejar las peticiones
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

// Endpoint para obtener todos los paises y en el caso de que se especifique el idioma, filtrar por este
app.get('/paises', async (req, res) => {
    try {
        const idioma = req.query.idioma; 
        let query = {}; 

        if (idioma) {
            query = { idioma: { $in: [new RegExp(idioma, 'i')] } };
        }

        const paises = await req.db.find(query).toArray();

        if (paises.length > 0) {
            res.json(paises);
        } else {
            res.status(404).json({ message: 'No se encontraron que hablen este idioma.' });
        }
    } catch (error) {
        console.error('Error al obtener los datos de los países:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Endpoint para buscar paises por nombre (incluyendo coincidencias parciales)
app.get('/paises/:nombre', async (req, res) => {
    try {
        const nombreBuscado = req.params.nombre.toLowerCase();
        const client = await connectToDB();
        const db = client.db('Paises');

        const paises = await db.collection('Paises')
        
        .find({ pais: new RegExp(nombreBuscado, 'i') }).toArray();

        await disconnectFromDB();

        if (paises.length > 0) {
            res.json(paises);
        } res.status(404).json({ message: 'País no encontrado.' });
    } catch (error) {
        console.error('Error al buscar país por su nombre:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Endpoint para el mensaje de error 404
// Si no se encuentra el endpoint, se devuelve un mensaje de error
app.use((req,res) => {
    res.status(404).json({message: 'Endpoint no encontrado'})
})

app.listen(port, () => {
  console.log(`Ejecutandose en http://localhost:${port}`)
})