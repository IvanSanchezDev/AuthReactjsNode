import { connect, closeConnection } from '../database/connection.js'
import { validationResult } from 'express-validator'
import { generateAccessToken } from '../helpers/createJwt.js'

export class Auth {
  static async Register (req, res) {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res.status(400).json({ status: 500, errors: result.errors })
      }
      const infoUsuario = req.body
      const db = await connect()
      const user = db.collection('usuarios')
      const { insertedId } = await user.insertOne(infoUsuario)
      res.status(201).json({ status: 201, message: 'Usuario creado correctamente, ahora inicia sesion', id: insertedId })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 404, message: 'Error al  crear el usuario' })
    } finally {
      await closeConnection()
    }
  }

  static async Login (req, res) {
    try {
      const result = validationResult(req)
      if (!result.isEmpty()) {
        return res.status(400).json({ status: 500, errors: result.errors })
      }
      const infoUsuario = req.body
      const db = await connect()
      const user = db.collection('usuarios')
      const usuario = await user.findOne(infoUsuario)
      if (!usuario) {
        return res.status(400).json({ status: 400, message: 'Verifique el usuario o la contraseña' })
      }
      const id = {
        id: usuario._id
      }
      const token = generateAccesToken(id)
      return res.status(200).json({ status: 200, message: 'Ha ingresado correctamente', token })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 404, message: 'Error al iniciar sesion' })
    } finally {
      await closeConnection()
    }
  }
}