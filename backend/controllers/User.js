import {connect, closeConnection} from '../database/connection.js'
import { ObjectId } from 'mongodb'

export class User{
    static async traerInfo(req, res){
        try {
        
        const infoUsuario=req.user.user.user
        console.log(infoUsuario);
        return res.status(200).json({ status: 200, info: infoUsuario})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 404, message: 'Error al traer los datos del usuario logeado' })
          } finally {
            await closeConnection()
          }
        
    }
}