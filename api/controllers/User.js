import {connect, closeConnection} from '../database/connection.js'
import { ObjectId } from 'mongodb'

export class User{
    static async traerInfo(req, res){
        try {
        const infoToken = req.user
        const id=infoToken.id
        const db=await connect()
        const user=db.collection('usuarios')
        const infoUsuario=await user.findOne({_id:new ObjectId(id)})
        return res.status(200).json({ status: 200, info: infoUsuario})
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 404, message: 'Error al traer los datos del usuario logeado' })
          } finally {
            await closeConnection()
          }
        
    }
}