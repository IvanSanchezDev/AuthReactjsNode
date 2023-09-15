
use('authReactjs')
db.createCollection('usuarios', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['username', 'password', 'rol'],
      properties: {
        username: {
          bsonType: 'string',
          description: 'el username es obligatorio'
        },
        password: {
          bsonType: 'string',
          description: 'la passowrd es obligatoria'
        },
        rol: {
          bsonType: 'int',
          description: 'el rol debe ser de tipo int (0:admin, 1:paciente)'
        },
        permisos: {
          bsonType: 'array',
          items: {
            bsonType: 'string'
          }
        }
      }
    }
  }
})


use('authReactjs')
db.createCollection('token', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['token'],
      properties: {
        token: {
          bsonType: 'string',
          description: 'el token es obligatorio'
        }
        
      }
    }
  }
})

use('authReactjs')
db.token.findOne({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY4NjdhYzUxYWMzMDgyM2MzOWJmZDQiLCJ1c2VybmFtZSI6IkFuZHJlcyIsInBhc3N3b3JkIjoicHJ1ZWJhIiwicm9sIjowLCJwZXJtaXNvcyI6WyIxLjAuMCIsIjIuMC4wIl0sImlhdCI6MTY5NDc4NDUzMSwiZXhwIjoxNjk0Nzg4MTMxfQ.OvQVjWRDb7NztXZWgAi3B1GdWfIGd8aPT8YQPjZGIy0"})

db.usuarios.insertOne({ "username": "Andres", "password": "prueba", "rol": 0, "permisos": ["1.0.0", "2.0.0"] })