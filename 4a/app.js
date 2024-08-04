//Aca funciona todo pero a base de importar todo
//creo el enrutador con el objeto router que viene de controllers y con app.use le paso la ruta que va a menejar como raiz
//todos los paquetes que voy a usar los instalo aca
//Aca se realiza la conexion con la base de datos con vas variables de entorno importadas con los datos
//Exporto todo para usarlo dentro del index

//const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const contactoRouter = require('./controllers/contactos')
const mongoose = require('mongoose')
const config = require('./utils/config')

//logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Bases de datos conectada')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/contactos', contactoRouter)

//app.use(middleware.unknownEndpoint)
//app.use(middleware.errorHandler)

module.exports = app