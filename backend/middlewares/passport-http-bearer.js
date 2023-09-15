import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { config } from 'dotenv'
import { verifyAccessToken } from '../helpers/verify.js'

config()

passport.use(new BearerStrategy((token, done) => {
  try {
    const user = verifyAccessToken(token)
    return done(null, user)
  } catch (error) {
    return done(null, false)
  }
}))

export default passport