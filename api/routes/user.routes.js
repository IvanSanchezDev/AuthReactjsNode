import { Router } from 'express'

import { User } from '../controllers/User.js'
import passport from '../middlewares/passport-http-bearer.js'
export const routes = Router()



routes.get('/', passport.authenticate('bearer', {session: false}), User.traerInfo)