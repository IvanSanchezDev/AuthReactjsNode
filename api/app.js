import express from 'express'
import { loadEnv } from 'vite'
import { routes as routesAuth } from './routes/auth.routes.js'
import { routes as routesUser } from './routes/user.routes.js'
import cors from 'cors'
const env=loadEnv("development", process.cwd(), 'VITE')

const app=express()

app.use(express.json())
app.use(cors())

app.use('/api/auth',  routesAuth)
app.use('/api/user', routesUser)

const config={
    port : env.VITE_PORT_BACKEND || 5121,
    hostname:env.VITE_HOSTNAME || "localhost"
}

console.log(env.VITE_PORT_BACKEND);
console.log(env.VITE_HOSTNAME);


app.listen(config, ()=>{
    console.log(`server listening on http://${config.hostname}:${config.port}`);
})