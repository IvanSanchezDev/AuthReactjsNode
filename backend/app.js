import express from 'express'
import { config } from 'dotenv'
import { routes as routesAuth } from './routes/auth.routes.js'
import cors from 'cors'
config()


const app=express()

app.use(express.json())
app.use(cors())

app.use('/auth',  routesAuth)

const myserver = JSON.parse(process.env.MY_SERVER)

const port = myserver.PORT || 3000

app.listen(port, ()=>{
    console.log(`server running in http://${myserver.HOSTNAME}:${port}`);
})