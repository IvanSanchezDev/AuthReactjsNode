import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

function sign (payload, isAccessToken) {
  return jwt.sign(
    payload,
    isAccessToken
    ? process.env.ACCESS_TOKEN_SECRET
    : process.env.REFRESH_TOKEN_SECRET, 
    { 
      expiresIn: '1h',
      algorithm: 'HS256'
    }
    )
}
//mandamos user en un objeto para que lo separe de las options iat y exp
export function generateAccessToken(user){
  return sign({user}, true)
}

export function generateRefreshToken(user){
  return sign({user}, false)
}