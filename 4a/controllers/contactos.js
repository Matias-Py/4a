const contactoRouter = require('express').Router()
const Contacto = require('../models/mongo')


contactoRouter.get('/', (request, response) => {
    Contacto.find({}).then(contactos => {
        response.json(contactos)
    })
})

contactoRouter.get('/:id', (request, response) => {
    Contacto.findById(request.params.id).then(contacto => {
        response.json(contacto)
    })
})


contactoRouter.post('/', (request, response) => {
    const body = request.body;
  
    if (!body.name) {
      return response.status(400).json({ error: 'Debe ingresar un nombre' });
    }
  
    const contacto = new Contacto({
      name: body.name,
      number: body.number,
    });
  
    contacto.save()
    .then((contactoGuardado) => {
      response.json(contactoGuardado);
      console.log('Enviado a Mongo!');
    })
    .catch(error=> {
      console.error(error);
      response.status(500).json({ error: 'Error interno del servidor' });
    })
  });
  

contactoRouter.delete('/:id', (request, response) => {
    Contacto.findByIdAndDelete(request.params.id)
      .then(resultado => {
        response.status(204).end();
    })
      .catch(error => next(error));
})

module.exports = contactoRouter