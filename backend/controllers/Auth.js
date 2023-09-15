import { connect, closeConnection } from '../database/connection.js'
import { validationResult } from 'express-validator'
import { createAccessToken, createRefreshToken } from '../helpers/implJwt.js'
import { verifyRefreshToken } from '../helpers/verify.js'
import { generateAccessToken, generateRefreshToken } from '../helpers/createJwt.js'

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
      const tokenAccess = createAccessToken(usuario)
      const tokenRefresh= await createRefreshToken(usuario)
      return res.status(200).json({ status: 200, message: 'Ha ingresado correctamente', data:{tokenAccess, tokenRefresh, user:usuario} })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 404, message: 'Error al iniciar sesion' })
    } finally {
      await closeConnection()
    }
  }

  static async RefreshToken(req, res){
    
      const refreshToken=req.body.refreshToken
      if (!refreshToken) {
        return res
        .status(401)
        .json({ error: "No se proporciono el token de actualizacion" });
      }
    try {
      const db = await connect()
      const token = db.collection('token')
      const tokenDocument=await token.findOne({ token: refreshToken})
      if(!tokenDocument){
        return res.status(403).json({ error: "Token de actualización inválido" });
      }
      const data=verifyRefreshToken(tokenDocument.token)
      const accessToken=generateAccessToken(data)
      res.json({status:200, accessToken:accessToken})
    } catch (error) {
      return res.status(403).json({ error: "Token de actualización inválido" });
    }finally{
      await closeConnection()
  }
  }
}