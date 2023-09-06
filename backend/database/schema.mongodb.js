
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

db.usuarios.insertOne({ "username": "Andres", "password": "prueba", "rol": 0, "permisos": ["1.0.0", "2.0.0"] })