import { Router } from 'express'

import { Auth } from '../controllers/Auth.js'
import { registerValidator } from '../middlewares/validateDatos.js'
import { loginValidator } from '../middlewares/validateLogin.js'
export const routes = Router()



routes.post('/register', registerValidator, Auth.Register)
routes.post('/login', loginValidator, Auth.Login)